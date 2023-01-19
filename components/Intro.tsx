import AboutLinks from './SocialMedia';
import styles from '../styles/Home.module.scss'

export default function Intro() {
    return (
    <div className={styles.storyboard}>
      <div className={styles.introduction}>
      <h1>✨<span className="gradient">Hi, I&#39;m Amanda Viray!</span></h1>
        <p> 
        <b className="gradient">Digital Technologist</b> of the School of Architecture & 
          Built Environment at the <a href='https://www.newcastle.edu.au/' target='_blank' rel='noreferrer' >University of Newcastle</a>.</p>
          <p>I code, art, and solve multifaceted problems with tech. <br/>
          Let&#39;s <a href="mailto:amanda@apdv.dev">talk</a> or more <a href='about'>about me</a>!
        </p>
      </div>
      <AboutLinks/>
    </div>
    )  
}