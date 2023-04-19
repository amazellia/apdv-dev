import styles from '/styles/Home.module.scss'
import Link from "next/link";

 const SubButton = () => {
   return (
     <>
      <div className={styles.seeMoreButton} > 
      <Link href="https://dashboard.mailerlite.com/forms/406995/85796975888303772/share"><button>
            Subscribe
        </button></Link>
      </div>
     </>
   );
 };
 export default SubButton;
