import AboutLinks from './SocialMedia';
import styles from '../styles/Home.module.scss'

export default function Intro() {
    return (<>
    <div className={styles.storyboard}>
      <div>
        <h1 className={styles.gradient} >
          AmanDA VIraY
          <div className={styles.input_wrapper}>
            <span className={styles.placeholder}></span>
          </div>
        </h1>
      </div>
      <AboutLinks/>
    </div>
    </>)  
}