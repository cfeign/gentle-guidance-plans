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
      assessments: {
        Row: {
          assessment_section: string | null
          client_id: string | null
          created_at: string | null
          data_section: string | null
          diagnosis_notes: string | null
          id: string
          location: string | null
          mental_status: Json | null
          plan_section: string | null
          risk_assessment: string | null
          safety_plan: string | null
          session_date: string | null
          session_type: string | null
          symptom_status: string | null
          therapist_id: string | null
          treatment_progress: string | null
          updated_at: string | null
        }
        Insert: {
          assessment_section?: string | null
          client_id?: string | null
          created_at?: string | null
          data_section?: string | null
          diagnosis_notes?: string | null
          id?: string
          location?: string | null
          mental_status?: Json | null
          plan_section?: string | null
          risk_assessment?: string | null
          safety_plan?: string | null
          session_date?: string | null
          session_type?: string | null
          symptom_status?: string | null
          therapist_id?: string | null
          treatment_progress?: string | null
          updated_at?: string | null
        }
        Update: {
          assessment_section?: string | null
          client_id?: string | null
          created_at?: string | null
          data_section?: string | null
          diagnosis_notes?: string | null
          id?: string
          location?: string | null
          mental_status?: Json | null
          plan_section?: string | null
          risk_assessment?: string | null
          safety_plan?: string | null
          session_date?: string | null
          session_type?: string | null
          symptom_status?: string | null
          therapist_id?: string | null
          treatment_progress?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assessments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessments_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      intake_forms: {
        Row: {
          age_group: string
          client_id: string | null
          client_name: string | null
          created_at: string | null
          current_functioning: string | null
          date_of_birth: string | null
          email: string | null
          emergency_contact: string | null
          emergency_phone: string | null
          family_background: string | null
          id: string
          insurance_id: string | null
          insurance_provider: string | null
          medical_history: string | null
          phone: string | null
          presenting_problems: string | null
          status: string | null
          therapist_id: string | null
          therapist_notes: string | null
          updated_at: string | null
        }
        Insert: {
          age_group: string
          client_id?: string | null
          client_name?: string | null
          created_at?: string | null
          current_functioning?: string | null
          date_of_birth?: string | null
          email?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          family_background?: string | null
          id?: string
          insurance_id?: string | null
          insurance_provider?: string | null
          medical_history?: string | null
          phone?: string | null
          presenting_problems?: string | null
          status?: string | null
          therapist_id?: string | null
          therapist_notes?: string | null
          updated_at?: string | null
        }
        Update: {
          age_group?: string
          client_id?: string | null
          client_name?: string | null
          created_at?: string | null
          current_functioning?: string | null
          date_of_birth?: string | null
          email?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          family_background?: string | null
          id?: string
          insurance_id?: string | null
          insurance_provider?: string | null
          medical_history?: string | null
          phone?: string | null
          presenting_problems?: string | null
          status?: string | null
          therapist_id?: string | null
          therapist_notes?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "intake_forms_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "intake_forms_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          id: string
          role: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
