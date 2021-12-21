import React, { ReactElement } from "react";
import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentInitialProps,
    DocumentContext,
} from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);

        return initialProps;
    }
    render(): ReactElement {
        return (
            <Html lang="en">
                <Head>
                    <link
                        rel="preload"
                        href="/fonts/PlayfairDisplay-Bold.ttf"
                        as="font"
                        crossOrigin="anonymous"
                    />
                    <link
                        rel="preload"
                        href="/fonts/PlayfairDisplay-Regular.ttf"
                        as="font"
                        crossOrigin="anonymous"
                    />
                    <link
                        rel="preload"
                        href="/fonts/PlayfairDisplay-SemiBold.ttf"
                        as="font"
                        crossOrigin="anonymous"
                    />
                </Head>
                <body>
                    <Main></Main>
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
