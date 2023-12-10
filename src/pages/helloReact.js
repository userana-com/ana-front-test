import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import { Cookies } from "react-cookie-consent";

import { userConfirm } from '@site/src/api/Auth';
import { getData } from '@site/src/api/Data';

export default function Hello() {

  useEffect(() => {
    async function checkUserConfirm() {
      let name = Cookies.get('name');
      let key = Cookies.get('key');
      let res = await userConfirm({name:name, key:key});
      console.log(res);
      if(res["state"] != "login"){
        window.location.href = '/';
      }
    }
    checkUserConfirm();
  }, []);

  async function loadSomething() {
    let name = Cookies.get('name');
    let key = Cookies.get('key');
    let reqUser = {name:name, key:key};
    let reqData = {type:"org", user:"wei"};
    let res = await getData({user:reqUser, data:reqData});
    console.log(res);
  }


  return (
    <Layout title="Hello" description="Hello React Page">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          fontSize: '20px',
        }}>
        <p>
          Edit <code>pages/helloReact.js</code> and save to reload.
        </p>
      </div>
      <span
        style={{
          backgroundColor: '#25c2a0',
          borderRadius: '20px',
          color: '#fff',
          padding: '10px',
          cursor: 'pointer',
        }}
        onClick={loadSomething}>
        Try Load Something!
      </span>
    </Layout>
  );
}