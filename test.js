import test from 'ava';
import m from '.';

test('returns the path to the certificate', t => {
    t.true(m.includes('cacert.pem'));
});

test('reads the certificate bundle as a string', t => {
    const content = m.read();
    t.true(content.includes('-----BEGIN CERTIFICATE-----'));
});

test('counts certificates in the bundle', t => {
    const count = m.count();
    t.true(count > 0);
});

test('lists certificates as an array', t => {
    const certs = m.list();
    t.true(Array.isArray(certs));
    t.is(certs.length, m.count());
});

test('filters valid certificates', t => {
    const valid = m.listValid();
    t.true(Array.isArray(valid));
    t.true(valid.every(pem => pem.includes('-----BEGIN CERTIFICATE-----')));
});

test('filters expired certificates', t => {
    const expired = m.listExpired();
    t.true(Array.isArray(expired));
});
