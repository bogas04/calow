_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[9],{"/0+H":function(e,n,t){"use strict";n.__esModule=!0,n.isInAmpMode=i,n.useAmp=function(){return i(o.default.useContext(a.AmpStateContext))};var r,o=(r=t("q1tI"))&&r.__esModule?r:{default:r},a=t("lwAK");function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.ampFirst,t=void 0!==n&&n,r=e.hybrid,o=void 0!==r&&r,a=e.hasQuery,i=void 0!==a&&a;return t||o&&i}},0:function(e,n,t){t("74v/"),e.exports=t("nOHt")},"48fX":function(e,n,t){var r=t("qhzo");e.exports=function(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&r(e,n)}},"5fIB":function(e,n,t){var r=t("7eYB");e.exports=function(e){if(Array.isArray(e))return r(e)}},"74v/":function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return t("hUgY")}])},"8Kt/":function(e,n,t){"use strict";t("oI91");n.__esModule=!0,n.defaultHead=u,n.default=void 0;var r,o=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var n=l();if(n&&n.has(e))return n.get(e);var t={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var a=r?Object.getOwnPropertyDescriptor(e,o):null;a&&(a.get||a.set)?Object.defineProperty(t,o,a):t[o]=e[o]}t.default=e,n&&n.set(e,t);return t}(t("q1tI")),a=(r=t("Xuae"))&&r.__esModule?r:{default:r},i=t("lwAK"),c=t("FYa8"),s=t("/0+H");function l(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return l=function(){return e},e}function u(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=[o.default.createElement("meta",{charSet:"utf-8"})];return e||n.push(o.default.createElement("meta",{name:"viewport",content:"width=device-width"})),n}function p(e,n){return"string"===typeof n||"number"===typeof n?e:n.type===o.default.Fragment?e.concat(o.default.Children.toArray(n.props.children).reduce((function(e,n){return"string"===typeof n||"number"===typeof n?e:e.concat(n)}),[])):e.concat(n)}var f=["name","httpEquiv","charSet","itemProp"];function d(e,n){return e.reduce((function(e,n){var t=o.default.Children.toArray(n.props.children);return e.concat(t)}),[]).reduce(p,[]).reverse().concat(u(n.inAmpMode)).filter(function(){var e=new Set,n=new Set,t=new Set,r={};return function(o){var a=!0;if(o.key&&"number"!==typeof o.key&&o.key.indexOf("$")>0){var i=o.key.slice(o.key.indexOf("$")+1);e.has(i)?a=!1:e.add(i)}switch(o.type){case"title":case"base":n.has(o.type)?a=!1:n.add(o.type);break;case"meta":for(var c=0,s=f.length;c<s;c++){var l=f[c];if(o.props.hasOwnProperty(l))if("charSet"===l)t.has(l)?a=!1:t.add(l);else{var u=o.props[l],p=r[l]||new Set;p.has(u)?a=!1:(p.add(u),r[l]=p)}}}return a}}()).reverse().map((function(e,n){var t=e.key||n;return o.default.cloneElement(e,{key:t})}))}function b(e){var n=e.children,t=(0,o.useContext)(i.AmpStateContext),r=(0,o.useContext)(c.HeadManagerContext);return o.default.createElement(a.default,{reduceComponentsToState:d,headManager:r,inAmpMode:(0,s.isInAmpMode)(t)},n)}b.rewind=function(){};var h=b;n.default=h},FYa8:function(e,n,t){"use strict";var r;n.__esModule=!0,n.HeadManagerContext=void 0;var o=((r=t("q1tI"))&&r.__esModule?r:{default:r}).default.createContext({});n.HeadManagerContext=o},T0f4:function(e,n){function t(n){return e.exports=t=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},t(n)}e.exports=t},Xuae:function(e,n,t){"use strict";var r=t("mPvQ"),o=t("/GRZ"),a=t("i2R6"),i=(t("qXWd"),t("48fX")),c=t("tCBg"),s=t("T0f4");function l(e){var n=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var t,r=s(e);if(n){var o=s(this).constructor;t=Reflect.construct(r,arguments,o)}else t=r.apply(this,arguments);return c(this,t)}}n.__esModule=!0,n.default=void 0;var u=t("q1tI"),p=function(e){i(t,e);var n=l(t);function t(e){var a;return o(this,t),(a=n.call(this,e))._hasHeadManager=void 0,a.emitChange=function(){a._hasHeadManager&&a.props.headManager.updateHead(a.props.reduceComponentsToState(r(a.props.headManager.mountedInstances),a.props))},a._hasHeadManager=a.props.headManager&&a.props.headManager.mountedInstances,a}return a(t,[{key:"componentDidMount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.add(this),this.emitChange()}},{key:"componentDidUpdate",value:function(){this.emitChange()}},{key:"componentWillUnmount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.delete(this),this.emitChange()}},{key:"render",value:function(){return null}}]),t}(u.Component);n.default=p},YFqc:function(e,n,t){e.exports=t("cTJO")},cTJO:function(e,n,t){"use strict";var r=t("zoAU"),o=t("7KCV");n.__esModule=!0,n.default=void 0;var a=o(t("q1tI")),i=t("elyg"),c=t("nOHt"),s=t("vNVm"),l={};function u(e,n,t,r){if((0,i.isLocalURL)(n)){e.prefetch(n,t,r).catch((function(e){0}));var o=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;l[n+"%"+t+(o?"%"+o:"")]=!0}}var p=function(e){var n=!1!==e.prefetch,t=(0,c.useRouter)(),o=t&&t.pathname||"/",p=a.default.useMemo((function(){var n=(0,i.resolveHref)(o,e.href,!0),t=r(n,2),a=t[0],c=t[1];return{href:a,as:e.as?(0,i.resolveHref)(o,e.as):c||a}}),[o,e.href,e.as]),f=p.href,d=p.as,b=e.children,h=e.replace,m=e.shallow,g=e.scroll,y=e.locale;"string"===typeof b&&(b=a.default.createElement("a",null,b));var j=a.Children.only(b),v=j&&"object"===typeof j&&j.ref,O=(0,s.useIntersection)({rootMargin:"200px"}),x=r(O,2),w=x[0],k=x[1],_=a.default.useCallback((function(e){w(e),v&&("function"===typeof v?v(e):"object"===typeof v&&(v.current=e))}),[v,w]);(0,a.useEffect)((function(){var e=k&&n&&(0,i.isLocalURL)(f),r="undefined"!==typeof y?y:t&&t.locale,o=l[f+"%"+d+(r?"%"+r:"")];e&&!o&&u(t,f,d,{locale:r})}),[d,f,k,y,n,t]);var C={ref:_,onClick:function(e){j.props&&"function"===typeof j.props.onClick&&j.props.onClick(e),e.defaultPrevented||function(e,n,t,r,o,a,c,s){("A"!==e.currentTarget.nodeName||!function(e){var n=e.currentTarget.target;return n&&"_self"!==n||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&(0,i.isLocalURL)(t))&&(e.preventDefault(),null==c&&(c=r.indexOf("#")<0),n[o?"replace":"push"](t,r,{shallow:a,locale:s}).then((function(e){e&&c&&(window.scrollTo(0,0),document.body.focus())})))}(e,t,f,d,h,m,g,y)},onMouseEnter:function(e){(0,i.isLocalURL)(f)&&(j.props&&"function"===typeof j.props.onMouseEnter&&j.props.onMouseEnter(e),u(t,f,d,{priority:!0}))}};return(e.passHref||"a"===j.type&&!("href"in j.props))&&(C.href=(0,i.addBasePath)((0,i.addLocale)(d,"undefined"!==typeof y?y:t&&t.locale,t&&t.defaultLocale))),a.default.cloneElement(j,C)};n.default=p},hUgY:function(e,n,t){"use strict";t.r(n);var r=t("cpVT"),o=t("nKUr"),a=t("CjxU"),i=t("cOp2"),c=t.n(i),s=t("qKvR"),l=t("mf32");function u(){var e=c()(['\n  html {\n    line-height: 1.15;\n    -webkit-text-size-adjust: 100%;\n  }\n\n  body {\n    margin: 0;\n  }\n\n  main {\n    display: block;\n  }\n\n  h1 {\n    font-size: 2em;\n    margin: 0.67em 0;\n  }\n\n  hr {\n    box-sizing: content-box;\n    height: 0;\n    overflow: visible;\n  }\n\n  pre {\n    font-family: monospace, monospace;\n    font-size: 1em;\n  }\n\n  a {\n    background-color: transparent;\n  }\n\n  abbr[title] {\n    border-bottom: none;\n    text-decoration: underline;\n    -webkit-text-decoration: underline dotted;\n    text-decoration: underline dotted;\n  }\n\n  b,\n  strong {\n    font-weight: bolder;\n  }\n\n  code,\n  kbd,\n  samp {\n    font-family: monospace, monospace;\n    font-size: 1em;\n  }\n\n  small {\n    font-size: 80%;\n  }\n\n  sub,\n  sup {\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n    vertical-align: baseline;\n  }\n\n  sub {\n    bottom: -0.25em;\n  }\n\n  sup {\n    top: -0.5em;\n  }\n\n  img {\n    border-style: none;\n  }\n\n  button,\n  input,\n  optgroup,\n  select,\n  textarea {\n    font-family: inherit;\n    font-size: 100%;\n    line-height: 1.15;\n    margin: 0;\n  }\n\n  button,\n  input {\n    overflow: visible;\n  }\n\n  button,\n  select {\n    text-transform: none;\n  }\n\n  button::-moz-focus-inner,\n  [type="button"]::-moz-focus-inner,\n  [type="reset"]::-moz-focus-inner,\n  [type="submit"]::-moz-focus-inner {\n    border-style: none;\n    padding: 0;\n  }\n\n  fieldset {\n    padding: 0.35em 0.75em 0.625em;\n  }\n\n  legend {\n    box-sizing: border-box;\n    color: inherit;\n    display: table;\n    max-width: 100%;\n    padding: 0;\n    white-space: normal;\n  }\n\n  progress {\n    vertical-align: baseline;\n  }\n\n  textarea {\n    overflow: auto;\n  }\n\n  [type="checkbox"],\n  [type="radio"] {\n    box-sizing: border-box;\n    padding: 0;\n  }\n\n  [type="number"]::-webkit-inner-spin-button,\n  [type="number"]::-webkit-outer-spin-button {\n    -webkit-appearance: none !important;\n  }\n\n  input[type="number"] {\n    -moz-appearance: textfield;\n  }\n\n  [type="search"] {\n    -webkit-appearance: textfield;\n    outline-offset: -2px;\n  }\n\n  [type="search"]::-webkit-search-decoration {\n    -webkit-appearance: none !important;\n  }\n\n  ::-webkit-file-upload-button {\n    -webkit-appearance: button;\n    font: inherit;\n  }\n\n  details {\n    display: block;\n  }\n\n  summary {\n    display: list-item;\n  }\n\n  template {\n    display: none;\n  }\n\n  [hidden] {\n    display: none !important;\n  }\n\n  html {\n    box-sizing: border-box;\n    font-family: sans-serif;\n  }\n\n  *,\n  *::before,\n  *::after {\n    box-sizing: border-box;\n  }\n\n  blockquote,\n  dl,\n  dd,\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6,\n  hr,\n  figure,\n  p,\n  pre {\n    margin: 0;\n  }\n\n  button {\n    background: transparent;\n    padding: 0;\n  }\n\n  fieldset {\n    margin: 0;\n    padding: 0;\n  }\n\n  ol,\n  ul {\n    margin: 0;\n    padding: 0;\n  }\n\n  html {\n    font-family: ',';\n    line-height: 1.5;\n    -webkit-font-smoothing: antialiased;\n    -webkit-text-size-adjust: 100%;\n    text-rendering: optimizelegibility;\n  }\n\n  hr {\n    border-top-width: 1px;\n  }\n\n  img {\n    border-style: solid;\n  }\n\n  textarea {\n    resize: vertical;\n  }\n\n  button,\n  [role="button"] {\n    cursor: pointer;\n  }\n\n  button::-moz-focus-inner {\n    border: 0 !important;\n  }\n\n  table {\n    border-collapse: collapse;\n  }\n\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6 {\n    font-size: inherit;\n    font-weight: inherit;\n  }\n\n  a {\n    color: inherit;\n    text-decoration: inherit;\n  }\n\n  button,\n  input,\n  optgroup,\n  select,\n  textarea {\n    padding: 0;\n    line-height: inherit;\n    color: inherit;\n  }\n\n  pre,\n  code,\n  kbd,\n  samp {\n    font-family: ',";\n  }\n\n  img,\n  svg,\n  video,\n  canvas,\n  audio,\n  iframe,\n  embed,\n  object {\n    display: block;\n    vertical-align: middle;\n  }\n\n  img,\n  video {\n    max-width: 100%;\n    height: auto;\n  }\n"]);return u=function(){return e},e}var p=function(e){return Object(s.c)(u(),e.fonts.body,e.fonts.mono)};function f(){var e=c()(["\n      html {\n        line-height: 1.5;\n        color: ",";\n        background-color: ",";\n      }\n\n      /**\n      * Allow adding a border to an element by just adding a border-width.\n      */\n\n      *,\n      *::before,\n      *::after {\n        border-width: 0;\n        border-style: solid;\n        border-color: ",";\n      }\n\n      input:-ms-input-placeholder,\n      textarea:-ms-input-placeholder {\n        color: ",";\n      }\n\n      input::-ms-input-placeholder,\n      textarea::-ms-input-placeholder {\n        color: ",";\n      }\n\n      input::placeholder,\n      textarea::placeholder {\n        color: ",";\n      }\n    "]);return f=function(){return e},e}var d=function(e){return{light:{color:e.colors.gray[800],bg:void 0,borderColor:e.colors.gray[200],placeholderColor:e.colors.gray[400]},dark:{color:e.colors.whiteAlpha[900],bg:e.colors.gray[800],borderColor:e.colors.whiteAlpha[300],placeholderColor:e.colors.whiteAlpha[400]}}},b=function(e){var n=e.config,t=Object(l.a)().colorMode,r=function(e){var r=d(e),o=(n?n(e,r):d(e))[t],a=o.color,i=o.bg,c=o.borderColor,l=o.placeholderColor;return Object(s.c)(f(),a,i,c,l,l,l)};return Object(s.d)(s.a,{styles:function(e){return Object(s.c)([p(e),r(e)])}})},h=t("Weur"),m=t("BMxC"),g=t("8Kt/"),y=t.n(g),j=t("YFqc"),v=t.n(j),O=t("nOHt"),x=t("q1tI"),w=t("BhN1"),k=t("ynas");function _(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function C(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?_(Object(t),!0).forEach((function(n){Object(r.a)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):_(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var M={body:{height:"100%"},html:{height:"100%"},"#__next":{height:"100%"}};n.default=function(e){var n=e.Component,t=e.pageProps,r=Object(w.useStoreReducer)(),i=Object(O.useRouter)(),c=n.pageTitle,l=c?"".concat(c," | Calow"):"Calow",u="https://bogas04.github.io/calow/",p="Intuitive minimalist calorie logging web app",f=u+"icon-512-512.png";Object(x.useEffect)((function(){var e,n;null===(e=navigator)||void 0===e||null===(n=e.serviceWorker)||void 0===n||n.register("sw.js")}),[]);var d=function(e){var n;i.pathname===e&&(null===(n=document.querySelector("main"))||void 0===n||n.scrollTo(0,0))};return Object(o.jsx)(a.a,{theme:k.a,children:Object(o.jsxs)(w.StoreContext.Provider,{value:r,children:[Object(o.jsx)(s.a,{styles:M}),Object(o.jsx)(b,{}),Object(o.jsxs)(y.a,{children:[Object(o.jsx)("title",{children:l}),Object(o.jsx)("meta",{name:"title",content:l}),Object(o.jsx)("meta",{name:"description",content:p}),Object(o.jsx)("link",{rel:"manifest",href:"manifest.json"}),Object(o.jsx)("meta",{name:"mobile-web-app-capable",content:"yes"}),Object(o.jsx)("meta",{name:"apple-mobile-web-app-capable",content:"yes"}),Object(o.jsx)("meta",{name:"application-name",content:"calow"}),Object(o.jsx)("meta",{name:"apple-mobile-web-app-title",content:"calow"}),Object(o.jsx)("meta",{name:"theme-color",content:"#48bb78"}),Object(o.jsx)("meta",{name:"msapplication-navbutton-color",content:"#48bb78"}),Object(o.jsx)("meta",{name:"apple-mobile-web-app-status-bar-style",content:"black-translucent"}),Object(o.jsx)("meta",{name:"msapplication-starturl",content:"/"}),Object(o.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1, shrink-to-fit=no"}),Object(o.jsx)("link",{rel:"apple-touch-icon",sizes:"180x180",href:u+"icon-192-192.png"}),Object(o.jsx)("link",{rel:"icon",type:"image/png",sizes:"32x32",href:u+"icon-48-48.png"}),Object(o.jsx)("link",{rel:"icon",type:"image/png",sizes:"16x16",href:u+"icon-48-48.png"}),Object(o.jsx)("meta",{property:"og:type",content:"website"}),Object(o.jsx)("meta",{property:"og:url",content:u}),Object(o.jsx)("meta",{property:"og:title",content:l}),Object(o.jsx)("meta",{property:"og:description",content:p}),Object(o.jsx)("meta",{property:"og:image",content:f}),Object(o.jsx)("meta",{property:"twitter:card",content:"summary_large_image"}),Object(o.jsx)("meta",{property:"twitter:url",content:u}),Object(o.jsx)("meta",{property:"twitter:title",content:l}),Object(o.jsx)("meta",{property:"twitter:description",content:p}),Object(o.jsx)("meta",{property:"twitter:image",content:f}),Object(o.jsx)("script",{async:!0,src:"https://unpkg.com/thesemetrics@latest"})]}),Object(o.jsxs)(h.a,{direction:"column",height:"100%",children:[Object(o.jsx)(m.a,{as:"main",flex:"1",overflow:"auto",children:Object(o.jsx)(n,C({},t))}),Object(o.jsx)(m.a,{as:"footer",id:"footer",p:"4",color:"white",backgroundColor:"gray.600",children:Object(o.jsx)(m.a,{as:"nav",children:Object(o.jsxs)(h.a,{as:"ul",listStyleType:"none",px:"6",justify:"space-between",children:[Object(o.jsx)("li",{children:Object(o.jsx)(v.a,{href:"/",children:Object(o.jsx)("a",{onClick:function(){return d("/")},children:"\ud83d\udcd4 Home"})})}),Object(o.jsx)("li",{children:Object(o.jsx)(v.a,{href:"/items",children:Object(o.jsx)("a",{onClick:function(){return d("/items")},children:"\ud83c\udf4e Items"})})}),Object(o.jsx)("li",{children:Object(o.jsx)(v.a,{href:"/settings",children:Object(o.jsx)("a",{onClick:function(){return d("/settings")},children:"\u2699\ufe0f Settings"})})})]})})})]})]})})}},kG2m:function(e,n){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},lwAK:function(e,n,t){"use strict";var r;n.__esModule=!0,n.AmpStateContext=void 0;var o=((r=t("q1tI"))&&r.__esModule?r:{default:r}).default.createContext({});n.AmpStateContext=o},mPvQ:function(e,n,t){var r=t("5fIB"),o=t("rlHP"),a=t("KckH"),i=t("kG2m");e.exports=function(e){return r(e)||o(e)||a(e)||i()}},oI91:function(e,n){e.exports=function(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}},qXWd:function(e,n){e.exports=function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}},rlHP:function(e,n){e.exports=function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}},tCBg:function(e,n,t){var r=t("C+bE"),o=t("qXWd");e.exports=function(e,n){return!n||"object"!==r(n)&&"function"!==typeof n?o(e):n}},vNVm:function(e,n,t){"use strict";var r=t("zoAU"),o=t("AroE");n.__esModule=!0,n.useIntersection=function(e){var n=e.rootMargin,t=e.disabled||!c,o=(0,a.useRef)(),l=(0,a.useState)(!1),u=r(l,2),p=u[0],f=u[1],d=(0,a.useCallback)((function(e){o.current&&(o.current(),o.current=void 0),t||p||e&&e.tagName&&(o.current=function(e,n,t){var r=function(e){var n=e.rootMargin||"",t=s.get(n);if(t)return t;var r=new Map,o=new IntersectionObserver((function(e){e.forEach((function(e){var n=r.get(e.target),t=e.isIntersecting||e.intersectionRatio>0;n&&t&&n(t)}))}),e);return s.set(n,t={id:n,observer:o,elements:r}),t}(t),o=r.id,a=r.observer,i=r.elements;return i.set(e,n),a.observe(e),function(){a.unobserve(e),0===i.size&&(a.disconnect(),s.delete(o))}}(e,(function(e){return e&&f(e)}),{rootMargin:n}))}),[t,n,p]);return(0,a.useEffect)((function(){c||p||(0,i.default)((function(){return f(!0)}))}),[p]),[d,p]};var a=t("q1tI"),i=o(t("0G5g")),c="undefined"!==typeof IntersectionObserver;var s=new Map},ynas:function(e,n,t){"use strict";var r=t("cpVT"),o=t("uDoD");function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){Object(r.a)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var c=i(i({},o.a.fonts),{},{mono:"'Menlo', monospace"}),s=i(i({},o.a),{},{colors:i({},o.a.colors),fonts:c,breakpoints:["40em","52em","64em"],icons:i({},o.a.icons)});n.a=s}},[[0,1,2,0,3,4]]]);