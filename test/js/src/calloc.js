
test( 'calloc' , function ( assert ) {

	var calloc = memory._calloc( Uint16Array ) ;

	var a = calloc( 10 ) ;

	assert.equal( a.length , 10 , 'check length' ) ;
	assert.ok( a instanceof Uint16Array , 'check type' ) ;

} ) ;
