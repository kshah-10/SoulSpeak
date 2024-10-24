// pages/_app.js
import { useEffect } from 'react';
import Router from 'next/router';
import Script from 'next/script';

const GA_TRACKING_ID = 'G-35LQ2MFZLS'; // Your Google Analytics ID

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
      });
    };

    Router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <>
      {/* Google Analytics script */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}');
        `}
      </Script>
      
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
