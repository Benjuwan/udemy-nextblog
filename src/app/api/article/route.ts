/* SupaBase のテーブルから全記事を取得するためのAPI */

import { supabase } from "@/utils/supabaseClient";
import { NextResponse } from "next/server";

/* https://nextjs-ja-translation-docs.vercel.app/docs/api-routes/introduction */

/* コメントアウト部分は pages（Next12まで）の書き方 */
// export default async function handler(
    
export async function GET( // Next13以降では function [GET] 部分は、投稿ならPOST、更新ならPUT、削除ならDELETE を指定
    _req: Request, // _req: NextApiRequest
    _res: Response // res は、res: NextApiResponse でもok
) {
    const { data, error } = await supabase.from('benjuwan-next13-udemy-posts').select('*');

    if (error) {
        // return res.status(500).json({ error: error.message });
        return NextResponse.json(error)
    }

    // return res.status(200).json(data);
    return NextResponse.json(data, { status: 200 })

};


/* 投稿 */
export async function POST(
    req: Request,
    _res: Response
) {
    // const { id, title, content } = req.body; // Next13 では body で取得できない
    const { id, title, content } = await req.json();

    const { data, error } = await supabase
        .from('benjuwan-next13-udemy-posts')
        .insert([{ id, title, content, createdAt: new Date().toISOString() }]); // types.ts で指定した型通り、[]配列の{}オブジェクト形式で中身を指定

    //  new Date().toISOString()：現在日時の取得

    if (error) {
        return NextResponse.json(error)
    }

    return NextResponse.json(data, { status: 201 }) // リソースのソース作成の成功は201

};