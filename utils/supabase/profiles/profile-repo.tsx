import { Database } from "@/database.types";
import SupabaseClient from "@supabase/supabase-js/dist/module/SupabaseClient";

type InsertProfileParams = {
  supabase: SupabaseClient<Database>;
  id: string;
  displayName: string;
};
export const insertProfile = async ({
  supabase,
  id,
  displayName,
}: InsertProfileParams) => {
  const { data, error } = await supabase
    .from("profiles")
    .insert({ id, role: "user", display_name: displayName })
    .select("id, role, display_name, avatar, hat")
    .single();

  if (error) {
    console.log("couldn't create the profile:", error.message);
  }

  return data;
};

type UpdateProfileParams = {
  userId: string;
  avatar: {
    name: string | null;
    hat: string | null;
  };
  supabase: SupabaseClient<Database>;
};
export const updateProfile = async ({
  userId,
  avatar,
  supabase,
}: UpdateProfileParams) => {
  const { data, error } = await supabase
    .from("profiles")
    .update({ avatar: avatar.name, hat: avatar.hat })
    .eq("id", userId)
    .select("avatar, hat")
    .single();

  if (error) {
    console.log("uh oh couldn't update avatar: ", error.message);
  }

  return data;
};
