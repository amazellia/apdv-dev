import styles from '/styles/Home.module.scss'
import Link from 'next/link'
import moment from 'moment'
import Pagination from "@material-ui/lab/Pagination";
import { PostType } from '../api/ghostCMS';

//const postCards = (props: PostType[] , page?, totalPages?, onPageChange?) => {
export default function postCards(posts?, page?, totalPages?, onPageChange?) { 
return (
        <div className={styles.worksContainer}>
            <div className={styles.gridContainer}> {/**className={styles.gridContainer} */}
                {posts?.map((p, index) => {
                    return (
                        <li className={styles.postitem} key={p?.slug}> {/**className={styles.postitem} */}
                            <Link href="/post/[slug]" as={`/post/${p?.slug}`}>
                                <a>{p?.title}</a>								
                            </Link>
                            <p>{moment(p?.created_at).format('MMMM D, YYYY [●] h:mm a')}</p>
                            <p>{p?.custom_excerpt}</p>
                            {!!p?.feature_image && <img src={p?.feature_image} />}
                        </li>
                    )
                })}
            </div>

            <Pagination
            //className="my-3"
            count={totalPages}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            onChange={onPageChange}
          	/>
              
        </div>
        
    );    
};

//export default postCards;
// export default () => (
//     <pre>Header</pre>
//   )