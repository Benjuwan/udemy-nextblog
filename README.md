# Udemy-NextBlog
 [【Next.js13】最新バージョンのNext.js13をマイクロブログ構築しながら基礎と本質を学ぶ講座](https://www.udemy.com/course/nextjs13_learning_with_microblog/)

## Next 14
現在（2023/12）の最新 ver は`Next 14`なので14で進めていく

- 立ち上げ時の注意
    - ターミナル1：`npx json-server src/data/posts.json --port 3001`
    - ターミナル2：`npm run dev`という立ち上げフロー

ターミナル1で json-server を立ち上げてからでないとエラーが出るので注意。


## 目次
[Next.js](#nextjs)
[メモ](#メモ)
[備忘録・所感](#備忘録・所感)

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

    - `app/page.tsx`<br />`Next 13`でいうところの`index.tsx`の役割。各ディレクトリごとに用意することで**ファイルベースルーティング**の恩恵を得られる。

    - `app/layout.tsx`<br />`Next 13`でいうところの`_documet.tsx`や`_app.tsx`の役割。`Next 14`で新たに設けられたファイルで、各ページ（ディレクトリごとの`page.tsx`）の**レイアウト情報（`meta`情報など）の管理**を担う。`layout.tsx`は入れ子も可能。

    参考記事：[Next.js 13 Template と Layout の使い分け](https://zenn.dev/cybozu_frontend/articles/8caf1decb1e82c)

- `app/page.tsx`と`use client`クライアントコンポーネントの`export`について<br />
`export default コンポーネント名;`で行う。<br />※ `app/page.tsx`についてはデフォルト（ファイル制作時）のままにしておくのが無難。

```
/* 任意のコンポーネント名を付けてもok（パスカルケースが無難）*/
const HogePage = () => {
    return (
        <> // 何らかの処理 </>
    );
}

export default HogePage;
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


### メモ
- サーバーコンポーネントでの`console.log('ログ出力')`は、ターミナルに表示される

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
    images: {
        'domains': ['source.unsplash.com']
    }
}

module.exports = nextConfig
```

- lorem{数字}<br />
`Next.js`ではコンポーネント内で`lorem30`と記述し`Tab`キーを押すと、指定した数値分のワード数（先ほどの例では30単語・ワード）でダミーテキストを生成してくれる。

- シリアライズ：文字列化すること

- ユーティリティファースト：予め用意された`CSS`クラスを`HTML`に当てるだけでスタイルを適用させていく手法