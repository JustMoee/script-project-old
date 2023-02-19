import { Auth, ThemeSupa } from '@supabase/auth-ui-react'

import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const session = useSession()
  const supabase = useSupabaseClient()
  return (
    <>
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
      ) : (
        <p>Account page will go here.</p>
      )}
    </div>
    </>
  )
}
