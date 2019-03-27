var userId = Session.getTemporaryActiveUserKey() || null;
if (userId)
  userId = '...' + userId.slice(-10);
var userEmail = Session.getEffectiveUser().getEmail()

function log(x) {
  var now = new Date;
  // var timestamp = Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss:SSS Z') + ' ';
  if (x && typeof x === 'object')
    x = JSON.stringify(x);
  console.log(`v${version} ${getFunctionName()}: ${userId} ${userEmail}: ${x}`);
}

function getFunctionName() {

  var functionName = ''
  try {

    throw new Error('Throw error to get stack trace');

  } catch (error) {

    // The calling function we're interested in is up a few levels
    functionName = error.stack.split('\n')[2].replace('at', '');
  }
  return functionName
}

function alert(msg) {
  var ui = SpreadsheetApp.getUi();
  ui.alert(msg);
}

function isValidDate(d) {
  return d instanceof Date && !isNaN(d.valueOf());
}

function formatDate(date: Date) {

  if(! isValidDate(date))
    return null;
  var dayOfMOnth = date.getDate();
  var month = date.getMonth() + 1; //January is 0!
  var yyyy = date.getFullYear();
  let dd = (dayOfMOnth < 10) ? '0' + dayOfMOnth : '' + dayOfMOnth;
  let mm = (month < 10) ? '0' + month : '' + month;
  return `${yyyy}-${mm}-${dd}`;

}

// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function (predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    },
    configurable: true,
    writable: true
  });
}


if (!Object.entries) {
  Object.entries = function (obj) {
    var ownProps = Object.keys(obj),
      i = ownProps.length,
      resArray = new Array(i); // preallocate the Array
    while (i--)
      resArray[i] = [ownProps[i], obj[ownProps[i]]];

    return resArray;
  };
}

//PolyfillSection
if (!Array.prototype.fill) {
  Object.defineProperty(Array.prototype, 'fill', {
    value: function (value) {

      // Steps 1-2.
      if (this == null) {
        throw new TypeError('this is null or not defined');
      }

      var O = Object(this);

      // Steps 3-5.
      var len = O.length >>> 0;

      // Steps 6-7.
      var start = arguments[1];
      var relativeStart = start >> 0;

      // Step 8.
      var k = relativeStart < 0 ?
        Math.max(len + relativeStart, 0) :
        Math.min(relativeStart, len);

      // Steps 9-10.
      var end = arguments[2];
      var relativeEnd = end === undefined ?
        len : end >> 0;

      // Step 11.
      var final = relativeEnd < 0 ?
        Math.max(len + relativeEnd, 0) :
        Math.min(relativeEnd, len);

      // Step 12.
      while (k < final) {
        O[k] = value;
        k++;
      }

      // Step 13.
      return O;
    }
  });
}

