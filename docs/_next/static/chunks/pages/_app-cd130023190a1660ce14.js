_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[11],{"/0+H":function(e,t,n){"use strict";t.__esModule=!0,t.isInAmpMode=a,t.useAmp=function(){return a(o.default.useContext(i.AmpStateContext))};var r,o=(r=n("q1tI"))&&r.__esModule?r:{default:r},i=n("lwAK");function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=void 0!==t&&t,r=e.hybrid,o=void 0!==r&&r,i=e.hasQuery,a=void 0!==i&&i;return n||o&&a}},0:function(e,t,n){n("74v/"),e.exports=n("nOHt")},"0x2G":function(e,t,n){"use strict";n.d(t,"b",(function(){return u})),n.d(t,"a",(function(){return l}));var r=n("q1tI"),o=n("JX03"),i=n("pr4h"),a=n("2fmc"),c=n("zlS4"),[s,u]=Object(o.a)({strict:!1,name:"PortalManagerContext"}),l=e=>{var{children:t,zIndex:n}=e,o=r.useRef(null),i=Object(a.a)();Object(c.a)(()=>{i()},[]);var l=u(),d={node:(null==l?void 0:l.node)||o.current,zIndex:n};return r.createElement(s,{value:d},t,r.createElement("div",{className:"chakra-portal-manager",ref:o}))};i.a&&(l.displayName="PortalManager")},"2fmc":function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n("q1tI"),o=n("PzmD");function i(){var e=r.useRef(!1),[t,n]=r.useState(0);return Object(o.a)(()=>{e.current=!0}),r.useCallback(()=>{e.current||n(t+1)},[t])}},"48fX":function(e,t,n){var r=n("qhzo");e.exports=function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&r(e,t)}},"5fIB":function(e,t,n){var r=n("7eYB");e.exports=function(e){if(Array.isArray(e))return r(e)}},"74v/":function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return n("hUgY")}])},"8Kt/":function(e,t,n){"use strict";n("oI91");t.__esModule=!0,t.defaultHead=l,t.default=void 0;var r,o=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=u();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=r?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=e[o]}n.default=e,t&&t.set(e,n);return n}(n("q1tI")),i=(r=n("Xuae"))&&r.__esModule?r:{default:r},a=n("lwAK"),c=n("FYa8"),s=n("/0+H");function u(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return u=function(){return e},e}function l(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[o.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(o.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function d(e,t){return"string"===typeof t||"number"===typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce((function(e,t){return"string"===typeof t||"number"===typeof t?e:e.concat(t)}),[])):e.concat(t)}var p=["name","httpEquiv","charSet","itemProp"];function f(e,t){return e.reduce((function(e,t){var n=o.default.Children.toArray(t.props.children);return e.concat(n)}),[]).reduce(d,[]).reverse().concat(l(t.inAmpMode)).filter(function(){var e=new Set,t=new Set,n=new Set,r={};return function(o){var i=!0;if(o.key&&"number"!==typeof o.key&&o.key.indexOf("$")>0){var a=o.key.slice(o.key.indexOf("$")+1);e.has(a)?i=!1:e.add(a)}switch(o.type){case"title":case"base":t.has(o.type)?i=!1:t.add(o.type);break;case"meta":for(var c=0,s=p.length;c<s;c++){var u=p[c];if(o.props.hasOwnProperty(u))if("charSet"===u)n.has(u)?i=!1:n.add(u);else{var l=o.props[u],d=r[u]||new Set;d.has(l)?i=!1:(d.add(l),r[u]=d)}}}return i}}()).reverse().map((function(e,t){var n=e.key||t;return o.default.cloneElement(e,{key:n})}))}function m(e){var t=e.children,n=(0,o.useContext)(a.AmpStateContext),r=(0,o.useContext)(c.HeadManagerContext);return o.default.createElement(i.default,{reduceComponentsToState:f,headManager:r,inAmpMode:(0,s.isInAmpMode)(n)},t)}m.rewind=function(){};var b=m;t.default=b},FYa8:function(e,t,n){"use strict";var r;t.__esModule=!0,t.HeadManagerContext=void 0;var o=((r=n("q1tI"))&&r.__esModule?r:{default:r}).default.createContext({});t.HeadManagerContext=o},Lnxd:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var r=n("q1tI"),o=n.n(r),i={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},a=o.a.createContext&&o.a.createContext(i),c=function(){return(c=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},s=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n};function u(e){return function(t){return o.a.createElement(l,c({attr:c({},e.attr)},t),function e(t){return t&&t.map((function(t,n){return o.a.createElement(t.tag,c({key:n},t.attr),e(t.child))}))}(e.child))}}function l(e){var t=function(t){var n,r=e.attr,i=e.size,a=e.title,u=s(e,["attr","size","title"]),l=i||t.size||"1em";return t.className&&(n=t.className),e.className&&(n=(n?n+" ":"")+e.className),o.a.createElement("svg",c({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,r,u,{className:n,style:c(c({color:e.color||t.color},t.style),e.style),height:l,width:l,xmlns:"http://www.w3.org/2000/svg"}),a&&o.a.createElement("title",null,a),e.children)};return void 0!==a?o.a.createElement(a.Consumer,null,(function(e){return t(e)})):t(i)}},T0f4:function(e,t){function n(t){return e.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},n(t)}e.exports=n},Xuae:function(e,t,n){"use strict";var r=n("mPvQ"),o=n("/GRZ"),i=n("i2R6"),a=(n("qXWd"),n("48fX")),c=n("tCBg"),s=n("T0f4");function u(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=s(e);if(t){var o=s(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return c(this,n)}}t.__esModule=!0,t.default=void 0;var l=n("q1tI"),d=function(e){a(n,e);var t=u(n);function n(e){var i;return o(this,n),(i=t.call(this,e))._hasHeadManager=void 0,i.emitChange=function(){i._hasHeadManager&&i.props.headManager.updateHead(i.props.reduceComponentsToState(r(i.props.headManager.mountedInstances),i.props))},i._hasHeadManager=i.props.headManager&&i.props.headManager.mountedInstances,i}return i(n,[{key:"componentDidMount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.add(this),this.emitChange()}},{key:"componentDidUpdate",value:function(){this.emitChange()}},{key:"componentWillUnmount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.delete(this),this.emitChange()}},{key:"render",value:function(){return null}}]),n}(l.Component);t.default=d},YFqc:function(e,t,n){e.exports=n("cTJO")},cTJO:function(e,t,n){"use strict";var r=n("zoAU"),o=n("7KCV");t.__esModule=!0,t.default=void 0;var i=o(n("q1tI")),a=n("elyg"),c=n("nOHt"),s=n("vNVm"),u={};function l(e,t,n,r){if((0,a.isLocalURL)(t)){e.prefetch(t,n,r).catch((function(e){0}));var o=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;u[t+"%"+n+(o?"%"+o:"")]=!0}}var d=function(e){var t=!1!==e.prefetch,n=(0,c.useRouter)(),o=n&&n.pathname||"/",d=i.default.useMemo((function(){var t=(0,a.resolveHref)(o,e.href,!0),n=r(t,2),i=n[0],c=n[1];return{href:i,as:e.as?(0,a.resolveHref)(o,e.as):c||i}}),[o,e.href,e.as]),p=d.href,f=d.as,m=e.children,b=e.replace,h=e.shallow,v=e.scroll,y=e.locale;"string"===typeof m&&(m=i.default.createElement("a",null,m));var g=i.Children.only(m),j=g&&"object"===typeof g&&g.ref,O=(0,s.useIntersection)({rootMargin:"200px"}),x=r(O,2),w=x[0],E=x[1],k=i.default.useCallback((function(e){w(e),j&&("function"===typeof j?j(e):"object"===typeof j&&(j.current=e))}),[j,w]);(0,i.useEffect)((function(){var e=E&&t&&(0,a.isLocalURL)(p),r="undefined"!==typeof y?y:n&&n.locale,o=u[p+"%"+f+(r?"%"+r:"")];e&&!o&&l(n,p,f,{locale:r})}),[f,p,E,y,t,n]);var M={ref:k,onClick:function(e){g.props&&"function"===typeof g.props.onClick&&g.props.onClick(e),e.defaultPrevented||function(e,t,n,r,o,i,c,s){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&(0,a.isLocalURL)(n))&&(e.preventDefault(),null==c&&(c=r.indexOf("#")<0),t[o?"replace":"push"](n,r,{shallow:i,locale:s}).then((function(e){e&&c&&(window.scrollTo(0,0),document.body.focus())})))}(e,n,p,f,b,h,v,y)},onMouseEnter:function(e){(0,a.isLocalURL)(p)&&(g.props&&"function"===typeof g.props.onMouseEnter&&g.props.onMouseEnter(e),l(n,p,f,{priority:!0}))}};return(e.passHref||"a"===g.type&&!("href"in g.props))&&(M.href=(0,a.addBasePath)((0,a.addLocale)(f,"undefined"!==typeof y?y:n&&n.locale,n&&n.defaultLocale))),i.default.cloneElement(g,M)};t.default=d},hUgY:function(e,t,n){"use strict";n.r(t);var r=n("cpVT"),o=n("nKUr"),i=n("AeFk"),a=n("q1tI"),c=()=>a.createElement(i.a,{styles:'\n      html {\n        line-height: 1.5;\n        -webkit-text-size-adjust: 100%;\n        font-family: system-ui, sans-serif;\n        -webkit-font-smoothing: antialiased;\n        text-rendering: optimizeLegibility;      \n        -moz-osx-font-smoothing: grayscale; \n        touch-action: manipulation; \n      }\n\n      body {\n        position: relative;\n        min-height: 100%;\n        font-feature-settings: \'kern\';\n      }\n\n      *,\n      *::before,\n      *::after {\n        border-width: 0;\n        border-style: solid;\n        box-sizing: border-box;\n      }\n\n      main {\n        display: block;\n      }\n\n      hr {\n        border-top-width: 1px;\n        box-sizing: content-box;\n        height: 0;\n        overflow: visible;\n      }\n\n      pre,\n      code,\n      kbd,\n      samp {\n        font-family: SFMono-Regular,  Menlo, Monaco, Consolas, monospace;\n        font-size: 1em;\n      }\n\n      a {\n        background-color: transparent;\n        color: inherit;\n        text-decoration: inherit;\n      }\n\n      abbr[title] {\n        border-bottom: none;\n        text-decoration: underline;\n        -webkit-text-decoration: underline dotted;\n        text-decoration: underline dotted;\n      }\n\n      b,\n      strong {\n        font-weight: bold;\n      }\n\n      small {\n        font-size: 80%;\n      }\n\n      sub,\n      sup {\n        font-size: 75%;\n        line-height: 0;\n        position: relative;\n        vertical-align: baseline;\n      }\n\n      sub {\n        bottom: -0.25em;\n      }\n\n      sup {\n        top: -0.5em;\n      }\n\n      img {\n        border-style: none;\n      }\n\n      button,\n      input,\n      optgroup,\n      select,\n      textarea {\n        font-family: inherit;\n        font-size: 100%;\n        line-height: 1.15;\n        margin: 0;\n      }\n\n      button,\n      input {\n        overflow: visible;\n      }\n\n      button,\n      select {\n        text-transform: none;\n      }\n\n      button::-moz-focus-inner,\n      [type="button"]::-moz-focus-inner,\n      [type="reset"]::-moz-focus-inner,\n      [type="submit"]::-moz-focus-inner {\n        border-style: none;\n        padding: 0;\n      }\n\n      fieldset {\n        padding: 0.35em 0.75em 0.625em;\n      }\n\n      legend {\n        box-sizing: border-box;\n        color: inherit;\n        display: table;\n        max-width: 100%;\n        padding: 0;\n        white-space: normal;\n      }\n\n      progress {\n        vertical-align: baseline;\n      }\n\n      textarea {\n        overflow: auto;\n      }\n\n      [type="checkbox"],\n      [type="radio"] {\n        box-sizing: border-box;\n        padding: 0;\n      }\n\n      [type="number"]::-webkit-inner-spin-button,\n      [type="number"]::-webkit-outer-spin-button {\n        -webkit-appearance: none !important;\n      }\n\n      input[type="number"] {\n        -moz-appearance: textfield;\n      }\n\n      [type="search"] {\n        -webkit-appearance: textfield;\n        outline-offset: -2px;\n      }\n\n      [type="search"]::-webkit-search-decoration {\n        -webkit-appearance: none !important;\n      }\n\n      ::-webkit-file-upload-button {\n        -webkit-appearance: button;\n        font: inherit;\n      }\n\n      details {\n        display: block;\n      }\n\n      summary {\n        display: list-item;\n      }\n\n      template {\n        display: none;\n      }\n\n      [hidden] {\n        display: none !important;\n      }\n\n      body,\n      blockquote,\n      dl,\n      dd,\n      h1,\n      h2,\n      h3,\n      h4,\n      h5,\n      h6,\n      hr,\n      figure,\n      p,\n      pre {\n        margin: 0;\n      }\n\n      button {\n        background: transparent;\n        padding: 0;\n      }\n\n      fieldset {\n        margin: 0;\n        padding: 0;\n      }\n\n      ol,\n      ul {\n        margin: 0;\n        padding: 0;\n      }\n\n      textarea {\n        resize: vertical;\n      }\n\n      button,\n      [role="button"] {\n        cursor: pointer;\n      }\n\n      button::-moz-focus-inner {\n        border: 0 !important;\n      }\n\n      table {\n        border-collapse: collapse;\n      }\n\n      h1,\n      h2,\n      h3,\n      h4,\n      h5,\n      h6 {\n        font-size: inherit;\n        font-weight: inherit;\n      }\n\n      button,\n      input,\n      optgroup,\n      select,\n      textarea {\n        padding: 0;\n        line-height: inherit;\n        color: inherit;\n      }\n\n      img,\n      svg,\n      video,\n      canvas,\n      audio,\n      iframe,\n      embed,\n      object {\n        display: block;\n        vertical-align: middle;\n      }\n\n      img,\n      video {\n        max-width: 100%;\n        height: auto;\n      }\n\n      [data-js-focus-visible] :focus:not([data-focus-visible-added]) {\n        outline: none;\n        box-shadow: none;\n      }\n\n      select::-ms-expand {\n        display: none;\n      }\n    '}),s=n("0x2G"),u=n("Lpqh"),l=n("+p43"),d=n("5+Am"),p=n("/2u0"),f=e=>{var{children:t,colorModeManager:n,portalZIndex:r,resetCSS:o=!0,theme:i=p.a}=e;return a.createElement(u.c,{theme:i},a.createElement(l.a,{colorModeManager:n,options:i.config},o&&a.createElement(c,null),a.createElement(d.a,null),r?a.createElement(s.a,{zIndex:r},t):t))},m=n("tofy"),b=n("v7Hm"),h=n("8Kt/"),v=n.n(h),y=n("YFqc"),g=n.n(y),j=n("nOHt"),O=n("BhN1"),x=n("qtta"),w=(n("lfCk"),n("ynas"));function E(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function k(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?E(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):E(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}t.default=function(e){var t=e.Component,n=e.pageProps,r=Object(O.useStoreReducer)(),i=Object(j.useRouter)(),c=t.pageTitle,s=c?"".concat(c," | Calow"):"Calow",u="https://bogas04.github.io/calow/",l="Intuitive minimalist calorie logging web app",d=u+"icon-512-512.png";Object(a.useEffect)((function(){var e,t;null===(e=navigator)||void 0===e||null===(t=e.serviceWorker)||void 0===t||t.register("sw.js")}),[]);var p=function(e){var t;i.pathname===e&&(null===(t=document.querySelector("main"))||void 0===t||t.scrollTo(0,0))};return Object(o.jsx)(f,{theme:w.a,children:Object(o.jsxs)(O.StoreContext.Provider,{value:r,children:[Object(o.jsxs)(v.a,{children:[Object(o.jsx)("title",{children:s}),Object(o.jsx)("meta",{name:"title",content:s}),Object(o.jsx)("meta",{name:"description",content:l}),Object(o.jsx)("link",{rel:"manifest",href:"manifest.json"}),Object(o.jsx)("meta",{name:"mobile-web-app-capable",content:"yes"}),Object(o.jsx)("meta",{name:"apple-mobile-web-app-capable",content:"yes"}),Object(o.jsx)("meta",{name:"application-name",content:"calow"}),Object(o.jsx)("meta",{name:"apple-mobile-web-app-title",content:"calow"}),Object(o.jsx)("meta",{name:"theme-color",content:"#48bb78"}),Object(o.jsx)("meta",{name:"msapplication-navbutton-color",content:"#48bb78"}),Object(o.jsx)("meta",{name:"apple-mobile-web-app-status-bar-style",content:"black-translucent"}),Object(o.jsx)("meta",{name:"msapplication-starturl",content:"/"}),Object(o.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1, shrink-to-fit=no"}),Object(o.jsx)("link",{rel:"apple-touch-icon",sizes:"180x180",href:u+"icon-192-192.png"}),Object(o.jsx)("link",{rel:"icon",type:"image/png",sizes:"32x32",href:u+"icon-48-48.png"}),Object(o.jsx)("link",{rel:"icon",type:"image/png",sizes:"16x16",href:u+"icon-48-48.png"}),Object(o.jsx)("meta",{property:"og:type",content:"website"}),Object(o.jsx)("meta",{property:"og:url",content:u}),Object(o.jsx)("meta",{property:"og:title",content:s}),Object(o.jsx)("meta",{property:"og:description",content:l}),Object(o.jsx)("meta",{property:"og:image",content:d}),Object(o.jsx)("meta",{property:"twitter:card",content:"summary_large_image"}),Object(o.jsx)("meta",{property:"twitter:url",content:u}),Object(o.jsx)("meta",{property:"twitter:title",content:s}),Object(o.jsx)("meta",{property:"twitter:description",content:l}),Object(o.jsx)("meta",{property:"twitter:image",content:d}),Object(o.jsx)("script",{async:!0,src:"https://unpkg.com/thesemetrics@latest"})]}),Object(o.jsxs)(m.a,{direction:"column",height:"100%",children:[Object(o.jsx)(b.a,{as:"main",flex:"1",overflow:"auto",children:Object(o.jsx)(t,k({},n))}),!t.hideFooter&&Object(o.jsx)(b.a,{as:"footer",id:"footer",p:"4",bg:"rgba(0,0,0,0.1)",color:"gray.800",style:{backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)"},children:Object(o.jsx)(b.a,{as:"nav",children:Object(o.jsxs)(m.a,{as:"ul",listStyleType:"none",px:"6",justify:"space-between",children:[Object(o.jsx)("li",{children:Object(o.jsx)(g.a,{href:"/",children:Object(o.jsx)("a",{onClick:function(){return p("/")},title:"Open Home",children:Object(o.jsx)(x.a,{size:"24"})})})}),Object(o.jsx)("li",{children:Object(o.jsx)(g.a,{href:"/items",children:Object(o.jsx)("a",{onClick:function(){return p("/items")},title:"Open Item Catalog",children:Object(o.jsx)(x.b,{size:"24"})})})}),Object(o.jsx)("li",{children:Object(o.jsx)(g.a,{href:"/settings",children:Object(o.jsx)("a",{onClick:function(){return p("/settings")},title:"Open Settings",children:Object(o.jsx)(x.c,{size:"24"})})})})]})})})]})]})})}},kG2m:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},lfCk:function(e,t,n){!function(){"use strict";function e(e){var t=!0,n=!1,r=null,o={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function i(e){return!!(e&&e!==document&&"HTML"!==e.nodeName&&"BODY"!==e.nodeName&&"classList"in e&&"contains"in e.classList)}function a(e){var t=e.type,n=e.tagName;return!("INPUT"!==n||!o[t]||e.readOnly)||"TEXTAREA"===n&&!e.readOnly||!!e.isContentEditable}function c(e){e.classList.contains("focus-visible")||(e.classList.add("focus-visible"),e.setAttribute("data-focus-visible-added",""))}function s(e){e.hasAttribute("data-focus-visible-added")&&(e.classList.remove("focus-visible"),e.removeAttribute("data-focus-visible-added"))}function u(n){n.metaKey||n.altKey||n.ctrlKey||(i(e.activeElement)&&c(e.activeElement),t=!0)}function l(e){t=!1}function d(e){i(e.target)&&(t||a(e.target))&&c(e.target)}function p(e){i(e.target)&&(e.target.classList.contains("focus-visible")||e.target.hasAttribute("data-focus-visible-added"))&&(n=!0,window.clearTimeout(r),r=window.setTimeout((function(){n=!1}),100),s(e.target))}function f(e){"hidden"===document.visibilityState&&(n&&(t=!0),m())}function m(){document.addEventListener("mousemove",h),document.addEventListener("mousedown",h),document.addEventListener("mouseup",h),document.addEventListener("pointermove",h),document.addEventListener("pointerdown",h),document.addEventListener("pointerup",h),document.addEventListener("touchmove",h),document.addEventListener("touchstart",h),document.addEventListener("touchend",h)}function b(){document.removeEventListener("mousemove",h),document.removeEventListener("mousedown",h),document.removeEventListener("mouseup",h),document.removeEventListener("pointermove",h),document.removeEventListener("pointerdown",h),document.removeEventListener("pointerup",h),document.removeEventListener("touchmove",h),document.removeEventListener("touchstart",h),document.removeEventListener("touchend",h)}function h(e){e.target.nodeName&&"html"===e.target.nodeName.toLowerCase()||(t=!1,b())}document.addEventListener("keydown",u,!0),document.addEventListener("mousedown",l,!0),document.addEventListener("pointerdown",l,!0),document.addEventListener("touchstart",l,!0),document.addEventListener("visibilitychange",f,!0),m(),e.addEventListener("focus",d,!0),e.addEventListener("blur",p,!0),e.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&e.host?e.host.setAttribute("data-js-focus-visible",""):e.nodeType===Node.DOCUMENT_NODE&&(document.documentElement.classList.add("js-focus-visible"),document.documentElement.setAttribute("data-js-focus-visible",""))}if("undefined"!==typeof window&&"undefined"!==typeof document){var t;window.applyFocusVisiblePolyfill=e;try{t=new CustomEvent("focus-visible-polyfill-ready")}catch(n){(t=document.createEvent("CustomEvent")).initCustomEvent("focus-visible-polyfill-ready",!1,!1,{})}window.dispatchEvent(t)}"undefined"!==typeof document&&e(document)}()},lwAK:function(e,t,n){"use strict";var r;t.__esModule=!0,t.AmpStateContext=void 0;var o=((r=n("q1tI"))&&r.__esModule?r:{default:r}).default.createContext({});t.AmpStateContext=o},mPvQ:function(e,t,n){var r=n("5fIB"),o=n("rlHP"),i=n("KckH"),a=n("kG2m");e.exports=function(e){return r(e)||o(e)||i(e)||a()}},oI91:function(e,t){e.exports=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},qXWd:function(e,t){e.exports=function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}},rlHP:function(e,t){e.exports=function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}},tCBg:function(e,t,n){var r=n("C+bE"),o=n("qXWd");e.exports=function(e,t){return!t||"object"!==r(t)&&"function"!==typeof t?o(e):t}},vNVm:function(e,t,n){"use strict";var r=n("zoAU"),o=n("AroE");t.__esModule=!0,t.useIntersection=function(e){var t=e.rootMargin,n=e.disabled||!c,o=(0,i.useRef)(),u=(0,i.useState)(!1),l=r(u,2),d=l[0],p=l[1],f=(0,i.useCallback)((function(e){o.current&&(o.current(),o.current=void 0),n||d||e&&e.tagName&&(o.current=function(e,t,n){var r=function(e){var t=e.rootMargin||"",n=s.get(t);if(n)return n;var r=new Map,o=new IntersectionObserver((function(e){e.forEach((function(e){var t=r.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)}))}),e);return s.set(t,n={id:t,observer:o,elements:r}),n}(n),o=r.id,i=r.observer,a=r.elements;return a.set(e,t),i.observe(e),function(){i.unobserve(e),0===a.size&&(i.disconnect(),s.delete(o))}}(e,(function(e){return e&&p(e)}),{rootMargin:t}))}),[n,t,d]);return(0,i.useEffect)((function(){c||d||(0,a.default)((function(){return p(!0)}))}),[d]),[f,d]};var i=n("q1tI"),a=o(n("0G5g")),c="undefined"!==typeof IntersectionObserver;var s=new Map},ynas:function(e,t,n){"use strict";var r=n("cpVT"),o=n("/2u0");function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var c=a(a({},o.b.fonts),{},{mono:"'Menlo', monospace"}),s=a(a({},o.b),{},{colors:a({},o.b.colors),fonts:c,styles:{global:{body:{height:"100%"},html:{height:"100%"},"#__next":{height:"100%"}}}});t.a=s}},[[0,1,2,9,0,3,4]]]);