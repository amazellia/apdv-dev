import AboutLinks from './SocialMedia';
import TypedIntro from './TypedIntro';
import styles from '../styles/Home.module.scss';
import { useEffect, useState } from 'react';
import { getStoryblokApi } from "@storyblok/react";

export default function Intro() {
  const [typedTexts, setTypedTexts] = useState({
    text1: "DIGItAL & CREATIVE\ATECHNOloGIST",
    text2: "STORY GOBBLER",
    text3: "FRUSTRATED\A ARTisT"
  });

  useEffect(() => {
    // Fetch data from Storyblok
    const getIntro = async () => {
      try {
        const storyblokApi = getStoryblokApi();
        const { data } = await storyblokApi.get('cdn/stories/home', {
          version: 'published'
        });

        if (data?.story?.content) {
          const introComponent = data.story.content.body.find((item: { component: string }) => item.component === 'intro');
          setTypedTexts({
            text1: introComponent?.header1 || typedTexts.text1,
            text2: introComponent?.header2 || typedTexts.text2,
            text3: introComponent?.header3 || typedTexts.text3
          });
        }
      } catch (error) {
        console.error('Error fetching Storyblok data:', error);
      }
    };

    getIntro();
  }, []);

  return (
    <div className={styles.storyboard}>
      <div>
        <h1 className={styles.gradient}>
          <div>AmanDA VIraY</div>
          <TypedIntro
            text1={typedTexts.text1}
            text2={typedTexts.text2}
            text3={typedTexts.text3}
          />
        </h1>
      </div>
      <AboutLinks/>
    </div>
  );
}