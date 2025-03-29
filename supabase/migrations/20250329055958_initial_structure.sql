create table "public"."chats" (
    "created_at" timestamp with time zone not null default now(),
    "author_id" uuid not null,
    "message" text not null,
    "is_intelligence" boolean not null default false,
    "skip" boolean not null default false,
    "id" uuid not null default gen_random_uuid(),
    "conversation_id" uuid not null default gen_random_uuid()
);


alter table "public"."chats" enable row level security;

create table "public"."conversations" (
    "created_at" timestamp with time zone not null default now(),
    "owner_id" uuid not null,
    "title" character varying,
    "archive" boolean not null default false,
    "new_message" boolean not null default false,
    "waiting_on_intelligence" boolean not null default false,
    "current_intelligence_id" uuid,
    "updated_at" timestamp with time zone not null default now(),
    "id" uuid not null default gen_random_uuid()
);


alter table "public"."conversations" enable row level security;

create table "public"."profiles" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "role" text not null default '''user'''::text
);


alter table "public"."profiles" enable row level security;

CREATE UNIQUE INDEX chats_pkey ON public.chats USING btree (id);

CREATE UNIQUE INDEX conversations_pkey ON public.conversations USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

alter table "public"."chats" add constraint "chats_pkey" PRIMARY KEY using index "chats_pkey";

alter table "public"."conversations" add constraint "conversations_pkey" PRIMARY KEY using index "conversations_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."chats" add constraint "chats_author_id_fkey" FOREIGN KEY (author_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."chats" validate constraint "chats_author_id_fkey";

alter table "public"."chats" add constraint "chats_conversation_id_fkey" FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."chats" validate constraint "chats_conversation_id_fkey";

alter table "public"."conversations" add constraint "Conversations_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."conversations" validate constraint "Conversations_owner_id_fkey";

alter table "public"."conversations" add constraint "conversations_current_intelligence_id_fkey" FOREIGN KEY (current_intelligence_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."conversations" validate constraint "conversations_current_intelligence_id_fkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_role_check" CHECK ((role = ANY (ARRAY['user'::text, 'admin'::text]))) not valid;

alter table "public"."profiles" validate constraint "profiles_role_check";

create or replace view "public"."random_conversations" as  SELECT conversations.created_at,
    conversations.owner_id,
    conversations.title,
    conversations.archive,
    conversations.new_message,
    conversations.waiting_on_intelligence,
    conversations.current_intelligence_id,
    conversations.updated_at,
    conversations.id
   FROM conversations
  ORDER BY (random());


grant delete on table "public"."chats" to "anon";

grant insert on table "public"."chats" to "anon";

grant references on table "public"."chats" to "anon";

grant select on table "public"."chats" to "anon";

grant trigger on table "public"."chats" to "anon";

grant truncate on table "public"."chats" to "anon";

grant update on table "public"."chats" to "anon";

grant delete on table "public"."chats" to "authenticated";

grant insert on table "public"."chats" to "authenticated";

grant references on table "public"."chats" to "authenticated";

grant select on table "public"."chats" to "authenticated";

grant trigger on table "public"."chats" to "authenticated";

grant truncate on table "public"."chats" to "authenticated";

grant update on table "public"."chats" to "authenticated";

grant delete on table "public"."chats" to "service_role";

grant insert on table "public"."chats" to "service_role";

grant references on table "public"."chats" to "service_role";

grant select on table "public"."chats" to "service_role";

grant trigger on table "public"."chats" to "service_role";

grant truncate on table "public"."chats" to "service_role";

grant update on table "public"."chats" to "service_role";

grant delete on table "public"."conversations" to "anon";

grant insert on table "public"."conversations" to "anon";

grant references on table "public"."conversations" to "anon";

grant select on table "public"."conversations" to "anon";

grant trigger on table "public"."conversations" to "anon";

grant truncate on table "public"."conversations" to "anon";

grant update on table "public"."conversations" to "anon";

grant delete on table "public"."conversations" to "authenticated";

grant insert on table "public"."conversations" to "authenticated";

grant references on table "public"."conversations" to "authenticated";

grant select on table "public"."conversations" to "authenticated";

grant trigger on table "public"."conversations" to "authenticated";

grant truncate on table "public"."conversations" to "authenticated";

grant update on table "public"."conversations" to "authenticated";

grant delete on table "public"."conversations" to "service_role";

grant insert on table "public"."conversations" to "service_role";

grant references on table "public"."conversations" to "service_role";

grant select on table "public"."conversations" to "service_role";

grant trigger on table "public"."conversations" to "service_role";

grant truncate on table "public"."conversations" to "service_role";

grant update on table "public"."conversations" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

create policy "Enable insert for authenticated users only"
on "public"."chats"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."chats"
as permissive
for select
to public
using (true);


create policy "Enable insert for authenticated users only"
on "public"."conversations"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable updates for authenticated users"
on "public"."conversations"
as permissive
for update
to authenticated
using (true)
with check (true);


create policy "Enable users to view their own data only"
on "public"."conversations"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = owner_id));



