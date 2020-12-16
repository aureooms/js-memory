import test from 'ava' ;

import { malloc } from '../../src' ;

test( 'malloc' , t => {

	const a = malloc( 10 ) ;

	t.is( a.byteLength , 10 , 'check length' ) ;
	t.truthy( a instanceof ArrayBuffer , 'check type' ) ;

} ) ;
