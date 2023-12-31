export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      prover_market: {
        Row: {
          created_at: string
          prover_fee: number
          prover_name: string
          prover_url: string
          user_id: string
        }
        Insert: {
          created_at?: string
          prover_fee: number
          prover_name: string
          prover_url: string
          user_id: string
        }
        Update: {
          created_at?: string
          prover_fee?: number
          prover_name?: string
          prover_url?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prover_market_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
