import { ActualChat } from "@/components/actual-chat";
import { AppTopBar } from "@/components/app-topbar";
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
    <div className="flex flex-col items-center justify-center w-full h-full overflow-hidden flex-grow min-h-0">
      <AppTopBar />

      <ActualChat />
    </div>
  );
}
