
const exempt = require( "./exempt.js" );

let list = [ 1, 2, 3, 4, 5 ];
console.log( exempt( list, 3 ) === list, list );

let residue = [ ];
console.log( exempt( list, 5, residue ), residue );
