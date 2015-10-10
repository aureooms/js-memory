"use strict";

(function () {

	'use strict';

	var definition = function definition(exports, undefined) {

		/* js/src/calloc.js */

		/**
   * Method that creates an allocator from an array constructor.
   */

		var _calloc = function _calloc(ArrayConstructor) {
			return function (n) {
				return new ArrayConstructor(n);
			};
		};

		exports._calloc = _calloc;

		/* js/src/heap.js */

		/**
   * /!\ INCOMPLETE
   * Heap manager backed by a buffer.
   */

		var heap = function heap(Buffer) {

			/**
    * The *s* prefix in members and methods stands for size.
    * The *a* prefix in members and methods stands for address.
    */

			var Heap = function Heap(n) {
				this.buffer = new Buffer(n);
				this.n = 1;
				this.slo = 0;
				this.shi = 1;
				this.alo = 0;
				this.ahi = 1;
				this.size = new Uint32Array(1);
				this.addr = new Uint32Array(1);
				this.smap = new Uint32Array(1);
				this.amap = new Uint32Array(1);
				this.size[0] = n;
				this.addr[0] = 0;
				this.smap[0] = 0;
				this.amap[0] = 0;
			};

			Heap.prototype.alloc = function (n) {

				var i, j;

				i = this.ssearch(n, this.slo, this.shi);
				this.size[i] -= n;
				this.addr[i] += n;
				j = this.ssearch(n, this.slo, i);
				this.smove(i, j);
				return i;
			};

			Heap.prototype.smove = function (i, j) {
				var tmp, m, n, k;
				n = i - j;
				m = this.shi - this.slo - n;

				if (this.slo > 0 && m < n) {
					--this.slo;
					for (k = this.slo; k < j; ++k) {
						this.size[k] = this.size[k + 1];
						this.smap[k] = this.smap[k + 1];
					}
					this.size[j] = this.size[i];
					this.smap[j] = this.smap[i];
					for (k = i; k < this.shi; ++k) {
						this.size[k] = this.size[k + 1];
						this.smap[k] = this.smap[k + 1];
					}
					--this.shi;
				} else {
					tmp = this.size[i];
					for (k = i; k > j; --k) {
						this.size[k] = this.size[k - 1];
					}
					this.size[j] = tmp;

					tmp = this.smap[i];
					for (k = i; k > j; --k) {
						this.smap[k] = this.smap[k - 1];
					}
					this.smap[j] = tmp;
				}

				this.amap[this.smap[j]] = j;
			};

			Heap.prototype.free = function (i, n) {
				var j, k, tmp, joinleft, joinright;
				j = this.asearch(i, this.alo, this.ahi);

				joinleft = this.addr[j - 1] + this.size[this.amap[j - 1]] === i;
				joinright = i + n === this.addr[j];

				if (joinleft ^ joinright) {
					if (joinleft) {
						this.size[this.amap[j - 1]] += n;
					} else {
						this.addr[j] -= n;
					}
				} else {
					if (joinleft) {
						this.addr[j - 1] = this.addr[j - 1];
						this.size[y] = n + this.size[j - 1] + this.size[j];
						this.smap[y] = j - 1;
						this.amap[j - 1] = y;
					} else {
						this.addr[j] = i;
						this.size[y] = n;
						this.smap[y] = j;
						this.amap[j] = y;
					}
				}

				for (k = this.ahi; k > j; --k) {
					this.addr[k] = this.addr[k - 1];
					this.amap[k] = this.amap[k - 1];
				}
			};
		};

		exports.heap = heap;

		/* js/src/malloc.js */

		/**
   * Method that allocates an ArrayBuffer.
   */

		var malloc = function malloc(n) {
			return new ArrayBuffer(n);
		};

		exports.malloc = malloc;

		/* js/src/pool.js */
		/**
   * Pool containing objects of a single type.
   */
		var Pool = function Pool(init) {
			this.init = init;
			this.pool = [];
		};

		Pool.prototype.collect = function () {
			this.pool = [];
		};

		Pool.prototype.alloc = function () {

			if (this.pool.length > 0) {
				return this.pool.pop();
			} else {
				return this.init();
			}
		};

		Pool.prototype.free = function (object) {
			this.pool.push(object);
		};

		exports.Pool = Pool;

		return exports;
	};
	if (typeof exports === "object") {
		definition(exports);
	} else if (typeof define === "function" && define.amd) {
		define("aureooms-js-memory", [], function () {
			return definition({});
		});
	} else if (typeof window === "object" && typeof window.document === "object") {
		definition(window["memory"] = {});
	} else console.error("unable to detect type of module to define for aureooms-js-memory");
})();