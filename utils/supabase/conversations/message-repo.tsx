import { Database } from "@/database.types";
import { ActualRole } from "@/hooks/conversations-provider";
import SupabaseClient from "@supabase/supabase-js/dist/module/SupabaseClient";
import { createNewConversation } from "./conversations-repo";

type GetConversationMessagesParams = {
  conversationId: string;
  supabase: SupabaseClient<Database>;
};
export const getConversationMessages = async ({
  conversationId,
  supabase,
}: GetConversationMessagesParams) => {
  const { data, error, status } = await supabase
    .from("chats")
    .select("*")
    .eq("skip", false)
    .eq("conversation_id", conversationId);

  if (error && status !== 406) {
    console.log(error);
    throw error;
  }
  return data;
};

type CreateNewMessageParams = {
  conversationId: string | null;
  message: string;
  supabase: SupabaseClient<Database>;
  mode: ActualRole;
};
export const createNewMessage = async ({
  conversationId,
  message,
  supabase,
  mode,
}: CreateNewMessageParams) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user.id ?? null;
  if (!userId) throw new Error("missing user id in add message");

  let actualConversationId: string | null = conversationId;
  let createdConversation = false;
  if (!actualConversationId) {
    createdConversation = false;
    const newConversation = await createNewConversation({
      supabase,
      userId,
      title: message.slice(0, 30),
    });
    if (newConversation) {
      actualConversationId = newConversation.id;
    }
  }
  if (actualConversationId) {
    const { error } = await supabase.from("chats").insert({
      author_id: userId,
      conversation_id: actualConversationId,
      message,
      is_intelligence: mode === "intelligence",
    });
    if (error) throw error;

    const updated_at = new Date().toISOString();
    if (mode === "intelligence") {
      const { error } = await supabase
        .from("conversations")
        .update({
          new_message: true,
          current_intelligence_id: null,
          updated_at,
        })
        .eq("id", actualConversationId);
      if (error) throw error;
    } else if (mode === "user" && !createdConversation) {
      const { error } = await supabase
        .from("conversations")
        .update({
          waiting_on_intelligence: true,
          updated_at,
        })
        .eq("id", actualConversationId);
      if (error) throw error;
    }
  }
  return actualConversationId;
};
