import { createClient } from '@supabase/supabase-js' // [npm install @supabase/supabase-js]をしていないと使用できないので注意

// 末尾に[!]：未定義（undefined）の場合はそれが加味された処理・結果になる
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
export const supabase = createClient(supabaseUrl, supabaseKey) // SupaBase に設定した内容を「supabase」という変数に代入し、それを export することでアプリ全体で扱えるようにする。

// export const supabase = createClient(supabaseUrl, supabaseKey, {
//     auth: {
//         persistSession: false,
//     },
// })