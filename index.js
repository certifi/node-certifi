'use strict';
const path = require('node:path');
const fs = require('node:fs');
const crypto = require('node:crypto');

const certPath = path.join(__dirname, 'cacert.pem');

module.exports = certPath;

module.exports.read = () => fs.readFileSync(certPath, 'utf8');

module.exports.readSync = module.exports.read;

module.exports.count = () => {
    const content = fs.readFileSync(certPath, 'utf8');
    return (content.match(/-----BEGIN CERTIFICATE-----/g) || []).length;
};

module.exports.list = () => {
    const content = fs.readFileSync(certPath, 'utf8');
    const pattern = /-----BEGIN CERTIFICATE-----[\s\S]*?-----END CERTIFICATE-----/g;
    return content.match(pattern) || [];
};

module.exports.listValid = () => {
    const now = new Date();
    return module.exports.list().filter((pem) => {
        try {
            const cert = new crypto.X509Certificate(pem);
            return now >= cert.validFromDate && now <= cert.validToDate;
        } catch {
            return false;
        }
    });
};

module.exports.listExpired = () => {
    const now = new Date();
    return module.exports.list().filter((pem) => {
        try {
            const cert = new crypto.X509Certificate(pem);
            return now > cert.validToDate;
        } catch {
            return false;
        }
    });
};
