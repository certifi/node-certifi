import test from 'ava';
import m from '.';

test('returns the path to the certificate', t => {
	t.true(m.includes('cacert.pem'));
});
