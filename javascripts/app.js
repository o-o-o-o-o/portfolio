(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// Default Babel Polyfill, be careful, be sure you need it
// because it's ~6000 lines of code unminified
// import 'babel-polyfill';

require('modernizr');

var _xp = require('./xp/xp');

var _xp2 = _interopRequireDefault(_xp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import * as tools from '@84paris/84.tools';

// Your imports
// import MyComponent from './component.es6'
console.log('%c 84.Boilerplate ===== Your app is ready.', 'background: #000; color: #FFF');

},{"./xp/xp":3,"modernizr":2}],2:[function(require,module,exports){
(function (global){
; var __browserify_shim_require__=require;(function browserifyShim(module, exports, require, define, browserify_shim__define__module__export__) {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * modernizr v3.3.1
 * Build http://modernizr.com/download?-cssanimations-csscalc-cssgradients-csstransforms3d-history-webgl-setclasses-shiv-dontmin
 *
 * Copyright (c)
 *  Faruk Ates
 *  Paul Irish
 *  Alex Sexton
 *  Ryan Seddon
 *  Patrick Kettner
 *  Stu Cox
 *  Richard Herrera

 * MIT License
 */

/*
 * Modernizr tests which native CSS3 and HTML5 features are available in the
 * current UA and makes the results available to you in two ways: as properties on
 * a global `Modernizr` object, and as classes on the `<html>` element. This
 * information allows you to progressively enhance your pages with a granular level
 * of control over the experience.
*/

;(function (window, document, undefined) {
  var classes = [];

  var tests = [];

  /**
   *
   * ModernizrProto is the constructor for Modernizr
   *
   * @class
   * @access public
   */

  var ModernizrProto = {
    // The current version, dummy
    _version: '3.3.1',

    // Any settings that don't work as separate modules
    // can go in here as configuration.
    _config: {
      'classPrefix': '',
      'enableClasses': true,
      'enableJSClass': true,
      'usePrefixes': true
    },

    // Queue of tests
    _q: [],

    // Stub these for people who are listening
    on: function on(test, cb) {
      // I don't really think people should do this, but we can
      // safe guard it a bit.
      // -- NOTE:: this gets WAY overridden in src/addTest for actual async tests.
      // This is in case people listen to synchronous tests. I would leave it out,
      // but the code to *disallow* sync tests in the real version of this
      // function is actually larger than this.
      var self = this;
      setTimeout(function () {
        cb(self[test]);
      }, 0);
    },

    addTest: function addTest(name, fn, options) {
      tests.push({ name: name, fn: fn, options: options });
    },

    addAsyncTest: function addAsyncTest(fn) {
      tests.push({ name: null, fn: fn });
    }
  };

  // Fake some of Object.create so we can force non test results to be non "own" properties.
  var Modernizr = function Modernizr() {};
  Modernizr.prototype = ModernizrProto;

  // Leak modernizr globally when you `require` it rather than force it here.
  // Overwrite name so constructor name is nicer :D
  Modernizr = new Modernizr();

  /*!
  {
    "name": "History API",
    "property": "history",
    "caniuse": "history",
    "tags": ["history"],
    "authors": ["Hay Kranen", "Alexander Farkas"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/html51/browsers.html#the-history-interface"
    }, {
      "name": "MDN documentation",
      "href": "https://developer.mozilla.org/en-US/docs/Web/API/window.history"
    }],
    "polyfills": ["historyjs", "html5historyapi"]
  }
  !*/
  /* DOC
  Detects support for the History API for manipulating the browser session history.
  */

  Modernizr.addTest('history', function () {
    // Issue #733
    // The stock browser on Android 2.2 & 2.3, and 4.0.x returns positive on history support
    // Unfortunately support is really buggy and there is no clean way to detect
    // these bugs, so we fall back to a user agent sniff :(
    var ua = navigator.userAgent;

    // We only want Android 2 and 4.0, stock browser, and not Chrome which identifies
    // itself as 'Mobile Safari' as well, nor Windows Phone (issue #1471).
    if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
      return false;
    }

    // Return the regular check
    return window.history && 'pushState' in window.history;
  });

  /**
   * is returns a boolean if the typeof an obj is exactly type.
   *
   * @access private
   * @function is
   * @param {*} obj - A thing we want to check the type of
   * @param {string} type - A string to compare the typeof against
   * @returns {boolean}
   */

  function is(obj, type) {
    return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === type;
  }
  ;

  /**
   * Run through all tests and detect their support in the current UA.
   *
   * @access private
   */

  function testRunner() {
    var featureNames;
    var feature;
    var aliasIdx;
    var result;
    var nameIdx;
    var featureName;
    var featureNameSplit;

    for (var featureIdx in tests) {
      if (tests.hasOwnProperty(featureIdx)) {
        featureNames = [];
        feature = tests[featureIdx];
        // run the test, throw the return value into the Modernizr,
        // then based on that boolean, define an appropriate className
        // and push it into an array of classes we'll join later.
        //
        // If there is no name, it's an 'async' test that is run,
        // but not directly added to the object. That should
        // be done with a post-run addTest call.
        if (feature.name) {
          featureNames.push(feature.name.toLowerCase());

          if (feature.options && feature.options.aliases && feature.options.aliases.length) {
            // Add all the aliases into the names list
            for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {
              featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
            }
          }
        }

        // Run the test, or use the raw value if it's not a function
        result = is(feature.fn, 'function') ? feature.fn() : feature.fn;

        // Set each of the names on the Modernizr object
        for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {
          featureName = featureNames[nameIdx];
          // Support dot properties as sub tests. We don't do checking to make sure
          // that the implied parent tests have been added. You must call them in
          // order (either in the test, or make the parent test a dependency).
          //
          // Cap it to TWO to make the logic simple and because who needs that kind of subtesting
          // hashtag famous last words
          featureNameSplit = featureName.split('.');

          if (featureNameSplit.length === 1) {
            Modernizr[featureNameSplit[0]] = result;
          } else {
            // cast to a Boolean, if not one already
            /* jshint -W053 */
            if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
              Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
            }

            Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;
          }

          classes.push((result ? '' : 'no-') + featureNameSplit.join('-'));
        }
      }
    }
  }
  ;

  /**
   * docElement is a convenience wrapper to grab the root element of the document
   *
   * @access private
   * @returns {HTMLElement|SVGElement} The root element of the document
   */

  var docElement = document.documentElement;

  /**
   * A convenience helper to check if the document we are running in is an SVG document
   *
   * @access private
   * @returns {boolean}
   */

  var isSVG = docElement.nodeName.toLowerCase() === 'svg';

  /**
   * setClasses takes an array of class names and adds them to the root element
   *
   * @access private
   * @function setClasses
   * @param {string[]} classes - Array of class names
   */

  // Pass in an and array of class names, e.g.:
  //  ['no-webp', 'borderradius', ...]
  function setClasses(classes) {
    var className = docElement.className;
    var classPrefix = Modernizr._config.classPrefix || '';

    if (isSVG) {
      className = className.baseVal;
    }

    // Change `no-js` to `js` (independently of the `enableClasses` option)
    // Handle classPrefix on this too
    if (Modernizr._config.enableJSClass) {
      var reJS = new RegExp('(^|\\s)' + classPrefix + 'no-js(\\s|$)');
      className = className.replace(reJS, '$1' + classPrefix + 'js$2');
    }

    if (Modernizr._config.enableClasses) {
      // Add the new classes
      className += ' ' + classPrefix + classes.join(' ' + classPrefix);
      isSVG ? docElement.className.baseVal = className : docElement.className = className;
    }
  }

  ;

  /**
    * @optionName html5shiv
    * @optionProp html5shiv
    */

  // Take the html5 variable out of the html5shiv scope so we can return it.
  var html5;
  if (!isSVG) {
    /**
     * @preserve HTML5 Shiv 3.7.3 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
     */
    ;(function (window, document) {
      /*jshint evil:true */
      /** version */
      var version = '3.7.3';

      /** Preset options */
      var options = window.html5 || {};

      /** Used to skip problem elements */
      var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

      /** Not all elements can be cloned in IE **/
      var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

      /** Detect whether the browser supports default html5 styles */
      var supportsHtml5Styles;

      /** Name of the expando, to work with multiple documents or to re-shiv one document */
      var expando = '_html5shiv';

      /** The id for the the documents expando */
      var expanID = 0;

      /** Cached data for each document */
      var expandoData = {};

      /** Detect whether the browser supports unknown elements */
      var supportsUnknownElements;

      (function () {
        try {
          var a = document.createElement('a');
          a.innerHTML = '<xyz></xyz>';
          //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
          supportsHtml5Styles = 'hidden' in a;

          supportsUnknownElements = a.childNodes.length == 1 || function () {
            // assign a false positive if unable to shiv
            document.createElement('a');
            var frag = document.createDocumentFragment();
            return typeof frag.cloneNode == 'undefined' || typeof frag.createDocumentFragment == 'undefined' || typeof frag.createElement == 'undefined';
          }();
        } catch (e) {
          // assign a false positive if detection fails => unable to shiv
          supportsHtml5Styles = true;
          supportsUnknownElements = true;
        }
      })();

      /*--------------------------------------------------------------------------*/

      /**
       * Creates a style sheet with the given CSS text and adds it to the document.
       * @private
       * @param {Document} ownerDocument The document.
       * @param {String} cssText The CSS text.
       * @returns {StyleSheet} The style element.
       */
      function addStyleSheet(ownerDocument, cssText) {
        var p = ownerDocument.createElement('p'),
            parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

        p.innerHTML = 'x<style>' + cssText + '</style>';
        return parent.insertBefore(p.lastChild, parent.firstChild);
      }

      /**
       * Returns the value of `html5.elements` as an array.
       * @private
       * @returns {Array} An array of shived element node names.
       */
      function getElements() {
        var elements = html5.elements;
        return typeof elements == 'string' ? elements.split(' ') : elements;
      }

      /**
       * Extends the built-in list of html5 elements
       * @memberOf html5
       * @param {String|Array} newElements whitespace separated list or array of new element names to shiv
       * @param {Document} ownerDocument The context document.
       */
      function addElements(newElements, ownerDocument) {
        var elements = html5.elements;
        if (typeof elements != 'string') {
          elements = elements.join(' ');
        }
        if (typeof newElements != 'string') {
          newElements = newElements.join(' ');
        }
        html5.elements = elements + ' ' + newElements;
        shivDocument(ownerDocument);
      }

      /**
       * Returns the data associated to the given document
       * @private
       * @param {Document} ownerDocument The document.
       * @returns {Object} An object of data.
       */
      function getExpandoData(ownerDocument) {
        var data = expandoData[ownerDocument[expando]];
        if (!data) {
          data = {};
          expanID++;
          ownerDocument[expando] = expanID;
          expandoData[expanID] = data;
        }
        return data;
      }

      /**
       * returns a shived element for the given nodeName and document
       * @memberOf html5
       * @param {String} nodeName name of the element
       * @param {Document|DocumentFragment} ownerDocument The context document.
       * @returns {Object} The shived element.
       */
      function createElement(nodeName, ownerDocument, data) {
        if (!ownerDocument) {
          ownerDocument = document;
        }
        if (supportsUnknownElements) {
          return ownerDocument.createElement(nodeName);
        }
        if (!data) {
          data = getExpandoData(ownerDocument);
        }
        var node;

        if (data.cache[nodeName]) {
          node = data.cache[nodeName].cloneNode();
        } else if (saveClones.test(nodeName)) {
          node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
        } else {
          node = data.createElem(nodeName);
        }

        // Avoid adding some elements to fragments in IE < 9 because
        // * Attributes like `name` or `type` cannot be set/changed once an element
        //   is inserted into a document/fragment
        // * Link elements with `src` attributes that are inaccessible, as with
        //   a 403 response, will cause the tab/window to crash
        // * Script elements appended to fragments will execute when their `src`
        //   or `text` property is set
        return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
      }

      /**
       * returns a shived DocumentFragment for the given document
       * @memberOf html5
       * @param {Document} ownerDocument The context document.
       * @returns {Object} The shived DocumentFragment.
       */
      function createDocumentFragment(ownerDocument, data) {
        if (!ownerDocument) {
          ownerDocument = document;
        }
        if (supportsUnknownElements) {
          return ownerDocument.createDocumentFragment();
        }
        data = data || getExpandoData(ownerDocument);
        var clone = data.frag.cloneNode(),
            i = 0,
            elems = getElements(),
            l = elems.length;
        for (; i < l; i++) {
          clone.createElement(elems[i]);
        }
        return clone;
      }

      /**
       * Shivs the `createElement` and `createDocumentFragment` methods of the document.
       * @private
       * @param {Document|DocumentFragment} ownerDocument The document.
       * @param {Object} data of the document.
       */
      function shivMethods(ownerDocument, data) {
        if (!data.cache) {
          data.cache = {};
          data.createElem = ownerDocument.createElement;
          data.createFrag = ownerDocument.createDocumentFragment;
          data.frag = data.createFrag();
        }

        ownerDocument.createElement = function (nodeName) {
          //abort shiv
          if (!html5.shivMethods) {
            return data.createElem(nodeName);
          }
          return createElement(nodeName, ownerDocument, data);
        };

        ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' + 'var n=f.cloneNode(),c=n.createElement;' + 'h.shivMethods&&(' +
        // unroll the `createElement` calls
        getElements().join().replace(/[\w\-:]+/g, function (nodeName) {
          data.createElem(nodeName);
          data.frag.createElement(nodeName);
          return 'c("' + nodeName + '")';
        }) + ');return n}')(html5, data.frag);
      }

      /*--------------------------------------------------------------------------*/

      /**
       * Shivs the given document.
       * @memberOf html5
       * @param {Document} ownerDocument The document to shiv.
       * @returns {Document} The shived document.
       */
      function shivDocument(ownerDocument) {
        if (!ownerDocument) {
          ownerDocument = document;
        }
        var data = getExpandoData(ownerDocument);

        if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
          data.hasCSS = !!addStyleSheet(ownerDocument,
          // corrects block display not defined in IE6/7/8/9
          'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
          // adds styling not present in IE6/7/8/9
          'mark{background:#FF0;color:#000}' +
          // hides non-rendered elements
          'template{display:none}');
        }
        if (!supportsUnknownElements) {
          shivMethods(ownerDocument, data);
        }
        return ownerDocument;
      }

      /*--------------------------------------------------------------------------*/

      /**
       * The `html5` object is exposed so that more elements can be shived and
       * existing shiving can be detected on iframes.
       * @type Object
       * @example
       *
       * // options can be changed before the script is included
       * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
       */
      var html5 = {

        /**
         * An array or space separated string of node names of the elements to shiv.
         * @memberOf html5
         * @type Array|String
         */
        'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video',

        /**
         * current version of html5shiv
         */
        'version': version,

        /**
         * A flag to indicate that the HTML5 style sheet should be inserted.
         * @memberOf html5
         * @type Boolean
         */
        'shivCSS': options.shivCSS !== false,

        /**
         * Is equal to true if a browser supports creating unknown/HTML5 elements
         * @memberOf html5
         * @type boolean
         */
        'supportsUnknownElements': supportsUnknownElements,

        /**
         * A flag to indicate that the document's `createElement` and `createDocumentFragment`
         * methods should be overwritten.
         * @memberOf html5
         * @type Boolean
         */
        'shivMethods': options.shivMethods !== false,

        /**
         * A string to describe the type of `html5` object ("default" or "default print").
         * @memberOf html5
         * @type String
         */
        'type': 'default',

        // shivs the document according to the specified `html5` object options
        'shivDocument': shivDocument,

        //creates a shived element
        createElement: createElement,

        //creates a shived documentFragment
        createDocumentFragment: createDocumentFragment,

        //extends list of elements
        addElements: addElements
      };

      /*--------------------------------------------------------------------------*/

      // expose html5
      window.html5 = html5;

      // shiv the document
      shivDocument(document);

      if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) == 'object' && module.exports) {
        module.exports = html5;
      }
    })(typeof window !== "undefined" ? window : this, document);
  }
  ;

  /**
   * createElement is a convenience wrapper around document.createElement. Since we
   * use createElement all over the place, this allows for (slightly) smaller code
   * as well as abstracting away issues with creating elements in contexts other than
   * HTML documents (e.g. SVG documents).
   *
   * @access private
   * @function createElement
   * @returns {HTMLElement|SVGElement} An HTML or SVG element
   */

  function createElement() {
    if (typeof document.createElement !== 'function') {
      // This is the case in IE7, where the type of createElement is "object".
      // For this reason, we cannot call apply() as Object is not a Function.
      return document.createElement(arguments[0]);
    } else if (isSVG) {
      return document.createElementNS.call(document, 'http://www.w3.org/2000/svg', arguments[0]);
    } else {
      return document.createElement.apply(document, arguments);
    }
  }

  ;
  /*!
  {
    "name": "WebGL",
    "property": "webgl",
    "caniuse": "webgl",
    "tags": ["webgl", "graphics"],
    "polyfills": ["jebgl", "cwebgl", "iewebgl"]
  }
  !*/

  Modernizr.addTest('webgl', function () {
    var canvas = createElement('canvas');
    var supports = 'probablySupportsContext' in canvas ? 'probablySupportsContext' : 'supportsContext';
    if (supports in canvas) {
      return canvas[supports]('webgl') || canvas[supports]('experimental-webgl');
    }
    return 'WebGLRenderingContext' in window;
  });

  /**
   * List of property values to set for css tests. See ticket #21
   * http://git.io/vUGl4
   *
   * @memberof Modernizr
   * @name Modernizr._prefixes
   * @optionName Modernizr._prefixes
   * @optionProp prefixes
   * @access public
   * @example
   *
   * Modernizr._prefixes is the internal list of prefixes that we test against
   * inside of things like [prefixed](#modernizr-prefixed) and [prefixedCSS](#-code-modernizr-prefixedcss). It is simply
   * an array of kebab-case vendor prefixes you can use within your code.
   *
   * Some common use cases include
   *
   * Generating all possible prefixed version of a CSS property
   * ```js
   * var rule = Modernizr._prefixes.join('transform: rotate(20deg); ');
   *
   * rule === 'transform: rotate(20deg); webkit-transform: rotate(20deg); moz-transform: rotate(20deg); o-transform: rotate(20deg); ms-transform: rotate(20deg);'
   * ```
   *
   * Generating all possible prefixed version of a CSS value
   * ```js
   * rule = 'display:' +  Modernizr._prefixes.join('flex; display:') + 'flex';
   *
   * rule === 'display:flex; display:-webkit-flex; display:-moz-flex; display:-o-flex; display:-ms-flex; display:flex'
   * ```
   */

  // we use ['',''] rather than an empty array in order to allow a pattern of .`join()`ing prefixes to test
  // values in feature detects to continue to work
  var prefixes = ModernizrProto._config.usePrefixes ? ' -webkit- -moz- -o- -ms- '.split(' ') : ['', ''];

  // expose these for the plugin API. Look in the source for how to join() them against your input
  ModernizrProto._prefixes = prefixes;

  /*!
  {
    "name": "CSS Calc",
    "property": "csscalc",
    "caniuse": "calc",
    "tags": ["css"],
    "builderAliases": ["css_calc"],
    "authors": ["@calvein"]
  }
  !*/
  /* DOC
  Method of allowing calculated values for length units. For example:
  
  ```css
  //lem {
    width: calc(100% - 3em);
  }
  ```
  */

  Modernizr.addTest('csscalc', function () {
    var prop = 'width:';
    var value = 'calc(10px);';
    var el = createElement('a');

    el.style.cssText = prop + prefixes.join(value + prop);

    return !!el.style.length;
  });

  /*!
  {
    "name": "CSS Gradients",
    "caniuse": "css-gradients",
    "property": "cssgradients",
    "tags": ["css"],
    "knownBugs": ["False-positives on webOS (https://github.com/Modernizr/Modernizr/issues/202)"],
    "notes": [{
      "name": "Webkit Gradient Syntax",
      "href": "https://webkit.org/blog/175/introducing-css-gradients/"
    },{
      "name": "Linear Gradient Syntax",
      "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient"
    },{
      "name": "W3C Gradient Spec",
      "href": "https://drafts.csswg.org/css-images-3/#gradients"
    }]
  }
  !*/

  Modernizr.addTest('cssgradients', function () {

    var str1 = 'background-image:';
    var str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));';
    var css = '';
    var angle;

    for (var i = 0, len = prefixes.length - 1; i < len; i++) {
      angle = i === 0 ? 'to ' : '';
      css += str1 + prefixes[i] + 'linear-gradient(' + angle + 'left top, #9f9, white);';
    }

    if (Modernizr._config.usePrefixes) {
      // legacy webkit syntax (FIXME: remove when syntax not in use anymore)
      css += str1 + '-webkit-' + str2;
    }

    var elem = createElement('a');
    var style = elem.style;
    style.cssText = css;

    // IE6 returns undefined so cast to string
    return ('' + style.backgroundImage).indexOf('gradient') > -1;
  });

  /*!
  {
    "name": "CSS Supports",
    "property": "supports",
    "caniuse": "css-featurequeries",
    "tags": ["css"],
    "builderAliases": ["css_supports"],
    "notes": [{
      "name": "W3 Spec",
      "href": "http://dev.w3.org/csswg/css3-conditional/#at-supports"
    },{
      "name": "Related Github Issue",
      "href": "github.com/Modernizr/Modernizr/issues/648"
    },{
      "name": "W3 Info",
      "href": "http://dev.w3.org/csswg/css3-conditional/#the-csssupportsrule-interface"
    }]
  }
  !*/

  var newSyntax = 'CSS' in window && 'supports' in window.CSS;
  var oldSyntax = 'supportsCSS' in window;
  Modernizr.addTest('supports', newSyntax || oldSyntax);

  /**
   * getBody returns the body of a document, or an element that can stand in for
   * the body if a real body does not exist
   *
   * @access private
   * @function getBody
   * @returns {HTMLElement|SVGElement} Returns the real body of a document, or an
   * artificially created element that stands in for the body
   */

  function getBody() {
    // After page load injecting a fake body doesn't work so check if body exists
    var body = document.body;

    if (!body) {
      // Can't use the real body create a fake one.
      body = createElement(isSVG ? 'svg' : 'body');
      body.fake = true;
    }

    return body;
  }

  ;

  /**
   * injectElementWithStyles injects an element with style element and some CSS rules
   *
   * @access private
   * @function injectElementWithStyles
   * @param {string} rule - String representing a css rule
   * @param {function} callback - A function that is used to test the injected element
   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
   * @returns {boolean}
   */

  function injectElementWithStyles(rule, callback, nodes, testnames) {
    var mod = 'modernizr';
    var style;
    var ret;
    var node;
    var docOverflow;
    var div = createElement('div');
    var body = getBody();

    if (parseInt(nodes, 10)) {
      // In order not to give false positives we create a node for each test
      // This also allows the method to scale for unspecified uses
      while (nodes--) {
        node = createElement('div');
        node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
        div.appendChild(node);
      }
    }

    style = createElement('style');
    style.type = 'text/css';
    style.id = 's' + mod;

    // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
    // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
    (!body.fake ? div : body).appendChild(style);
    body.appendChild(div);

    if (style.styleSheet) {
      style.styleSheet.cssText = rule;
    } else {
      style.appendChild(document.createTextNode(rule));
    }
    div.id = mod;

    if (body.fake) {
      //avoid crashing IE8, if background image is used
      body.style.background = '';
      //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
      body.style.overflow = 'hidden';
      docOverflow = docElement.style.overflow;
      docElement.style.overflow = 'hidden';
      docElement.appendChild(body);
    }

    ret = callback(div, rule);
    // If this is done after page load we don't want to remove the body so check if body exists
    if (body.fake) {
      body.parentNode.removeChild(body);
      docElement.style.overflow = docOverflow;
      // Trigger layout so kinetic scrolling isn't disabled in iOS6+
      docElement.offsetHeight;
    } else {
      div.parentNode.removeChild(div);
    }

    return !!ret;
  }

  ;

  /**
   * testStyles injects an element with style element and some CSS rules
   *
   * @memberof Modernizr
   * @name Modernizr.testStyles
   * @optionName Modernizr.testStyles()
   * @optionProp testStyles
   * @access public
   * @function testStyles
   * @param {string} rule - String representing a css rule
   * @param {function} callback - A function that is used to test the injected element
   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
   * @returns {boolean}
   * @example
   *
   * `Modernizr.testStyles` takes a CSS rule and injects it onto the current page
   * along with (possibly multiple) DOM elements. This lets you check for features
   * that can not be detected by simply checking the [IDL](https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/Interface_development_guide/IDL_interface_rules).
   *
   * ```js
   * Modernizr.testStyles('#modernizr { width: 9px; color: papayawhip; }', function(elem, rule) {
   *   // elem is the first DOM node in the page (by default #modernizr)
   *   // rule is the first argument you supplied - the CSS rule in string form
   *
   *   addTest('widthworks', elem.style.width === '9px')
   * });
   * ```
   *
   * If your test requires multiple nodes, you can include a third argument
   * indicating how many additional div elements to include on the page. The
   * additional nodes are injected as children of the `elem` that is returned as
   * the first argument to the callback.
   *
   * ```js
   * Modernizr.testStyles('#modernizr {width: 1px}; #modernizr2 {width: 2px}', function(elem) {
   *   document.getElementById('modernizr').style.width === '1px'; // true
   *   document.getElementById('modernizr2').style.width === '2px'; // true
   *   elem.firstChild === document.getElementById('modernizr2'); // true
   * }, 1);
   * ```
   *
   * By default, all of the additional elements have an ID of `modernizr[n]`, where
   * `n` is its index (e.g. the first additional, second overall is `#modernizr2`,
   * the second additional is `#modernizr3`, etc.).
   * If you want to have more meaningful IDs for your function, you can provide
   * them as the fourth argument, as an array of strings
   *
   * ```js
   * Modernizr.testStyles('#foo {width: 10px}; #bar {height: 20px}', function(elem) {
   *   elem.firstChild === document.getElementById('foo'); // true
   *   elem.lastChild === document.getElementById('bar'); // true
   * }, 2, ['foo', 'bar']);
   * ```
   *
   */

  var testStyles = ModernizrProto.testStyles = injectElementWithStyles;

  /**
   * If the browsers follow the spec, then they would expose vendor-specific style as:
   *   elem.style.WebkitBorderRadius
   * instead of something like the following, which would be technically incorrect:
   *   elem.style.webkitBorderRadius
    * Webkit ghosts their properties in lowercase but Opera & Moz do not.
   * Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
   *   erik.eae.net/archives/2008/03/10/21.48.10/
    * More here: github.com/Modernizr/Modernizr/issues/issue/21
   *
   * @access private
   * @returns {string} The string representing the vendor-specific style properties
   */

  var omPrefixes = 'Moz O ms Webkit';

  var cssomPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.split(' ') : [];
  ModernizrProto._cssomPrefixes = cssomPrefixes;

  /**
   * List of JavaScript DOM values used for tests
   *
   * @memberof Modernizr
   * @name Modernizr._domPrefixes
   * @optionName Modernizr._domPrefixes
   * @optionProp domPrefixes
   * @access public
   * @example
   *
   * Modernizr._domPrefixes is exactly the same as [_prefixes](#modernizr-_prefixes), but rather
   * than kebab-case properties, all properties are their Capitalized variant
   *
   * ```js
   * Modernizr._domPrefixes === [ "Moz", "O", "ms", "Webkit" ];
   * ```
   */

  var domPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(' ') : [];
  ModernizrProto._domPrefixes = domPrefixes;

  /**
   * contains checks to see if a string contains another string
   *
   * @access private
   * @function contains
   * @param {string} str - The string we want to check for substrings
   * @param {string} substr - The substring we want to search the first string for
   * @returns {boolean}
   */

  function contains(str, substr) {
    return !!~('' + str).indexOf(substr);
  }

  ;

  /**
   * cssToDOM takes a kebab-case string and converts it to camelCase
   * e.g. box-sizing -> boxSizing
   *
   * @access private
   * @function cssToDOM
   * @param {string} name - String name of kebab-case prop we want to convert
   * @returns {string} The camelCase version of the supplied name
   */

  function cssToDOM(name) {
    return name.replace(/([a-z])-([a-z])/g, function (str, m1, m2) {
      return m1 + m2.toUpperCase();
    }).replace(/^-/, '');
  }
  ;

  /**
   * fnBind is a super small [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) polyfill.
   *
   * @access private
   * @function fnBind
   * @param {function} fn - a function you want to change `this` reference to
   * @param {object} that - the `this` you want to call the function with
   * @returns {function} The wrapped version of the supplied function
   */

  function fnBind(fn, that) {
    return function () {
      return fn.apply(that, arguments);
    };
  }

  ;

  /**
   * testDOMProps is a generic DOM property test; if a browser supports
   *   a certain property, it won't return undefined for it.
   *
   * @access private
   * @function testDOMProps
   * @param {array.<string>} props - An array of properties to test for
   * @param {object} obj - An object or Element you want to use to test the parameters again
   * @param {boolean|object} elem - An Element to bind the property lookup again. Use `false` to prevent the check
   */
  function testDOMProps(props, obj, elem) {
    var item;

    for (var i in props) {
      if (props[i] in obj) {

        // return the property name as a string
        if (elem === false) {
          return props[i];
        }

        item = obj[props[i]];

        // let's bind a function
        if (is(item, 'function')) {
          // bind to obj unless overriden
          return fnBind(item, elem || obj);
        }

        // return the unbound function or obj or value
        return item;
      }
    }
    return false;
  }

  ;

  /**
   * Create our "modernizr" element that we do most feature tests on.
   *
   * @access private
   */

  var modElem = {
    elem: createElement('modernizr')
  };

  // Clean up this element
  Modernizr._q.push(function () {
    delete modElem.elem;
  });

  var mStyle = {
    style: modElem.elem.style
  };

  // kill ref for gc, must happen before mod.elem is removed, so we unshift on to
  // the front of the queue.
  Modernizr._q.unshift(function () {
    delete mStyle.style;
  });

  /**
   * domToCSS takes a camelCase string and converts it to kebab-case
   * e.g. boxSizing -> box-sizing
   *
   * @access private
   * @function domToCSS
   * @param {string} name - String name of camelCase prop we want to convert
   * @returns {string} The kebab-case version of the supplied name
   */

  function domToCSS(name) {
    return name.replace(/([A-Z])/g, function (str, m1) {
      return '-' + m1.toLowerCase();
    }).replace(/^ms-/, '-ms-');
  }
  ;

  /**
   * nativeTestProps allows for us to use native feature detection functionality if available.
   * some prefixed form, or false, in the case of an unsupported rule
   *
   * @access private
   * @function nativeTestProps
   * @param {array} props - An array of property names
   * @param {string} value - A string representing the value we want to check via @supports
   * @returns {boolean|undefined} A boolean when @supports exists, undefined otherwise
   */

  // Accepts a list of property names and a single value
  // Returns `undefined` if native detection not available
  function nativeTestProps(props, value) {
    var i = props.length;
    // Start with the JS API: http://www.w3.org/TR/css3-conditional/#the-css-interface
    if ('CSS' in window && 'supports' in window.CSS) {
      // Try every prefixed variant of the property
      while (i--) {
        if (window.CSS.supports(domToCSS(props[i]), value)) {
          return true;
        }
      }
      return false;
    }
    // Otherwise fall back to at-rule (for Opera 12.x)
    else if ('CSSSupportsRule' in window) {
        // Build a condition string for every prefixed variant
        var conditionText = [];
        while (i--) {
          conditionText.push('(' + domToCSS(props[i]) + ':' + value + ')');
        }
        conditionText = conditionText.join(' or ');
        return injectElementWithStyles('@supports (' + conditionText + ') { #modernizr { position: absolute; } }', function (node) {
          return getComputedStyle(node, null).position == 'absolute';
        });
      }
    return undefined;
  }
  ;

  // testProps is a generic CSS / DOM property test.

  // In testing support for a given CSS property, it's legit to test:
  //    `elem.style[styleName] !== undefined`
  // If the property is supported it will return an empty string,
  // if unsupported it will return undefined.

  // We'll take advantage of this quick test and skip setting a style
  // on our modernizr element, but instead just testing undefined vs
  // empty string.

  // Property names can be provided in either camelCase or kebab-case.

  function testProps(props, prefixed, value, skipValueTest) {
    skipValueTest = is(skipValueTest, 'undefined') ? false : skipValueTest;

    // Try native detect first
    if (!is(value, 'undefined')) {
      var result = nativeTestProps(props, value);
      if (!is(result, 'undefined')) {
        return result;
      }
    }

    // Otherwise do it properly
    var afterInit, i, propsLength, prop, before;

    // If we don't have a style element, that means we're running async or after
    // the core tests, so we'll need to create our own elements to use

    // inside of an SVG element, in certain browsers, the `style` element is only
    // defined for valid tags. Therefore, if `modernizr` does not have one, we
    // fall back to a less used element and hope for the best.
    var elems = ['modernizr', 'tspan'];
    while (!mStyle.style) {
      afterInit = true;
      mStyle.modElem = createElement(elems.shift());
      mStyle.style = mStyle.modElem.style;
    }

    // Delete the objects if we created them.
    function cleanElems() {
      if (afterInit) {
        delete mStyle.style;
        delete mStyle.modElem;
      }
    }

    propsLength = props.length;
    for (i = 0; i < propsLength; i++) {
      prop = props[i];
      before = mStyle.style[prop];

      if (contains(prop, '-')) {
        prop = cssToDOM(prop);
      }

      if (mStyle.style[prop] !== undefined) {

        // If value to test has been passed in, do a set-and-check test.
        // 0 (integer) is a valid property value, so check that `value` isn't
        // undefined, rather than just checking it's truthy.
        if (!skipValueTest && !is(value, 'undefined')) {

          // Needs a try catch block because of old IE. This is slow, but will
          // be avoided in most cases because `skipValueTest` will be used.
          try {
            mStyle.style[prop] = value;
          } catch (e) {}

          // If the property value has changed, we assume the value used is
          // supported. If `value` is empty string, it'll fail here (because
          // it hasn't changed), which matches how browsers have implemented
          // CSS.supports()
          if (mStyle.style[prop] != before) {
            cleanElems();
            return prefixed == 'pfx' ? prop : true;
          }
        }
        // Otherwise just return true, or the property name if this is a
        // `prefixed()` call
        else {
            cleanElems();
            return prefixed == 'pfx' ? prop : true;
          }
      }
    }
    cleanElems();
    return false;
  }

  ;

  /**
   * testPropsAll tests a list of DOM properties we want to check against.
   * We specify literally ALL possible (known and/or likely) properties on
   * the element including the non-vendor prefixed one, for forward-
   * compatibility.
   *
   * @access private
   * @function testPropsAll
   * @param {string} prop - A string of the property to test for
   * @param {string|object} [prefixed] - An object to check the prefixed properties on. Use a string to skip
   * @param {HTMLElement|SVGElement} [elem] - An element used to test the property and value against
   * @param {string} [value] - A string of a css value
   * @param {boolean} [skipValueTest] - An boolean representing if you want to test if value sticks when set
   */
  function testPropsAll(prop, prefixed, elem, value, skipValueTest) {

    var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
        props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

    // did they call .prefixed('boxSizing') or are we just testing a prop?
    if (is(prefixed, 'string') || is(prefixed, 'undefined')) {
      return testProps(props, prefixed, value, skipValueTest);

      // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
    } else {
      props = (prop + ' ' + domPrefixes.join(ucProp + ' ') + ucProp).split(' ');
      return testDOMProps(props, prefixed, elem);
    }
  }

  // Modernizr.testAllProps() investigates whether a given style property,
  // or any of its vendor-prefixed variants, is recognized
  //
  // Note that the property names must be provided in the camelCase variant.
  // Modernizr.testAllProps('boxSizing')
  ModernizrProto.testAllProps = testPropsAll;

  /**
   * testAllProps determines whether a given CSS property is supported in the browser
   *
   * @memberof Modernizr
   * @name Modernizr.testAllProps
   * @optionName Modernizr.testAllProps()
   * @optionProp testAllProps
   * @access public
   * @function testAllProps
   * @param {string} prop - String naming the property to test (either camelCase or kebab-case)
   * @param {string} [value] - String of the value to test
   * @param {boolean} [skipValueTest=false] - Whether to skip testing that the value is supported when using non-native detection
   * @example
   *
   * testAllProps determines whether a given CSS property, in some prefixed form,
   * is supported by the browser.
   *
   * ```js
   * testAllProps('boxSizing')  // true
   * ```
   *
   * It can optionally be given a CSS value in string form to test if a property
   * value is valid
   *
   * ```js
   * testAllProps('display', 'block') // true
   * testAllProps('display', 'penguin') // false
   * ```
   *
   * A boolean can be passed as a third parameter to skip the value check when
   * native detection (@supports) isn't available.
   *
   * ```js
   * testAllProps('shapeOutside', 'content-box', true);
   * ```
   */

  function testAllProps(prop, value, skipValueTest) {
    return testPropsAll(prop, undefined, undefined, value, skipValueTest);
  }
  ModernizrProto.testAllProps = testAllProps;

  /*!
  {
    "name": "CSS Animations",
    "property": "cssanimations",
    "caniuse": "css-animation",
    "polyfills": ["transformie", "csssandpaper"],
    "tags": ["css"],
    "warnings": ["Android < 4 will pass this test, but can only animate a single property at a time"],
    "notes": [{
      "name" : "Article: 'Dispelling the Android CSS animation myths'",
      "href": "https://goo.gl/OGw5Gm"
    }]
  }
  !*/
  /* DOC
  Detects whether or not elements can be animated using CSS
  */

  Modernizr.addTest('cssanimations', testAllProps('animationName', 'a', true));

  /*!
  {
    "name": "CSS Transforms 3D",
    "property": "csstransforms3d",
    "caniuse": "transforms3d",
    "tags": ["css"],
    "warnings": [
      "Chrome may occassionally fail this test on some systems; more info: https://code.google.com/p/chromium/issues/detail?id=129004"
    ]
  }
  !*/

  Modernizr.addTest('csstransforms3d', function () {
    var ret = !!testAllProps('perspective', '1px', true);
    var usePrefix = Modernizr._config.usePrefixes;

    // Webkit's 3D transforms are passed off to the browser's own graphics renderer.
    //   It works fine in Safari on Leopard and Snow Leopard, but not in Chrome in
    //   some conditions. As a result, Webkit typically recognizes the syntax but
    //   will sometimes throw a false positive, thus we must do a more thorough check:
    if (ret && (!usePrefix || 'webkitPerspective' in docElement.style)) {
      var mq;
      var defaultStyle = '#modernizr{width:0;height:0}';
      // Use CSS Conditional Rules if available
      if (Modernizr.supports) {
        mq = '@supports (perspective: 1px)';
      } else {
        // Otherwise, Webkit allows this media query to succeed only if the feature is enabled.
        // `@media (transform-3d),(-webkit-transform-3d){ ... }`
        mq = '@media (transform-3d)';
        if (usePrefix) {
          mq += ',(-webkit-transform-3d)';
        }
      }

      mq += '{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}';

      testStyles(defaultStyle + mq, function (elem) {
        ret = elem.offsetWidth === 7 && elem.offsetHeight === 18;
      });
    }

    return ret;
  });

  // Run each test
  testRunner();

  // Remove the "no-js" class if it exists
  setClasses(classes);

  delete ModernizrProto.addTest;
  delete ModernizrProto.addAsyncTest;

  // Run the things that are supposed to run after the tests
  for (var i = 0; i < Modernizr._q.length; i++) {
    Modernizr._q[i]();
  }

  // Leak Modernizr namespace
  window.Modernizr = Modernizr;

  ;
})(window, document);

; browserify_shim__define__module__export__(typeof Modernizr != "undefined" ? Modernizr : window.Modernizr);

}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sono = require('sono');

var _sono2 = _interopRequireDefault(_sono);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Xp = function () {
    function Xp() {
        _classCallCheck(this, Xp);

        console.log(_sono2.default);

        this.draw = this.draw.bind(this);

        this.init();
    }

    _createClass(Xp, [{
        key: 'init',
        value: function init() {

            window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)(); // définition du contexte audio

            this.myAudio = document.querySelector('audio');
            this.frequencyB = document.querySelector('.frequency .block');
            this.amplitudeB = document.querySelector('.amplitude .block');
            this.waveFormB = document.querySelector('.waveForm .block');
            this.ptichB = document.querySelector('.pitch .block');

            // init

            this.analyser = this.audioCtx.createAnalyser();

            var source = this.audioCtx.createMediaElementSource(this.myAudio);
            source.connect(this.analyser);
            this.analyser.connect(this.audioCtx.destination);

            this.analyser.fftSize = 256;
            //  Longueur des fréquences !!!
            this.bufferLength = this.analyser.frequencyBinCount;
            // Tableaux des intensités !!
            this.dataArray = new Uint8Array(this.bufferLength);

            this.analyser.getByteTimeDomainData(this.dataArray);

            this.canvas = document.querySelector('.canvas');
            this.canvas.width = 1400;
            this.canvas.height = 200;

            this.canvasCtx = this.canvas.getContext('2d');

            this.canvasCtx.clearRect(0, 0, 500, 500);

            console.log(this.analyser);

            // Drawing code goes here

            this.draw();
        }
    }, {
        key: 'draw',
        value: function draw() {

            requestAnimationFrame(this.draw);

            this.analyser.getByteFrequencyData(this.dataArray);
            // .getByteFrequencyData()
            this.canvasCtx.fillStyle = 'rgb(0, 0, 0)';
            this.canvasCtx.fillRect(0, 0, this.canvas.width, 500);

            var barWidth = 500 / this.bufferLength * 2.5;
            var barHeight;
            var x = 0;

            for (var i = 0; i < this.bufferLength; i++) {
                barHeight = this.dataArray[i] / 2;

                this.canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',' + (barHeight + 100) + ',50)';
                this.canvasCtx.fillRect(x, this.canvas.height - barHeight / 2, barWidth, barHeight);

                x += barWidth + 1;
            }

            // this.canvasCtx.lineTo(this.canvas.width, this.canvas.height / 2);
            // this.canvasCtx.stroke();
        }
    }]);

    return Xp;
}();

exports.default = new Xp();

},{"sono":4}],4:[function(require,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.sono = factory());
}(this, (function () { 'use strict';

var browser = {};

browser.handlePageVisibility = function (onHidden, onShown) {
    var hidden = void 0,
        visibilityChange = void 0;

    if (typeof document.hidden !== 'undefined') {
        hidden = 'hidden';
        visibilityChange = 'visibilitychange';
    } else if (typeof document.mozHidden !== 'undefined') {
        hidden = 'mozHidden';
        visibilityChange = 'mozvisibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
        hidden = 'msHidden';
        visibilityChange = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
        hidden = 'webkitHidden';
        visibilityChange = 'webkitvisibilitychange';
    }

    function onChange() {
        if (document[hidden]) {
            onHidden();
        } else {
            onShown();
        }
    }

    if (typeof visibilityChange !== 'undefined') {
        document.addEventListener(visibilityChange, onChange, false);
    }
};

browser.handleTouchLock = function (context, onUnlock) {
    var ua = navigator.userAgent,
        locked = !!ua.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|SymbianOS/i);

    function unlock() {
        if (context && context.state === 'suspended') {
            context.resume().then(function () {
                var buffer = context.createBuffer(1, 1, 44100);
                var source = context.createBufferSource();
                source.buffer = buffer;
                source.connect(context.destination);
                source.start(0);
                source.stop(0);
                source.disconnect();

                document.body.removeEventListener('touchend', unlock);
                onUnlock();
            });
        } else {
            document.body.removeEventListener('touchend', unlock);
            onUnlock();
        }
    }

    if (locked) {
        document.body.addEventListener('touchend', unlock, false);
    }

    return locked;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};









var get$1 = function get$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$1(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set$1 = function set$1(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set$1(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var extensions = [];
var canPlay = {};

/*
 * Initial tests
 */

var tests = [{
    ext: 'ogg',
    type: 'audio/ogg; codecs="vorbis"'
}, {
    ext: 'mp3',
    type: 'audio/mpeg;'
}, {
    ext: 'opus',
    type: 'audio/ogg; codecs="opus"'
}, {
    ext: 'wav',
    type: 'audio/wav; codecs="1"'
}, {
    ext: 'm4a',
    type: 'audio/x-m4a;'
}, {
    ext: 'm4a',
    type: 'audio/aac;'
}];

var el = document.createElement('audio');
if (el) {
    tests.forEach(function (test) {
        var canPlayType = !!el.canPlayType(test.type);
        if (canPlayType && extensions.indexOf(test.ext) === -1) {
            extensions.push(test.ext);
        }
        canPlay[test.ext] = canPlayType;
    });
    el = null;
}

/*
 * find a supported file
 */

function getFileExtension(url) {
    if (typeof url !== 'string') {
        return '';
    }
    // from DataURL
    if (url.slice(0, 5) === 'data:') {
        var match = url.match(/data:audio\/(ogg|mp3|opus|wav|m4a)/i);
        if (match && match.length > 1) {
            return match[1].toLowerCase();
        }
    }
    // from Standard URL
    url = url.split('?')[0];
    url = url.slice(url.lastIndexOf('/') + 1);

    var a = url.split('.');
    if (a.length === 1 || a[0] === '' && a.length === 2) {
        return '';
    }
    return a.pop().toLowerCase();
}

function getSupportedFile(fileNames) {
    var name = void 0;

    if (Array.isArray(fileNames)) {
        // if array get the first one that works
        for (var i = 0; i < fileNames.length; i++) {
            name = fileNames[i];
            var ext = getFileExtension(name);
            if (extensions.indexOf(ext) > -1) {
                break;
            }
        }
    } else if ((typeof fileNames === 'undefined' ? 'undefined' : _typeof(fileNames)) === 'object') {
        // if not array and is object
        Object.keys(fileNames).some(function (key) {
            name = fileNames[key];
            var ext = getFileExtension(name);
            return extensions.indexOf(ext) > -1;
        });
    }
    // if string just return
    return name || fileNames;
}

/*
 * infer file types
 */

function isAudioBuffer(data) {
    return !!(data && window.AudioBuffer && data instanceof window.AudioBuffer);
}

function isArrayBuffer(data) {
    return !!(data && window.ArrayBuffer && data instanceof window.ArrayBuffer);
}

function isMediaElement(data) {
    return !!(data && window.HTMLMediaElement && data instanceof window.HTMLMediaElement);
}

function isMediaStream(data) {
    return !!(data && typeof data.getAudioTracks === 'function' && data.getAudioTracks().length && window.MediaStreamTrack && data.getAudioTracks()[0] instanceof window.MediaStreamTrack);
}

function isOscillatorType(data) {
    return !!(data && typeof data === 'string' && (data === 'sine' || data === 'square' || data === 'sawtooth' || data === 'triangle'));
}

function isScriptConfig(data) {
    return !!(data && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && data.bufferSize && data.channels && data.callback);
}

function isURL(data) {
    return !!(data && typeof data === 'string' && (data.indexOf('.') > -1 || data.slice(0, 5) === 'data:'));
}

function containsURL(config) {
    if (!config || isMediaElement(config)) {
        return false;
    }
    // string, array or object with src/url/data property that is string, array or arraybuffer
    var src = config.src || config.url || config.data || config;
    return isURL(src) || isArrayBuffer(src) || Array.isArray(src) && isURL(src[0]);
}

var file = {
    canPlay: canPlay,
    containsURL: containsURL,
    extensions: extensions,
    getFileExtension: getFileExtension,
    getSupportedFile: getSupportedFile,
    isAudioBuffer: isAudioBuffer,
    isMediaElement: isMediaElement,
    isMediaStream: isMediaStream,
    isOscillatorType: isOscillatorType,
    isScriptConfig: isScriptConfig,
    isURL: isURL
};

function Analyser(context, config) {
    config = config || {};

    var node = context.createAnalyser();

    var fftSize = config.fftSize || 512,
        freqFloat = !!config.float,
        waveFloat = !!config.float,
        waveform = void 0,
        frequencies = void 0;

    node.fftSize = fftSize; // frequencyBinCount will be half this value
    node.smoothingTimeConstant = config.smoothing || config.smoothingTimeConstant || node.smoothingTimeConstant;
    node.minDecibels = config.minDecibels || node.minDecibels;
    node.maxDecibels = config.maxDecibels || node.maxDecibels;

    //the worker returns a normalized value
    //first a sum of all magnitudes devided by the byteLength, then devide  by half the fft (1channel)
    var amplitudeBlob = new Blob(['onmessage=function(e){var data=e.data;var f=new Float32Array(data.b);for(var i=0;i<f.length;i++){data.sum+=f[i]}data.sum/=f.length;postMessage(Math.max(1.0-(data.sum/data.numSamples*-1.0),0))};']);
    var pitchBlob = new Blob(['onmessage=function(e){var data=e.data;var sampleRate=data.sampleRate;var buf=new Float32Array(data.b);var SIZE=buf.length;var MAX_SAMPLES=Math.floor(SIZE/2);var best_offset=-1;var best_correlation=0;var rms=0;var foundGoodCorrelation=false;var correlations=new Array(MAX_SAMPLES);for(var i=0;i<SIZE;i++){var val=buf[i];rms+=val*val}rms=Math.sqrt(rms/SIZE);if (rms<0.01){postMessage(-1)}else{var lastCorrelation=1;for(var offset=0;offset<MAX_SAMPLES;offset++){var correlation=0;for(var i=0;i<MAX_SAMPLES;i++){correlation+=Math.abs((buf[i])-(buf[i+offset]))}correlation=1-(correlation/MAX_SAMPLES);correlations[offset]=correlation;if ((correlation>0.9)&&(correlation>lastCorrelation)){foundGoodCorrelation=true;if (correlation>best_correlation){best_correlation=correlation;best_offset=offset}}else if (foundGoodCorrelation){var shift=(correlations[best_offset+1]-correlations[best_offset-1])/correlations[best_offset];postMessage(sampleRate/(best_offset+(8*shift)))}lastCorrelation=correlation}if (best_correlation>0.01){postMessage(sampleRate/best_offset)}else{postMessage(-1)}}};']);
    var amplitudeBlobURL = URL.createObjectURL(amplitudeBlob);
    var amplitudeWorker = new Worker(amplitudeBlobURL);
    var pitchBlobURL = URL.createObjectURL(pitchBlob);
    var pitchWorker = new Worker(pitchBlobURL);

    var amplitudeCallback = null;
    var noteStrings = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    var pitchCallback = null;
    var pitchCallbackObject = {
        hertz: null, //number
        note: null, //string
        noteIndex: null, //int
        detuneCents: null, //number
        detune: null //string
    };

    function noteFromPitch(frequency) {
        var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
        return Math.round(noteNum) + 69;
    }

    function frequencyFromNoteNumber(note) {
        return 440 * Math.pow(2, (note - 69) / 12);
    }

    function centsOffFromPitch(frequency, note) {
        return Math.floor(1200 * Math.log(frequency / frequencyFromNoteNumber(note)) / Math.log(2));
    }

    amplitudeWorker.onmessage = function (e) {
        if (amplitudeCallback) {
            amplitudeCallback(e.data);
        }
    };

    pitchWorker.onmessage = function (e) {
        if (pitchCallback) {
            var Hz = e.data;
            if (Hz !== -1) {
                var note = noteFromPitch(Hz);
                var detune = centsOffFromPitch(Hz, note);
                pitchCallbackObject.hertz = Hz;
                pitchCallbackObject.noteIndex = note % 12;
                pitchCallbackObject.note = noteStrings[note % 12];
                pitchCallbackObject.detuneCents = detune;
                if (detune === 0) {
                    pitchCallbackObject.detune = '';
                } else if (detune < 0) {
                    pitchCallbackObject.detune = 'flat';
                } else {
                    pitchCallbackObject.detune = 'sharp';
                }
            }
            pitchCallback(pitchCallbackObject);
        }
    };

    function needsUpdate(arr, float) {
        if (!arr) {
            return true;
        }
        if (node.fftSize !== fftSize) {
            return true;
        }
        if (float && arr instanceof Uint8Array) {
            return true;
        }
        return !float && arr instanceof Float32Array;
    }

    function createArray(float, length) {
        return float ? new Float32Array(length) : new Uint8Array(length);
    }

    node.getWaveform = function (float) {
        if (!arguments.length) {
            float = waveFloat;
        }

        if (needsUpdate(waveform, float)) {
            fftSize = node.fftSize;
            waveFloat = float;
            waveform = createArray(float, fftSize);
        }
        if (float && this.getFloatTimeDomainData) {
            this.getFloatTimeDomainData(waveform);
        } else {
            this.getByteTimeDomainData(waveform);
        }

        return waveform;
    };

    node.getPitch = function (callback) {
        pitchCallback = pitchCallback || callback;
        var f = new Float32Array(node.fftSize);
        f.set(node.getWaveform(true));
        pitchWorker.postMessage({
            sampleRate: context.sampleRate,
            b: f.buffer
        }, [f.buffer]);
    };

    node.getFrequencies = function (float) {
        if (!arguments.length) {
            float = freqFloat;
        }

        if (needsUpdate(frequencies, float)) {
            fftSize = node.fftSize;
            freqFloat = float;
            frequencies = createArray(float, node.frequencyBinCount);
        }

        if (float) {
            this.getFloatFrequencyData(frequencies);
        } else {
            this.getByteFrequencyData(frequencies);
        }

        return frequencies;
    };

    node.getAmplitude = function (callback) {
        amplitudeCallback = amplitudeCallback || callback;
        var f = new Float32Array(node.fftSize);
        f.set(node.getFrequencies(true));
        amplitudeWorker.postMessage({
            sum: 0,
            length: f.byteLength,
            numSamples: node.fftSize / 2,
            b: f.buffer
        }, [f.buffer]);
    };

    node.update = function () {
        node.getWaveform();
        node.getFrequencies();
    };

    Object.defineProperties(node, {
        smoothing: {
            get: function get() {
                return node.smoothingTimeConstant;
            },
            set: function set(value) {
                node.smoothingTimeConstant = value;
            }
        }
    });

    return node;
}

function number(value, defaultValue) {
    if (arguments.length < 2) {
        defaultValue = 0;
    }
    if (typeof value !== 'number' || isNaN(value)) {
        return defaultValue;
    }
    return value;
}

var n = 22050;

function Distortion(context, amount) {

    amount = number(amount, 1);

    var node = context.createWaveShaper();
    var curve = new Float32Array(n);

    // create waveShaper distortion curve from 0 to 1
    node.update = function (value) {
        amount = value;
        if (amount <= 0) {
            amount = 0;
            this.curve = null;
            return;
        }
        var k = value * 100;
        var deg = Math.PI / 180;
        var x = void 0;

        for (var i = 0; i < n; i++) {
            x = i * 2 / n - 1;
            curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
        }

        this.curve = curve;
    };

    Object.defineProperties(node, {
        amount: {
            get: function get() {
                return amount;
            },
            set: function set(value) {
                this.update(value);
            }
        }
    });

    if (typeof amount !== 'undefined') {
        node.update(amount);
    }

    return node;
}

function Echo(context, config) {
    config = config || {};

    var input = context.createGain();
    var delay = context.createDelay();
    var gain = context.createGain();
    var output = context.createGain();

    delay.delayTime.value = number(config.delayTime, 0.5);
    gain.gain.value = number(config.feedback, 0.5);

    input.connect(delay);
    input.connect(output);
    delay.connect(gain);
    gain.connect(delay);
    gain.connect(output);

    var node = input;
    node.name = 'Echo';
    node._output = output;

    Object.defineProperties(node, {
        delay: {
            get: function get() {
                return delay.delayTime.value;
            },
            set: function set(value) {
                delay.delayTime.value = value;
            }
        },
        feedback: {
            get: function get() {
                return gain.gain.value;
            },
            set: function set(value) {
                gain.gain.value = value;
            }
        }
    });

    return node;
}

function FakeContext() {

    var startTime = Date.now();

    function fn() {}

    function param() {
        return {
            value: 1,
            defaultValue: 1,
            linearRampToValueAtTime: fn,
            setValueAtTime: fn,
            exponentialRampToValueAtTime: fn,
            setTargetAtTime: fn,
            setValueCurveAtTime: fn,
            cancelScheduledValues: fn
        };
    }

    function fakeNode() {
        return {
            connect: fn,
            disconnect: fn,
            // analyser
            frequencyBinCount: 0,
            smoothingTimeConstant: 0,
            fftSize: 0,
            minDecibels: 0,
            maxDecibels: 0,
            getByteTimeDomainData: fn,
            getByteFrequencyData: fn,
            getFloatTimeDomainData: fn,
            getFloatFrequencyData: fn,
            // gain
            gain: param(),
            // panner
            panningModel: 0,
            setPosition: fn,
            setOrientation: fn,
            setVelocity: fn,
            distanceModel: 0,
            refDistance: 0,
            maxDistance: 0,
            rolloffFactor: 0,
            coneInnerAngle: 360,
            coneOuterAngle: 360,
            coneOuterGain: 0,
            // filter:
            type: 0,
            frequency: param(),
            Q: param(),
            detune: param(),
            // delay
            delayTime: param(),
            // convolver
            buffer: 0,
            // compressor
            threshold: param(),
            knee: param(),
            ratio: param(),
            attack: param(),
            release: param(),
            reduction: param(),
            // distortion
            oversample: 0,
            curve: 0,
            // buffer
            sampleRate: 1,
            length: 0,
            duration: 0,
            numberOfChannels: 0,
            getChannelData: function getChannelData() {
                return [];
            },
            copyFromChannel: fn,
            copyToChannel: fn,
            // listener
            dopplerFactor: 0,
            speedOfSound: 0,
            // osc
            start: fn
        };
    }

    // ie9
    if (!window.Uint8Array) {
        window.Uint8Array = window.Float32Array = Array;
    }

    return {
        createAnalyser: fakeNode,
        createBuffer: fakeNode,
        createBiquadFilter: fakeNode,
        createChannelMerger: fakeNode,
        createChannelSplitter: fakeNode,
        createDynamicsCompressor: fakeNode,
        createConvolver: fakeNode,
        createDelay: fakeNode,
        createGain: fakeNode,
        createOscillator: fakeNode,
        createPanner: fakeNode,
        createScriptProcessor: fakeNode,
        createWaveShaper: fakeNode,
        listener: fakeNode(),
        get currentTime() {
            return (Date.now() - startTime) / 1000;
        }
    };
}

// https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode
// For lowpass and highpass Q indicates how peaked the frequency is around the cutoff.
// The greater the value is, the greater is the peak

function Filter(context) {
    var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    // Frequency between 40Hz and half of the sampling rate
    var minFrequency = 40;
    var maxFrequency = context.sampleRate / 2;

    var node = context.createBiquadFilter();
    node.type = config.type;

    function getFrequency(value) {
        // Logarithm (base 2) to compute how many octaves fall in the range.
        var numberOfOctaves = Math.log(maxFrequency / minFrequency) / Math.LN2;
        // Compute a multiplier from 0 to 1 based on an exponential scale.
        var multiplier = Math.pow(2, numberOfOctaves * (value - 1.0));
        // Get back to the frequency value between min and max.
        return maxFrequency * multiplier;
    }

    node.set = function (frequency, q, gain) {
        if (typeof frequency !== 'undefined' && typeof frequency === 'number') {
            node.frequency.value = frequency;
        }
        if (typeof q !== 'undefined' && typeof q === 'number') {
            node.Q.value = q;
        }
        if (typeof gain !== 'undefined' && typeof gain === 'number') {
            node.gain.value = gain;
        }
        return node;
    };

    // set filter frequency based on value from 0 to 1
    node.setByPercent = function (percent, q, gain) {
        return node.set(getFrequency(percent), q, gain);
    };

    return node.set(config.frequency, config.q, config.gain);
}

function MonoFlanger(context, config) {
    var input = context.createGain();
    var delay = context.createDelay();
    var feedback = context.createGain();
    var lfo = context.createOscillator();
    var gain = context.createGain();
    var output = context.createGain();

    delay.delayTime.value = number(config.delay, 0.005); // 5-25ms delay (0.005 > 0.025)
    feedback.gain.value = number(config.feedback, 0.5); // 0 > 1

    lfo.type = 'sine';
    lfo.frequency.value = number(config.frequency, 0.002); // 0.05 > 5
    gain.gain.value = number(config.gain, 0.25); // 0.0005 > 0.005

    input.connect(output);
    input.connect(delay);
    delay.connect(output);
    delay.connect(feedback);
    feedback.connect(input);

    lfo.connect(gain);
    gain.connect(delay.delayTime);
    lfo.start(0);

    var node = input;
    node.name = 'Flanger';
    node._output = output;

    Object.defineProperties(node, {
        delay: {
            get: function get() {
                return delay.delayTime.value;
            },
            set: function set(value) {
                delay.delayTime.value = value;
            }
        },
        lfoFrequency: {
            get: function get() {
                return lfo.frequency.value;
            },
            set: function set(value) {
                lfo.frequency.value = value;
            }
        },
        lfoGain: {
            get: function get() {
                return gain.gain.value;
            },
            set: function set(value) {
                gain.gain.value = value;
            }
        },
        feedback: {
            get: function get() {
                return feedback.gain.value;
            },
            set: function set(value) {
                feedback.gain.value = value;
            }
        }
    });

    return node;
}

function StereoFlanger(context, config) {
    var input = context.createGain();
    var splitter = context.createChannelSplitter(2);
    var merger = context.createChannelMerger(2);
    var feedbackL = context.createGain();
    var feedbackR = context.createGain();
    var lfo = context.createOscillator();
    var lfoGainL = context.createGain();
    var lfoGainR = context.createGain();
    var delayL = context.createDelay();
    var delayR = context.createDelay();
    var output = context.createGain();

    feedbackL.gain.value = feedbackR.gain.value = number(config.feedback, 0.5);
    delayL.delayTime.value = delayR.delayTime.value = number(config.delay, 0.003);

    lfo.type = 'sine';
    lfo.frequency.value = number(config.frequency, 0.5);
    lfoGainL.gain.value = number(config.gain, 0.005);
    lfoGainR.gain.value = 0 - lfoGainL.gain.value;

    input.connect(splitter);

    splitter.connect(delayL, 0);
    splitter.connect(delayR, 1);

    delayL.connect(feedbackL);
    delayR.connect(feedbackR);

    feedbackL.connect(delayR);
    feedbackR.connect(delayL);

    delayL.connect(merger, 0, 0);
    delayR.connect(merger, 0, 1);

    merger.connect(output);
    input.connect(output);

    lfo.connect(lfoGainL);
    lfo.connect(lfoGainR);
    lfoGainL.connect(delayL.delayTime);
    lfoGainR.connect(delayR.delayTime);
    lfo.start(0);

    var node = input;
    node.name = 'StereoFlanger';
    node._output = output;

    Object.defineProperties(node, {
        delay: {
            get: function get() {
                return delayL.delayTime.value;
            },
            set: function set(value) {
                delayL.delayTime.value = delayR.delayTime.value = value;
            }
        },
        lfoFrequency: {
            get: function get() {
                return lfo.frequency.value;
            },
            set: function set(value) {
                lfo.frequency.value = value;
            }
        },
        lfoGain: {
            get: function get() {
                return lfoGainL.gain.value;
            },
            set: function set(value) {
                lfoGainL.gain.value = lfoGainR.gain.value = value;
            }
        },
        feedback: {
            get: function get() {
                return feedbackL.gain.value;
            },
            set: function set(value) {
                feedbackL.gain.value = feedbackR.gain.value = value;
            }
        }
    });

    return node;
}

function Flanger(context, config) {
    config = config || {};
    return config.stereo ? new StereoFlanger(context, config) : new MonoFlanger(context, config);
}

function Panner(context) {
    var node = context.createPanner();

    // Default for stereo is 'HRTF' can also be 'equalpower'
    node.panningModel = Panner.defaults.panningModel;

    // Distance model and attributes
    // Can be 'linear' 'inverse' 'exponential'
    node.distanceModel = Panner.defaults.distanceModel;
    node.refDistance = Panner.defaults.refDistance;
    node.maxDistance = Panner.defaults.maxDistance;
    node.rolloffFactor = Panner.defaults.rolloffFactor;
    node.coneInnerAngle = Panner.defaults.coneInnerAngle;
    node.coneOuterAngle = Panner.defaults.coneOuterAngle;
    node.coneOuterGain = Panner.defaults.coneOuterGain;
    // set to defaults (needed in Firefox)
    node.setPosition(0, 0, 1);
    node.setOrientation(0, 0, 0);

    // simple vec3 object pool
    var vecPool = {
        pool: [],
        get: function get(x, y, z) {
            var v = this.pool.length ? this.pool.pop() : {
                x: 0,
                y: 0,
                z: 0
            };
            // check if a vector has been passed in
            if (typeof x !== 'undefined' && isNaN(x) && 'x' in x && 'y' in x && 'z' in x) {
                v.x = number(x.x);
                v.y = number(x.y);
                v.z = number(x.z);
            } else {
                v.x = number(x);
                v.y = number(y);
                v.z = number(z);
            }
            return v;
        },
        dispose: function dispose(instance) {
            this.pool.push(instance);
        }
    };

    var globalUp = vecPool.get(0, 1, 0),
        angle45 = Math.PI / 4,
        angle90 = Math.PI / 2;

    // cross product of 2 vectors
    function cross(a, b) {
        var ax = a.x,
            ay = a.y,
            az = a.z;
        var bx = b.x,
            by = b.y,
            bz = b.z;
        a.x = ay * bz - az * by;
        a.y = az * bx - ax * bz;
        a.z = ax * by - ay * bx;
    }

    // normalise to unit vector
    function normalize(vec3) {
        if (vec3.x === 0 && vec3.y === 0 && vec3.z === 0) {
            return vec3;
        }
        var length = Math.sqrt(vec3.x * vec3.x + vec3.y * vec3.y + vec3.z * vec3.z);
        var invScalar = 1 / length;
        vec3.x *= invScalar;
        vec3.y *= invScalar;
        vec3.z *= invScalar;
        return vec3;
    }

    // set the orientation of the source (where the audio is coming from)
    function setOrientation(pannerNode, fw) {
        // calculate up vec ( up = (forward cross (0, 1, 0)) cross forward )
        var up = vecPool.get(fw.x, fw.y, fw.z);
        cross(up, globalUp);
        cross(up, fw);
        normalize(up);
        normalize(fw);
        // set the audio context's listener position to match the camera position
        pannerNode.setOrientation(fw.x, fw.y, fw.z, up.x, up.y, up.z);
        // return the vecs to the pool
        vecPool.dispose(fw);
        vecPool.dispose(up);
    }

    function setPosition(nodeOrListener, vec) {
        nodeOrListener.setPosition(vec.x, vec.y, vec.z);
        vecPool.dispose(vec);
    }

    node.set = function (x, y, z) {
        var v = vecPool.get(x, y, z);

        if (arguments.length === 1 && v.x) {
            // pan left to right with value from -1 to 1
            x = v.x;

            if (x > 1) {
                x = 1;
            }
            if (x < -1) {
                x = -1;
            }

            // creates a nice curve with z
            x = x * angle45;
            z = x + angle90;

            if (z > angle90) {
                z = Math.PI - z;
            }

            v.x = Math.sin(x);
            v.z = Math.sin(z);
        }
        setPosition(node, v);
    };

    // set the position the audio is coming from)
    node.setSourcePosition = function (x, y, z) {
        setPosition(node, vecPool.get(x, y, z));
    };

    // set the direction the audio is coming from)
    node.setSourceOrientation = function (x, y, z) {
        setOrientation(node, vecPool.get(x, y, z));
    };

    // set the position of who or what is hearing the audio (could be camera or some character)
    node.setListenerPosition = function (x, y, z) {
        setPosition(context.listener, vecPool.get(x, y, z));
    };

    // set the position of who or what is hearing the audio (could be camera or some character)
    node.setListenerOrientation = function (x, y, z) {
        setOrientation(context.listener, vecPool.get(x, y, z));
    };

    node.getDefaults = function () {
        return Panner.defaults;
    };

    node.setDefaults = function (defaults) {
        Object.keys(defaults).forEach(function (key) {
            Panner.defaults[key] = defaults[key];
        });
    };

    return node;
}

Panner.defaults = {
    panningModel: 'HRTF',
    distanceModel: 'linear',
    refDistance: 1,
    maxDistance: 1000,
    rolloffFactor: 1,
    coneInnerAngle: 360,
    coneOuterAngle: 0,
    coneOuterGain: 0
};

function Phaser(context) {
    var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var stages = number(config.stages, 8);
    var filters = [];
    var filter = void 0;

    var input = context.createGain();
    var feedback = context.createGain();
    var lfo = context.createOscillator();
    var lfoGain = context.createGain();
    var output = context.createGain();

    feedback.gain.value = number(config.feedback, 0.5);

    lfo.type = 'sine';
    lfo.frequency.value = number(config.frequency, 0.5);
    lfoGain.gain.value = number(config.gain, 300);

    for (var i = 0; i < stages; i++) {
        filter = context.createBiquadFilter();
        filter.type = 'allpass';
        filter.frequency.value = 1000 * i;
        //filter.Q.value = 10;
        if (i > 0) {
            filters[i - 1].connect(filter);
        }
        lfoGain.connect(filter.frequency);

        filters.push(filter);
    }

    var first = filters[0];
    var last = filters[filters.length - 1];

    input.connect(first);
    input.connect(output);
    last.connect(output);
    last.connect(feedback);
    feedback.connect(first);
    lfo.connect(lfoGain);
    lfo.start(0);

    var node = input;
    node.name = 'Phaser';
    node._output = output;

    Object.defineProperties(node, {
        lfoFrequency: {
            get: function get() {
                return lfo.frequency.value;
            },
            set: function set(value) {
                lfo.frequency.value = value;
            }
        },
        lfoGain: {
            get: function get() {
                return lfoGain.gain.value;
            },
            set: function set(value) {
                lfoGain.gain.value = value;
            }
        },
        feedback: {
            get: function get() {
                return feedback.gain.value;
            },
            set: function set(value) {
                feedback.gain.value = value;
            }
        }
    });

    return node;
}

function Recorder(context, passThrough) {
    var bufferLength = 4096,
        buffersL = [],
        buffersR = [];
    var startedAt = 0,
        stoppedAt = 0;

    var input = context.createGain();
    var output = context.createGain();
    var script = void 0;

    var node = input;
    node.name = 'Recorder';
    node._output = output;

    node.isRecording = false;

    function mergeBuffers(buffers, length) {
        var buffer = new Float32Array(length);
        var offset = 0;
        for (var i = 0; i < buffers.length; i++) {
            buffer.set(buffers[i], offset);
            offset += buffers[i].length;
        }
        return buffer;
    }

    function getBuffer() {
        if (!buffersL.length) {
            return context.createBuffer(2, bufferLength, context.sampleRate);
        }
        var recordingLength = buffersL.length * bufferLength;
        var buffer = context.createBuffer(2, recordingLength, context.sampleRate);
        buffer.getChannelData(0).set(mergeBuffers(buffersL, recordingLength));
        buffer.getChannelData(1).set(mergeBuffers(buffersR, recordingLength));
        return buffer;
    }

    function destroyScriptProcessor() {
        if (script) {
            script.onaudioprocess = null;
            input.disconnect();
            script.disconnect();
        }
    }

    function createScriptProcessor() {
        destroyScriptProcessor();

        script = context.createScriptProcessor(bufferLength, 2, 2);
        input.connect(script);
        script.connect(context.destination);
        script.connect(output);

        script.onaudioprocess = function (event) {
            var inputL = event.inputBuffer.getChannelData(0);
            var inputR = event.inputBuffer.getChannelData(1);

            if (passThrough) {
                var outputL = event.outputBuffer.getChannelData(0);
                var outputR = event.outputBuffer.getChannelData(1);
                outputL.set(inputL);
                outputR.set(inputR);
            }

            if (node.isRecording) {
                buffersL.push(new Float32Array(inputL));
                buffersR.push(new Float32Array(inputR));
            }
        };
    }

    node.start = function () {
        createScriptProcessor();
        buffersL.length = 0;
        buffersR.length = 0;
        startedAt = context.currentTime;
        stoppedAt = 0;
        this.isRecording = true;
    };

    node.stop = function () {
        stoppedAt = context.currentTime;
        this.isRecording = false;
        destroyScriptProcessor();
        return getBuffer();
    };

    node.getDuration = function () {
        if (!this.isRecording) {
            return stoppedAt - startedAt;
        }
        return context.currentTime - startedAt;
    };

    return node;
}

function Reverb(context) {
    var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var rate = context.sampleRate;

    var time = number(config.time, 1);
    var decay = number(config.decay, 5);
    var reverse = !!config.reverse;
    var length = void 0;
    var impulseResponse = void 0;

    var input = context.createGain();
    var reverb = context.createConvolver();
    var output = context.createGain();

    input.connect(reverb);
    input.connect(output);
    reverb.connect(output);

    var node = input;
    node.name = 'Reverb';
    node._output = output;

    node.update = function (opt) {
        if (typeof opt.time !== 'undefined') {
            time = opt.time;
            length = Math.floor(rate * time);
            impulseResponse = length ? context.createBuffer(2, length, rate) : null;
        }
        if (typeof opt.decay !== 'undefined') {
            decay = opt.decay;
        }
        if (typeof opt.reverse !== 'undefined') {
            reverse = opt.reverse;
        }

        if (!impulseResponse) {
            reverb.buffer = null;
            return;
        }

        var left = impulseResponse.getChannelData(0);
        var right = impulseResponse.getChannelData(1);
        var n = void 0,
            e = void 0;

        for (var i = 0; i < length; i++) {
            n = reverse ? length - i : i;
            e = Math.pow(1 - n / length, decay);
            left[i] = (Math.random() * 2 - 1) * e;
            right[i] = (Math.random() * 2 - 1) * e;
        }

        reverb.buffer = impulseResponse;
    };

    node.update({
        time: time,
        decay: decay,
        reverse: reverse
    });

    Object.defineProperties(node, {
        time: {
            get: function get() {
                return time;
            },
            set: function set(value) {
                if (value === time) {
                    return;
                }
                this.update({
                    time: value
                });
            }
        },
        decay: {
            get: function get() {
                return decay;
            },
            set: function set(value) {
                if (value === decay) {
                    return;
                }
                this.update({
                    decay: value
                });
            }
        },
        reverse: {
            get: function get() {
                return reverse;
            },
            set: function set(value) {
                if (value === reverse) {
                    return;
                }
                this.update({
                    reverse: !!value
                });
            }
        }
    });

    return node;
}

function Effect(context) {
    context = context || new FakeContext();
    var panning = new Panner(context);

    var api = null,
        destination = void 0,
        nodeList = [],
        sourceNode = void 0;

    function connect(a, b) {
        //console.log('> connect', (a.name || a.constructor.name), 'to', (b.name || b.constructor.name));

        var output = a._output || a;
        //console.log('> disconnect output: ', (a.name || a.constructor.name));
        output.disconnect();
        //console.log('> connect output: ',(a.name || a.constructor.name), 'to input:', (b.name || b.constructor.name));
        output.connect(b);
    }

    function connectToDestination(node) {
        var l = nodeList.length;
        var lastNode = l ? nodeList[l - 1] : sourceNode;

        if (lastNode) {
            connect(lastNode, node);
        }

        destination = node;
    }

    function updateConnections() {
        if (!sourceNode) {
            return;
        }

        //console.log('updateConnections:', nodeList.length);

        var node = void 0,
            prev = void 0;

        for (var i = 0; i < nodeList.length; i++) {
            node = nodeList[i];
            //console.log(i, node);
            prev = i === 0 ? sourceNode : nodeList[i - 1];
            connect(prev, node);
        }

        if (destination) {
            connectToDestination(destination);
        }
    }

    function has(node) {
        if (!node) {
            return false;
        }
        return nodeList.indexOf(node) > -1;
    }

    function add(node) {
        if (!node) {
            return null;
        }
        if (has(node)) {
            return node;
        }
        nodeList.push(node);
        updateConnections();
        return node;
    }

    function remove(node) {
        if (!node) {
            return null;
        }
        if (!has(node)) {
            return node;
        }
        var l = nodeList.length;
        for (var i = 0; i < l; i++) {
            if (node === nodeList[i]) {
                nodeList.splice(i, 1);
                break;
            }
        }
        var output = node._output || node;
        output.disconnect();
        updateConnections();
        return node;
    }

    function toggle(node, force) {
        force = !!force;
        var hasNode = has(node);
        if (arguments.length > 1 && hasNode === force) {
            return api;
        }
        if (hasNode) {
            remove(node);
        } else {
            add(node);
        }
        return api;
    }

    function removeAll() {
        while (nodeList.length) {
            nodeList.pop().disconnect();
        }
        updateConnections();
        return api;
    }

    function destroy() {
        removeAll();
        context = null;
        destination = null;
        nodeList = [];
        if (sourceNode) {
            sourceNode.disconnect();
        }
        sourceNode = null;
    }

    /*
     * Effects
     */

    function analyser(config) {
        return add(new Analyser(context, config));
    }

    // lowers the volume of the loudest parts of the signal and raises the volume of the softest parts
    function compressor(options) {
        var node = context.createDynamicsCompressor();

        node.update = function (config) {
            // min decibels to start compressing at from -100 to 0
            node.threshold.value = typeof config.threshold !== 'undefined' ? config.threshold : -24;
            // decibel value to start curve to compressed value from 0 to 40
            node.knee.value = typeof config.knee !== 'undefined' ? config.knee : 30;
            // amount of change per decibel from 1 to 20
            node.ratio.value = typeof config.ratio !== 'undefined' ? config.ratio : 12;
            // gain reduction currently applied by compressor from -20 to 0
            // node.reduction.value = typeof config.reduction !== 'undefined' ? config.reduction : -10;)
            // seconds to reduce gain by 10db from 0 to 1 - how quickly signal adapted when volume increased
            node.attack.value = typeof config.attack !== 'undefined' ? config.attack : 0.0003;
            // seconds to increase gain by 10db from 0 to 1 - how quickly signal adapted when volume redcuced
            node.release.value = typeof config.release !== 'undefined' ? config.release : 0.25;
        };

        node.update(options || {});

        return add(node);
    }

    function convolver(impulseResponse) {
        // impulseResponse is an audio file buffer
        var node = context.createConvolver();
        node.buffer = impulseResponse;
        return add(node);
    }

    function delay(time) {
        var node = context.createDelay();
        if (typeof time !== 'undefined') {
            node.delayTime.value = time;
        }
        return add(node);
    }

    function echo(config) {
        return add(new Echo(context, config));
    }

    function distortion(amount) {
        // Float32Array defining curve (values are interpolated)
        //node.curve
        // up-sample before applying curve for better resolution result 'none', '2x' or '4x'
        //node.oversample = '2x';
        return add(new Distortion(context, amount));
    }

    function filter(type, frequency, q, gain) {
        return add(new Filter(context, { type: type, frequency: frequency, q: q, gain: gain }));
    }

    function lowpass(frequency, peak) {
        return filter('lowpass', { frequency: frequency, q: peak });
    }

    function highpass(frequency, peak) {
        return filter('highpass', { frequency: frequency, q: peak });
    }

    function bandpass(frequency, width) {
        return filter('bandpass', { frequency: frequency, q: width });
    }

    function lowshelf(frequency, gain) {
        return filter('lowshelf', { frequency: frequency, q: 0, gain: gain });
    }

    function highshelf(frequency, gain) {
        return filter('highshelf', { frequency: frequency, q: 0, gain: gain });
    }

    function peaking(frequency, width, gain) {
        return filter('peaking', { frequency: frequency, q: width, gain: gain });
    }

    function notch(frequency, width, gain) {
        return filter('notch', { frequency: frequency, q: width, gain: gain });
    }

    function allpass(frequency, sharpness) {
        return filter('allpass', { frequency: frequency, q: sharpness });
    }

    function flanger(config) {
        return add(new Flanger(context, config));
    }

    function gainNode(value) {
        var node = context.createGain();
        if (typeof value !== 'undefined') {
            node.gain.value = value;
        }
        return node;
    }

    function panner() {
        return add(new Panner(context));
    }

    function phaser(config) {
        return add(new Phaser(context, config));
    }

    function recorder(passThrough) {
        return add(new Recorder(context, passThrough));
    }

    function reverb(seconds, decay, reverse) {
        return add(new Reverb(context, seconds, decay, reverse));
    }

    function script() {
        var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        // bufferSize 256 - 16384 (pow 2)
        var bufferSize = config.bufferSize || 1024;
        var inputChannels = typeof config.inputChannels === 'undefined' ? 0 : config.inputChannels;
        var outputChannels = typeof config.outputChannels === 'undefined' ? 1 : config.outputChannels;

        var node = context.createScriptProcessor(bufferSize, inputChannels, outputChannels);

        var thisArg = config.thisArg || config.context || node;
        var callback = config.callback || function () {};

        // available props:
        /*
        event.inputBuffer
        event.outputBuffer
        event.playbackTime
        */
        // Example: generate noise
        /*
        const output = event.outputBuffer.getChannelData(0);
        const l = output.length;
        for (let i = 0; i < l; i++) {
            output[i] = Math.random();
        }
        */
        node.onaudioprocess = callback.bind(thisArg);

        return add(node);
    }

    function setSource(node) {
        sourceNode = node;
        updateConnections();
        return node;
    }

    function setDestination(node) {
        connectToDestination(node);
        return node;
    }

    //

    api = {
        context: context,
        nodeList: nodeList,
        panning: panning,

        has: has,
        add: add,
        remove: remove,
        toggle: toggle,
        removeAll: removeAll,
        destroy: destroy,
        setSource: setSource,
        setDestination: setDestination,

        analyser: analyser,
        compressor: compressor,
        convolver: convolver,
        delay: delay,
        echo: echo,
        distortion: distortion,
        filter: filter,
        lowpass: lowpass,
        highpass: highpass,
        bandpass: bandpass,
        lowshelf: lowshelf,
        highshelf: highshelf,
        peaking: peaking,
        notch: notch,
        allpass: allpass,
        flanger: flanger,
        gain: gainNode,
        panner: panner,
        phaser: phaser,
        recorder: recorder,
        reverb: reverb,
        script: script
    };

    return Object.freeze(api);
}

function Group(context, destination) {
    var sounds = [];
    var effect = new Effect(context);
    var gain = effect.gain();
    var preMuteVolume = 1;
    var group = null;

    if (context) {
        effect.setSource(gain);
        effect.setDestination(destination || context.destination);
    }

    /*
     * Add / remove
     */

    function find(soundOrId, callback) {
        var found = void 0;

        if (!soundOrId && soundOrId !== 0) {
            return found;
        }

        sounds.some(function (sound) {
            if (sound === soundOrId || sound.id === soundOrId) {
                found = sound;
                return true;
            }
            return false;
        });

        if (found && callback) {
            return callback(found);
        }

        return found;
    }

    function remove(soundOrId) {
        find(soundOrId, function (sound) {
            return sounds.splice(sounds.indexOf(sound), 1);
        });
        return group;
    }

    function add(sound) {
        sound.gain.disconnect();
        sound.gain.connect(gain);

        sounds.push(sound);

        sound.once('destroy', remove);

        return group;
    }

    /*
     * Controls
     */

    function play(delay, offset) {
        sounds.forEach(function (sound) {
            return sound.play(delay, offset);
        });
        return group;
    }

    function pause() {
        sounds.forEach(function (sound) {
            if (sound.playing) {
                sound.pause();
            }
        });
        return group;
    }

    function resume() {
        sounds.forEach(function (sound) {
            if (sound.paused) {
                sound.play();
            }
        });
        return group;
    }

    function stop() {
        sounds.forEach(function (sound) {
            return sound.stop();
        });
        return group;
    }

    function seek(percent) {
        sounds.forEach(function (sound) {
            return sound.seek(percent);
        });
        return group;
    }

    function mute() {
        preMuteVolume = group.volume;
        group.volume = 0;
        return group;
    }

    function unMute() {
        group.volume = preMuteVolume || 1;
        return group;
    }

    function setVolume(value) {
        group.volume = value;
        return group;
    }

    function fade(volume, duration) {
        if (context) {
            var param = gain.gain;
            var time = context.currentTime;

            param.cancelScheduledValues(time);
            param.setValueAtTime(param.value, time);
            // param.setValueAtTime(volume, time + duration);
            param.linearRampToValueAtTime(volume, time + duration);
            // param.setTargetAtTime(volume, time, duration);
            // param.exponentialRampToValueAtTime(Math.max(volume, 0.0001), time + duration);
        } else {
            sounds.forEach(function (sound) {
                return sound.fade(volume, duration);
            });
        }

        return group;
    }

    /*
     * Load
     */

    function load() {
        sounds.forEach(function (sound) {
            return sound.load(null, true);
        });
    }

    /*
     * Unload
     */

    function unload() {
        sounds.forEach(function (sound) {
            return sound.unload();
        });
    }

    /*
     * Destroy
     */

    function destroy() {
        while (sounds.length) {
            sounds.pop().destroy();
        }
    }

    /*
     * Api
     */

    group = {
        add: add,
        find: find,
        remove: remove,
        play: play,
        pause: pause,
        resume: resume,
        stop: stop,
        seek: seek,
        setVolume: setVolume,
        mute: mute,
        unMute: unMute,
        fade: fade,
        load: load,
        unload: unload,
        destroy: destroy
    };

    /*
     * Getters & Setters
     */

    Object.defineProperties(group, {
        effect: {
            value: effect
        },
        gain: {
            value: gain
        },
        sounds: {
            value: sounds
        },
        volume: {
            get: function get() {
                return gain.gain.value;
            },
            set: function set(value) {
                if (isNaN(value)) {
                    return;
                }

                value = Math.min(Math.max(value, 0), 1);

                if (context) {
                    gain.gain.cancelScheduledValues(context.currentTime);
                    gain.gain.value = value;
                    gain.gain.setValueAtTime(value, context.currentTime);
                } else {
                    gain.gain.value = value;
                }
                sounds.forEach(function (sound) {
                    if (!sound.context) {
                        sound.groupVolume = value;
                    }
                });
            }
        }
    });

    return group;
}

Group.Effect = Effect;

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter$1() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
var events = EventEmitter$1;

// Backwards-compat with node 0.10.x
EventEmitter$1.EventEmitter = EventEmitter$1;

EventEmitter$1.prototype._events = undefined;
EventEmitter$1.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter$1.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter$1.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter$1.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter$1.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter$1.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter$1.prototype.on = EventEmitter$1.prototype.addListener;

EventEmitter$1.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter$1.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter$1.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter$1.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter$1.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter$1.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

var EventEmitter = events.EventEmitter;

var Emitter = function (_EventEmitter) {
    inherits(Emitter, _EventEmitter);

    function Emitter() {
        classCallCheck(this, Emitter);
        return possibleConstructorReturn(this, _EventEmitter.call(this));
    }

    Emitter.prototype.off = function off(type, listener) {
        if (listener) {
            return this.removeListener(type, listener);
        }
        if (type) {
            return this.removeAllListeners(type);
        }
        return this.removeAllListeners();
    };

    return Emitter;
}(EventEmitter);

function Loader(url, deferLoad) {
    var ERROR_STATE = ['', 'ABORTED', 'NETWORK', 'DECODE', 'SRC_NOT_SUPPORTED'];
    var emitter = new Emitter();
    var progress = 0,
        audioContext = void 0,
        isTouchLocked = void 0,
        request = void 0,
        timeout = void 0,
        data = void 0;

    // clean up

    function removeListeners() {
        emitter.off('error');
        emitter.off('progress');
        emitter.off('complete');
        emitter.off('loaded');

        if (data && typeof data.removeEventListener === 'function') {
            data.removeEventListener('canplaythrough', readyHandler);
            data.removeEventListener('error', errorHandler);
        }

        if (request) {
            request.removeEventListener('progress', progressHandler);
            request.removeEventListener('load', loadHandler);
            request.removeEventListener('error', errorHandler);
        }
    }

    function dispatchComplete(buffer) {
        emitter.emit('progress', 1);
        emitter.emit('loaded', buffer);
        emitter.emit('complete', buffer);

        removeListeners();
    }

    function progressHandler(event) {
        if (event.lengthComputable) {
            progress = event.loaded / event.total;
            emitter.emit('progress', progress);
        }
    }

    // error

    function errorHandler(event) {
        window.clearTimeout(timeout);

        var message = event;

        if (data && data.error) {
            message = 'Media Error: ' + ERROR_STATE[data.error.code] + ' ' + url;
        }

        if (request) {
            message = 'XHR Error: ' + request.status + ' ' + request.statusText + ' ' + url;
        }

        emitter.emit('error', message);

        removeListeners();
    }

    function decodeArrayBuffer(arraybuffer) {
        audioContext.decodeAudioData(arraybuffer, function (buffer) {
            data = buffer;
            request = null;
            progress = 1;
            dispatchComplete(buffer);
        }, errorHandler);
    }

    function loadHandler() {
        decodeArrayBuffer(request.response);
    }

    function readyHandler() {
        window.clearTimeout(timeout);
        if (!data) {
            return;
        }
        progress = 1;
        dispatchComplete(data);
    }

    function cancel() {
        removeListeners();

        if (request && request.readyState !== 4) {
            request.abort();
        }
        request = null;

        window.clearTimeout(timeout);
    }

    function destroy() {
        cancel();
        request = null;
        data = null;
        audioContext = null;
    }

    // audio buffer

    function loadArrayBuffer() {
        if (url instanceof window.ArrayBuffer) {
            decodeArrayBuffer(url);
            return;
        }
        request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        request.addEventListener('progress', progressHandler);
        request.addEventListener('load', loadHandler);
        request.addEventListener('error', errorHandler);
        request.send();
    }

    // audio element

    function loadAudioElement() {
        if (!data || !data.tagName) {
            data = document.createElement('audio');
        }

        if (!isTouchLocked) {
            // timeout because sometimes canplaythrough doesn't fire
            window.clearTimeout(timeout);
            timeout = window.setTimeout(readyHandler, 2000);
            data.addEventListener('canplaythrough', readyHandler, false);
        }

        data.addEventListener('error', errorHandler, false);
        data.preload = 'auto';
        data.src = url;
        data.load();

        if (isTouchLocked) {
            dispatchComplete(data);
        }
    }

    function start() {
        var force = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

        if (deferLoad && !force) {
            return;
        }
        if (audioContext) {
            loadArrayBuffer();
        } else {
            loadAudioElement();
        }
    }

    // reload

    function load(newUrl) {
        url = newUrl;
        start();
    }

    var api = {
        on: emitter.on.bind(emitter),
        once: emitter.once.bind(emitter),
        off: emitter.off.bind(emitter),
        load: load,
        start: start,
        cancel: cancel,
        destroy: destroy
    };

    Object.defineProperties(api, {
        data: {
            get: function get() {
                return data;
            }
        },
        progress: {
            get: function get() {
                return progress;
            }
        },
        audioContext: {
            set: function set(value) {
                audioContext = value;
            }
        },
        isTouchLocked: {
            set: function set(value) {
                isTouchLocked = value;
            }
        }
    });

    return Object.freeze(api);
}

Loader.Group = function () {
    var emitter = new Emitter();
    var queue = [];
    var numLoaded = 0,
        numTotal = 0,
        currentLoader = void 0;

    function progressHandler(progress) {
        var loaded = numLoaded + progress;
        emitter.emit('progress', loaded / numTotal);
    }

    function completeHandler() {
        numLoaded++;
        removeListeners();
        emitter.emit('progress', numLoaded / numTotal);
        next();
    }

    function errorHandler(e) {
        console.error(e);
        removeListeners();
        emitter.emit('error', e);
        next();
    }

    function next() {
        if (queue.length === 0) {
            currentLoader = null;
            emitter.emit('complete');
            return;
        }

        currentLoader = queue.pop();
        currentLoader.on('progress', progressHandler);
        currentLoader.once('loaded', completeHandler);
        currentLoader.once('error', errorHandler);
        currentLoader.start();
    }

    function removeListeners() {
        currentLoader.off('progress', progressHandler);
        currentLoader.off('loaded', completeHandler);
        currentLoader.off('error', errorHandler);
    }

    function add(loader) {
        queue.push(loader);
        numTotal++;
        return loader;
    }

    function start() {
        numTotal = queue.length;
        next();
    }

    return Object.freeze({
        on: emitter.on.bind(emitter),
        once: emitter.once.bind(emitter),
        off: emitter.off.bind(emitter),
        add: add,
        start: start
    });
};

function BufferSource(buffer, context, onEnded) {
    var api = {};
    var ended = false,
        endedCallback = onEnded,
        loop = false,
        paused = false,
        pausedAt = 0,
        playbackRate = 1,
        playing = false,
        sourceNode = null,
        startedAt = 0;

    function createSourceNode() {
        if (!sourceNode && context) {
            sourceNode = context.createBufferSource();
            sourceNode.buffer = buffer;
        }
        return sourceNode;
    }

    /*
     * Controls
     */

    function stop() {
        if (sourceNode) {
            sourceNode.onended = null;
            try {
                sourceNode.disconnect();
                sourceNode.stop(0);
            } catch (e) {}
            sourceNode = null;
        }

        paused = false;
        pausedAt = 0;
        playing = false;
        startedAt = 0;
    }

    function pause() {
        var elapsed = context.currentTime - startedAt;
        stop();
        pausedAt = elapsed;
        playing = false;
        paused = true;
    }

    function endedHandler() {
        stop();
        ended = true;
        if (typeof endedCallback === 'function') {
            endedCallback(api);
        }
    }

    function play(delay) {
        var offset = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

        if (playing) {
            return;
        }

        delay = delay ? context.currentTime + delay : 0;
        if (offset) {
            pausedAt = 0;
        }
        if (pausedAt) {
            offset = pausedAt;
        }
        while (offset > api.duration) {
            offset = offset % api.duration;
        }

        createSourceNode();
        sourceNode.onended = endedHandler;
        sourceNode.start(delay, offset);

        sourceNode.loop = loop;
        sourceNode.playbackRate.value = playbackRate;

        startedAt = context.currentTime - offset;
        ended = false;
        paused = false;
        pausedAt = 0;
        playing = true;
    }

    /*
     * Destroy
     */

    function destroy() {
        stop();
        buffer = null;
        context = null;
        endedCallback = null;
        sourceNode = null;
    }

    /*
     * Getters & Setters
     */

    Object.defineProperties(api, {
        play: {
            value: play
        },
        pause: {
            value: pause
        },
        stop: {
            value: stop
        },
        destroy: {
            value: destroy
        },
        currentTime: {
            get: function get() {
                if (pausedAt) {
                    return pausedAt;
                }
                if (startedAt) {
                    var time = context.currentTime - startedAt;
                    if (time > api.duration) {
                        time = time % api.duration;
                    }
                    return time;
                }
                return 0;
            }
        },
        duration: {
            get: function get() {
                return buffer ? buffer.duration : 0;
            }
        },
        ended: {
            get: function get() {
                return ended;
            }
        },
        loop: {
            get: function get() {
                return loop;
            },
            set: function set(value) {
                loop = !!value;
                if (sourceNode) {
                    sourceNode.loop = loop;
                }
            }
        },
        paused: {
            get: function get() {
                return paused;
            }
        },
        playbackRate: {
            get: function get() {
                return playbackRate;
            },
            set: function set(value) {
                playbackRate = value;
                if (sourceNode) {
                    sourceNode.playbackRate.value = playbackRate;
                }
            }
        },
        playing: {
            get: function get() {
                return playing;
            }
        },
        progress: {
            get: function get() {
                return api.duration ? api.currentTime / api.duration : 0;
            }
        },
        sourceNode: {
            get: function get() {
                return createSourceNode();
            }
        }
    });

    return Object.freeze(api);
}

function MediaSource(el, context, onEnded) {
    var api = {};
    var ended = false,
        endedCallback = onEnded,
        delayTimeout = void 0,
        fadeTimeout = void 0,
        loop = false,
        paused = false,
        playbackRate = 1,
        playing = false,
        sourceNode = null,
        groupVolume = 1,
        volume = 1;

    function createSourceNode() {
        if (!sourceNode && context) {
            sourceNode = context.createMediaElementSource(el);
        }
        return sourceNode;
    }

    /*
     * Load
     */

    function load(url) {
        el.src = url;
        el.load();
        ended = false;
        paused = false;
        playing = false;
    }

    /*
     * Controls
     */

    function readyHandler() {
        el.removeEventListener('canplaythrough', readyHandler);
        if (playing) {
            el.play();
        }
    }

    /*
     * Ended handler
     */

    function endedHandler() {

        if (loop) {
            el.currentTime = 0;
            // fixes bug where server doesn't support seek:
            if (el.currentTime > 0) {
                el.load();
            }
            el.play();

            return;
        }

        ended = true;
        paused = false;
        playing = false;

        if (typeof endedCallback === 'function') {
            endedCallback(api);
        }
    }

    function play(delay, offset) {
        clearTimeout(delayTimeout);

        el.volume = volume * groupVolume;
        el.playbackRate = playbackRate;

        if (offset) {
            el.currentTime = offset;
        }

        if (delay) {
            delayTimeout = setTimeout(play, delay);
        } else {
            // el.load();
            el.play();
        }

        ended = false;
        paused = false;
        playing = true;

        el.removeEventListener('ended', endedHandler);
        el.addEventListener('ended', endedHandler, false);

        if (el.readyState < 1) {
            el.removeEventListener('canplaythrough', readyHandler);
            el.addEventListener('canplaythrough', readyHandler, false);
            el.load();
            el.play();
        }
    }

    function pause() {
        clearTimeout(delayTimeout);

        if (!el) {
            return;
        }

        el.pause();
        playing = false;
        paused = true;
    }

    function stop() {
        clearTimeout(delayTimeout);

        if (!el) {
            return;
        }

        el.pause();

        try {
            el.currentTime = 0;
            // fixes bug where server doesn't support seek:
            if (el.currentTime > 0) {
                el.load();
            }
        } catch (e) {}

        playing = false;
        paused = false;
    }

    /*
     * Fade for no webaudio
     */

    function fade(toVolume, duration) {
        if (context) {
            return api;
        }

        function ramp(value, step) {
            fadeTimeout = window.setTimeout(function () {
                api.volume = api.volume + (value - api.volume) * 0.2;
                if (Math.abs(api.volume - value) > 0.05) {
                    ramp(value, step);
                    return;
                }
                api.volume = value;
            }, step * 1000);
        }

        window.clearTimeout(fadeTimeout);
        ramp(toVolume, duration / 10);

        return api;
    }

    /*
     * Destroy
     */

    function destroy() {
        el.removeEventListener('ended', endedHandler);
        el.removeEventListener('canplaythrough', readyHandler);
        stop();
        el = null;
        context = null;
        endedCallback = null;
        sourceNode = null;
    }

    /*
     * Getters & Setters
     */

    Object.defineProperties(api, {
        play: {
            value: play
        },
        pause: {
            value: pause
        },
        stop: {
            value: stop
        },
        load: {
            value: load
        },
        fade: {
            value: fade
        },
        destroy: {
            value: destroy
        },
        currentTime: {
            get: function get() {
                return el ? el.currentTime : 0;
            }
        },
        duration: {
            get: function get() {
                return el ? el.duration : 0;
            }
        },
        ended: {
            get: function get() {
                return ended;
            }
        },
        loop: {
            get: function get() {
                return loop;
            },
            set: function set(value) {
                loop = !!value;
            }
        },
        paused: {
            get: function get() {
                return paused;
            }
        },
        playbackRate: {
            get: function get() {
                return playbackRate;
            },
            set: function set(value) {
                playbackRate = value;
                if (el) {
                    el.playbackRate = playbackRate;
                }
            }
        },
        playing: {
            get: function get() {
                return playing;
            }
        },
        progress: {
            get: function get() {
                return el && el.duration ? el.currentTime / el.duration : 0;
            }
        },
        sourceNode: {
            get: function get() {
                return createSourceNode();
            }
        },
        volume: {
            get: function get() {
                return volume;
            },
            set: function set(value) {
                window.clearTimeout(fadeTimeout);
                volume = value;
                if (el) {
                    el.volume = volume * groupVolume;
                }
            }
        },
        groupVolume: {
            get: function get() {
                return groupVolume;
            },
            set: function set(value) {
                groupVolume = value;
                if (el) {
                    el.volume = volume * groupVolume;
                }
            }
        }
    });

    return Object.freeze(api);
}

function MicrophoneSource(stream, context) {
    var ended = false,
        paused = false,
        pausedAt = 0,
        playing = false,
        sourceNode = null,
        // MicrophoneSourceNode
    startedAt = 0;

    function createSourceNode() {
        if (!sourceNode && context) {
            sourceNode = context.createMediaStreamSource(stream);
            // HACK: stops moz garbage collection killing the stream
            // see https://support.mozilla.org/en-US/questions/984179
            if (navigator.mozGetUserMedia) {
                window.mozHack = sourceNode;
            }
        }
        return sourceNode;
    }

    /*
     * Controls
     */

    function play(delay) {
        delay = delay ? context.currentTime + delay : 0;

        createSourceNode();
        sourceNode.start(delay);

        startedAt = context.currentTime - pausedAt;
        ended = false;
        playing = true;
        paused = false;
        pausedAt = 0;
    }

    function stop() {
        if (sourceNode) {
            try {
                sourceNode.stop(0);
            } catch (e) {}
            sourceNode = null;
        }
        ended = true;
        paused = false;
        pausedAt = 0;
        playing = false;
        startedAt = 0;
    }

    function pause() {
        var elapsed = context.currentTime - startedAt;
        stop();
        pausedAt = elapsed;
        playing = false;
        paused = true;
    }

    /*
     * Destroy
     */

    function destroy() {
        stop();
        context = null;
        sourceNode = null;
        stream = null;
        window.mozHack = null;
    }

    /*
     * Api
     */

    var api = {
        play: play,
        pause: pause,
        stop: stop,
        destroy: destroy,

        duration: 0,
        progress: 0
    };

    /*
     * Getters & Setters
     */

    Object.defineProperties(api, {
        currentTime: {
            get: function get() {
                if (pausedAt) {
                    return pausedAt;
                }
                if (startedAt) {
                    return context.currentTime - startedAt;
                }
                return 0;
            }
        },
        ended: {
            get: function get() {
                return ended;
            }
        },
        paused: {
            get: function get() {
                return paused;
            }
        },
        playing: {
            get: function get() {
                return playing;
            }
        },
        sourceNode: {
            get: function get() {
                return createSourceNode();
            }
        }
    });

    return Object.freeze(api);
}

function OscillatorSource(type, context) {
    var ended = false,
        paused = false,
        pausedAt = 0,
        playing = false,
        sourceNode = null,
        // OscillatorSourceNode
    startedAt = 0,
        frequency = 200,
        api = null;

    function createSourceNode() {
        if (!sourceNode && context) {
            sourceNode = context.createOscillator();
            sourceNode.type = type;
            sourceNode.frequency.value = frequency;
        }
        return sourceNode;
    }

    /*
     * Controls
     */

    function play(delay) {
        delay = delay || 0;
        if (delay) {
            delay = context.currentTime + delay;
        }

        createSourceNode();
        sourceNode.start(delay);

        if (pausedAt) {
            startedAt = context.currentTime - pausedAt;
        } else {
            startedAt = context.currentTime;
        }

        ended = false;
        playing = true;
        paused = false;
        pausedAt = 0;
    }

    function stop() {
        if (sourceNode) {
            try {
                sourceNode.stop(0);
            } catch (e) {}
            sourceNode = null;
        }
        ended = true;
        paused = false;
        pausedAt = 0;
        playing = false;
        startedAt = 0;
    }

    function pause() {
        var elapsed = context.currentTime - startedAt;
        stop();
        pausedAt = elapsed;
        playing = false;
        paused = true;
    }

    /*
     * Destroy
     */

    function destroy() {
        stop();
        context = null;
        sourceNode = null;
    }

    /*
     * Api
     */

    api = {
        play: play,
        pause: pause,
        stop: stop,
        destroy: destroy
    };

    /*
     * Getters & Setters
     */

    Object.defineProperties(api, {
        currentTime: {
            get: function get() {
                if (pausedAt) {
                    return pausedAt;
                }
                if (startedAt) {
                    return context.currentTime - startedAt;
                }
                return 0;
            }
        },
        duration: {
            value: 0
        },
        ended: {
            get: function get() {
                return ended;
            }
        },
        frequency: {
            get: function get() {
                return frequency;
            },
            set: function set(value) {
                frequency = value;
                if (sourceNode) {
                    sourceNode.frequency.value = value;
                }
            }
        },
        paused: {
            get: function get() {
                return paused;
            }
        },
        playing: {
            get: function get() {
                return playing;
            }
        },
        progress: {
            value: 0
        },
        sourceNode: {
            get: function get() {
                return createSourceNode();
            }
        }
    });

    return Object.freeze(api);
}

function ScriptSource(data, context) {
    var bufferSize = data.bufferSize || 1024;
    var channels = data.channels || 1;
    var ended = false,
        onProcess = data.callback.bind(data.thisArg || this),
        paused = false,
        pausedAt = 0,
        playing = false,
        sourceNode = null,
        // ScriptSourceNode
    startedAt = 0,
        api = null;

    function createSourceNode() {
        if (!sourceNode && context) {
            sourceNode = context.createScriptProcessor(bufferSize, 0, channels);
        }
        return sourceNode;
    }

    /*
     * Controls
     */

    function play() {
        createSourceNode();
        sourceNode.onaudioprocess = onProcess;

        startedAt = context.currentTime - pausedAt;
        ended = false;
        paused = false;
        pausedAt = 0;
        playing = true;
    }

    function onPaused(event) {
        var buffer = event.outputBuffer;
        for (var i = 0; i < buffer.numberOfChannels; i++) {
            var channel = buffer.getChannelData(i);
            for (var j = 0; j < channel.length; j++) {
                channel[j] = 0;
            }
        }
    }

    function stop() {
        if (sourceNode) {
            sourceNode.onaudioprocess = onPaused;
        }
        ended = true;
        paused = false;
        pausedAt = 0;
        playing = false;
        startedAt = 0;
    }

    function pause() {
        var elapsed = context.currentTime - startedAt;
        stop();
        pausedAt = elapsed;
        playing = false;
        paused = true;
    }

    /*
     * Destroy
     */

    function destroy() {
        stop();
        context = null;
        onProcess = null;
        sourceNode = null;
    }

    /*
     * Api
     */

    api = {
        play: play,
        pause: pause,
        stop: stop,
        destroy: destroy,

        duration: 0,
        progress: 0
    };

    /*
     * Getters & Setters
     */

    Object.defineProperties(api, {
        currentTime: {
            get: function get() {
                if (pausedAt) {
                    return pausedAt;
                }
                if (startedAt) {
                    return context.currentTime - startedAt;
                }
                return 0;
            }
        },
        ended: {
            get: function get() {
                return ended;
            }
        },
        paused: {
            get: function get() {
                return paused;
            }
        },
        playing: {
            get: function get() {
                return playing;
            }
        },
        sourceNode: {
            get: function get() {
                return createSourceNode();
            }
        }
    });

    return Object.freeze(api);
}

function waveform() {
    var buffer = void 0,
        wave = void 0;

    return function (audioBuffer, length) {
        if (!window.Float32Array || !window.AudioBuffer) {
            return [];
        }

        var sameBuffer = buffer === audioBuffer;
        var sameLength = wave && wave.length === length;
        if (sameBuffer && sameLength) {
            return wave;
        }

        //console.time('waveData');
        if (!wave || wave.length !== length) {
            wave = new Float32Array(length);
        }

        if (!audioBuffer) {
            return wave;
        }

        // cache for repeated calls
        buffer = audioBuffer;

        var chunk = Math.floor(buffer.length / length),
            resolution = 5,
            // 10
        incr = Math.max(Math.floor(chunk / resolution), 1);
        var greatest = 0;

        for (var i = 0; i < buffer.numberOfChannels; i++) {
            // check each channel
            var channel = buffer.getChannelData(i);
            for (var j = 0; j < length; j++) {
                // get highest value within the chunk
                for (var k = j * chunk, l = k + chunk; k < l; k += incr) {
                    // select highest value from channels
                    var a = channel[k];
                    if (a < 0) {
                        a = -a;
                    }
                    if (a > wave[j]) {
                        wave[j] = a;
                    }
                    // update highest overall for scaling
                    if (a > greatest) {
                        greatest = a;
                    }
                }
            }
        }
        // scale up
        var scale = 1 / greatest;
        for (var _i = 0; _i < wave.length; _i++) {
            wave[_i] *= scale;
        }
        //console.timeEnd('waveData');

        return wave;
    };
}

function Sound(config) {
    var context = config.context;
    var destination = config.destination;
    var effect = new Effect(context);
    var gain = effect.gain();
    var wave = waveform();

    var id = null;
    var data = null;
    var isTouchLocked = false;
    var loader = null;
    var loop = false;
    var playbackRate = 1;
    var playWhenReady = null;
    var source = null;
    var sound = null;

    if (context) {
        effect.setDestination(gain);
        gain.connect(destination || context.destination);
    }

    /*
     * Create source
     */

    function createSource(value) {
        data = value;

        if (file.isAudioBuffer(data)) {
            source = new BufferSource(data, context, function () {
                return sound.emit('ended', sound);
            });
        } else if (file.isMediaElement(data)) {
            source = new MediaSource(data, context, function () {
                return sound.emit('ended', sound);
            });
        } else if (file.isMediaStream(data)) {
            source = new MicrophoneSource(data, context);
        } else if (file.isOscillatorType(data && data.type || data)) {
            source = new OscillatorSource(data.type || data, context);
        } else if (file.isScriptConfig(data)) {
            source = new ScriptSource(data, context);
        } else {
            throw new Error('Cannot detect data type: ' + data);
        }

        effect.setSource(source.sourceNode);

        sound.emit('ready', sound);

        if (playWhenReady) {
            playWhenReady();
        }
    }

    /*
     * Load
     */

    function onLoad(fileData) {
        createSource(fileData);
        sound.emit('loaded', sound);
    }

    function onLoadError(err) {
        sound.emit('error', sound, err);
    }

    function load() {
        var newConfig = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
        var force = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

        var skipLoad = !force && !source && !!config.deferLoad;

        if (newConfig) {
            var src = file.getSupportedFile(config.src || config.url || config.data || config) || config.src;
            config = Object.assign(config, newConfig, { src: src });
        }

        if (source && data && data.tagName) {
            source.load(config.src);
        } else {
            loader = loader || new Loader(config.src, skipLoad);
            loader.audioContext = !!config.asMediaElement ? null : context;
            loader.isTouchLocked = isTouchLocked;
            loader.off('loaded', onLoad);
            loader.once('loaded', onLoad);
            loader.off('error', onLoadError);
            loader.on('error', onLoadError);
        }
        return sound;
    }

    /*
     * Controls
     */

    function play(delay, offset) {
        if (!source || isTouchLocked) {
            playWhenReady = function playWhenReady() {
                if (source) {
                    play(delay, offset);
                }
            };
            if (!!config.deferLoad) {
                if (!loader) {
                    load(null, true);
                }
                loader.start(true);
            }
            return sound;
        }
        playWhenReady = null;
        effect.setSource(source.sourceNode);

        // update volume needed for no webaudio
        if (!context) {
            sound.volume = gain.gain.value;
        }

        source.play(delay, offset);

        if (source.hasOwnProperty('loop')) {
            source.loop = loop;
        }

        sound.emit('play', sound);

        return sound;
    }

    function pause() {
        source && source.pause();
        sound.emit('pause', sound);
        return sound;
    }

    function stop(delay) {
        source && source.stop(delay || 0);
        sound.emit('stop', sound);
        return sound;
    }

    function seek(percent) {
        if (source) {
            source.stop();
            play(0, source.duration * percent);
        }
        return sound;
    }

    function fade(volume, duration) {
        if (!source) {
            return sound;
        }

        var param = gain.gain;

        if (context) {
            var time = context.currentTime;
            param.cancelScheduledValues(time);
            param.setValueAtTime(param.value, time);
            param.linearRampToValueAtTime(volume, time + duration);
        } else if (typeof source.fade === 'function') {
            source.fade(volume, duration);
            param.value = volume;
        }

        sound.emit('fade', sound, volume);

        return sound;
    }

    function unload() {
        source && source.destroy();
        loader && loader.destroy();
        data = null;
        playWhenReady = null;
        source = null;
        loader = null;
        config.deferLoad = true;
        sound.emit('unload', sound);
    }

    function reload() {
        load(null, true);
    }

    /*
     * Destroy
     */

    function destroy() {
        source && source.destroy();
        effect && effect.destroy();
        gain && gain.disconnect();
        loader && loader.off('loaded');
        loader && loader.off('error');
        loader && loader.destroy();
        sound.off('loaded');
        sound.off('ended');
        sound.off('error');
        gain = null;
        context = null;
        destination = null;
        data = null;
        playWhenReady = null;
        source = null;
        effect = null;
        loader = null;
        wave = null;
        config = null;
        sound.emit('destroy', sound);
        sound.off('destroy');
    }

    sound = Object.create(Emitter.prototype, {
        _events: {
            value: {}
        },
        constructor: {
            value: Sound
        },
        play: {
            value: play
        },
        pause: {
            value: pause
        },
        load: {
            value: load
        },
        seek: {
            value: seek
        },
        stop: {
            value: stop
        },
        fade: {
            value: fade
        },
        unload: {
            value: unload
        },
        reload: {
            value: reload
        },
        destroy: {
            value: destroy
        },
        context: {
            value: context
        },
        currentTime: {
            get: function get() {
                return source ? source.currentTime : 0;
            },
            set: function set(value) {
                // const silent = sound.playing;
                source && source.stop();
                // play(0, value, silent);
                play(0, value);
            }
        },
        data: {
            get: function get() {
                return data;
            },
            set: function set(value) {
                if (!value) {
                    return;
                }
                createSource(value);
            }
        },
        duration: {
            get: function get() {
                return source ? source.duration : 0;
            }
        },
        effect: {
            value: effect
        },
        ended: {
            get: function get() {
                return !!source && source.ended;
            }
        },
        frequency: {
            get: function get() {
                return source ? source.frequency : 0;
            },
            set: function set(value) {
                if (source && source.hasOwnProperty('frequency')) {
                    source.frequency = value;
                }
            }
        },
        gain: {
            value: gain
        },
        id: {
            get: function get() {
                return id;
            },
            set: function set(value) {
                id = value;
            }
        },
        isTouchLocked: {
            set: function set(value) {
                isTouchLocked = value;
                if (loader) {
                    loader.isTouchLocked = value;
                }
                if (!value && playWhenReady) {
                    playWhenReady();
                }
            }
        },
        loader: {
            get: function get() {
                return loader;
            }
        },
        loop: {
            get: function get() {
                return loop;
            },
            set: function set(value) {
                loop = !!value;

                if (source && source.hasOwnProperty('loop') && source.loop !== loop) {
                    source.loop = loop;
                }
            }
        },
        config: {
            get: function get() {
                return config;
            }
        },
        paused: {
            get: function get() {
                return !!source && source.paused;
            }
        },
        playing: {
            get: function get() {
                return !!source && source.playing;
            }
        },
        playbackRate: {
            get: function get() {
                return playbackRate;
            },
            set: function set(value) {
                playbackRate = value;
                if (source) {
                    source.playbackRate = playbackRate;
                }
            }
        },
        progress: {
            get: function get() {
                return source ? source.progress : 0;
            }
        },
        sourceNode: {
            get: function get() {
                return source ? source.sourceNode : null;
            }
        },
        volume: {
            get: function get() {
                if (context) {
                    return gain.gain.value;
                }
                if (source && source.hasOwnProperty('volume')) {
                    return source.volume;
                }
                return 1;
            },
            set: function set(value) {
                if (isNaN(value)) {
                    return;
                }

                value = Math.min(Math.max(value, 0), 1);

                var param = gain.gain;

                if (context) {
                    var time = context.currentTime;
                    param.cancelScheduledValues(time);
                    param.value = value;
                    param.setValueAtTime(value, time);
                } else {
                    param.value = value;

                    if (source && source.hasOwnProperty('volume')) {
                        source.volume = value;
                    }
                }
            }
        },
        // for media element source
        groupVolume: {
            get: function get() {
                return source.groupVolume;
            },
            set: function set(value) {
                if (source && source.hasOwnProperty('groupVolume')) {
                    source.groupVolume = value;
                }
            }
        },
        waveform: {
            value: function value(length) {
                if (!data) {
                    sound.once('ready', function () {
                        return wave(data, length);
                    });
                }
                return wave(data, length);
            }
        },
        userData: {
            value: {}
        }
    });

    return sound;
}

// expose for unit tests
Sound.__source = {
    BufferSource: BufferSource,
    MediaSource: MediaSource,
    MicrophoneSource: MicrophoneSource,
    OscillatorSource: OscillatorSource,
    ScriptSource: ScriptSource
};

function SoundGroup(context, destination) {
    var group = new Group(context, destination);
    var sounds = group.sounds;
    var playbackRate = 1,
        loop = false,
        src = void 0;

    function getSource() {
        if (!sounds.length) {
            return;
        }

        src = sounds.slice(0).sort(function (a, b) {
            return b.duration - a.duration;
        })[0];
    }

    var add = group.add;
    group.add = function (sound) {
        add(sound);
        getSource();
        return group;
    };

    var remove = group.rmeove;
    group.remove = function (soundOrId) {
        remove(soundOrId);
        getSource();
        return group;
    };

    Object.defineProperties(group, {
        currentTime: {
            get: function get() {
                return src ? src.currentTime : 0;
            },
            set: function set(value) {
                this.stop();
                this.play(0, value);
            }
        },
        duration: {
            get: function get() {
                return src ? src.duration : 0;
            }
        },
        // ended: {
        //     get: function() {
        //         return src ? src.ended : false;
        //     }
        // },
        loop: {
            get: function get() {
                return loop;
            },
            set: function set(value) {
                loop = !!value;
                sounds.forEach(function (sound) {
                    sound.loop = loop;
                });
            }
        },
        paused: {
            get: function get() {
                // return src ? src.paused : false;
                return !!src && src.paused;
            }
        },
        progress: {
            get: function get() {
                return src ? src.progress : 0;
            }
        },
        playbackRate: {
            get: function get() {
                return playbackRate;
            },
            set: function set(value) {
                playbackRate = value;
                sounds.forEach(function (sound) {
                    sound.playbackRate = playbackRate;
                });
            }
        },
        playing: {
            get: function get() {
                // return src ? src.playing : false;
                return !!src && src.playing;
            }
        }
    });

    return group;
}

function Microphone(connected, denied, error) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    error = error || function () {};

    var isSupported = !!navigator.getUserMedia;
    var api = {};
    var stream = null;

    function connect() {
        if (!isSupported) {
            return api;
        }

        navigator.getUserMedia({
            audio: true
        }, function (micStream) {
            stream = micStream;
            connected(stream);
        }, function (e) {
            if (denied && e.name === 'PermissionDeniedError' || e === 'PERMISSION_DENIED') {
                // console.log('Permission denied. Reset by clicking the camera icon with the red cross.');
                denied();
            } else {
                error(e.message || e);
            }
        });
        return api;
    }

    function disconnect() {
        if (stream) {
            stream.stop();
            stream = null;
        }
        return api;
    }

    Object.defineProperties(api, {
        connect: {
            value: connect
        },
        disconnect: {
            value: disconnect
        },
        isSupported: {
            value: isSupported
        },
        stream: {
            get: function get() {
                return stream;
            }
        }
    });

    return Object.freeze(api);
}

var halfPI = Math.PI / 2;
var twoPI = Math.PI * 2;

function waveformer(config) {

    var style = config.style || 'fill',
        // 'fill' or 'line'
    shape = config.shape || 'linear',
        // 'circular' or 'linear'
    color = config.color || 0,
        bgColor = config.bgColor,
        lineWidth = config.lineWidth || 1,
        percent = config.percent || 1,
        originX = config.x || 0,
        originY = config.y || 0,
        transform = config.transform;

    var canvas = config.canvas,
        width = config.width || canvas && canvas.width,
        height = config.height || canvas && canvas.height;

    var ctx = null,
        currentColor = void 0,
        i = void 0,
        x = void 0,
        y = void 0,
        radius = void 0,
        innerRadius = void 0,
        centerX = void 0,
        centerY = void 0;

    if (!canvas && !config.context) {
        canvas = document.createElement('canvas');
        width = width || canvas.width;
        height = height || canvas.height;
        canvas.width = height;
        canvas.height = height;
    }

    if (shape === 'circular') {
        radius = config.radius || Math.min(height / 2, width / 2);
        innerRadius = config.innerRadius || radius / 2;
        centerX = originX + width / 2;
        centerY = originY + height / 2;
    }

    ctx = config.context || canvas.getContext('2d');

    function clear() {
        if (bgColor) {
            ctx.fillStyle = bgColor;
            ctx.fillRect(originX, originY, width, height);
        } else {
            ctx.clearRect(originX, originY, width, height);
        }

        ctx.lineWidth = lineWidth;

        currentColor = null;

        if (typeof color !== 'function') {
            ctx.strokeStyle = color;
            ctx.beginPath();
        }
    }

    function updateColor(position, length, value) {
        if (typeof color === 'function') {
            var newColor = color(position, length, value);
            if (newColor !== currentColor) {
                currentColor = newColor;
                ctx.stroke();
                ctx.strokeStyle = currentColor;
                ctx.beginPath();
            }
        }
    }

    function getValue(value, position, length) {
        if (typeof transform === 'function') {
            return transform(value, position, length);
        }
        return value;
    }

    function getWaveform(value, length) {
        if (value && typeof value.waveform === 'function') {
            return value.waveform(length);
        }
        if (value) {
            return value;
        }
        if (config.waveform) {
            return config.waveform;
        }
        if (config.sound) {
            return config.sound.waveform(length);
        }
        return null;
    }

    function update(wave) {

        clear();

        if (shape === 'circular') {
            var waveform = getWaveform(wave, 360);
            var length = Math.floor(waveform.length * percent);

            var step = twoPI / length;
            var angle = void 0,
                magnitude = void 0,
                sine = void 0,
                cosine = void 0;

            for (i = 0; i < length; i++) {
                var value = getValue(waveform[i], i, length);
                updateColor(i, length, value);

                angle = i * step - halfPI;
                cosine = Math.cos(angle);
                sine = Math.sin(angle);

                if (style === 'fill') {
                    x = centerX + innerRadius * cosine;
                    y = centerY + innerRadius * sine;
                    ctx.moveTo(x, y);
                }

                magnitude = innerRadius + (radius - innerRadius) * value;
                x = centerX + magnitude * cosine;
                y = centerY + magnitude * sine;

                if (style === 'line' && i === 0) {
                    ctx.moveTo(x, y);
                }

                ctx.lineTo(x, y);
            }

            if (style === 'line') {
                ctx.closePath();
            }
        } else {

            var _waveform = getWaveform(wave, width);
            var _length = Math.min(_waveform.length, width - lineWidth / 2);
            _length = Math.floor(_length * percent);

            for (i = 0; i < _length; i++) {
                var _value = getValue(_waveform[i], i, _length);
                updateColor(i, _length, _value);

                if (style === 'line' && i > 0) {
                    ctx.lineTo(x, y);
                }

                x = originX + i;
                y = originY + height - Math.round(height * _value);
                y = Math.floor(Math.min(y, originY + height - lineWidth / 2));

                if (style === 'fill') {
                    ctx.moveTo(x, y);
                    ctx.lineTo(x, originY + height);
                } else {
                    ctx.lineTo(x, y);
                }
            }
        }
        ctx.stroke();
    }

    update.canvas = canvas;

    if (config.waveform || config.sound) {
        update();
    }

    return update;
}

/*
 * audio ctx
 */
var ctx = void 0;
var offlineCtx = void 0;

function getContext() {
	if (ctx) {
		return ctx;
	}

	var desiredSampleRate = 44100;

	var Ctx = window.AudioContext || window.webkitAudioContext;

	ctx = Ctx ? new Ctx() : null;

	// Check if hack is necessary. Only occurs in iOS6+ devices
	// and only when you first boot the iPhone, or play a audio/video
	// with a different sample rate
	// https://github.com/Jam3/ios-safe-audio-context/blob/master/index.js
	if (/(iPhone|iPad)/i.test(navigator.userAgent) && ctx.sampleRate !== desiredSampleRate) {
		var buffer = ctx.createBuffer(1, 1, desiredSampleRate);
		var dummy = ctx.createBufferSource();
		dummy.buffer = buffer;
		dummy.connect(ctx.destination);
		dummy.start(0);
		dummy.disconnect();

		ctx.close(); // dispose old context
		ctx = Ctx ? new Ctx() : null;
	}

	// Handles bug in Safari 9 OSX where AudioContext instance starts in 'suspended' state

	var isSuspended = ctx && ctx.state === 'suspended';

	if (isSuspended && typeof ctx.resume === 'function') {
		window.setTimeout(function () {
			ctx.resume();
		}, 1000);
	}

	return ctx;
}

/*
In contrast with a standard AudioContext, an OfflineAudioContext doesn't render
the audio to the device hardware;
instead, it generates it, as fast as it can, and outputs the result to an AudioBuffer.
*/
function getOfflineContext(numOfChannels, length, sampleRate) {
	if (offlineCtx) {
		return offlineCtx;
	}
	numOfChannels = numOfChannels || 2;
	sampleRate = sampleRate || 44100;
	length = sampleRate || numOfChannels;

	var OfflineCtx = window.OfflineAudioContext || window.webkitOfflineAudioContext;

	offlineCtx = OfflineCtx ? new OfflineCtx(numOfChannels, length, sampleRate) : null;

	return offlineCtx;
}

/*
 * clone audio buffer
 */

function cloneBuffer(buffer) {
	if (!ctx) {
		return buffer;
	}

	var numChannels = buffer.numberOfChannels,
	    cloned = ctx.createBuffer(numChannels, buffer.length, buffer.sampleRate);
	for (var i = 0; i < numChannels; i++) {
		cloned.getChannelData(i).set(buffer.getChannelData(i));
	}
	return cloned;
}

/*
 * reverse audio buffer
 */

function reverseBuffer(buffer) {
	var numChannels = buffer.numberOfChannels;
	for (var i = 0; i < numChannels; i++) {
		Array.prototype.reverse.call(buffer.getChannelData(i));
	}
	return buffer;
}

/*
 * ramp audio param
 */

function ramp(param, fromValue, toValue, duration, linear) {
	if (!ctx) {
		return;
	}

	param.setValueAtTime(fromValue, ctx.currentTime);

	if (linear) {
		param.linearRampToValueAtTime(toValue, ctx.currentTime + duration);
	} else {
		param.exponentialRampToValueAtTime(toValue, ctx.currentTime + duration);
	}
}

/*
 * get frequency from min to max by passing 0 to 1
 */

function getFrequency(value) {
	if (!ctx) {
		return 0;
	}
	// get frequency by passing number from 0 to 1
	// Clamp the frequency between the minimum value (40 Hz) and half of the
	// sampling rate.
	var minValue = 40;
	var maxValue = ctx.sampleRate / 2;
	// Logarithm (base 2) to compute how many octaves fall in the range.
	var numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;
	// Compute a multiplier from 0 to 1 based on an exponential scale.
	var multiplier = Math.pow(2, numberOfOctaves * (value - 1.0));
	// Get back to the frequency value between min and max.
	return maxValue * multiplier;
}

/*
 * microphone util
 */

function microphone(connected, denied, error) {
	return new Microphone(connected, denied, error);
}

/*
 * Format seconds as timecode string
 */

function timeCode(seconds) {
	var delim = arguments.length <= 1 || arguments[1] === undefined ? ':' : arguments[1];

	// const h = Math.floor(seconds / 3600);
	// const m = Math.floor((seconds % 3600) / 60);
	var m = Math.floor(seconds / 60);
	var s = Math.floor(seconds % 3600 % 60);
	// const hr = (h < 10 ? '0' + h + delim : h + delim);
	var mn = (m < 10 ? '0' + m : m) + delim;
	var sc = s < 10 ? '0' + s : s;
	// return hr + mn + sc;
	return mn + sc;
}

var utils = Object.freeze({
	getContext: getContext,
	getOfflineContext: getOfflineContext,
	cloneBuffer: cloneBuffer,
	reverseBuffer: reverseBuffer,
	ramp: ramp,
	getFrequency: getFrequency,
	microphone: microphone,
	timeCode: timeCode,
	waveformer: waveformer
});

function Sono() {
    var VERSION = '0.1.85';
    var context = utils.getContext();
    var destination = context ? context.destination : null;
    var group = new Group(context, destination);

    var api = null;
    var isTouchLocked = false;

    /*
     * Get Sound by id
     */

    function getSound(id) {
        return group.find(id);
    }

    /*
     * Create group
     */

    function createGroup(sounds) {
        var soundGroup = new SoundGroup(context, group.gain);
        if (sounds) {
            sounds.forEach(function (sound) {
                return soundGroup.add(sound);
            });
        }
        return soundGroup;
    }

    /*
     * Loading
     */

    function add(config) {
        var soundContext = config && config.webAudio === false ? null : context;
        // const sound = new Sound(soundContext, group.gain);
        var src = file.getSupportedFile(config.src || config.url || config.data || config);
        var sound = new Sound(Object.assign({}, config || {}, {
            src: src,
            context: soundContext,
            destination: group.gain
        }));
        sound.isTouchLocked = isTouchLocked;
        if (config) {
            sound.id = config.id || config.name || '';
            sound.loop = !!config.loop;
            sound.volume = config.volume;
        }
        group.add(sound);
        return sound;
    }

    function queue(config, loaderGroup) {
        var sound = add(config).load();

        if (loaderGroup) {
            loaderGroup.add(sound.loader);
        }
        return sound;
    }

    function load(config) {
        var src = config.src || config.url || config.data || config;
        var sound = void 0,
            loader = void 0;

        if (file.containsURL(src)) {
            sound = queue(config);
            loader = sound.loader;
        } else if (Array.isArray(src) && file.containsURL(src[0].src || src[0].url)) {
            sound = [];
            loader = new Loader.Group();
            src.forEach(function (url) {
                return sound.push(queue(url, loader));
            });
        } else {
            var errorMessage = 'sono.load: No audio file URLs found in config.';
            if (config.onError) {
                config.onError('[ERROR] ' + errorMessage);
            } else {
                throw new Error(errorMessage);
            }
            return null;
        }
        if (config.onProgress) {
            loader.on('progress', function (progress) {
                return config.onProgress(progress);
            });
        }
        if (config.onComplete) {
            loader.once('complete', function () {
                loader.off('progress');
                config.onComplete(sound);
            });
        }
        loader.once('error', function (err) {
            loader.off('error');
            if (config.onError) {
                config.onError(err);
            } else {
                console.error('[ERROR] sono.load: ' + err);
            }
        });
        loader.start();

        return sound;
    }

    /*
     * Create Sound
     *
     * Accepted values for param config:
     * Object config e.g. { id:'foo', url:['foo.ogg', 'foo.mp3'] }
     * Array (of files e.g. ['foo.ogg', 'foo.mp3'])
     * ArrayBuffer
     * HTMLMediaElement
     * Filename string (e.g. 'foo.ogg')
     * Oscillator type string (i.e. 'sine', 'square', 'sawtooth', 'triangle')
     * ScriptProcessor config object (e.g. { bufferSize: 1024, channels: 1, callback: fn })
     */

    function createSound(config) {
        // try to load if config contains URLs
        if (file.containsURL(config)) {
            return load(config);
        }

        var sound = add(config);
        sound.data = config.data || config;

        return sound;
    }

    /*
     * Destroy
     */

    function destroySound(soundOrId) {
        group.find(soundOrId, function (sound) {
            return sound.destroy();
        });
        return api;
    }

    function destroyAll() {
        group.destroy();
        return api;
    }

    /*
     * Controls
     */

    function mute() {
        group.mute();
        return api;
    }

    function unMute() {
        group.unMute();
        return api;
    }

    function fade(volume, duration) {
        group.fade(volume, duration);
        return api;
    }

    function pauseAll() {
        group.pause();
        return api;
    }

    function resumeAll() {
        group.resume();
        return api;
    }

    function stopAll() {
        group.stop();
        return api;
    }

    function play(id, delay, offset) {
        group.find(id, function (sound) {
            return sound.play(delay, offset);
        });
        return api;
    }

    function pause(id) {
        group.find(id, function (sound) {
            return sound.pause();
        });
        return api;
    }

    function stop(id) {
        group.find(id, function (sound) {
            return sound.stop();
        });
        return api;
    }

    /*
     * Mobile touch lock
     */

    isTouchLocked = browser.handleTouchLock(context, function () {
        isTouchLocked = false;
        group.sounds.forEach(function (sound) {
            return sound.isTouchLocked = false;
        });
    });

    /*
     * Page visibility events
     */

    (function () {
        var pageHiddenPaused = [];

        // pause currently playing sounds and store refs
        function onHidden() {
            group.sounds.forEach(function (sound) {
                if (sound.playing) {
                    sound.pause();
                    pageHiddenPaused.push(sound);
                }
            });
        }

        // play sounds that got paused when page was hidden
        function onShown() {
            while (pageHiddenPaused.length) {
                pageHiddenPaused.pop().play();
            }
        }

        browser.handlePageVisibility(onHidden, onShown);
    })();

    /*
     * Log version & device support info
     */

    function log() {
        var title = 'sono ' + VERSION,
            info = 'Supported:' + api.isSupported + ' WebAudioAPI:' + api.hasWebAudio + ' TouchLocked:' + isTouchLocked + ' State:' + (context && context.state) + ' Extensions:' + file.extensions;

        if (navigator.userAgent.indexOf('Chrome') > -1) {
            var args = ['%c ♫ ' + title + ' ♫ %c ' + info + ' ', 'color: #FFFFFF; background: #379F7A', 'color: #1F1C0D; background: #E0FBAC'];
            console.log.apply(console, args);
        } else if (window.console && window.console.log.call) {
            console.log.call(console, title + ' ' + info);
        }
    }

    api = {
        createSound: createSound,
        create: createSound,
        destroySound: destroySound,
        destroyAll: destroyAll,
        getSound: getSound,
        createGroup: createGroup,
        file: file,
        load: load,
        mute: mute,
        unMute: unMute,
        fade: fade,
        pauseAll: pauseAll,
        resumeAll: resumeAll,
        stopAll: stopAll,
        play: play,
        pause: pause,
        stop: stop,
        log: log,

        canPlay: file.canPlay,
        context: context,
        getOfflineContext: utils.getOfflineContext,
        effect: group.effect,
        extensions: file.extensions,
        hasWebAudio: !!context,
        isSupported: file.extensions.length > 0,
        gain: group.gain,
        utils: utils,
        VERSION: VERSION,

        Sound: Sound,
        Group: Group
    };

    /*
     * Getters & Setters
     */

    Object.defineProperties(api, {
        isTouchLocked: {
            get: function get() {
                return isTouchLocked;
            }
        },
        sounds: {
            get: function get() {
                return group.sounds.slice(0);
            }
        },
        volume: {
            get: function get() {
                return group.volume;
            },
            set: function set(value) {
                group.volume = value;
            }
        }
    });

    return Object.freeze(api);
}

var sono = new Sono();

return sono;

})));


},{}]},{},[1])

//# sourceMappingURL=app.js.map
