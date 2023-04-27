import Head from "next/head";

function Header({meta, name}: {meta?: string, name?: string}) {
    const description =  meta || 'Amanda Patricia Viray, aka Amazellia, codes by day and draws by night';
    const title = name || 'amanda viray | dev + art' 
    return (
    <Head>
        <meta charSet='utf-8' name='description' property='og:description' content={description}/>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>{title}</title>
    </Head>
    )
}
export default Header;