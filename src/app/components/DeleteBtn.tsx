"use client"

import { deleteArticle } from "@/blogApis";
import { useRouter } from "next/navigation";

export const DeleteBtn = ({ articleId }: { articleId: string }) => {
    const router = useRouter(); // リダイレクト処理

    /* async / await 取っている */
    const handleClickDelete = () => {
        deleteArticle(articleId);
        router.push('/'); // top へリダイレクト
        router.refresh(); // リダイレクト処理後のクリーンアップ
    }

    return (
        <button type="button" onClick={handleClickDelete} className="bg-red-500 hover:bg-red-600 rounded-md py-2 px-5">削除</button>
    );
}