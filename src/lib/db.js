import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

// Create client with fallback empty strings if env vars are missing
// This allows the app to start even without Supabase configured
export const supabase = supabaseUrl && supabasePublishableKey
  ? createClient(supabaseUrl, supabasePublishableKey)
  : null

// Helper to check if Supabase is configured
export function isSupabaseConfigured() {
  return !!(supabaseUrl && supabasePublishableKey)
}

// Helper to get a helpful error message
export function getSupabaseError() {
  if (!supabaseUrl && !supabasePublishableKey) {
    return 'Missing both NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'
  }
  if (!supabaseUrl) {
    return 'Missing NEXT_PUBLIC_SUPABASE_URL'
  }
  if (!supabasePublishableKey) {
    return 'Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'
  }
  return null
}
