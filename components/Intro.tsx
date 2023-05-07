import AboutLinks from './SocialMedia';
import styles from '../styles/Home.module.scss'

export default function Intro() {
    return (<>
    <div className={styles.introSection}>
      <div>
        <h1 className={styles.gradient} >
          AMANDA VIRAY <br/>
          DIGITAL & CREATIVE <br/>
          TECHNOLOGIST <br/>
        </h1>
      </div>
      <AboutLinks/>
    </div>
    <div className={styles.fullscreen_section}>
      <div className={styles.containerAbout}>
      <h2 className={styles.gradient}>About</h2>
      <h3>✨ Hi, I'm Amanda!</h3>
      <p>
        
        I thrive in experimenting possibilities to harmonise code, art, and emerging technologies while striving for quality and bridging the digital gap. 
        Currently the Digital Technologist at the School of Architecture and Built Environment, University of Newcastle, Australia. <br/>
        You can view my work experiences in 
        <a href="https://www.linkedin.com/in/apdv" aria-label='LinkedIn'> LinkedIn </a> 
        or let's chat 
        <a  href="mailto:amanda@apdv.dev" aria-label='E-mail'> here</a>.
      </p>
      </div>
    </div>
    </>)  
}