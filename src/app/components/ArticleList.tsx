import Link from "next/link";
import Image from "next/image"; // Next が用意している img 用コンポーネント
import { articleType } from "@/types";

export const ArticleList = ({ articles }: { articles: articleType[] }) => {
    return (
        <div>
            {articles.map((article, i) => (
                <article key={article.id} className="flex flex-col shadow my-4 text-slate-900">
                    {/*【App Router】articles ディレクトリ内なので下記指定 */}
                    <Link href={`articles/${article.id}`} className="hover:opacity-75">
                        <Image
                            src="https://source.unsplash.com/collection/1346951/1000x500?sig=1" // sig=数値：数値の変更で画像変更
                            alt=""
                            width={1280}
                            height={300}
                        />
                    </Link>
                    <div className="bg-white flex flex-col justify-start p-6">
                        <Link
                            href="#"
                            className="text-blue-700 text-sm font-bold uppercase pb-4"
                        >
                            Technology
                        </Link>
                        <Link href={`articles/${article.id}`} className="text-3xl font-bold hover:text-gray-700 pb-4">
                            {article.title}
                        </Link>
                        <p className="text-sm pb-3">Published on {article.createdAt}</p>
                        <Link href={`articles/${article.id}`} className="pb-6">
                            {article.content}
                        </Link>
                        <Link href={`articles/${article.id}`} className="uppercase text-pink-800 hover:text-black">
                            続きを読む<i className="fas fa-arrow-right"></i>
                        </Link>
                    </div>
                </article>
            ))}

            {/* {articles.map((article: Article) => (
                <ArticleCard key={article.id} article={article} />
            ))} */}

            {/* <ArticleCard />
            <ArticleCard />
            <ArticleCard /> */}
        </div>
    );
}