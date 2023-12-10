import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import CookieConsent, { Cookies, resetCookieConsentValue } from "react-cookie-consent";

import Heading from '@theme/Heading';
import styles from './index.module.css';
import { userLogin } from '@site/src/api/Auth';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  function showKey(){
    console.log(document.cookie);
  }
  async function login(name, password){
    let res = await userLogin({name:name, password:password});
    if(res["state"] == "login") {
      Cookies.set('name', name);
      Cookies.set('key', res["key"]);
      window.location.href = '/helloReact';
    }else{
      alert(JSON.stringify(res));
    }
  }
  async function changeKey1(){
    login('test1', 'test2');
  }
  async function changeKey2(){
    login('MockUserName', 'MockUserPassword');
  }
  function removeKey(){
    Cookies.set('name', '');
    Cookies.set('key', '');
    resetCookieConsentValue();
  }
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            onClick={showKey}>
            ShowCookie
          </Link>
          <Link
            className="button button--secondary button--lg"
            onClick={changeKey1}>
            Wrong Username/Password
          </Link>
          <Link
            className="button button--secondary button--lg"
            onClick={changeKey2}>
            Correct Username/Password
          </Link>
          <Link
            className="button button--secondary button--lg"
            onClick={removeKey}>
            Log Out
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
      <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
    </Layout>
  );
}
