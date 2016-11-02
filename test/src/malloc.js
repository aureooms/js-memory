import test from 'ava' ;

import { malloc } from '../../src' ;

test( 'malloc' , assert => {

	const a = malloc( 10 ) ;

	assert.is( a.byteLength , 10 , 'check length' ) ;
	assert.truthy( a instanceof ArrayBuffer , 'check type' ) ;

} ) ;
