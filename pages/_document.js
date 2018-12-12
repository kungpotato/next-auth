import Document, {Head, Main, NextScript} from "next/document"
import {getServerSideToken, getUserScript} from "../lib/auth"

export default class MyDocument extends Document {

    static async getInitailPorps(ctx) {
        const props = await Document.getInitialProps(ctx)
        const userData = await getServerSideToken(ctx.req)

        return { ...props, ...userData }
    }

    render() {
        const {user={}} = this.props

        return (
            <html>
                <Head/>
                <script dangerouslySetInnerHTML={{__html: getUserScript(user)}}/>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </html>
        )
    }
}