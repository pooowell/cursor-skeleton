import { supabase, isSupabaseConfigured, getSupabaseError } from '@/lib/db'
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react'

async function checkDatabaseConnection() {
  // Check if Supabase is configured first
  if (!isSupabaseConfigured()) {
    return { success: false, error: getSupabaseError(), notConfigured: true }
  }

  try {
    // Test connection by querying a table (adjust table name as needed)
    const { data, error } = await supabase.from('users').select('id', { count: 'exact', head: true }).limit(1)
    
    if (error) {
      throw error
    }
    
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export default async function Home() {
  const dbStatus = await checkDatabaseConnection()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to Next.js
        </h1>
        <p className="text-center text-muted-foreground mb-12">
          Your project is ready to go! Start building amazing things.
        </p>

        {/* Database Connection Status */}
        <div className="mt-8 p-6 border rounded-lg bg-card">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Database Connection Status
          </h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            {dbStatus.success ? (
              <>
                <CheckCircle2 className="h-6 w-6 text-green-500" />
                <span className="text-green-500 font-medium">
                  Supabase Connected Successfully
                </span>
              </>
            ) : (
              <>
                <XCircle className="h-6 w-6 text-red-500" />
                <span className="text-red-500 font-medium">
                  Database Connection Failed
                </span>
              </>
            )}
          </div>

          {dbStatus.success ? (
            <div className="text-center space-y-2">
              <p className="text-xs text-muted-foreground mt-4">
                ✓ Your Supabase integration is working correctly!
              </p>
            </div>
          ) : (
            <div className="text-center space-y-3">
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-destructive mb-1">
                      Connection Error
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {dbStatus.error}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Please check:</p>
                <ul className="list-disc list-inside space-y-1 text-left max-w-md mx-auto">
                  {dbStatus.notConfigured ? (
                    <>
                      <li>Your <code className="bg-muted px-1 py-0.5 rounded">.env</code> file exists in the project root</li>
                      <li>Add <code className="bg-muted px-1 py-0.5 rounded">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="bg-muted px-1 py-0.5 rounded">NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> to your <code className="bg-muted px-1 py-0.5 rounded">.env</code> file</li>
                      <li>Get these values from Supabase: <strong>Settings &gt; API</strong></li>
                      <li>Restart your dev server after adding the variables</li>
                    </>
                  ) : (
                    <>
                      <li>The Supabase credentials are correct from your project settings</li>
                      <li>Your Supabase project is active and accessible</li>
                      <li>You have created the necessary tables in your Supabase database</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

