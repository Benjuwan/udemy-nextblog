"use client" // submit イベントの使用はクライアントコンポーネントでしか不可能

import { useFetchPost } from "@/app/hooks/useFetchIPost";
import { createArticle } from "@/blogApis";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

/* 任意のコンポーネント名を付けてもok */
const createBlogPage = () => {
    /*（カスタム）フック系統の処理は クライアントコンポーネント（ファイル先頭に use client 記述）でしか不可能 */
    const { fetchPost } = useFetchPost();
    useEffect(() => {
        const post = fetchPost("https://jsonplaceholder.typicode.com/posts");
        console.log(post);

        /* fetch 不可能 */
        // const fetchArticleData_test = async () => {
        //     const res = await fetch(`http://localhost:3001/src/data/posts.json`, { cache: "no-store" });
        //     const articleData = await res.json();
        //     console.log(articleData);
        // }
        // fetchArticleData_test();
    }, []);

    const router = useRouter(); // リダイレクト処理
    const [loading, setLoading] = useState<boolean>(false);
    const [urlInput, setUrlInput] = useState<string>(''); // url
    const [titleInput, setTitleInput] = useState<string>(''); // タイトル
    const [contentTextArea, setContentTextArea] = useState<string>(''); // 本文

    /* form の送信イベント（記述内容をPOST）*/
    /* async / await 取っている */
    const handleSubmit = (formElm: ChangeEvent<HTMLFormElement>) => {
        formElm.preventDefault();
        // console.log(urlInput, titleInput, contentTextArea);
        setLoading(true);
        createArticle(urlInput, titleInput, contentTextArea);
        setLoading(false);
        router.push('/'); // top へリダイレクト
        router.refresh(); // リダイレクト処理後のクリーンアップ
    }

    return (
        <div className="min-h-screen py-8 px-4 md:px-12">
            <h2 className="text-2xl font-bold mb-4">ブログ新規作成</h2>
            <form className="bg-slate-200 p-6 rounded shadow-lg" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">URL<input value={urlInput} onInput={(inputElm: ChangeEvent<HTMLInputElement>) => setUrlInput((_prevInputElmVal) => inputElm.target.value)} type="text" className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" /></label>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">タイトル<input value={titleInput} onInput={(inputElm: ChangeEvent<HTMLInputElement>) => setTitleInput((_prevInputElmVal) => inputElm.target.value)} type="text" className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" /></label>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">本文<textarea value={contentTextArea} onInput={(textAreaElm: ChangeEvent<HTMLTextAreaElement>) => setContentTextArea((_prevTextAreaElmVal) => textAreaElm.target.value)} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" cols={30} rows={10}></textarea></label>
                </div>

                <button
                    className={`py-2 px-4 border rounded-md ${loading
                        ? "bg-orange-300 cursor-not-allowed"
                        : "bg-orange-400 hover:bg-orange-500"
                        } text-white font-semibold focus:outline-none`}
                    disabled={loading}
                >
                    作成
                </button>
            </form>
        </div>
    );
}

export default createBlogPage;