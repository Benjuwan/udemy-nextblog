import { getDetailArticle } from "@/blogApis";
import Image from "next/image";
import Link from "next/link";
import { DeleteBtn } from "../../components/DeleteBtn"; // クライアントコンポーネント

const ArticleDetails = async ({ params }: { params: { id: string } }) => {
    const detailArticle = await getDetailArticle(params.id); // サーバーコンポーネントなのでトップレベル await が使用可能（コンポーネント名に async 付与必要）

    return (
        <div className="max-w-3xl mx-auto p-5">
            <p hidden>ArticleDetails：{params.id}</p>
            <Image
                src={`https://source.unsplash.com/collection/1346951/1000x500?sig=${params.id}`} // sig=数値：数値の変更で画像変更
                alt=""
                width={640}
                height={300}
            />
            <h1 className="text-4xl text-center mb-10 mt-10">{detailArticle.title}</h1>
            <div className="text-lg leading-relaxed text-justify">
                <p>{detailArticle.content}</p>
            </div>
            <DeleteBtn articleId={params.id} />
            <Link href='/' className="block pt-8">to TOP</Link>
        </div>
    )
}

export default ArticleDetails;