/**
 * Method that creates an allocator from an array constructor.
 */

export const _calloc = ArrayConstructor => n => new ArrayConstructor( n ) ;
