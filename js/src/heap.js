

/**
 * /!\ INCOMPLETE
 * Heap manager backed by a buffer.
 */

var heap = function ( Buffer ) {

	/**
	 * The *s* prefix in members and methods stands for size.
	 * The *a* prefix in members and methods stands for address.
	 */

	var Heap = function ( n ) {
		this.buffer = new Buffer( n ) ;
		this.n = 1 ;
		this.slo = 0 ;
		this.shi = 1 ;
		this.alo = 0 ;
		this.ahi = 1 ;
		this.size = new Uint32Array( 1 ) ;
		this.addr = new Uint32Array( 1 ) ;
		this.smap = new Uint32Array( 1 ) ;
		this.amap = new Uint32Array( 1 ) ;
		this.size[0] = n ;
		this.addr[0] = 0 ;
		this.smap[0] = 0 ;
		this.amap[0] = 0 ;
	};

	Heap.prototype.alloc = function ( n ) {

		var i , j ;

		i = this.ssearch( n , this.slo, this.shi);
		this.size[i] -= n;
		this.addr[i] += n;
		j = this.ssearch(n, this.slo, i);
		this.smove(i, j);
		return i;
	};

	Heap.prototype.smove = function(i, j) {
		var tmp, m, n, k;
		n = i - j;
		m = this.shi - this.slo - n;

		if (this.slo > 0 && m < n) {
			--this.slo;
			for (k = this.slo; k < j; ++k) {
				this.size[k] = this.size[k+1];
				this.smap[k] = this.smap[k+1];
			}
			this.size[j] = this.size[i];
			this.smap[j] = this.smap[i];
			for (k = i; k < this.shi; ++k) {
				this.size[k] = this.size[k+1];
				this.smap[k] = this.smap[k+1];
			}
			--this.shi;
		}
		else {
			tmp = this.size[i];
			for (k = i; k > j; --k) {
				this.size[k] = this.size[k-1];
			}
			this.size[j] = tmp;

			tmp = this.smap[i];
			for (k = i; k > j; --k) {
				this.smap[k] = this.smap[k-1];
			}
			this.smap[j] = tmp;
		}

		this.amap[this.smap[j]] = j;

	};


	Heap.prototype.free = function(i, n) {
		var j, k, tmp, joinleft, joinright;
		j = this.asearch(i, this.alo, this.ahi);

		joinleft = this.addr[j-1] + this.size[this.amap[j-1]] === i;
		joinright = i + n === this.addr[j];

		if (joinleft ^ joinright) {
			if (joinleft) {
				this.size[this.amap[j-1]] += n;
			}
			else {
				this.addr[j] -= n;
			}
		}
		else {
			if (joinleft) {
				this.addr[j-1] = this.addr[j-1];
				this.size[y] = n + this.size[j-1] + this.size[j];
				this.smap[y] = j-1;
				this.amap[j-1] = y;
			}
			else {
				this.addr[j] = i;
				this.size[y] = n;
				this.smap[y] = j;
				this.amap[j] = y;
			}
		}

		for (k = this.ahi; k > j; --k) {
			this.addr[k] = this.addr[k-1];
			this.amap[k] = this.amap[k-1];
		}


	};


};

exports.heap = heap;
