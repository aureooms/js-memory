
var functools = require( "aureooms-js-functools" ) ;

var nextid = -1 ;

function Item ( ) {
	this.id = ++nextid ;
}


test( "pool" , function ( ) {

	var pool , i , n , k , items ;

	pool = new memory.Pool( functools.partial( functools.create , [ Item ] ) );

	items = [ ] ;

	n = 10 ;
	k = 3 ;

	for ( i = 0 ; i < n ; ++i ) {
		items.push( pool.alloc() ) ;
	}

	deepEqual( pool.pool.length , 0 , "pool should be empty" ) ;

	for ( i = 0 ; i < n ; ++i ) {
		pool.free( items.pop() ) ;
	}

	deepEqual( pool.pool.length , n , "pool should contain " + n + " items" ) ;

	for ( i = k ; i < n ; ++i ) {
		items.push( pool.alloc() ) ;
	}

	deepEqual( pool.pool.length , k , "pool should contain " + k + " items" ) ;

	for ( i = 0 ; i < k ; ++i ) {
		items.push( pool.alloc() ) ;
	}

	deepEqual( pool.pool.length , 0 , "pool should be empty" ) ;

	for ( i = 0 ; i < n ; ++i ) {
		ok( items[i].id < n , "the pool should never havec allocated more than " + n + " items" ) ;
	}

	for ( i = 0 ; i < n ; ++i ) {
		pool.free( items.pop() ) ;
	}

	deepEqual( pool.pool.length , n , "pool should contain " + n + " items" ) ;

	pool.collect() ;

	deepEqual( pool.pool.length , 0 , "pool should be empty" ) ;

	ok( pool.alloc().id === n , "newly allocated item after collect has id equal to " + n ) ;

} ) ;
