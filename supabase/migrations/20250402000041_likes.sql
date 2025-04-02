drop policy "Enable users to view their own data only" on "public"."profiles";

alter table "public"."chats" add column "like" boolean;

create or replace view "public"."author_counts" as  SELECT p.id AS author_id,
    p.display_name,
    count(p.id) AS chat_count
   FROM (profiles p
     JOIN chats c ON ((p.id = c.author_id)))
  GROUP BY p.id, p.display_name
  ORDER BY (count(p.id)) DESC;


create or replace view "public"."author_likes" as  SELECT p.id AS author_id,
    p.display_name,
    count(p.id) AS like_count
   FROM (profiles p
     JOIN chats c ON ((p.id = c.author_id)))
  WHERE (c."like" = true)
  GROUP BY p.id, p.display_name
  ORDER BY (count(p.id)) DESC;


create policy "Updates for authenticated users only"
on "public"."chats"
as permissive
for update
to authenticated
using (true)
with check (true);


create policy "Enable read access for all users"
on "public"."profiles"
as permissive
for select
to public
using (true);



