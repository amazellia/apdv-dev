import { PostType } from '../../src/api/ghostCMS'
import { getPostSlug } from '../../src/api/ghostCMS'
import Head from 'next/head'
import styles from '../../styles/Home.module.scss'
import HyvorTalk from 'hyvor-talk-react'
import moment from 'moment'
import NavBar from '../../src/components/nav'
import { useState} from 'react'
const HYVOR_ID = process.env.NEXT_PUBLIC_HYVOR_TALK_ID as number

export const getStaticProps = async ({ params }) => {
    const post = await getPostSlug(params.slug)
	return {
		props: {post},
		revalidate: 10 
	}
}

export const getStaticPaths = () => {
	return {
		paths: [],
		fallback: true,
	}
}

const Post: React.FC<{post: PostType[]}> = (props) => {
	const [enableLoadComments, setEnableLoadComments] = useState<boolean>(true)
	const {post} = props
	return (
		<div>
            <NavBar/>
			{post && 
			<>
            {post?.map((p, index) => {
                return (
                    <div className={styles.slugContainer} key={p?.slug}>
                        <Head> <title>{p?.title}</title> </Head>

                        <h1>{p?.title}</h1>
                        <p className={styles.blogdeets}>Published at {moment(p?.created_at).format('MMMM D, YYYY [●] h:mm a')}<br/>
                        {p?.reading_time} minute(s) read</p>

                        <div className={'${styles.gh-canvas} ${styles.gh-content}'} dangerouslySetInnerHTML={{ __html: p?.html }}></div>

                        <HyvorTalk.Embed websiteId={HYVOR_ID} id={p?.slug} loadMode="scroll"/>

                        <footer>Amanda Patricia Dorado Viray © 2022 <br/>Made with 💖 + Next.js</footer>
                    </div>
                )
            })}
        </>
			}
		</div>
    );   
};
export default Post
