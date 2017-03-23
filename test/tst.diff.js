/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright (c) 2016, Joyent, Inc.
 */

/*
 * tst.diff.js: tests the diff() utility function
 */

var assert = require('assert');
var common = require('../lib/common');
var diff = common.diff;

var d;

assert.throws(function () { diff('test', 'testing'); });
assert.throws(function () { diff({}, {}); });
assert.throws(function () { diff(['test'], ['testing']); });
assert.throws(function () { diff(['test'], {}); });

d = diff([
	{
		id: 1
	},
	{
		id: 2
	}
], [
	{
		id: 1
	},
	{
		id: 2,
		test: true
	}
]);

/*
 * Object deleted, property moved from one object to another
 */
d = diff([
	{
		ipv4_uuid: 'f80e8030-b678-42ac-93e0-c3bcac5a976b',
		primary: true
	},
	{
		ipv4_uuid: 'c642d1df-3d72-4d51-b01d-bdc8113a2d8b'
	},
	{
		ipv4_uuid: 'test-uuid'
	}
], [
	{
		ipv4_uuid: 'f80e8030-b678-42ac-93e0-c3bcac5a976b'
	},
	{
		ipv4_uuid: 'c642d1df-3d72-4d51-b01d-bdc8113a2d8b',
		test: true
	}
], 'ipv4_uuid');

console.log(d)

assert.equal(d.total, 3);
assert.equal(d.add.length, 0);
assert.equal(d.del.length, 1);
assert.equal(d.mod.length, 2);

console.log('TEST PASSED');
