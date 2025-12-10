import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const Giscus = () => {
  const router = useRouter();
  const giscusRef = useRef<HTMLDivElement>(null);
  const isMountedRef = useRef(false);

  const loadGiscus = () => {
    if (!giscusRef.current) return;

    // Clean up any existing giscus content
    giscusRef.current.innerHTML = '';

    // Remove existing script to force reload
    const existingScript = document.querySelector('script[src*="giscus.app/client.js"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Set data attributes on the giscus div before script loads
    if (giscusRef.current) {
      giscusRef.current.setAttribute('data-repo', 'amazellia/apdv-dev');
      giscusRef.current.setAttribute('data-repo-id', 'MDEwOlJlcG9zaXRvcnkzNTA3MDk4NDc=');
      giscusRef.current.setAttribute('data-category', 'Announcements');
      giscusRef.current.setAttribute('data-category-id', 'DIC_kwDOFOdoV84Cznrh');
      giscusRef.current.setAttribute('data-mapping', 'pathname');
      giscusRef.current.setAttribute('data-strict', '0');
      giscusRef.current.setAttribute('data-reactions-enabled', '1');
      giscusRef.current.setAttribute('data-emit-metadata', '0');
      giscusRef.current.setAttribute('data-input-position', 'top');
      giscusRef.current.setAttribute('data-theme', 'catppuccin_mocha');
      giscusRef.current.setAttribute('data-lang', 'en');
      giscusRef.current.setAttribute('data-loading', 'lazy');
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

    // Append script to body so it auto-detects the giscus div
    document.body.appendChild(script);
  };

  useEffect(() => {
    // Initial load
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      loadGiscus();
    }

    // Handle route changes
    const handleRouteChange = () => {
      // Small delay to ensure route change is complete
      setTimeout(() => {
        loadGiscus();
      }, 100);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  // Also reload when asPath changes (for immediate updates)
  useEffect(() => {
    if (isMountedRef.current) {
      loadGiscus();
    }
  }, [router.asPath]);

  return (
    <div className="giscus-wrapper">
      <div ref={giscusRef} className="giscus" />
    </div>
  );
};

export default Giscus;

