import { Database } from "@/database.types";
import SupabaseClient from "@supabase/supabase-js/dist/module/SupabaseClient";
import { getUserId } from "../users/users-repo";

type CreateNewConversationParams = {
  userId: string;
  title: string;
  supabase: SupabaseClient<Database>;
};
export const createNewConversation = async ({
  supabase,
  userId,
  title,
}: CreateNewConversationParams) => {
  const { error, data } = await supabase
    .from("conversations")
    .insert({ owner_id: userId, title, waiting_on_intelligence: true })
    .select()
    .limit(1)
    .single();
  if (error) throw error;
  return data;
};

type MarkReadParams = {
  conversationId: string;
  supabase: SupabaseClient<Database>;
};
export const markRead = async ({
  conversationId,
  supabase,
}: MarkReadParams) => {
  const { error, data } = await supabase
    .from("conversations")
    .update({ new_message: false })
    .eq("id", conversationId)
    .eq("new_message", true);
  if (error) throw error;
};

type GetRandomConversationToAnswerParams = {
  supabase: SupabaseClient<Database>;
  talkToSelf: boolean;
};
export const getRandomConversationToAnswer = async ({
  supabase,
  talkToSelf,
}: GetRandomConversationToAnswerParams) => {
  const userId = await getUserId({ supabase });

  const { data: currentConversation, error: chatsError } = await supabase
    .from("conversations")
    .select("id")
    .eq("current_intelligence_id", userId);

  if (chatsError) {
    console.error("Error fetching current chat", chatsError);
    return null;
  }

  if (currentConversation.length > 0) {
    return currentConversation[0].id;
  }

  const query = supabase
    .from("random_conversations")
    .select("id")
    .limit(1)
    .eq("waiting_on_intelligence", true)
    .is("current_intelligence_id", null);

  if (!talkToSelf) {
    query.neq("owner_id", userId);
  }

  const { data: newConversation, error: conversationsError } = await query;

  if (conversationsError) {
    console.error("Error fetching random conversation:", conversationsError);
    return null;
  }

  if (newConversation.length > 0 && newConversation[0].id) {
    const conversationId = newConversation[0].id;
    const { error: assignError } = await supabase
      .from("conversations")
      .update({
        waiting_on_intelligence: false,
        current_intelligence_id: userId,
      })
      .eq("id", conversationId);

    if (assignError) {
      console.error(
        "error assigning user to conversation:",
        assignError.message
      );
      return null;
    }

    return conversationId;
  }

  return null;
};
