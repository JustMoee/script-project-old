import { supabase } from "lib/supabaseClient";

export async function getUserData() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
}


