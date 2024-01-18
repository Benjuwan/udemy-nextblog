"use client"

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { articleType } from "@/types";
import { UpdateBtn } from "@/app/components/UpdateBtn";

/* 状態管理ライブラリ：Jotai */
import { useAtom } from "jotai";
import { updateContent, updateTitle } from "@/ts/atom";

export const PageItem = ({ article }: { article: articleType }) => {
    const [edit, setEdit] = useState<boolean>(false);
    const changeEditMode: () => void = () => setEdit(!edit);

    /* Jotai */
    const [title, setTitle] = useAtom(updateTitle); // タイトル
    const [content, setContent] = useAtom(updateContent); // 本文

    return (
        <>
            <Image
                src={`https://source.unsplash.com/collection/1346951/1000x500?sig=${article.id}`} // sig=数値：数値の変更で画像変更
                alt=""
                width={640}
                height={300}
            />
            {edit ?
                <>
                    <div className="text-slate-900 text-center mb-10 mt-10">
                        <input type="text" style={{ 'width': '100%' }} value={title} onInput={(titleElm: ChangeEvent<HTMLInputElement>) => setTitle((_prevTitle) => titleElm.target.value)} />
                    </div>
                    <div className="text-lg leading-relaxed text-justify mb-10">
                        <textarea value={content} onInput={(textAreaElm: ChangeEvent<HTMLTextAreaElement>) => setContent((_prevTextAreaElmVal) => textAreaElm.target.value)} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" cols={30} rows={10}></textarea>
                    </div>
                </> :
                <>
                    <h1 className="text-4xl text-center mb-10 mt-10">{article.title}</h1>
                    <div className="text-lg leading-relaxed text-justify mb-10">
                        <p>{article.content}</p>
                    </div>
                </>

            }
            <UpdateBtn
                articleId={article.id}
                edit={edit}
                changeEditMode={changeEditMode}
            />
        </>
    );
}