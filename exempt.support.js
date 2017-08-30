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
              			"contributors": [
              				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>"
              			],
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
              
              		If entity and exempter is not given it will not do anything.
              	@end-module-documentation
              
              	@include:
              		{
              			"depher": "depher",
              			"deequal": "deequal",
              			"doubt": "doubt",
              			"een": "een",
              			"falzy": "falzy",
              			"harden": "harden",
              			"nsrt": "nsrt",
              			"shft": "shft"
              		}
              	@end-include
              */

var depher = require("depher");
var deequal = require("deequal");
var doubt = require("doubt");
var een = require("een");
var falzy = require("falzy");
var harden = require("harden");
var nsrt = require("nsrt");
var shft = require("shft");

var exempt = function exempt(list, entity, exempter, index, residue) {
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

	if (!doubt(list, ARRAY)) {
		throw new Error("invalid list");
	}

	if (falzy(entity) && falzy(exempter)) {
		return list;
	}

	var parameter = shft(arguments, 2);
	exempter = depher(parameter, FUNCTION, function exempter(element, entity, index) {
		return deequal(element, entity);
	});
	index = depher(parameter, NUMBER, 0);
	residue = depher(parameter, Array, []);

	var length = list.length;
	while (index < length) {
		var element = list[index];

		if (exempter(element, entity, index)) {
			list.splice(index, 1).forEach(function (element) {return nsrt(residue, element);});

			exempt(list, entity, exempter, index++, residue);

			break;

		} else {
			index++;
		}
	}

	if (falzy(list.residue)) {
		harden("residue", residue, list);

	} else {
		residue.forEach(function (element) {return nsrt(list.residue, element);});
	}

	return list;
};

module.exports = exempt;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4ZW1wdC5zdXBwb3J0LmpzIl0sIm5hbWVzIjpbImRlcGhlciIsInJlcXVpcmUiLCJkZWVxdWFsIiwiZG91YnQiLCJlZW4iLCJmYWx6eSIsImhhcmRlbiIsIm5zcnQiLCJzaGZ0IiwiZXhlbXB0IiwibGlzdCIsImVudGl0eSIsImV4ZW1wdGVyIiwiaW5kZXgiLCJyZXNpZHVlIiwiQVJSQVkiLCJFcnJvciIsInBhcmFtZXRlciIsImFyZ3VtZW50cyIsIkZVTkNUSU9OIiwiZWxlbWVudCIsIk5VTUJFUiIsIkFycmF5IiwibGVuZ3RoIiwic3BsaWNlIiwiZm9yRWFjaCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUVBLElBQU1BLFNBQVNDLFFBQVMsUUFBVCxDQUFmO0FBQ0EsSUFBTUMsVUFBVUQsUUFBUyxTQUFULENBQWhCO0FBQ0EsSUFBTUUsUUFBUUYsUUFBUyxPQUFULENBQWQ7QUFDQSxJQUFNRyxNQUFNSCxRQUFTLEtBQVQsQ0FBWjtBQUNBLElBQU1JLFFBQVFKLFFBQVMsT0FBVCxDQUFkO0FBQ0EsSUFBTUssU0FBU0wsUUFBUyxRQUFULENBQWY7QUFDQSxJQUFNTSxPQUFPTixRQUFTLE1BQVQsQ0FBYjtBQUNBLElBQU1PLE9BQU9QLFFBQVMsTUFBVCxDQUFiOztBQUVBLElBQU1RLFNBQVMsU0FBU0EsTUFBVCxDQUFpQkMsSUFBakIsRUFBdUJDLE1BQXZCLEVBQStCQyxRQUEvQixFQUF5Q0MsS0FBekMsRUFBZ0RDLE9BQWhELEVBQXlEO0FBQ3ZFOzs7Ozs7Ozs7Ozs7QUFZQSxLQUFJLENBQUNYLE1BQU9PLElBQVAsRUFBYUssS0FBYixDQUFMLEVBQTJCO0FBQzFCLFFBQU0sSUFBSUMsS0FBSixDQUFXLGNBQVgsQ0FBTjtBQUNBOztBQUVELEtBQUlYLE1BQU9NLE1BQVAsS0FBbUJOLE1BQU9PLFFBQVAsQ0FBdkIsRUFBMEM7QUFDekMsU0FBT0YsSUFBUDtBQUNBOztBQUVELEtBQUlPLFlBQVlULEtBQU1VLFNBQU4sRUFBaUIsQ0FBakIsQ0FBaEI7QUFDQU4sWUFBV1osT0FBUWlCLFNBQVIsRUFBbUJFLFFBQW5CLEVBQTZCLFNBQVNQLFFBQVQsQ0FBbUJRLE9BQW5CLEVBQTRCVCxNQUE1QixFQUFvQ0UsS0FBcEMsRUFBMkM7QUFDbEYsU0FBT1gsUUFBU2tCLE9BQVQsRUFBa0JULE1BQWxCLENBQVA7QUFDQSxFQUZVLENBQVg7QUFHQUUsU0FBUWIsT0FBUWlCLFNBQVIsRUFBbUJJLE1BQW5CLEVBQTJCLENBQTNCLENBQVI7QUFDQVAsV0FBVWQsT0FBUWlCLFNBQVIsRUFBbUJLLEtBQW5CLEVBQTBCLEVBQTFCLENBQVY7O0FBRUEsS0FBSUMsU0FBU2IsS0FBS2EsTUFBbEI7QUFDQSxRQUFPVixRQUFRVSxNQUFmLEVBQXVCO0FBQ3RCLE1BQUlILFVBQVVWLEtBQU1HLEtBQU4sQ0FBZDs7QUFFQSxNQUFJRCxTQUFVUSxPQUFWLEVBQW1CVCxNQUFuQixFQUEyQkUsS0FBM0IsQ0FBSixFQUF3QztBQUN2Q0gsUUFBS2MsTUFBTCxDQUFhWCxLQUFiLEVBQW9CLENBQXBCLEVBQXdCWSxPQUF4QixDQUFpQyxVQUFFTCxPQUFGLFVBQWViLEtBQU1PLE9BQU4sRUFBZU0sT0FBZixDQUFmLEVBQWpDOztBQUVBWCxVQUFRQyxJQUFSLEVBQWNDLE1BQWQsRUFBc0JDLFFBQXRCLEVBQWdDQyxPQUFoQyxFQUF5Q0MsT0FBekM7O0FBRUE7O0FBRUEsR0FQRCxNQU9LO0FBQ0pEO0FBQ0E7QUFDRDs7QUFFRCxLQUFJUixNQUFPSyxLQUFLSSxPQUFaLENBQUosRUFBMkI7QUFDMUJSLFNBQVEsU0FBUixFQUFtQlEsT0FBbkIsRUFBNEJKLElBQTVCOztBQUVBLEVBSEQsTUFHSztBQUNKSSxVQUFRVyxPQUFSLENBQWlCLFVBQUVMLE9BQUYsVUFBZWIsS0FBTUcsS0FBS0ksT0FBWCxFQUFvQk0sT0FBcEIsQ0FBZixFQUFqQjtBQUNBOztBQUVELFFBQU9WLElBQVA7QUFDQSxDQXBERDs7QUFzREFnQixPQUFPQyxPQUFQLEdBQWlCbEIsTUFBakIiLCJmaWxlIjoiZXhlbXB0LnN1cHBvcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuXHJcbi8qO1xyXG5cdEBtb2R1bGUtbGljZW5zZTpcclxuXHRcdFRoZSBNSVQgTGljZW5zZSAoTUlUKVxyXG5cdFx0QG1pdC1saWNlbnNlXHJcblxyXG5cdFx0Q29weXJpZ2h0IChAYykgMjAxNyBSaWNoZXZlIFNpb2RpbmEgQmViZWRvclxyXG5cdFx0QGVtYWlsOiByaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXHJcblxyXG5cdFx0UGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG5cdFx0b2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG5cdFx0aW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG5cdFx0dG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG5cdFx0Y29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcblx0XHRmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG5cclxuXHRcdFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxyXG5cdFx0Y29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcblx0XHRUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcblx0XHRJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuXHRcdEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG5cdFx0QVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG5cdFx0TElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuXHRcdE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXHJcblx0XHRTT0ZUV0FSRS5cclxuXHRAZW5kLW1vZHVsZS1saWNlbnNlXHJcblxyXG5cdEBtb2R1bGUtY29uZmlndXJhdGlvbjpcclxuXHRcdHtcclxuXHRcdFx0XCJwYWNrYWdlXCI6IFwiZXhjdXJzaW9cIixcclxuXHRcdFx0XCJwYXRoXCI6IFwiZXhjdXJzaW8vZXhjdXJzaW8uanNcIixcclxuXHRcdFx0XCJmaWxlXCI6IFwiZXhjdXJzaW8uanNcIixcclxuXHRcdFx0XCJtb2R1bGVcIjogXCJleGN1cnNpb1wiLFxyXG5cdFx0XHRcImF1dGhvclwiOiBcIlJpY2hldmUgUy4gQmViZWRvclwiLFxyXG5cdFx0XHRcImNvbnRyaWJ1dG9yc1wiOiBbXHJcblx0XHRcdFx0XCJKb2huIExlbm9uIE1hZ2hhbm95IDxqb2hubGVub25tYWdoYW5veUBnbWFpbC5jb20+XCJcclxuXHRcdFx0XSxcclxuXHRcdFx0XCJlTWFpbFwiOiBcInJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cIixcclxuXHRcdFx0XCJyZXBvc2l0b3J5XCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3ZvbGtvdmFzeXN0ZW1zL2V4Y3Vyc2lvLmdpdFwiLFxyXG5cdFx0XHRcImdsb2JhbFwiOiB0cnVlXHJcblx0XHR9XHJcblx0QGVuZC1tb2R1bGUtY29uZmlndXJhdGlvblxyXG5cclxuXHRAbW9kdWxlLWRvY3VtZW50YXRpb246XHJcblx0XHRBIGJldHRlciB3YXkgdG8gdXNlIEFycmF5LnByb3RvdHlwZS5zcGxpY2UgbWV0aG9kLlxyXG5cclxuXHRcdFRoZSBkZWZhdWx0IGV4ZW1wdGVyIGZ1bmN0aW9uIGRvZXMgZGVlcCBlcXVhbC5cclxuXHRcdFBhc3NpbmcgYW4gaW5kZXggd2lsbCBzdGFydCB0aGUgcHJvY2VkdXJlIG9uIHRoYXQgaW5kZXggb2YgdGhlIGxpc3QuXHJcblx0XHRBIHJlc2lkdWUgYXJyYXkgbWF5IGJlIHVzZWQgdG8gY29sbGVjdCBzcGxpY2VkIGVsZW1lbnRzLlxyXG5cclxuXHRcdElmIGVudGl0eSBhbmQgZXhlbXB0ZXIgaXMgbm90IGdpdmVuIGl0IHdpbGwgbm90IGRvIGFueXRoaW5nLlxyXG5cdEBlbmQtbW9kdWxlLWRvY3VtZW50YXRpb25cclxuXHJcblx0QGluY2x1ZGU6XHJcblx0XHR7XHJcblx0XHRcdFwiZGVwaGVyXCI6IFwiZGVwaGVyXCIsXHJcblx0XHRcdFwiZGVlcXVhbFwiOiBcImRlZXF1YWxcIixcclxuXHRcdFx0XCJkb3VidFwiOiBcImRvdWJ0XCIsXHJcblx0XHRcdFwiZWVuXCI6IFwiZWVuXCIsXHJcblx0XHRcdFwiZmFsenlcIjogXCJmYWx6eVwiLFxyXG5cdFx0XHRcImhhcmRlblwiOiBcImhhcmRlblwiLFxyXG5cdFx0XHRcIm5zcnRcIjogXCJuc3J0XCIsXHJcblx0XHRcdFwic2hmdFwiOiBcInNoZnRcIlxyXG5cdFx0fVxyXG5cdEBlbmQtaW5jbHVkZVxyXG4qL1xyXG5cclxuY29uc3QgZGVwaGVyID0gcmVxdWlyZSggXCJkZXBoZXJcIiApO1xyXG5jb25zdCBkZWVxdWFsID0gcmVxdWlyZSggXCJkZWVxdWFsXCIgKTtcclxuY29uc3QgZG91YnQgPSByZXF1aXJlKCBcImRvdWJ0XCIgKTtcclxuY29uc3QgZWVuID0gcmVxdWlyZSggXCJlZW5cIiApO1xyXG5jb25zdCBmYWx6eSA9IHJlcXVpcmUoIFwiZmFsenlcIiApO1xyXG5jb25zdCBoYXJkZW4gPSByZXF1aXJlKCBcImhhcmRlblwiICk7XHJcbmNvbnN0IG5zcnQgPSByZXF1aXJlKCBcIm5zcnRcIiApO1xyXG5jb25zdCBzaGZ0ID0gcmVxdWlyZSggXCJzaGZ0XCIgKTtcclxuXHJcbmNvbnN0IGV4ZW1wdCA9IGZ1bmN0aW9uIGV4ZW1wdCggbGlzdCwgZW50aXR5LCBleGVtcHRlciwgaW5kZXgsIHJlc2lkdWUgKXtcclxuXHQvKjtcclxuXHRcdEBtZXRhLWNvbmZpZ3VyYXRpb246XHJcblx0XHRcdHtcclxuXHRcdFx0XHRcImxpc3Q6cmVxdWlyZWRcIjogQXJyYXlcclxuXHRcdFx0XHRcImVudGl0eTpyZXF1aXJlZFwiOiBcIipcIixcclxuXHRcdFx0XHRcImV4ZW1wdGVyXCI6IFwiZnVuY3Rpb25cIixcclxuXHRcdFx0XHRcImluZGV4XCI6IFwibnVtYmVyXCIsXHJcblx0XHRcdFx0XCJyZXNpZHVlXCI6IEFycmF5XHJcblx0XHRcdH1cclxuXHRcdEBlbmQtbWV0YS1jb25maWd1cmF0aW9uXHJcblx0Ki9cclxuXHJcblx0aWYoICFkb3VidCggbGlzdCwgQVJSQVkgKSApe1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKCBcImludmFsaWQgbGlzdFwiICk7XHJcblx0fVxyXG5cclxuXHRpZiggZmFsenkoIGVudGl0eSApICYmIGZhbHp5KCBleGVtcHRlciApICl7XHJcblx0XHRyZXR1cm4gbGlzdDtcclxuXHR9XHJcblxyXG5cdGxldCBwYXJhbWV0ZXIgPSBzaGZ0KCBhcmd1bWVudHMsIDIgKTtcclxuXHRleGVtcHRlciA9IGRlcGhlciggcGFyYW1ldGVyLCBGVU5DVElPTiwgZnVuY3Rpb24gZXhlbXB0ZXIoIGVsZW1lbnQsIGVudGl0eSwgaW5kZXggKXtcclxuXHRcdHJldHVybiBkZWVxdWFsKCBlbGVtZW50LCBlbnRpdHkgKTtcclxuXHR9ICk7XHJcblx0aW5kZXggPSBkZXBoZXIoIHBhcmFtZXRlciwgTlVNQkVSLCAwICk7XHJcblx0cmVzaWR1ZSA9IGRlcGhlciggcGFyYW1ldGVyLCBBcnJheSwgWyBdICk7XHJcblxyXG5cdGxldCBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcclxuXHR3aGlsZSggaW5kZXggPCBsZW5ndGggKXtcclxuXHRcdGxldCBlbGVtZW50ID0gbGlzdFsgaW5kZXggXTtcclxuXHJcblx0XHRpZiggZXhlbXB0ZXIoIGVsZW1lbnQsIGVudGl0eSwgaW5kZXggKSApe1xyXG5cdFx0XHRsaXN0LnNwbGljZSggaW5kZXgsIDEgKS5mb3JFYWNoKCAoIGVsZW1lbnQgKSA9PiBuc3J0KCByZXNpZHVlLCBlbGVtZW50ICkgKTtcclxuXHJcblx0XHRcdGV4ZW1wdCggbGlzdCwgZW50aXR5LCBleGVtcHRlciwgaW5kZXgrKywgcmVzaWR1ZSApO1xyXG5cclxuXHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdGluZGV4Kys7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRpZiggZmFsenkoIGxpc3QucmVzaWR1ZSApICl7XHJcblx0XHRoYXJkZW4oIFwicmVzaWR1ZVwiLCByZXNpZHVlLCBsaXN0ICk7XHJcblxyXG5cdH1lbHNle1xyXG5cdFx0cmVzaWR1ZS5mb3JFYWNoKCAoIGVsZW1lbnQgKSA9PiBuc3J0KCBsaXN0LnJlc2lkdWUsIGVsZW1lbnQgKSApO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGxpc3Q7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGV4ZW1wdFxyXG4iXX0=
//# sourceMappingURL=exempt.support.js.map
