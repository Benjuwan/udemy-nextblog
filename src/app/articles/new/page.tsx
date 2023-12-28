"use client"

import { useFetchPost } from "@/app/hooks/useFetchIPost";
import Link from "next/link";
import { useEffect } from "react";

/* 任意のコンポーネント名を付けてもok */
const createBlogPage = () => {

    /*（カスタム）フック系統の処理は クライアントコンポーネント（ファイル先頭に use client 記述）でしか不可能 */
    const { fetchPost } = useFetchPost();
    useEffect(() => {
        const post = fetchPost("https://jsonplaceholder.typicode.com/posts");
        console.log(post);

        const fetchArticleData_test = async () => {
            const res = await fetch(`http://localhost:3000/src/data/posts.json`, { cache: "no-store" });
            const articleData = await res.json();
            console.log(articleData);
        }
        fetchArticleData_test();
    }, []);

    const benjuwan_defaultAnkerStyle: object = {
        "color": "skyblue",
        "textDecoration": "underLine",
        "display": "block"
    }

    return (
        <div className="min-h-screen py-8 px-4 md:px-12">
            <h2 className="text-2xl font-bold mb-4">ブログ新規作成</h2>
            <form className="bg-slate-200 p-6 rounded shadow-lg">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">URL<input type="text" className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" /></label>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">タイトル<input type="text" className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" /></label>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">本文<textarea className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" cols={30} rows={10}></textarea></label>
                </div>

                <button
                    className="py-2 px-4 border rounded-md text-white font-semibold focus:outline-none bg-orange-300 hover:bg-orange-500"
                // className={`py-2 px-4 border rounded-md ${loading
                //         ? "bg-orange-300 cursor-not-allowed"
                //         : "bg-orange-400 hover:bg-orange-500"
                //     } text-white font-semibold focus:outline-none`}
                // disabled={loading}
                >
                    作成
                </button>
            </form>
            <p>here is articles/new page.</p>
            <Link href="/" style={benjuwan_defaultAnkerStyle}>to TOP</Link>
            <Link href="/articles" style={benjuwan_defaultAnkerStyle}>to Articles Archive</Link>
        </div>
    );
}

export default createBlogPage;