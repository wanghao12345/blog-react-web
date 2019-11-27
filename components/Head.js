import React, {Component} from 'react';
import Head from 'next/head';
import config from '../config/head'
const MyHead = ()=>(
  <Head>
    <meta charSet="utf-8"/>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" key="viewport" />
    <meta name="renderer" content="webkit"/>
    <meta name="Keywords" content={config.keyWords}/>
    <meta name="Description" content={config.description}/>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.23.6/antd.min.css" rel="stylesheet"/>
    <link rel='shortcut icon' type='image/x-icon' href={config.favicon} />
    <title>{config.websiteTitle}</title>
  </Head>
)
export default MyHead
