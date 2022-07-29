import styles from '/styles/Home.module.scss'
import Link from 'next/link'
import moment from 'moment'
import Pagination from "@material-ui/lab/Pagination";
import { PostType } from '../api/ghostCMS';
import Image from 'next/image';
 
export default function postCards(posts: PostType[], page?:number, totalPages?:number, onPageChange?) { 
return (
        <div className={styles.worksContainer}>
            <div className={styles.gridContainer}> 
                {posts?.map((p, index) => {
                    return (
                        <li className={styles.postitem} key={p?.slug}>
                            {!!p?.feature_image && 
                            <Link href="/post/[slug]" as={`/post/${p?.slug}`}>
                                <a><Image src={p?.feature_image} layout='fill' objectFit='cover' objectPosition='center center' quality={70}/></a>
                            </Link>}
                            <div className='postTitle'>
                                <a>{p?.title}</a>
                                <p>{moment(p?.created_at).format('MMMM DD, YYYY')}</p>
                                {/**p?.custom_excerpt**/}
                            </div>
                        </li>
                    )
                })}
            </div>

            { onPageChange &&
            <Pagination
            //className="my-3"
            count={totalPages}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            onChange={onPageChange}
          	/>}
              
        </div>
        
    );    
};
