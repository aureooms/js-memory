

/**
 * Method that creates an allocator from an array constructor.
 */

var __calloc__ = function ( ArrayConstructor ) {
	return function ( n ) {
		return new ArrayConstructor( n ) ;
	} ;
} ;

exports.__calloc__ = __calloc__ ;
