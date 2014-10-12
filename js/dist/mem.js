(function(exports, undefined){

	'use strict';


/* js/src/calloc.js */


/**
 * Method that creates an allocator from a constructor.
 */

var __calloc__ = function(Constructor) {
	return function(n) {
		return new Constructor(n);
	};
};

exports.__calloc__ = __calloc__;

/* js/src/deepcopy.js */


/**
 * Deep copy method for any object.
 * /!\ Use with caution.
 */

var deepcopy = function(object){
	var copy = (object instanceof Array) ? [] : {};
	for (i in object) {
		if (object[i] && typeof object[i] === "object") {
			copy[i] = deepcopy(object[i]);
		}
		else {
			copy[i] = object[i];
		}
	}
	return copy;
};

exports.deepcopy = deepcopy;

/* js/src/heap.js */


/**
 * /!\ INCOMPLETE
 * Heap manager backed by a buffer.
 */

var __heap__ = function (Buffer) {

	var Heap = function (n) {
		this.__buffer = new Buffer(n);
		this.__n = 1;
		this.__slo = 0;
		this.__shi = 1;
		this.__alo = 0;
		this.__ahi = 1;
		this.__size = new Uint32Array(1);
		this.__addr = new Uint32Array(1);
		this.__smap = new Uint32Array(1);
		this.__amap = new Uint32Array(1);
		this.__size[0] = n;
		this.__addr[0] = 0;
		this.__smap[0] = 0;
		this.__amap[0] = 0;
	};

	Heap.prototype.alloc = function(n) {
		var i, j;
		i = this.ssearch(n, this.__slo, this.__shi);
		this.__size[i] -= n;
		this.__addr[i] += n;
		j = this.ssearch(n, this.__slo, i);
		this.smove(i, j);
		return i;
	};

	Heap.prototype.smove = function(i, j) {
		var tmp, m, n, k;
		n = i - j;
		m = this.__shi - this.__slo - n;

		if (this.__slo > 0 && m < n) {
			--this.__slo;
			for (k = this.__slo; k < j; ++k) {
				this.__size[k] = this.__size[k+1];
				this.__smap[k] = this.__smap[k+1];
			}
			this.__size[j] = this.__size[i];
			this.__smap[j] = this.__smap[i];
			for (k = i; k < this.__shi; ++k) {
				this.__size[k] = this.__size[k+1];
				this.__smap[k] = this.__smap[k+1];
			}
			--this.__shi;
		}
		else {
			tmp = this.__size[i];
			for (k = i; k > j; --k) {
				this.__size[k] = this.__size[k-1];
			}
			this.__size[j] = tmp;

			tmp = this.__smap[i];
			for (k = i; k > j; --k) {
				this.__smap[k] = this.__smap[k-1];
			}
			this.__smap[j] = tmp;
		}

		this.__amap[this.__smap[j]] = j;

	};


	Heap.prototype.free = function(i, n) {
		var j, k, tmp, joinleft, joinright;
		j = this.asearch(i, this.__alo, this.__ahi);

		joinleft = this.__addr[j-1] + this.__size[this.__amap[j-1]] === i;
		joinright = i + n === this.__addr[j];

		if (joinleft ^ joinright) {
			if (joinleft) {
				this.__size[this.__amap[j-1]] += n;
			}
			else {
				this.__addr[j] -= n;
			}
		}
		else {
			if (joinleft) {
				this.__addr[j-1] = this.__addr[j-1];
				this.__size[y] = n + this.__size[j-1] + this.__size[j];
				this.__smap[y] = j-1;
				this.__amap[j-1] = y;
			}
			else {
				this.__addr[j] = i;
				this.__size[y] = n;
				this.__smap[y] = j;
				this.__amap[j] = y;
			}
		}

		for (k = this.__ahi; k > j; --k) {
			this.__addr[k] = this.__addr[k-1];
			this.__amap[k] = this.__amap[k-1];
		}


	};


};

exports.__heap__ = __heap__;

/* js/src/malloc.js */


/**
 * Method that allocates an ArrayBuffer.
 */

var malloc = function(n) {
	return new ArrayBuffer(n);
};

exports.malloc = malloc;

/* js/src/pool.js */


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

})(typeof exports === 'undefined' ? this['mem'] = {} : exports);
