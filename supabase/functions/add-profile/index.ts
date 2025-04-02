import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

Deno.serve(async (req: Request) => {
  if (req.method === "POST") {
    const { record } = await req.json();
    const user_id = record.id;
    const displayName = record.raw_user_meta_data?.display_name || "Unknown";

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Insert a new profile with the default role
    const { data, error } = await supabaseClient
      .from("profiles")
      .insert([{ id: user_id, role: "user", display_name: displayName }])
      .select()
      .limit(1)
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    return new Response(
      JSON.stringify({ message: "Profile created successfully", data }),
      {
        headers: { "Content-Type": "application/json" },
        status: 201,
      },
    );
  }

  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    headers: { "Content-Type": "application/json" },
    status: 405,
  });
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Run `supabase functions serve`
  3. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/add-profile' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"record": {"id":"3795cca9-fc58-48af-840c-c65b34da389d"}}'

*/
