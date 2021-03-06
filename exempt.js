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
			"contributors": [
				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>",
				"Vinse Vinalon <vinsevinalon@gmail.com>"
			],
			"repository": "https://github.com/volkovasystems/excursio.git",
			"global": true
		}
	@end-module-configuration

	@module-documentation:
		A better way to use Array.prototype.splice method.

		The default exempter function does first level equal.
		Passing an index will start the procedure on that index of the list.
		A residue array may be used to collect spliced elements.

		If entity and exempter is not given it will not do anything.
	@end-module-documentation

	@include:
		{
			"depher": "depher",
			"doubt": "doubt",
			"een": "een",
			"falzy": "falzy",
			"harden": "harden",
			"lqual": "lqual",
			"nsrt": "nsrt",
			"shft": "shft"
		}
	@end-include
*/

const depher = require( "depher" );
const doubt = require( "doubt" );
const een = require( "een" );
const falzy = require( "falzy" );
const harden = require( "harden" );
const lqual = require( "lqual" );
const nsrt = require( "nsrt" );
const shft = require( "shft" );

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

	if( falzy( entity ) && falzy( exempter ) ){
		return list;
	}

	let parameter = shft( arguments, 2 );
	exempter = depher( parameter, FUNCTION, function exempter( element, entity, index ){
		return lqual( element, entity );
	} );
	index = depher( parameter, NUMBER, 0 );
	residue = depher( parameter, Array, [ ] );

	let length = list.length;
	while( index < length ){
		let element = list[ index ];

		if( exempter( element, entity, index ) ){
			list.splice( index, 1 ).forEach( ( element ) => nsrt( residue, element ) );

			exempt( list, entity, exempter, index++, residue );

			break;

		}else{
			index++;
		}
	}

	if( falzy( list.residue ) ){
		harden( "residue", residue, list );

	}else{
		residue.forEach( ( element ) => nsrt( list.residue, element ) );
	}

	return list;
};

module.exports = exempt
