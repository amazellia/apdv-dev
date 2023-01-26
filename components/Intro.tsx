import AboutLinks from './SocialMedia';
import styles from '../styles/Home.module.scss'

export default function Intro() {
    return (
    <div className={styles.storyboard}>
      <div>
      <h1 className={styles.gradient}>
        AMANDA VIRAY <br/>
        DIGITAL & CREATIVE <br/>
        TECHNOLOGIST <br/>
        </h1>
      </div>
      <AboutLinks/>
    </div>
    )  
}