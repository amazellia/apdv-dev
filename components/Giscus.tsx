import { useEffect } from 'react';

const Giscus = () => {
  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector('script[src*="giscus.app/client.js"]');
    if (existingScript) {
      return;
    }

    // Create and inject the script tag
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'amazellia/apdv-dev');
    script.setAttribute('data-repo-id', 'MDEwOlJlcG9zaXRvcnkzNTA3MDk4NDc=');
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'DIC_kwDOFOdoV84Cznrh');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'catppuccin_mocha');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('data-loading', 'lazy');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    document.body.appendChild(script);
  }, []);

  return (
    <div className="giscus-wrapper">
      <div className="giscus" />
    </div>
  );
};

export default Giscus;

