(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[7],{MKZ1:function(t,e,n){"use strict";var i=n("pVnL"),a=n.n(i),o=n("8OQS"),s=n.n(o),r=n("qKvR"),h=n("q1tI"),l=n("cuY2"),u=n.n(l),c=n("BMxC"),f=Object(h.forwardRef)((function(t,e){var n=t.isOpen,i=t.animateOpacity,o=void 0===i||i,h=t.onAnimationStart,l=t.onAnimationEnd,f=t.duration,m=t.easing,g=void 0===m?"ease":m,p=t.startingHeight,d=void 0===p?0:p,y=t.endingHeight,v=void 0===y?"auto":y,b=s()(t,["isOpen","animateOpacity","onAnimationStart","onAnimationEnd","duration","easing","startingHeight","endingHeight"]);return Object(r.d)(u.a,a()({duration:f,easing:g,animateOpacity:o,height:n?v:d,applyInlineTransitions:!1,css:{transition:"height .2s ease,opacity .2s ease-in-out,transform .2s ease-in-out","&.rah-animating--to-height-zero":{opacity:0,transform:"translateY(-0.625rem)"}}},{onAnimationStart:h,onAnimationEnd:l}),Object(r.d)(c.a,a()({ref:e},b)))}));f.displayName="Collapse",e.a=f},TSYQ:function(t,e,n){var i;!function(){"use strict";var n={}.hasOwnProperty;function a(){for(var t=[],e=0;e<arguments.length;e++){var i=arguments[e];if(i){var o=typeof i;if("string"===o||"number"===o)t.push(i);else if(Array.isArray(i)&&i.length){var s=a.apply(null,i);s&&t.push(s)}else if("object"===o)for(var r in i)n.call(i,r)&&i[r]&&t.push(r)}}return t.join(" ")}t.exports?(a.default=a,t.exports=a):void 0===(i=function(){return a}.apply(e,[]))||(t.exports=i)}()},cuY2:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),s=l(n("q1tI")),r=l(n("17x9")),h=l(n("TSYQ"));function l(t){return t&&t.__esModule?t:{default:t}}function u(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var c={animating:"rah-animating",animatingUp:"rah-animating--up",animatingDown:"rah-animating--down",animatingToHeightZero:"rah-animating--to-height-zero",animatingToHeightAuto:"rah-animating--to-height-auto",animatingToHeightSpecific:"rah-animating--to-height-specific",static:"rah-static",staticHeightZero:"rah-static--height-zero",staticHeightAuto:"rah-static--height-auto",staticHeightSpecific:"rah-static--height-specific"},f=["animateOpacity","animationStateClasses","applyInlineTransitions","children","contentClassName","delay","duration","easing","height","onAnimationEnd","onAnimationStart"];function m(t){for(var e=arguments.length,n=Array(e>1?e-1:0),i=1;i<e;i++)n[i-1]=arguments[i];if(!n.length)return t;for(var a={},o=Object.keys(t),s=0;s<o.length;s++){var r=o[s];-1===n.indexOf(r)&&(a[r]=t[r])}return a}function g(t){t.forEach((function(t){return cancelAnimationFrame(t)}))}function p(t){return!isNaN(parseFloat(t))&&isFinite(t)}function d(t){return"string"===typeof t&&t.search("%")===t.length-1&&p(t.substr(0,t.length-1))}function y(t,e){t&&"function"===typeof t&&t(e)}var v=function(t){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var n=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!==typeof e&&"function"!==typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.animationFrameIDs=[];var i="auto",o="visible";p(t.height)?(i=t.height<0||"0"===t.height?0:t.height,o="hidden"):d(t.height)&&(i="0%"===t.height?0:t.height,o="hidden"),n.animationStateClasses=a({},c,t.animationStateClasses);var s=n.getStaticStateClasses(i);return n.state={animationStateClasses:s,height:i,overflow:o,shouldUseTransitions:!1},n}return function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),o(e,[{key:"componentDidMount",value:function(){var t=this.state.height;this.contentElement&&this.contentElement.style&&this.hideContent(t)}},{key:"componentDidUpdate",value:function(t,e){var n=this,i=this.props,a=i.delay,o=i.duration,s=i.height,r=i.onAnimationEnd,l=i.onAnimationStart;if(this.contentElement&&s!==t.height){var c;this.showContent(e.height),this.contentElement.style.overflow="hidden";var f=this.contentElement.offsetHeight;this.contentElement.style.overflow="";var m=o+a,v=null,b={height:null,overflow:"hidden"},S="auto"===e.height;p(s)?(v=s<0||"0"===s?0:s,b.height=v):d(s)?(v="0%"===s?0:s,b.height=v):(v=f,b.height="auto",b.overflow=null),S&&(b.height=v,v=f);var C=(0,h.default)((u(c={},this.animationStateClasses.animating,!0),u(c,this.animationStateClasses.animatingUp,"auto"===t.height||s<t.height),u(c,this.animationStateClasses.animatingDown,"auto"===s||s>t.height),u(c,this.animationStateClasses.animatingToHeightZero,0===b.height),u(c,this.animationStateClasses.animatingToHeightAuto,"auto"===b.height),u(c,this.animationStateClasses.animatingToHeightSpecific,b.height>0),c)),w=this.getStaticStateClasses(b.height);this.setState({animationStateClasses:C,height:v,overflow:"hidden",shouldUseTransitions:!S}),clearTimeout(this.timeoutID),clearTimeout(this.animationClassesTimeoutID),S?(b.shouldUseTransitions=!0,g(this.animationFrameIDs),this.animationFrameIDs=function(t){var e=[];return e[0]=requestAnimationFrame((function(){e[1]=requestAnimationFrame((function(){t()}))})),e}((function(){n.setState(b),y(l,{newHeight:b.height})})),this.animationClassesTimeoutID=setTimeout((function(){n.setState({animationStateClasses:w,shouldUseTransitions:!1}),n.hideContent(b.height),y(r,{newHeight:b.height})}),m)):(y(l,{newHeight:v}),this.timeoutID=setTimeout((function(){b.animationStateClasses=w,b.shouldUseTransitions=!1,n.setState(b),"auto"!==s&&n.hideContent(v),y(r,{newHeight:v})}),m))}}},{key:"componentWillUnmount",value:function(){g(this.animationFrameIDs),clearTimeout(this.timeoutID),clearTimeout(this.animationClassesTimeoutID),this.timeoutID=null,this.animationClassesTimeoutID=null,this.animationStateClasses=null}},{key:"showContent",value:function(t){0===t&&(this.contentElement.style.display="")}},{key:"hideContent",value:function(t){0===t&&(this.contentElement.style.display="none")}},{key:"getStaticStateClasses",value:function(t){var e;return(0,h.default)((u(e={},this.animationStateClasses.static,!0),u(e,this.animationStateClasses.staticHeightZero,0===t),u(e,this.animationStateClasses.staticHeightSpecific,t>0),u(e,this.animationStateClasses.staticHeightAuto,"auto"===t),e))}},{key:"render",value:function(){var t,e=this,n=this.props,i=n.animateOpacity,o=n.applyInlineTransitions,r=n.children,l=n.className,c=n.contentClassName,g=n.duration,p=n.easing,d=n.delay,y=n.style,v=this.state,b=v.height,S=v.overflow,C=v.animationStateClasses,w=v.shouldUseTransitions,T=a({},y,{height:b,overflow:S||y.overflow});w&&o&&(T.transition="height "+g+"ms "+p+" "+d+"ms",y.transition&&(T.transition=y.transition+", "+T.transition),T.WebkitTransition=T.transition);var O={};i&&(O.transition="opacity "+g+"ms "+p+" "+d+"ms",O.WebkitTransition=O.transition,0===b&&(O.opacity=0));var E=(0,h.default)((u(t={},C,!0),u(t,l,l),t));return s.default.createElement("div",a({},m.apply(void 0,[this.props].concat(f)),{"aria-hidden":0===b,className:E,style:T}),s.default.createElement("div",{className:c,style:O,ref:function(t){return e.contentElement=t}},r))}}]),e}(s.default.Component);v.propTypes={animateOpacity:r.default.bool,animationStateClasses:r.default.object,applyInlineTransitions:r.default.bool,children:r.default.any.isRequired,className:r.default.string,contentClassName:r.default.string,duration:r.default.number,delay:r.default.number,easing:r.default.string,height:function(t,e,n){var a=t[e];return"number"===typeof a&&a>=0||d(a)||"auto"===a?null:new TypeError('value "'+a+'" of type "'+("undefined"===typeof a?"undefined":i(a))+'" is invalid type for '+e+" in "+n+'. It needs to be a positive number, string "auto" or percentage string (e.g. "15%").')},onAnimationEnd:r.default.func,onAnimationStart:r.default.func,style:r.default.object},v.defaultProps={animateOpacity:!1,animationStateClasses:c,applyInlineTransitions:!0,duration:250,delay:0,easing:"ease",style:{}},e.default=v}}]);