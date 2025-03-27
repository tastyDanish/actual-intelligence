import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <div>Welcome to actual intelligence. where the AI is U</div>
        <div className="flex gap-2">
          <Button
            asChild
            size="sm"
            variant={"outline"}>
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant={"default"}>
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
      </main>
    </>
  );
}
