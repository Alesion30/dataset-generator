import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <title>自動アンケート回答システム</title>

        <head prefix="og: https://ogp.me/ns#" />
        <meta property="og:url" content="https://response-survey.vercel.app/" />
        <meta property="og:title" content="自動アンケート回答システム" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
