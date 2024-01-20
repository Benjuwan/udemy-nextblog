# Udemy-NextBlog
 [【Next.js13】最新バージョンのNext.js13をマイクロブログ構築しながら基礎と本質を学ぶ講座](https://www.udemy.com/course/nextjs13_learning_with_microblog/)

 - セクション5までの進行時における立ち上げ時の注意
    - ターミナル1：`npx json-server src/data/posts.json --port 3001`
    - ターミナル2：`npm run dev`という立ち上げフロー

ターミナル1で json-server を立ち上げてからでないとエラーが出るので注意。


## Next 14
現在（2023/12）の最新 ver は`Next 14`なので14で進めていく


## 目次
[Next.js](#nextjs)<br />
[SupaBase](#supabase)<br />
[メモ](#メモ)<br />
[備忘録・所感](#備忘録・所感)<br />

### Next.js
- `Next.js`最新情報<br />[The latest Next.js news](https://nextjs.org/blog)

- Get Start<br />
[Installation](https://nextjs.org/docs/getting-started/installation)

```
npx create-next-app@latest
```

- ファイル構成（`src`ディレクトリ配下）
    - `app`ディレクトリ（配下）は原則サーバー側でレンダリングされる（サーバー側でデータ取得を行うほうがパフォーマンス的に早いため）。デフォルトでは`use server`状態。<br />
    ファイルの先頭に`use client`を記述するとクライアントコンポーネントとなる（クライアントコンポーネントでしか`State`, `Effect`などの`Hooks`が扱えない）。

    - `app/page.tsx`<br />`Next 12`でいうところの`index.tsx`の役割。各ディレクトリごとに用意することで**ファイルベースルーティング**の恩恵を得られる。

    - `app/layout.tsx`<br />`Next 12`でいうところの`_documet.tsx`や`_app.tsx`の役割。`Next 13`で新たに設けられたファイルで、各ページ（ディレクトリごとの`page.tsx`）の**レイアウト情報（`meta`情報など）の管理**を担う。`layout.tsx`は入れ子も可能。

    参考記事：[Next.js 13 Template と Layout の使い分け](https://zenn.dev/cybozu_frontend/articles/8caf1decb1e82c)

- `app/page.tsx`と`use client`クライアントコンポーネントの`export`について<br />
`export default コンポーネント名;`で行う。<br />※ `app/page.tsx`についてはデフォルト（ファイル制作時）のままにしておくのが無難。<br />
各種コンポーネント名においても**build 時にエラーが出るので命名規則はパスカルケースを守る**こと。

```
/* 任意のコンポーネント名を付けてもok（しかし build 時にエラーが出るので命名規則はパスカルケースを守ること）*/
const HogePage = () => {
    return (
        <> // 何らかの処理 </>
    );
}

export default HogePage; // パスカルケース
```

`export default コンポーネント名;`で行わないとエラーとなる（`Next.js`に怒られる）

- `SSG`, `SSR`, `ISR`はページ・コンポーネント単位で使い分けられる。

    - `SSG`（Static Site Generators）<br />静的サイト生成。`build`時に各ページ（サイト）の`html`データを生成する。既に完成度100% の状態なので、ユーザーからのリクエストに迅速にレスポンスできる。更新頻度が低い箇所に使用する（例：コーポレートサイトのアバウトページやFAQページなど**静的アセットで済む処理**）。

    - `SSR`（Server Side Rendering）<br />サーバー側で各ページ（サイト）を生成する。完成度50% くらいの状態で生成し（プリレンダリング：事前レンダリング）、ユーザーからリクエストがあると100％ の状態にしてレスポンスする。更新頻度が高い箇所に使用する（例：SNSのタイムラインやユーザープロフィールなど**動的な処理**）。

    - `ISR`（Incremental Static Regeneration）<br />`SSG`と`SSR`のハイブリッド版のようなもの。生成した各ページ（サイト）を`CDN`（自身の最寄り倉庫のようなもの）にキャッシュしており、指定した時間（`Revalidate`）に応じて更新（`SSR`のような動き）したものをユーザーにレスポンスする。<br />※指定した時間の経過後にアクセスすると更新データが表示されるという仕組みではなく、アクセス時は一旦**更新前のものが表示**され、**その後にアクセスすると更新後のものが表示**される。<br />よりリアクティブなレスポンスにしたい場合は`SWR`を使用する。

    - `fetch API`通じて各種生成方法（`SSG`, `SSR`, `ISR`）を利用できる。

    ```
    /* SSG */
    // This request should be cached until manually invalidated.
    // Similar to `getStaticProps` --- to Next 12.
    // `force-cache` is the default and can be omitted.
    fetch(URL, { cache: 'force-cache' }); // --- from Next 13 against SSG
    
    /* SSR */
    // This request should be refetched on every request.
    // Similar to `getServerSideProps` --- to Next 12.
    fetch(URL, { cache: 'no-store' }); // --- from Next 13 against SSR
    
    /* ISR */
    // This request should be cached with a lifetime of 10 seconds.
    // Similar to `getStaticProps` with the `revalidate` option --- to Next 12.
    fetch(URL, { next: { revalidate: 10 } }); // --- from Next 13 against ISR
    ```

- エラーページ（※ファイル名は`error.tsx`で固定）<br />
`app/error.tsx`という配置（フォルダ構成）にしないと機能しない。

- `not-found` / `loading` ページも**ファイル名固定（`not-found.tsx` / `loading.tsx`）は同様**だが、これらは各ディレクトリごとに配置できる。

- `Next`の方針に沿って**極力サーバーコンポーネントで扱いたい**<br />
処理（`click`, `submit`など各種イベントハンドラーの使用はクライアントコンポーネントでしか不可能）によってクライアントコンポーネントにしなくてはならない場合はコンポーネントを別途作成する（親：サーバーcom、子：クライアントcom）<br />
ただし、行いたい処理によっては`サーバー側`の処理と`クライアント側`の処理が競合して無限ループ的なエラーが生じる可能性もあるので、そういったケースを考慮する意味でもコンポーネント分けは大切。

- ファイルベースルーティング（詳細ページ）<br />
`archives/[id]`（一覧dir / 個別詳細dir）という形になり、個別詳細dir内に設けた`page.tsx`でコンポーネントの引数に`props`としてデータを受けることで各種URLを取得できる。

```
const ArticleDetails = ({ params }: { params: { id: string } }) => {
    return (
        <>
        ...JSX
        </>
    )
}

export default ArticleDetails;
```

`{ params }: { params: { id: string } }`<br />
DB内の各種データ（オブジェクト）のidプロパティから各個別ページのURLを取得

- **Next12 までの（Next13 以降でも使える）**APIの作成方法（`pages/api`）<br />
`pages/api`に`index.ts`を用意して`API`作成を行う。

- **Next13 以降の**APIの作成方法（`app/api`）<br />
`app/api`に`route.ts`を用意して`API`作成を行う（※`Next13`では以前までの`index.ts`ではなく`route.ts`に変更されたので注意）。
任意のエンドポイント名を挟みたい場合は`api/[任意のエンドポイント名]`に`route.ts`を用意する。


- `.next ディレクトリ`<br />
    - `Chat-GPT`の回答<br />
    > `.next ディレクトリ`は、`Next.js`でビルドされたアプリケーションの成果物が格納される場所です。このディレクトリ内には多くのフォルダやファイルがありますが、すべてがデプロイに必要なものではありません。一部のファイルやフォルダについて説明します。

    > `cache` フォルダ：このフォルダにはビルドプロセスのキャッシュが含まれています。これにより、再ビルド時に前回のビルド結果を再利用して高速なビルドが可能となります。デプロイには必要ありませんが、開発中のビルドパフォーマンスに影響を与えます。

    > `server` フォルダ：サーバーサイドのコード（APIルートなど）がここに格納されます。デプロイ先がサーバーサイドレンダリングをサポートしている場合に必要です。

    > `static` フォルダ：このフォルダには静的ファイルが格納されます。この中のファイルは、サーバーサイドで処理されず、そのままクライアントに提供されます。デプロイ時にはこれらの静的ファイルが含まれることがあります。

    > `pages` フォルダ：`Next.js`では、`pages`フォルダに配置されたファイルが自動的にルーティングされます。ビルド後には、このディレクトリ内の各ファイルに対応するルートが生成されます。

    > `chunks` フォルダ：コード分割（Code Splitting）によって生成された JavaScript チャンクが格納されます。これにより、ページのロード時に必要なコードのみをダウンロードできます。

    > ... その他：その他にも多くのファイルやフォルダが存在しますが、これらは主にビルドプロセスや特定の機能（モジュール、画像、CSSなど）に関連しています。デプロイ先が提供するサービスやプラットフォームによって、必要なファイルや構成が異なります。

    > デプロイする際には、通常は `.next ディレクトリ`全体をアップロードすることはせず、必要なファイルやディレクトリだけを選択してデプロイします。各デプロイ先のドキュメントを確認し、必要なものだけをデプロイするようにしましょう。

- デプロイについて<br />
- [Deploying](https://nextjs.org/docs/app/building-your-application/deploying)

- [static-html-export](https://nextjs.org/docs/app/building-your-application/deploying#static-html-export)

    - [Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

- [Vercelにデプロイしてみよう | サバイバルTypeScript](https://typescriptbook.jp/tutorials/vercel-deploy)

- [【Next.js】デプロイから考えるCSR,SSG,SSR](https://qiita.com/hinako_n/items/78abf815c73e834fb925)

- [環境変数を使ったサイトの Next / Vercel デプロイ](https://yoheiko.com/blog/vercel%E3%81%ABnext-js%E3%82%A2%E3%83%97%E3%83%AA%E3%82%92%E3%83%87%E3%83%97%E3%83%AD%E3%82%A4%E3%81%99%E3%82%8B%E6%96%B9%E6%B3%95/)


### SupaBase
[そもそも`supabase`ってなんぞや？](https://qiita.com/kaho_eng/items/8a7faf77222a599fb31c#%E3%81%9D%E3%82%82%E3%81%9D%E3%82%82supabase%E3%81%A3%E3%81%A6%E3%81%AA%E3%82%93%E3%81%9E%E3%82%84)

- `JavaScript`で使う場合<br />
`npm install @supabase/supabase-js`で`SupaBase`をインストールしておく。

- `SupaBase`のアクセスに必要な情報は`.env.local`及び`.env`ファイルに記載

- `SupaBase`で作成したテーブルデータの取得（フェッチ）方法は、`SupaBase`のダッシュボードにある「テーブル」-「（右上にある）`API Docs`」から確認可能

- `RLS`（Row Level Security）について<br />
[そもそも`RLS`とはなんぞや？](https://qiita.com/kaho_eng/items/6f9ac01d77ab198881f4#%E3%81%9D%E3%82%82%E3%81%9D%E3%82%82rls%E3%81%A8%E3%81%AF%E3%81%AA%E3%82%93%E3%81%9E%E3%82%84)

- `POST`,`PUT`などデータを取り扱う際のデータ名に注意<br />
テーブルデータ名（`body: JSON.stringify(...`）と（リクエストボディに渡す値の名前）`State`名は **【全く同じ】** にしないと機能しない。

```
const [id, setId] = useState<string>(''); // url
const [title, setTitle] = useState<string>(''); // タイトル
const [content, setContent] = useState<string>(''); // 本文
...
..
.
const API_URL = process.env.NEXT_PUBLIC_SUPABASE_API_URL;
fetch(`${API_URL}/api/create`, {
    method: "POST", // create なので POST
    headers: {
        "Content-Type": "application/json", // json 形式で扱うことを明記
    },
    body: JSON.stringify({ id, title, content }) // テーブルデータ名と（リクエストボディに渡す値の名前）State名は【全く同じ】にしないと機能しない
});
```

- 動的関数ファイル（[id].ts）で Atom（というかライブラリ？）は使えない<br />
使用しようとすると`PUT`や`DELETE`処理でサーバー接続エラー（500）が発生してしまう。


### メモ
- サーバーコンポーネントでの`console.log('ログ出力')`は、ターミナルに表示される

- 日時の表示調整<br />
    - new Date(日時に関する変数または処理結果).toLocaleString(); // yyyy/mm/dd hh:mm:ss
    - new Date(日時に関する変数または処理結果).toLocaleDateString(); // yyyy/mm/dd

- `npm`と`npx`の ver 確認<br />
`node`をインストールしていれば下記コマンドで ver 確認できる。

```
npm -v // npm の ver 確認

npx -v // npx の ver 確認

npm install -g yarn // おまけ：yarn のインストール方法
yarn -v
```

- `VS Code`の拡張機能<br />
    - [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

- 適当な画像の取得方法<br />
[Unsplash Sourceを使ってみよう！](https://bagelee.com/design/about-unsplash-source/)

- `json-server`<br />
`Firebase`や`Supabase`, `PostgreSQL`などのDB、各種サービスを用いた永続的なデータ保存・管理を行うよりも、まずは手軽にデータ保存・管理を行いたい場合に活用できる`npm`ライブラリが[`json-server`](https://www.npmjs.com/package/json-server)。

> json-server は、簡単に REST API を構築できるツールです。ローカルマシン上に JSON ファイルを置くだけで、RESTful な API を作成し、GET、POST、PUT、DELETE などの HTTP リクエストを使用してデータの取得、作成、更新、削除を行うことができます。
> json-server を使用すると、サーバーサイドのプログラミング言語やデータベースを必要とせず、フロントエンドの開発者が API の動作をテストしたり、簡単なデモアプリケーションを作成するのに便利です
> また、json-server は簡単に拡張することができ、ルーティングの設定やフック機能を利用することで、より高度な API を作成することもできます。

参考記事：[json-serverの使い方まとめ【解説】](https://qiita.com/ryome/items/36da51f0f5973eab8720)

- `json-server`の起動
    - デフォルト
    ```
    npx json-server [filePath/fileName].json --port [portNumber: ex...3001]
    ```

    - `package.json`に追記して`npm`コマンドで使用
    
    ```
    .
    ..
    "scripts": {
        "dev": "next dev",
        "build": "next build",
        "start": "next start",
        "lint": "next lint",
        + "json-server": "json-server [filePath/fileName].json --port [portNumber: ex...3001]"
    },
    ..
    .
    ```

    追記後に`json-server`を立ち上げる
    ```
    npm run json-server
    ```


### 備忘録・所感
- 内部データはフェッチできない（外部データ：API しかフェッチできない）。外部データでも`CORS`でフェッチできない場合もある。

- `next.config.js`で特定サイトからのデータやコンテンツの取得許可を与える

```
/** @type {import('next').NextConfig} */
const nextConfig = {
    // nextConfig によって、対象サイト（今回は unsplash ）からの画像データ取得許可を与える

    // The "images.domains" configuration is deprecated. Please use "images.remotePatterns" configuration instead.
    // images: {
    //     'domains': ['source.unsplash.com']
    // }
    
    images: {
        'remotePatterns': [
            {
                protocol: 'https',
                hostname: 'source.unsplash.com'
            }
        ],
    }
}

module.exports = nextConfig
```

- lorem{数字}<br />
`Next.js` / `React`ではコンポーネント内で`lorem30`と記述し`Tab`キーを押すと、指定した数値分のワード数（先ほどの例では30単語・ワード）でダミーテキストを生成してくれる。

- シリアライズ：文字列化すること

- ユーティリティファースト：予め用意された`CSS`クラスを`HTML`に当てるだけでスタイルを適用させていく手法