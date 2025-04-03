export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chats: {
        Row: {
          author_id: string
          conversation_id: string
          created_at: string
          id: string
          is_intelligence: boolean
          like: boolean | null
          message: string
          skip: boolean
        }
        Insert: {
          author_id: string
          conversation_id?: string
          created_at?: string
          id?: string
          is_intelligence?: boolean
          like?: boolean | null
          message: string
          skip?: boolean
        }
        Update: {
          author_id?: string
          conversation_id?: string
          created_at?: string
          id?: string
          is_intelligence?: boolean
          like?: boolean | null
          message?: string
          skip?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "chats_author_id_fkey1"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "author_counts"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "chats_author_id_fkey1"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "author_likes"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "chats_author_id_fkey1"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chats_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chats_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "random_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          archive: boolean
          created_at: string
          current_intelligence_id: string | null
          id: string
          new_message: boolean
          owner_id: string
          title: string | null
          updated_at: string
          waiting_on_intelligence: boolean
        }
        Insert: {
          archive?: boolean
          created_at?: string
          current_intelligence_id?: string | null
          id?: string
          new_message?: boolean
          owner_id: string
          title?: string | null
          updated_at?: string
          waiting_on_intelligence?: boolean
        }
        Update: {
          archive?: boolean
          created_at?: string
          current_intelligence_id?: string | null
          id?: string
          new_message?: boolean
          owner_id?: string
          title?: string | null
          updated_at?: string
          waiting_on_intelligence?: boolean
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar: string | null
          created_at: string
          display_name: string
          hat: string | null
          id: string
          role: string
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          display_name: string
          hat?: string | null
          id?: string
          role?: string
        }
        Update: {
          avatar?: string | null
          created_at?: string
          display_name?: string
          hat?: string | null
          id?: string
          role?: string
        }
        Relationships: []
      }
    }
    Views: {
      author_counts: {
        Row: {
          author_id: string | null
          avatar: string | null
          chat_count: number | null
          display_name: string | null
          hat: string | null
        }
        Relationships: []
      }
      author_likes: {
        Row: {
          author_id: string | null
          avatar: string | null
          display_name: string | null
          hat: string | null
          like_count: number | null
        }
        Relationships: []
      }
      random_conversations: {
        Row: {
          archive: boolean | null
          created_at: string | null
          current_intelligence_id: string | null
          id: string | null
          new_message: boolean | null
          owner_id: string | null
          title: string | null
          updated_at: string | null
          waiting_on_intelligence: boolean | null
        }
        Insert: {
          archive?: boolean | null
          created_at?: string | null
          current_intelligence_id?: string | null
          id?: string | null
          new_message?: boolean | null
          owner_id?: string | null
          title?: string | null
          updated_at?: string | null
          waiting_on_intelligence?: boolean | null
        }
        Update: {
          archive?: boolean | null
          created_at?: string | null
          current_intelligence_id?: string | null
          id?: string | null
          new_message?: boolean | null
          owner_id?: string | null
          title?: string | null
          updated_at?: string | null
          waiting_on_intelligence?: boolean | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

