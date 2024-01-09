import { articleType } from "./types";

/* 配列で返すので articleType[] と指定（各データ要素としてなら articleType と指定で ok）*/
export const getAllArticles = async (): Promise<articleType[]> => {
    /* Next.js 13 からはトップレベルで await を使用してフェッチできる */
    const response = await fetch('http://localhost:3001/posts', { cache: "no-store" }); // json-server で指定した portNumber を末尾に指定（絶対パスでURL指定）

    if (response.status !== 200) {
        throw new Error('throw 文は式を直接投げるのに対して、throw new 文は新しいエラーオブジェクトを生成して投げることができます。通常【詳細なエラー情報】が必要な場合には throw new Error の形式がより適しています');
    }

    const resObj: articleType[] = await response.json();
    return resObj;
}