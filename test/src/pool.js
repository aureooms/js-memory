import test from 'ava' ;

import { Pool } from '../../src' ;

import { partial , create } from '@aureooms/js-functools' ;

let nextid = -1 ;

function Item ( ) {
	this.id = ++nextid ;
}

test( "pool" , assert => {

	const pool = new Pool( partial( create , [ Item ] ) );

	let items = [ ] ;

	let n = 10 ;
	let k = 3 ;

	for ( let i = 0 ; i < n ; ++i ) {
		items.push( pool.alloc() ) ;
	}

	assert.deepEqual( pool.pool.length , 0 , "pool should be empty" ) ;

	for ( let i = 0 ; i < n ; ++i ) {
		pool.free( items.pop() ) ;
	}

	assert.deepEqual( pool.pool.length , n , "pool should contain " + n + " items" ) ;

	for ( let i = k ; i < n ; ++i ) {
		items.push( pool.alloc() ) ;
	}

	assert.deepEqual( pool.pool.length , k , "pool should contain " + k + " items" ) ;

	for ( let i = 0 ; i < k ; ++i ) {
		items.push( pool.alloc() ) ;
	}

	assert.deepEqual( pool.pool.length , 0 , "pool should be empty" ) ;

	for ( let i = 0 ; i < n ; ++i ) {
		assert.truthy( items[i].id < n , "the pool should never have allocated more than " + n + " items" ) ;
	}

	for ( let i = 0 ; i < n ; ++i ) {
		pool.free( items.pop() ) ;
	}

	assert.deepEqual( pool.pool.length , n , "pool should contain " + n + " items" ) ;

	pool.collect() ;

	assert.deepEqual( pool.pool.length , 0 , "pool should be empty" ) ;

	assert.truthy( pool.alloc().id === n , "newly allocated item after collect has id equal to " + n ) ;

} ) ;
