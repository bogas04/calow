import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "../components/ui";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
