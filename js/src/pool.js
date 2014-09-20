

/**
 * Pool containing objects of a single type.
 */

var __pool__ = function (Constructor, init) {

	var Pool = function () {
		this.__pool = [];
	};

	Pool.prototype.collect = function () {
		this.__pool = [];
	};

	Pool.prototype.alloc = function () {
		if (this.__pool.length > 0) {
			return this.__pool.pop();
		}
		else {
			return new Constructor();
		}
	};

	Pool.prototype.free = function (object) {
		this.__pool.push(object);
	};

	return Pool;

};

exports.__pool__ = __pool__;
