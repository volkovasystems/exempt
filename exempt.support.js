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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4ZW1wdC5zdXBwb3J0LmpzIl0sIm5hbWVzIjpbImRlcGhlciIsInJlcXVpcmUiLCJkZWVxdWFsIiwiZG91YnQiLCJlZW4iLCJmYWx6eSIsImhhcmRlbiIsIm5zcnQiLCJzaGZ0IiwiZXhlbXB0IiwibGlzdCIsImVudGl0eSIsImV4ZW1wdGVyIiwiaW5kZXgiLCJyZXNpZHVlIiwiQVJSQVkiLCJFcnJvciIsInBhcmFtZXRlciIsImFyZ3VtZW50cyIsIkZVTkNUSU9OIiwiZWxlbWVudCIsIk5VTUJFUiIsIkFycmF5IiwibGVuZ3RoIiwic3BsaWNlIiwiZm9yRWFjaCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUVBLElBQU1BLFNBQVNDLFFBQVMsUUFBVCxDQUFmO0FBQ0EsSUFBTUMsVUFBVUQsUUFBUyxTQUFULENBQWhCO0FBQ0EsSUFBTUUsUUFBUUYsUUFBUyxPQUFULENBQWQ7QUFDQSxJQUFNRyxNQUFNSCxRQUFTLEtBQVQsQ0FBWjtBQUNBLElBQU1JLFFBQVFKLFFBQVMsT0FBVCxDQUFkO0FBQ0EsSUFBTUssU0FBU0wsUUFBUyxRQUFULENBQWY7QUFDQSxJQUFNTSxPQUFPTixRQUFTLE1BQVQsQ0FBYjtBQUNBLElBQU1PLE9BQU9QLFFBQVMsTUFBVCxDQUFiOztBQUVBLElBQU1RLFNBQVMsU0FBU0EsTUFBVCxDQUFpQkMsSUFBakIsRUFBdUJDLE1BQXZCLEVBQStCQyxRQUEvQixFQUF5Q0MsS0FBekMsRUFBZ0RDLE9BQWhELEVBQXlEO0FBQ3ZFOzs7Ozs7Ozs7Ozs7QUFZQSxLQUFJLENBQUNYLE1BQU9PLElBQVAsRUFBYUssS0FBYixDQUFMLEVBQTJCO0FBQzFCLFFBQU0sSUFBSUMsS0FBSixDQUFXLGNBQVgsQ0FBTjtBQUNBOztBQUVELEtBQUlYLE1BQU9NLE1BQVAsS0FBbUJOLE1BQU9PLFFBQVAsQ0FBdkIsRUFBMEM7QUFDekMsU0FBT0YsSUFBUDtBQUNBOztBQUVELEtBQUlPLFlBQVlULEtBQU1VLFNBQU4sRUFBaUIsQ0FBakIsQ0FBaEI7QUFDQU4sWUFBV1osT0FBUWlCLFNBQVIsRUFBbUJFLFFBQW5CLEVBQTZCLFNBQVNQLFFBQVQsQ0FBbUJRLE9BQW5CLEVBQTRCVCxNQUE1QixFQUFvQ0UsS0FBcEMsRUFBMkM7QUFDbEYsU0FBT1gsUUFBU2tCLE9BQVQsRUFBa0JULE1BQWxCLENBQVA7QUFDQSxFQUZVLENBQVg7QUFHQUUsU0FBUWIsT0FBUWlCLFNBQVIsRUFBbUJJLE1BQW5CLEVBQTJCLENBQTNCLENBQVI7QUFDQVAsV0FBVWQsT0FBUWlCLFNBQVIsRUFBbUJLLEtBQW5CLEVBQTBCLEVBQTFCLENBQVY7O0FBRUEsS0FBSUMsU0FBU2IsS0FBS2EsTUFBbEI7QUFDQSxRQUFPVixRQUFRVSxNQUFmLEVBQXVCO0FBQ3RCLE1BQUlILFVBQVVWLEtBQU1HLEtBQU4sQ0FBZDs7QUFFQSxNQUFJRCxTQUFVUSxPQUFWLEVBQW1CVCxNQUFuQixFQUEyQkUsS0FBM0IsQ0FBSixFQUF3QztBQUN2Q0gsUUFBS2MsTUFBTCxDQUFhWCxLQUFiLEVBQW9CLENBQXBCLEVBQXdCWSxPQUF4QixDQUFpQyxVQUFFTCxPQUFGLFVBQWViLEtBQU1PLE9BQU4sRUFBZU0sT0FBZixDQUFmLEVBQWpDOztBQUVBWCxVQUFRQyxJQUFSLEVBQWNDLE1BQWQsRUFBc0JDLFFBQXRCLEVBQWdDQyxPQUFoQyxFQUF5Q0MsT0FBekM7O0FBRUE7O0FBRUEsR0FQRCxNQU9LO0FBQ0pEO0FBQ0E7QUFDRDs7QUFFRCxLQUFJUixNQUFPSyxLQUFLSSxPQUFaLENBQUosRUFBMkI7QUFDMUJSLFNBQVEsU0FBUixFQUFtQlEsT0FBbkIsRUFBNEJKLElBQTVCOztBQUVBLEVBSEQsTUFHSztBQUNKSSxVQUFRVyxPQUFSLENBQWlCLFVBQUVMLE9BQUYsVUFBZWIsS0FBTUcsS0FBS0ksT0FBWCxFQUFvQk0sT0FBcEIsQ0FBZixFQUFqQjtBQUNBOztBQUVELFFBQU9WLElBQVA7QUFDQSxDQXBERDs7QUFzREFnQixPQUFPQyxPQUFQLEdBQWlCbEIsTUFBakIiLCJmaWxlIjoiZXhlbXB0LnN1cHBvcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuLyo7XG5cdEBtb2R1bGUtbGljZW5zZTpcblx0XHRUaGUgTUlUIExpY2Vuc2UgKE1JVClcblx0XHRAbWl0LWxpY2Vuc2VcblxuXHRcdENvcHlyaWdodCAoQGMpIDIwMTcgUmljaGV2ZSBTaW9kaW5hIEJlYmVkb3Jcblx0XHRAZW1haWw6IHJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cblxuXHRcdFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcblx0XHRvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5cdFx0aW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuXHRcdHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcblx0XHRjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcblx0XHRmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5cdFx0VGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5cdFx0Y29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuXHRcdFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcblx0XHRJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcblx0XHRGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcblx0XHRBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5cdFx0TElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcblx0XHRPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuXHRcdFNPRlRXQVJFLlxuXHRAZW5kLW1vZHVsZS1saWNlbnNlXG5cblx0QG1vZHVsZS1jb25maWd1cmF0aW9uOlxuXHRcdHtcblx0XHRcdFwicGFja2FnZVwiOiBcImV4Y3Vyc2lvXCIsXG5cdFx0XHRcInBhdGhcIjogXCJleGN1cnNpby9leGN1cnNpby5qc1wiLFxuXHRcdFx0XCJmaWxlXCI6IFwiZXhjdXJzaW8uanNcIixcblx0XHRcdFwibW9kdWxlXCI6IFwiZXhjdXJzaW9cIixcblx0XHRcdFwiYXV0aG9yXCI6IFwiUmljaGV2ZSBTLiBCZWJlZG9yXCIsXG5cdFx0XHRcImNvbnRyaWJ1dG9yc1wiOiBbXG5cdFx0XHRcdFwiSm9obiBMZW5vbiBNYWdoYW5veSA8am9obmxlbm9ubWFnaGFub3lAZ21haWwuY29tPlwiXG5cdFx0XHRdLFxuXHRcdFx0XCJlTWFpbFwiOiBcInJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cIixcblx0XHRcdFwicmVwb3NpdG9yeVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS92b2xrb3Zhc3lzdGVtcy9leGN1cnNpby5naXRcIixcblx0XHRcdFwiZ2xvYmFsXCI6IHRydWVcblx0XHR9XG5cdEBlbmQtbW9kdWxlLWNvbmZpZ3VyYXRpb25cblxuXHRAbW9kdWxlLWRvY3VtZW50YXRpb246XG5cdFx0QSBiZXR0ZXIgd2F5IHRvIHVzZSBBcnJheS5wcm90b3R5cGUuc3BsaWNlIG1ldGhvZC5cblxuXHRcdFRoZSBkZWZhdWx0IGV4ZW1wdGVyIGZ1bmN0aW9uIGRvZXMgZGVlcCBlcXVhbC5cblx0XHRQYXNzaW5nIGFuIGluZGV4IHdpbGwgc3RhcnQgdGhlIHByb2NlZHVyZSBvbiB0aGF0IGluZGV4IG9mIHRoZSBsaXN0LlxuXHRcdEEgcmVzaWR1ZSBhcnJheSBtYXkgYmUgdXNlZCB0byBjb2xsZWN0IHNwbGljZWQgZWxlbWVudHMuXG5cblx0XHRJZiBlbnRpdHkgYW5kIGV4ZW1wdGVyIGlzIG5vdCBnaXZlbiBpdCB3aWxsIG5vdCBkbyBhbnl0aGluZy5cblx0QGVuZC1tb2R1bGUtZG9jdW1lbnRhdGlvblxuXG5cdEBpbmNsdWRlOlxuXHRcdHtcblx0XHRcdFwiZGVwaGVyXCI6IFwiZGVwaGVyXCIsXG5cdFx0XHRcImRlZXF1YWxcIjogXCJkZWVxdWFsXCIsXG5cdFx0XHRcImRvdWJ0XCI6IFwiZG91YnRcIixcblx0XHRcdFwiZWVuXCI6IFwiZWVuXCIsXG5cdFx0XHRcImZhbHp5XCI6IFwiZmFsenlcIixcblx0XHRcdFwiaGFyZGVuXCI6IFwiaGFyZGVuXCIsXG5cdFx0XHRcIm5zcnRcIjogXCJuc3J0XCIsXG5cdFx0XHRcInNoZnRcIjogXCJzaGZ0XCJcblx0XHR9XG5cdEBlbmQtaW5jbHVkZVxuKi9cblxuY29uc3QgZGVwaGVyID0gcmVxdWlyZSggXCJkZXBoZXJcIiApO1xuY29uc3QgZGVlcXVhbCA9IHJlcXVpcmUoIFwiZGVlcXVhbFwiICk7XG5jb25zdCBkb3VidCA9IHJlcXVpcmUoIFwiZG91YnRcIiApO1xuY29uc3QgZWVuID0gcmVxdWlyZSggXCJlZW5cIiApO1xuY29uc3QgZmFsenkgPSByZXF1aXJlKCBcImZhbHp5XCIgKTtcbmNvbnN0IGhhcmRlbiA9IHJlcXVpcmUoIFwiaGFyZGVuXCIgKTtcbmNvbnN0IG5zcnQgPSByZXF1aXJlKCBcIm5zcnRcIiApO1xuY29uc3Qgc2hmdCA9IHJlcXVpcmUoIFwic2hmdFwiICk7XG5cbmNvbnN0IGV4ZW1wdCA9IGZ1bmN0aW9uIGV4ZW1wdCggbGlzdCwgZW50aXR5LCBleGVtcHRlciwgaW5kZXgsIHJlc2lkdWUgKXtcblx0Lyo7XG5cdFx0QG1ldGEtY29uZmlndXJhdGlvbjpcblx0XHRcdHtcblx0XHRcdFx0XCJsaXN0OnJlcXVpcmVkXCI6IEFycmF5XG5cdFx0XHRcdFwiZW50aXR5OnJlcXVpcmVkXCI6IFwiKlwiLFxuXHRcdFx0XHRcImV4ZW1wdGVyXCI6IFwiZnVuY3Rpb25cIixcblx0XHRcdFx0XCJpbmRleFwiOiBcIm51bWJlclwiLFxuXHRcdFx0XHRcInJlc2lkdWVcIjogQXJyYXlcblx0XHRcdH1cblx0XHRAZW5kLW1ldGEtY29uZmlndXJhdGlvblxuXHQqL1xuXG5cdGlmKCAhZG91YnQoIGxpc3QsIEFSUkFZICkgKXtcblx0XHR0aHJvdyBuZXcgRXJyb3IoIFwiaW52YWxpZCBsaXN0XCIgKTtcblx0fVxuXG5cdGlmKCBmYWx6eSggZW50aXR5ICkgJiYgZmFsenkoIGV4ZW1wdGVyICkgKXtcblx0XHRyZXR1cm4gbGlzdDtcblx0fVxuXG5cdGxldCBwYXJhbWV0ZXIgPSBzaGZ0KCBhcmd1bWVudHMsIDIgKTtcblx0ZXhlbXB0ZXIgPSBkZXBoZXIoIHBhcmFtZXRlciwgRlVOQ1RJT04sIGZ1bmN0aW9uIGV4ZW1wdGVyKCBlbGVtZW50LCBlbnRpdHksIGluZGV4ICl7XG5cdFx0cmV0dXJuIGRlZXF1YWwoIGVsZW1lbnQsIGVudGl0eSApO1xuXHR9ICk7XG5cdGluZGV4ID0gZGVwaGVyKCBwYXJhbWV0ZXIsIE5VTUJFUiwgMCApO1xuXHRyZXNpZHVlID0gZGVwaGVyKCBwYXJhbWV0ZXIsIEFycmF5LCBbIF0gKTtcblxuXHRsZXQgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG5cdHdoaWxlKCBpbmRleCA8IGxlbmd0aCApe1xuXHRcdGxldCBlbGVtZW50ID0gbGlzdFsgaW5kZXggXTtcblxuXHRcdGlmKCBleGVtcHRlciggZWxlbWVudCwgZW50aXR5LCBpbmRleCApICl7XG5cdFx0XHRsaXN0LnNwbGljZSggaW5kZXgsIDEgKS5mb3JFYWNoKCAoIGVsZW1lbnQgKSA9PiBuc3J0KCByZXNpZHVlLCBlbGVtZW50ICkgKTtcblxuXHRcdFx0ZXhlbXB0KCBsaXN0LCBlbnRpdHksIGV4ZW1wdGVyLCBpbmRleCsrLCByZXNpZHVlICk7XG5cblx0XHRcdGJyZWFrO1xuXG5cdFx0fWVsc2V7XG5cdFx0XHRpbmRleCsrO1xuXHRcdH1cblx0fVxuXG5cdGlmKCBmYWx6eSggbGlzdC5yZXNpZHVlICkgKXtcblx0XHRoYXJkZW4oIFwicmVzaWR1ZVwiLCByZXNpZHVlLCBsaXN0ICk7XG5cblx0fWVsc2V7XG5cdFx0cmVzaWR1ZS5mb3JFYWNoKCAoIGVsZW1lbnQgKSA9PiBuc3J0KCBsaXN0LnJlc2lkdWUsIGVsZW1lbnQgKSApO1xuXHR9XG5cblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4ZW1wdFxuIl19
//# sourceMappingURL=exempt.support.js.map
