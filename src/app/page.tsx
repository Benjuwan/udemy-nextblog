import Link from 'next/link'
import { ArticleList } from './components/ArticleList'

export default function Home() {
  const benjuwan_defaultAnkerStyle:object = {
    "color": "skyblue",
    "textDecoration": "underLine"
  }

  return (
    <div className="md:flex">
      <section className="w-full md:w-2/3 flex flex-col items-center px-3">
        {/* section 要素は（親の）width に対して 2/3 の範囲を占有 */}
        <ArticleList />
      </section>

      <aside className="w-full md:w-2/3 flex flex-col items-center px-3">
        {/* aside 要素は（親の）width に対して 1/3 の範囲を占有 */}
        <div className="bg-white shadow-md rounded p-4 mb-6 mt-4">
          <h3 className="font-bold text-gray-900 mb-2">About Me</h3>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
          </p>
        </div>
        <div className="bg-white shadow-md rounded p-4 mb-6 mt-4 w-full">
          <h3 className="font-bold text-gray-900 mb-2">Category</h3>
          <ul className="text-gray-600 mt-2">
            <li>
              <a href="#">Technology</a>
              <p hidden>Technology ディレクトリを設けて（ページを作って）、当該 page.tsx で Technology をエンドポイントにフェッチして、当該カテゴリーのデータを取得して反映させる？</p>
            </li>
            <li>
              <a href="#">Automotive</a>
            </li>
            <li>
              <a href="#">Finance</a>
            </li>
            <li>
              <a href="#">Sports</a>
            </li>
          </ul>
        </div>
        <Link href="/articles" style={benjuwan_defaultAnkerStyle}>to Articles Page</Link>
      </aside>
    </div>
  )
}
