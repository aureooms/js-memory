import test from 'ava' ;

import { _calloc } from '../../src' ;

test( 'calloc' , t => {

	const calloc = _calloc( Uint16Array ) ;

	const a = calloc( 10 ) ;

	t.is( a.length , 10 , 'check length' ) ;
	t.truthy( a instanceof Uint16Array , 'check type' ) ;

} ) ;
