"use strict";

/*;
	@test-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2017 Richeve Siodina Bebedor
		@email: richeve.bebedor@gmail.com

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-test-license

	@test-configuration:
		{
			"package": "exempt",
			"path": "exempt/test.module.js",
			"file": "test.module.js",
			"module": "test",
			"author": "Richeve S. Bebedor",
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/exempt.git"
		}
	@end-test-configuration

	@test-documentation:

	@end-test-documentation

	@include:
		{
			"assert": "should",
			"exempt": "exempt"
		}
	@end-include
*/

const assert = require( "should/as-function" );

//: @server:
const exempt = require( "./exempt.js" );
//: @end-server






//: @server:
describe( "exempt", ( ) => {

	describe( "`exempt( [ 1, 2, 3, 4, 5 ], 2 )`", ( ) => {
		it( "should be equal to [ 1, 3, 4, 5 ]", ( ) => {
			assert.deepEqual( exempt( [ 1, 2, 3, 4, 5 ], 2 ), [ 1, 3, 4, 5 ] );
		} );
	} );

	describe( "`exempt( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 5 ], 3 )`", ( ) => {
		it( "should be equal to [ 1, 2, 4, 5, 6, 7, 8, 9, 5 ]", ( ) => {
			let list = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 5 ];

			assert.deepEqual( exempt( list, 3 ), [ 1, 2, 4, 5, 6, 7, 8, 9, 5 ] );
		} );
	} );

	describe( "`exempt( [ 1, 2, 4, 5, 6, 7, 8, 9, 5 ], 5, [ ] )`", ( ) => {
		it( "should be equal to [ 1, 2, 4, 6, 7, 8, 9 ]", ( ) => {
			let list = [ 1, 2, 4, 5, 6, 7, 8, 9, 5 ];
			let residue = [ ];

			assert.deepEqual( exempt( list, 5, residue ), [ 1, 2, 4, 6, 7, 8, 9 ] );
		} );
	} );

} );
//: @end-server






