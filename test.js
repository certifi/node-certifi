'use strict';
var assert = require('assert');
var certifi = require('./');

it('should return the path to the cert', function () {
	assert(certifi.indexOf('cacert.pem') !== -1);
});
