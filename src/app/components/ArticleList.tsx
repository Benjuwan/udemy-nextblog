import { articleType } from "@/types";
import { ArticleCard } from "./ArticleCard";

export const ArticleList = ({ articles }: { articles: articleType[] }) => {
    return <div>{articles.map(article => <ArticleCard article={article} key={article.id} />)}</div>
}