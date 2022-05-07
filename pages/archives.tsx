import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import NavBar from '../src/components/nav'
import {useEffect, useState} from 'react'
import { getDates, getTags } from '../src/api/ghostCMS'
import Link from 'next/link'
import moment from 'moment'

interface TagType {
    slug: string
    name: string
    description: string
    feature_image: any
}

const timeline = [];

function timelineSet(d) {
    d.forEach(d => {
        timeline.push(moment(d?.created_at).format('YYYY'));
    });
    const data = timeline.filter((f, index, arr) => arr.indexOf(f) == index)
    timeline.length = 0;
    data.forEach(d => {
        timeline.push(d);
    })
    //return timeline;
}
//const timelineFinal = timeline.filter((f, index, arr) => arr.indexOf(f) == index);

const Archive = () => { 
    const [tags, setTags] = useState<TagType[] | null>(null);
    const [timelineStatus, setTimelineStatus] = useState(false);
    //const [year, setYear] = React.useState<DateType[] | null>();
    // let yearSet = new Set([year])

    useEffect(() => {
		fetchData();
	},[]);

    const fetchData = () => {
        getTags().then(res=>{
			setTags(res.tags);
		}).catch(err=>console.log(err));
        getDates().then(res=>{
            timelineSet(res.dates);
            setTimelineStatus(true);
		}).catch(err=>console.log(err));
    }

    useEffect(() => {
        if (timelineStatus == false) {
            getDates().then(res=>{
                timelineSet(res.dates);
                setTimelineStatus(true);
            }).catch(err=>console.log(err));
        }
    }, []);

    return (
        <div className={styles.subContainer}>
            <Head>
                <title>amanda viray | archives</title>
            </Head>
            <NavBar/>
            
            <h1>/archives</h1>
            <p>in the depths of my mind</p>
            <p>this section is under construction</p>

            <h2>Categories</h2>

            { tags && <div className={styles.gridContainer}>
                {tags?.map((t, index) => {
                    return (
                        <li className={styles.postitem} key={t?.slug}> 
                            <Link href="/archives/[archiveSlug]" as={`/archives/${t?.slug}`}>
                                <a>{t?.name}</a>								
                            </Link>
                            <p>{t?.description}</p>
                            {!!t?.feature_image && <img src={t?.feature_image} />}
                        </li>
                    );
                })} 
            </div>}
            
            {timeline && <div>
                {timeline?.map((y, index) => {
                    return ( 
                        <h2 className={styles.postitem} key={index}> 
                            <Link href="/archives/[archiveSlug]" as={`/archives/${y}`}>
                                <a> {y}</a>								
                            </Link>
                        </h2>
                    )
                })} 
            </div>}
            
            <footer>Amanda Patricia Dorado Viray © 2022 <br/>Made with 💖 + Next.js</footer>

        </div> // End of Container
    ) 
} // end of Archive const

export default Archive