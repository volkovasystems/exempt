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
              	@end-module-documentation
              
              	@include:
              		{
              			"budge": "budge",
              			"depher": "depher",
              			"deequal": "deequal",
              			"doubt": "doubt",
              			"falzy": "falzy",
              			"wichevr": "wichevr"
              		}
              	@end-include
              */

var budge = require("budge");
var depher = require("depher");
var deequal = require("deequal");
var doubt = require("doubt");
var falzy = require("falzy");
var wichevr = require("wichevr");

var exempt = function exempt(list, entity, exempter, index) {
	/*;
                                                             	@meta-configuration:
                                                             		{
                                                             			"list:required": Array
                                                             			"entity:required": "*",
                                                             			"exempter": "function",
                                                             			"index": "number"
                                                             		}
                                                             	@end-meta-configuration
                                                             */

	if (!doubt(list, ARRAY)) {
		throw new Error("invalid list");
	}

	if (falzy(entity)) {
		return list;
	}

	exempter = wichevr(exempter, function exempter(element, entity, index) {
		return deequal(element, entity);
	});

	index = depher(budge(arguments, 2), NUMBER, 0);

	var length = list.length;
	do {
		var element = list[index];

		if (exempter(element, entity, index++)) {
			list.splice(index - 1, 1);

			exempt(list, entity, exempter, index);

			break;
		}
	} while (index < length);

	return list;
};

module.exports = exempt;

//# sourceMappingURL=exempt.support.js.map