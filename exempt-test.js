const assert = require( "assert" );
const exempt = require( "./exempt.js" );

let list = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 5 ];
assert.deepEqual( exempt( list, 3 ) === list, true, "should be true" );

let residue = [ ];
assert.deepEqual( exempt( list, 5, residue ), [ 1, 2, 4, 6, 7, 8, 9 ], "should be equal" );

assert.deepEqual( exempt( [ 1, 4, 3, 2 ], 2 ), [ 1, 4, 3 ], "should be equal" );

console.log( "ok" );
