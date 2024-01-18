/* SupaBase のテーブルから個別記事を【投稿（insert）】するためのAPI */

import { supabase } from "@/utils/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";

/* 今回は非同期処理（async / await）の関数にする */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    /**
     *【req.body】
     * HTTPリクエストのボディ（body）に含まれるデータを取得するために使用されます。
     * 通常、POSTリクエストやPUTリクエストのように、クライアントからサーバにデータを送信する場合に使用されます。
     * 例えば、HTMLフォームを使用してデータを送信し、そのデータをサーバで処理する場合にreq.bodyを使用することがあります。
    */
    const { id, title, content } = req.body;

    const { data, error } = await supabase
        .from('benjuwan-next13-udemy-posts')
        .insert([{ id, title, content, createdAt: new Date().toISOString() }]); // types.ts で指定した型通り、[]配列の{}オブジェクト形式で中身を指定

    //  new Date().toISOString()：現在日時の取得

    if (error) {
        return res.status(500).json({ error: error.message }); // エラー時は 500 番を返す
    }

    // console.log(data, res.status(200).json(data)); // null undefined 
    return res.status(200).json(data); // 問題ない場合は 200 番に、そして data を返す

};