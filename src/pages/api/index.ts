/* SupaBase のテーブルから全記事を取得するためのAPI */

import { supabase } from "@/utils/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";

/* https://nextjs-ja-translation-docs.vercel.app/docs/api-routes/introduction */

/* 今回は非同期処理（async / await）の関数にする */
export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse
) {
    
    /* from：テーブル名、select：各種テーブルデータ（id, title, content, createdAt）*/
    const { data, error } = await supabase.from('benjuwan-next13-udemy-posts').select('*');

    if (error) {
        return res.status(500).json({ error: error.message }); // エラー時は 500 番を返す
    }

    // console.log(data);

    return res.status(200).json(data); // 問題ない場合は 200 番に、そして data を返す

};