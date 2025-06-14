import { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import styles from '../styles/Home.module.scss';

interface TypedIntroProps {
  text1: string;
  text2: string;
  text3: string;
}

export default function TypedIntro({ text1, text2, text3 }: TypedIntroProps) {
  const el = useRef(null);

  useEffect(() => {
    // Process text to handle special characters and line breaks
    const processText = (text: string) => {
      return text
        .replace('\\A', '\n')
        .replace('&', '&amp;')
        .replace(/[<>]/g, char => `&${char === '<' ? 'lt' : 'gt'};`);
    };

    const typed = new Typed(el.current, {
      strings: [
        processText(text1),
        processText(text2),
        processText(text3)
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      cursorChar: '|',
      showCursor: true,
      startDelay: 0,
      smartBackspace: true,
      fadeOut: false,
      fadeOutClass: 'typed-fade-out',
      fadeOutDelay: 500,
      autoInsertCss: true,
      preStringTyped: () => {
        if (el.current) {
          (el.current as HTMLElement).style.display = 'inline-block';
        }
      },
    });

    return () => {
      typed.destroy();
    };
  }, [text1, text2, text3]);

  return (
    <div className={styles.input_wrapper}>
      <div ref={el} className={styles.placeholder}></div>
    </div>
  );
} 