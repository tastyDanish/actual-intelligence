import { ActualChat } from "@/components/actual-chat";
import { ActualTopbar } from "@/components/actual-topbar";
import { UserProvider } from "@/hooks/user-provider";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <UserProvider userId={user.id}>
      <div className="flex flex-col items-center justify-center w-full overflow-hidden flex-grow">
        <ActualTopbar />

        <ActualChat />
      </div>
    </UserProvider>
  );
}
