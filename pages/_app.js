import React, { Fragment, useEffect } from 'react';
import { Navigation } from '../containers';
import GlobalStyle from '../styles/Globals';
import Head from 'next/head';
import GoogleFonts from 'next-google-fonts';
import { DefaultSeo, SocialProfileJsonLd } from 'next-seo';
import SEO from '../next-seo.config';
import PropTypes from 'prop-types';
import { WLProvider } from '../context/WLContext';
import 'simplebar/dist/simplebar.min.css';
import { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';
import '../utils';
function App({ Component, pageProps }) {
  const router = useRouter();

  const HandleKeyTab = (e) => {
    // For Tab browsing
    const Class = 'user-is-tabbing';
    const ClassExist = document.body.classList.contains(Class);
    if (e.keyCode === 9 && e.key === 'Tab') {
      document.body.classList.add(Class);
    } else {
      if (ClassExist) document.body.classList.remove(Class);
    }
  };

  useEffect(() => {
    document.documentElement.lang = 'en';
    window.addEventListener('keydown', HandleKeyTab);
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <Fragment>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" />
      <GlobalStyle />
      <DefaultSeo {...SEO} />
      <SocialProfileJsonLd
        type="WebPage"
        name="DevRev Morocco"
        url="https://devrev.ma/"
        sameAs={[
          'https://www.facebook.com/devrevmorocco/',
          'https://www.youtube.com/channel/UCohUHFN_a54IJz2qVSEgf4g',
          'https://www.instagram.com/devrevmorocco/',
          'https://twitter.com/devrevmorocco',
          'https://twitch.com/devrevmorocco'
        ]}
      />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/static/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link
          rel="mask-icon"
          href="/static/favicons/safari-pinned-tab.svg"
          color="#2f2f2f"
        />
        <meta name="msapplication-TileColor" content="#2f2f2f" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <WLProvider>
        <Navigation />
        <Component {...pageProps} />
      </WLProvider>
    </Fragment>
  );
}

App.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object
};

const FixNum = (num) => Number((num / 1000).toFixed(6));

export function reportWebVitals(metric) {
  switch (metric.name) {
    case 'FCP':
      console.log('First Contentful Paint (s): ', FixNum(metric.startTime));
      break;
    case 'LCP':
      console.log('Largest Contentful Paint (s): ', FixNum(metric.startTime));
      break;
    case 'CLS':
      console.log('Cumulative Layout Shift (s): ', FixNum(metric.startTime));
      break;
    case 'FID':
      console.log('First Input Delay (s): ', FixNum(metric.startTime));
      break;
    case 'TTFB':
      console.log('Time to First Byte (s): ', FixNum(metric.startTime));
      break;
    case 'Next.js-hydration':
      console.log('Next.js hydration (s): ', FixNum(metric.startTime));
      break;
    default:
      console.log(`${metric.name} (S)`, FixNum(metric.startTime));
      break;
  }
}

export default App;
