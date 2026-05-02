import AboutLinks from './SocialMedia';
import StarField from './StarField';
import styles from '../styles/Home.module.scss';

export default function Intro() {
  return (
    <div className={styles.landingSection}>
      <StarField />
      <AboutLinks />
    </div>
  );
}
