/**
 * Pool containing objects of a single type.
 */
export function Pool ( init ) {
	this.init = init ;
	this.pool = [ ] ;
} ;

Pool.prototype.collect = function ( ) {
	this.pool = [ ] ;
} ;

Pool.prototype.alloc = function ( ) {

	if ( this.pool.length > 0 ) {
		return this.pool.pop() ;
	}

	else {
		return this.init() ;
	}

} ;

Pool.prototype.free = function ( object ) {
	this.pool.push( object ) ;
} ;
