# certifi [![Build Status](https://travis-ci.org/certifi/node-certifi.svg?branch=master)](https://travis-ci.org/certifi/node-certifi)

> [Certifi](https://certifi.io) is a carefully curated collection of Root Certificates for validating the trustworthiness of SSL certificates while verifying the identity of TLS hosts. It has been extracted from the Python Requests project.


## Install

```
$ npm install certifi
```


## Usage

```js
const fs = require('fs');
const https = require('https');
const certifi = require('certifi');

console.log(certifi);
//=> '/User/sindresorhus/node-certifi/cacert.pem'

https.createServer({
	cert: fs.readFileSync(certifi)
}, () => {});
```
