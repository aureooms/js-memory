

/**
 * Method that creates an allocator from a constructor.
 */

var __calloc__ = function(Constructor) {
	return function(n) {
		return new Constructor(n);
	};
};

exports.__calloc__ = __calloc__;
