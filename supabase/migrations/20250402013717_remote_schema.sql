drop policy "Enable users to view their own data only" on "public"."conversations";

create policy "Enable read access for all users"
on "public"."conversations"
as permissive
for select
to public
using (true);


create policy "Enable insert for authenticated users only"
on "public"."profiles"
as permissive
for insert
to authenticated
with check (true);



