import Link from "next/link";
import Image from "next/image"; // Next が用意している img 用コンポーネント

export const ArticleList = () => {
    return (
        <div>
            <article className="flex flex-col shadow my-4 text-slate-900">
                <Link href="#" className="hover:opacity-75">
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
                    <Link href="#" className="text-3xl font-bold hover:text-gray-700 pb-4">
                        Lorem Ipsum Dolor Sit Amet Dolor Sit Amet
                    </Link>
                    <p className="text-sm pb-3">Published on April 25th, 2020</p>
                    <Link href="#" className="pb-6">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur consequuntur perferendis excepturi laudantium autem ipsum?
                    </Link>
                    <Link href="#" className="uppercase text-pink-800 hover:text-black">
                        続きを読む<i className="fas fa-arrow-right"></i>
                    </Link>
                </div>
            </article>
            <article className="flex flex-col shadow my-4 text-slate-900">
                <Link href="#" className="hover:opacity-75">
                    <Image
                        src="https://source.unsplash.com/collection/1346951/1000x500?sig=8" // sig=数値：数値の変更で画像変更
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
                    <Link href="#" className="text-3xl font-bold hover:text-gray-700 pb-4">
                        Lorem Ipsum Dolor Sit Amet Dolor Sit Amet
                    </Link>
                    <p className="text-sm pb-3">Published on April 25th, 2020</p>
                    <Link href="#" className="pb-6">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur consequuntur perferendis excepturi laudantium autem ipsum?
                    </Link>
                    <Link href="#" className="uppercase text-pink-800 hover:text-black">
                        続きを読む<i className="fas fa-arrow-right"></i>
                    </Link>
                </div>
            </article>

            {/* {articles.map((article: Article) => (
                <ArticleCard key={article.id} article={article} />
            ))} */}

            {/* <ArticleCard />
            <ArticleCard />
            <ArticleCard /> */}
        </div>
    );
}