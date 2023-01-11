
import moment from 'moment'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import { setDates } from "../pages/api/storyblok";

const ArchivesDates = ({data}:any) => {
    const dates =  setDates(data)

    return (
    <div className={styles.DateMap} >
        {dates?.map((y:any, index:any) => {
            return ( 
            <ul key={index}> 
            <li key={y.year}> <h2>
                <Link href="/archives/[archives]" as={`/archives/${y.year}`}>
                {y.year}						
                </Link>
            </h2></li>
            {y.months.map( (y:any) => {
            return (
            <li key={y}> <h3>
                <Link href="/archives/[archives]" as={`/archives/${y}`}>
                {moment(y).format('MMM')}						
                </Link>
            </h3> </li>
            )
            })}  
            </ul>
            )
        })} 
    </div>
    )
  };
    
  export default ArchivesDates;
