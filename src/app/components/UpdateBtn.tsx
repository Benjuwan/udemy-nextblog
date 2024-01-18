"use client"

import { FC } from "react";
import { useRouter } from "next/navigation";

/* 状態管理ライブラリ：Jotai */
import { updateContent, updateTitle } from "@/ts/atom";
import { useAtom } from "jotai";

type updateBtnPropsType = {
    articleId: string;
    edit: boolean;
    changeEditMode: () => void;
}

export const UpdateBtn: FC<updateBtnPropsType> = ({ articleId, edit, changeEditMode }) => {
    const router = useRouter(); // リダイレクト処理

    /* Jotai */
    const [updateTitleState] = useAtom(updateTitle);
    const [updateContentState] = useAtom(updateContent);

    /* async / await 取っている */
    const handleClickUpdate = () => {
        const id = articleId;
        const title: string = updateTitleState;
        const content: string = updateContentState;

        const API_URL = process.env.NEXT_PUBLIC_SUPABASE_API_URL;
        fetch(`${API_URL}/api/${articleId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, title, content }) // テーブルデータ名と（リクエストボディに渡す値の名前）State名は【全く同じ】にしないと機能しない
        });

        router.push('/'); // top へリダイレクト
        router.refresh(); // リダイレクト処理後のクリーンアップ
    }

    return (
        <>
            {edit &&
                <button type="button" onClick={handleClickUpdate} className="bg-blue-500 hover:bg-blue-600 rounded-md py-2 px-5">更新</button>
            }
            <button type="button" onClick={changeEditMode} className={`bg-green-500 hover:bg-green-600 rounded-md py-2 px-5 ${edit && 'ml-10'}`}>{edit ? 'やめる' : '編集'}</button>
        </>
    );
}