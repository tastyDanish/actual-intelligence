drop view if exists "public"."author_counts";

drop view if exists "public"."author_likes";

create or replace view "public"."author_counts" as  SELECT p.id AS author_id,
    p.display_name,
    p.avatar,
    p.hat,
    count(p.id) AS chat_count
   FROM (profiles p
     JOIN chats c ON ((p.id = c.author_id)))
  GROUP BY p.id, p.display_name
  ORDER BY (count(p.id)) DESC;


create or replace view "public"."author_likes" as  SELECT p.id AS author_id,
    p.display_name,
    p.avatar,
    p.hat,
    count(p.id) AS like_count
   FROM (profiles p
     JOIN chats c ON ((p.id = c.author_id)))
  WHERE (c."like" = true)
  GROUP BY p.id, p.display_name
  ORDER BY (count(p.id)) DESC;



