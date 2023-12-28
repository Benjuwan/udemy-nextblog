# Udemy-NextBlog
 [【Next.js13】最新バージョンのNext.js13をマイクロブログ構築しながら基礎と本質を学ぶ講座](https://www.udemy.com/course/nextjs13_learning_with_microblog/)

## Next 14
現在（2023/12）の最新 ver は`Next 14`なので14で進めていく

### メモ
- `VS Code`の拡張機能<br />
    - [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

- `SSG`, `SSR`, `ISR`はページ・コンポーネント単位で使い分けられる。

    - `SSG`（Static Site Generators）<br />静的サイト生成。`build`時に各ページ（サイト）の`html`データを生成する。既に完成度100% の状態なので、ユーザーからのリクエストに迅速にレスポンスできる。更新頻度が低い箇所に使用する（例：コーポレートサイトのアバウトページやFAQページなど）。

    - `SSR`（Server Side Rendering）<br />サーバー側で各ページ（サイト）を生成する。完成度50% くらいの状態で生成し（プリレンダリング：事前レンダリング）、ユーザーからリクエストがあると100％ の状態にしてレスポンスする。更新頻度が高い箇所に使用する（例：SNSのタイムラインやユーザープロフィールなど）。

    - `ISR`（Incremental Static Regeneration）<br />`SSG`と`SSR`のハイブリッド版のようなもの。生成した各ページ（サイト）を`CDN`（自身の最寄り倉庫のようなもの）にキャッシュしており、指定した時間（`Revalidate`）に応じて更新（`SSR`のような動き）したものをユーザーにレスポンスする。<br />※指定した時間の経過後にアクセスすると更新データが表示されるという仕組みではなく、アクセス時は一旦**更新前のものが表示**され、**その後にアクセスすると更新後のものが表示**される。<br />よりリアクティブなレスポンスにしたい場合は`SWR`を使用する。

    - `fetch API`通じて各種生成方法（`SSG`, `SSR`, `ISR`）を利用できる。

    ```
    /* SSG */
    // This request should be cached until manually invalidated.
    // Similar to `getStaticProps` in Next 13.
    // `force-cache` is the default and can be omitted.
    fetch(URL, { cache: 'force-cache' });
    
    /* SSR */
    // This request should be refetched on every request.
    // Similar to `getServerSideProps` in Next 13.
    fetch(URL, { cache: 'no-store' });
    
    /* ISR */
    // This request should be cached with a lifetime of 10 seconds.
    // Similar to `getStaticProps` with the `revalidate` option in Next 13.
    fetch(URL, { next: { revalidate: 10 } });
    ```

- `npm`と`npx`の ver 確認<br />
`node`をインストールしていれば下記コマンドで ver 確認できる。

```
npm -v // npm の ver 確認

npx -v // npx の ver 確認

npm install -g yarn // おまけ：yarn のインストール方法
yarn -v
```

- 適当な画像の取得方法<br />
[Unsplash Sourceを使ってみよう！](https://bagelee.com/design/about-unsplash-source/)

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

    - `app/layout.tsx`<br />`Next 13`でいうところの`_documet.tsx`や`_app.tsx`の役割。`Next 14`で新たに設けられたファイルで、各ページ（ディレクトリごとの`page.tsx`）の**レイアウト情報（`meta`情報など）の管理**を担う。

- `page.tsx`ファイルの`export`は`export default コンポーネント名;`で行う<br />

```
/* 任意のコンポーネント名を付けてもok（パスカルケースが無難）*/
const HogePage = () => {
    return (
        <> // 何らかの処理 </>
    );
}

export default HogePage;
```

`export default コンポーネント名;`で行わないとエラーとなる（`Next.js`に怒られる）。


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