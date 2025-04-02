alter table "public"."profiles" add column "display_name" character varying not null;

alter table "public"."chats" add constraint "chats_author_id_fkey1" FOREIGN KEY (author_id) REFERENCES profiles(id) not valid;

alter table "public"."chats" validate constraint "chats_author_id_fkey1";


create policy "Enable users to view their own data only"
on "public"."profiles"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = id));



