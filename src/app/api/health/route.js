import { supabase, isSupabaseConfigured, getSupabaseError } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  // Check if Supabase is configured
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        status: 'error',
        database: 'not_configured',
        message: getSupabaseError(),
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }

  try {
    // Test database connection with a simple query
    const { data, error } = await supabase.from('users').select('count', { count: 'exact', head: true })
    
    if (error) {
      throw error
    }
    
    return NextResponse.json({
      status: 'success',
      database: 'connected',
      message: 'Supabase connection successful',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        database: 'disconnected',
        message: error.message || 'Failed to connect to database',
        error: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
