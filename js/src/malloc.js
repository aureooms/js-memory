

/**
 * Method that allocates an ArrayBuffer.
 */

var malloc = function ( n ) {
	return new ArrayBuffer( n ) ;
} ;

exports.malloc = malloc ;
