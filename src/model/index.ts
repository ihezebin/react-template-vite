export interface IUser {
  id: string
  username: string
  phone?: string
  email: string
  avatar?: string
  password_strength: number
  nickname?: string
  avatar_url?: string
  background_url?: string
  display_id?: number | string
  created_at?: string
}
