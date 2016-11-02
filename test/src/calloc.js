import test from 'ava' ;

import { _calloc } from '../../src' ;

test( 'calloc' , assert => {

	const calloc = _calloc( Uint16Array ) ;

	const a = calloc( 10 ) ;

	assert.is( a.length , 10 , 'check length' ) ;
	assert.truthy( a instanceof Uint16Array , 'check type' ) ;

} ) ;
