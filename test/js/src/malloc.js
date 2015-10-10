
test( 'malloc' , function ( assert ) {

	var malloc = memory.malloc ;

	var a = malloc( 10 ) ;

	assert.equal( a.byteLength , 10 , 'check length' ) ;
	assert.ok( a instanceof ArrayBuffer , 'check type' ) ;

} ) ;
