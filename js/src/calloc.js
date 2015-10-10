

/**
 * Method that creates an allocator from an array constructor.
 */

const _calloc = ArrayConstructor => n => new ArrayConstructor( n ) ;

exports._calloc = _calloc ;
