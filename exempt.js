"use strict";

/*;
	@module-license:
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
	@end-module-license

	@module-configuration:
		{
			"package": "excursio",
			"path": "excursio/excursio.js",
			"file": "excursio.js",
			"module": "excursio",
			"author": "Richeve S. Bebedor",
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/excursio.git",
			"global": true
		}
	@end-module-configuration

	@module-documentation:
		A better way to use Array.prototype.splice method.

		The default exempter function does deep equal.
		Passing an index will start the procedure on that index of the list.
		A residue array may be used to collect spliced elements.
	@end-module-documentation

	@include:
		{
			"budge": "budge",
			"depher": "depher",
			"deequal": "deequal",
			"doubt": "doubt",
			"een": "een",
			"falzy": "falzy",
			"harden": "harden"
		}
	@end-include
*/

const budge = require( "budge" );
const depher = require( "depher" );
const deequal = require( "deequal" );
const doubt = require( "doubt" );
const een = require( "een" );
const falzy = require( "falzy" );
const harden = require( "harden" );

const exempt = function exempt( list, entity, exempter, index, residue ){
	/*;
		@meta-configuration:
			{
				"list:required": Array
				"entity:required": "*",
				"exempter": "function",
				"index": "number",
				"residue": Array
			}
		@end-meta-configuration
	*/

	if( !doubt( list, ARRAY ) ){
		throw new Error( "invalid list" );
	}

	if( falzy( entity ) ){
		return list;
	}

	let parameter = budge( arguments, 2 );
	exempter = depher( parameter, FUNCTION, function exempter( element, entity, index ){
		return deequal( element, entity );
	} );
	index = depher( parameter, NUMBER, 0 );
	residue = depher( parameter, Array, [ ] );

	let length = list.length;
	do{
		let element = list[ index ];

		if( exempter( element, entity, index++ ) ){
			list.splice( ( index - 1 ), 1 ).forEach( ( element ) => {
				if( !een( residue, element ) ){
					residue.push( element );
				}
			} );

			exempt( list, entity, exempter, index, residue );

			break;
		}
	}while( index < length );

	if( falzy( list.residue ) ){
		harden( "residue", residue, list );

	}else{
		residue.forEach( ( element ) => {
			if( !een( list.residue, element ) ){
				list.residue.push( element );
			}
		} );
	}

	return list;
};

module.exports = exempt
