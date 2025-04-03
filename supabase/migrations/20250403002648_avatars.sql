alter table "public"."profiles" add column "avatar" character varying;

alter table "public"."profiles" add column "hat" character varying;

create policy "Enable updates for users based on id"
on "public"."profiles"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = id))
with check ((( SELECT auth.uid() AS uid) = id));



