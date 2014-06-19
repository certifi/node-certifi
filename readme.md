# certifi [![Build Status](https://travis-ci.org/certifi/node-certifi.svg?branch=master)](https://travis-ci.org/certifi/node-certifi)

> [Certifi](http://certifi.io) is a carefully curated collection of Root Certificates for validating the trustworthiness of SSL certificates while verifying the identity of TLS hosts. It has been extracted from the Python Requests project.


## Install

```sh
$ npm install --save certifi
```


## Usage

```js
var fs = require('fs');
var https = require('https');
var certifi = require('certifi');

console.log(certifi);
//=> /User/sindresorhus/node-certifi/cacert.pem

https.createServer({
	cert: fs.readFileSync(certifi)
}, function () {});
```
