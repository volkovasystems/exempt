/*:
	@module-license:
		The MIT License (MIT)

		Copyright (c) 2014 Richeve Siodina Bebedor

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
			"packageName": "exempt",
			"fileName": "exempt.js",
			"moduleName": "exempt",
			"authorName": "Richeve S. Bebedor",
			"authorEMail": "richeve.bebedor@gmail.com",
			"repository": "git@github.com:volkovasystems/exempt.git",
			"testCase": "exempt-test.js",
			"isGlobal": true
		}
	@end-module-configuration

	@module-documentation:
		This lets us exempt the entity from the array
			using the splice method while maintaining reference
			to the original array.

		You can use it like this:

			exempt( myArray, "myData" );
			//This will exempt "myData" from myArray.

		You can also use it like this:

			exempt.bind( myArray )( "myData" );
			//This will bind myArray as the scope and exempt "myData" from myArray.

		This will return the list.
	@end-module-documentation
*/
var exempt = function exempt( entity, list, exemptFunction ){
	if( typeof list == "undefined" &&
		Array.isArray( this ) )
	{
		list = this;
	}

	if( typeof list == "function" &&
		typeof exemptFunction == "undefined" )
	{
		exemptFunction = list;

	}

	if( !exemptFunction ||
		typeof exemptFunction != "function" )
	{
		exemptFunction = function exemptFunction( value, index, list, entity ){
			return value === entity;
		}
	}

	var iterate = function iterate( list, index ){
		index = index || 0;
		var listLength = list.length;

		for( ; index < listLength; index++ ){
			if( exemptFunction( list[ index ], index, list, entity ) ){
				list.splice( index, 1 );

				break;
			}

			if( ( index + 1 ) == listLength ){
				return;
			}
		}

		return iterate( list, index - 1 );
	}

	iterate( list );

	return list;
};

if( typeof module != "undefined" ){ 
	module.exports = exempt; 
}

if( typeof global != "undefined" ){
	harden
		.bind( exempt )( "globalize", 
			function globalize( ){
				harden.bind( global )( "exempt", exempt );
			} );
}