'use strict';
const fs = require('node:fs');
const path = require('node:path');
const https = require('node:https');

const certPath = path.join(__dirname, 'cacert.pem');
const sourceUrl = 'https://curl.se/ca/cacert.pem';

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
}

async function update() {
    console.log('Downloading latest CA bundle from Mozilla...');
    try {
        await download(sourceUrl, certPath);
        const content = fs.readFileSync(certPath, 'utf8');
        const count = (content.match(/-----BEGIN CERTIFICATE-----/g) || []).length;
        console.log(`Done. ${count} certificates saved to ${certPath}`);
    } catch (err) {
        console.error('Update failed:', err.message);
        process.exit(1);
    }
}

update();
