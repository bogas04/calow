"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[826],{5771:function(e,n,t){function r(e){return null!=e&&"object"==typeof e&&"nodeType"in e&&e.nodeType===Node.ELEMENT_NODE}function o(e){if(!r(e))return!1;return e instanceof(e.ownerDocument.defaultView??window).HTMLElement}function a(e){var n;return(null==(n=i(e))?void 0:n.defaultView)??window}function i(e){return r(e)?e.ownerDocument:document}function u(e){return i(e).activeElement}t.d(n,{Wq:function(){return d},kR:function(){return a},t5:function(){return m},vY:function(){return u}});var c=e=>e.hasAttribute("tabindex");function l(e){return!(!e.parentElement||!l(e.parentElement))||e.hidden}function s(e){if(!o(e)||l(e)||function(e){return!0===Boolean(e.getAttribute("disabled"))||!0===Boolean(e.getAttribute("aria-disabled"))}(e))return!1;const{localName:n}=e;if(["input","select","textarea","button"].indexOf(n)>=0)return!0;const t={a:()=>e.hasAttribute("href"),audio:()=>e.hasAttribute("controls"),video:()=>e.hasAttribute("controls")};return n in t?t[n]():!!function(e){const n=e.getAttribute("contenteditable");return"false"!==n&&null!=n}(e)||c(e)}function d(e){return!!e&&(o(e)&&s(e)&&!(e=>c(e)&&-1===e.tabIndex)(e))}var f=["input:not(:disabled):not([disabled])","select:not(:disabled):not([disabled])","textarea:not(:disabled):not([disabled])","embed","iframe","object","a[href]","area[href]","button:not(:disabled):not([disabled])","[tabindex]","audio[controls]","video[controls]","*[tabindex]:not([aria-disabled])","*[contenteditable]"].join();function m(e){const n=Array.from(e.querySelectorAll(f));return n.unshift(e),n.filter((e=>s(e)&&(e=>e.offsetWidth>0&&e.offsetHeight>0)(e)))}},3826:function(e,n,t){t.d(n,{u_:function(){return Zn},fe:function(){return $n},hz:function(){return Vn},mz:function(){return zn},xB:function(){return Kn},ZA:function(){return Jn}});var r=t(7294),o=t(7174),a=t(8387),i=t(6256),u=t(5820),c=t(6734),l=function(e){return"undefined"===typeof document?null:(Array.isArray(e)?e[0]:e).ownerDocument.body},s=new WeakMap,d=new WeakMap,f={},m=0,v=function(e,n,t,r){var o=Array.isArray(e)?e:[e];f[t]||(f[t]=new WeakMap);var a=f[t],i=[],u=new Set,c=new Set(o),l=function(e){e&&!u.has(e)&&(u.add(e),l(e.parentNode))};o.forEach(l);var v=function(e){e&&!c.has(e)&&Array.prototype.forEach.call(e.children,(function(e){if(u.has(e))v(e);else{var n=e.getAttribute(r),o=null!==n&&"false"!==n,c=(s.get(e)||0)+1,l=(a.get(e)||0)+1;s.set(e,c),a.set(e,l),i.push(e),1===c&&o&&d.set(e,!0),1===l&&e.setAttribute(t,"true"),o||e.setAttribute(r,"true")}}))};return v(n),u.clear(),m++,function(){i.forEach((function(e){var n=s.get(e)-1,o=a.get(e)-1;s.set(e,n),a.set(e,o),n||(d.has(e)||e.removeAttribute(r),d.delete(e)),o||e.removeAttribute(t)})),--m||(s=new WeakMap,s=new WeakMap,d=new WeakMap,f={})}},p=function(e,n,t){void 0===t&&(t="data-aria-hidden");var r=Array.from(Array.isArray(e)?e:[e]),o=n||l(e);return o?(r.push.apply(r,Array.from(o.querySelectorAll("[aria-live]"))),v(r,o,t,"aria-hidden")):function(){return null}},h=t(5868);var g=t(7462),b="data-focus-lock",y="data-focus-lock-disabled";function E(e,n){return function(e,n){var t=(0,r.useState)((function(){return{value:e,callback:n,facade:{get current(){return t.value},set current(e){var n=t.value;n!==e&&(t.value=e,t.callback(e,n))}}}}))[0];return t.callback=n,t.facade}(n||null,(function(n){return e.forEach((function(e){return function(e,n){return"function"===typeof e?e(n):e&&(e.current=n),e}(e,n)}))}))}var w={width:"1px",height:"0px",padding:0,overflow:"hidden",position:"fixed",top:"1px",left:"1px"},k=function(e){var n=e.children;return r.createElement(r.Fragment,null,r.createElement("div",{key:"guard-first","data-focus-guard":!0,"data-focus-auto-guard":!0,style:w}),n,n&&r.createElement("div",{key:"guard-last","data-focus-guard":!0,"data-focus-auto-guard":!0,style:w}))};k.propTypes={},k.defaultProps={children:null};var N=t(655);function C(e){return e}function x(e,n){void 0===n&&(n=C);var t=[],r=!1;return{read:function(){if(r)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return t.length?t[t.length-1]:e},useMedium:function(e){var o=n(e,r);return t.push(o),function(){t=t.filter((function(e){return e!==o}))}},assignSyncMedium:function(e){for(r=!0;t.length;){var n=t;t=[],n.forEach(e)}t={push:function(n){return e(n)},filter:function(){return t}}},assignMedium:function(e){r=!0;var n=[];if(t.length){var o=t;t=[],o.forEach(e),n=t}var a=function(){var t=n;n=[],t.forEach(e)},i=function(){return Promise.resolve().then(a)};i(),t={push:function(e){n.push(e),i()},filter:function(e){return n=n.filter(e),t}}}}}function _(e,n){return void 0===n&&(n=C),x(e,n)}function F(e){void 0===e&&(e={});var n=x(null);return n.options=(0,N.__assign)({async:!0,ssr:!1},e),n}var M=_({},(function(e){return{target:e.target,currentTarget:e.currentTarget}})),O=_(),P=_(),S=F({async:!0}),A=[],R=r.forwardRef((function(e,n){var t,o=r.useState(),a=o[0],i=o[1],u=r.useRef(),c=r.useRef(!1),l=r.useRef(null),s=e.children,d=e.disabled,f=e.noFocusGuards,m=e.persistentFocus,v=e.crossFrame,p=e.autoFocus,h=(e.allowTextSelection,e.group),k=e.className,N=e.whiteList,C=e.hasPositiveIndices,x=e.shards,_=void 0===x?A:x,F=e.as,P=void 0===F?"div":F,R=e.lockProps,T=void 0===R?{}:R,I=e.sideCar,D=e.returnFocus,B=e.focusOptions,L=e.onActivation,W=e.onDeactivation,j=r.useState({})[0],G=r.useCallback((function(){l.current=l.current||document&&document.activeElement,u.current&&L&&L(u.current),c.current=!0}),[L]),Z=r.useCallback((function(){c.current=!1,W&&W(u.current)}),[W]);(0,r.useEffect)((function(){d||(l.current=null)}),[]);var $=r.useCallback((function(e){var n=l.current;if(n&&n.focus){var t="function"===typeof D?D(n):D;if(t){var r="object"===typeof t?t:void 0;l.current=null,e?Promise.resolve().then((function(){return n.focus(r)})):n.focus(r)}}}),[D]),q=r.useCallback((function(e){c.current&&M.useMedium(e)}),[]),X=O.useMedium,Y=r.useCallback((function(e){u.current!==e&&(u.current=e,i(e))}),[]);var U=(0,g.Z)(((t={})[y]=d&&"disabled",t[b]=h,t),T),H=!0!==f,V=H&&"tail"!==f,z=E([n,Y]);return r.createElement(r.Fragment,null,H&&[r.createElement("div",{key:"guard-first","data-focus-guard":!0,tabIndex:d?-1:0,style:w}),C?r.createElement("div",{key:"guard-nearest","data-focus-guard":!0,tabIndex:d?-1:1,style:w}):null],!d&&r.createElement(I,{id:j,sideCar:S,observed:a,disabled:d,persistentFocus:m,crossFrame:v,autoFocus:p,whiteList:N,shards:_,onActivation:G,onDeactivation:Z,returnFocus:$,focusOptions:B}),r.createElement(P,(0,g.Z)({ref:z},U,{className:k,onBlur:X,onFocus:q}),s),V&&r.createElement("div",{"data-focus-guard":!0,tabIndex:d?-1:0,style:w}))}));R.propTypes={},R.defaultProps={children:void 0,disabled:!1,returnFocus:!1,focusOptions:void 0,noFocusGuards:!1,autoFocus:!0,persistentFocus:!1,crossFrame:!0,hasPositiveIndices:void 0,allowTextSelection:void 0,group:void 0,className:void 0,whiteList:void 0,shards:void 0,as:"div",lockProps:{},onActivation:void 0,onDeactivation:void 0};var T=R;function I(e,n){return I=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,n){return e.__proto__=n,e},I(e,n)}var D=function(e,n){return function(t){var o,a=[];function i(){o=e(a.map((function(e){return e.props}))),n(o)}var u,c,l,s=function(e){var n,u;function c(){return e.apply(this,arguments)||this}u=e,(n=c).prototype=Object.create(u.prototype),n.prototype.constructor=n,I(n,u),c.peek=function(){return o};var l=c.prototype;return l.componentDidMount=function(){a.push(this),i()},l.componentDidUpdate=function(){i()},l.componentWillUnmount=function(){var e=a.indexOf(this);a.splice(e,1),i()},l.render=function(){return r.createElement(t,this.props)},c}(r.PureComponent);return u=s,c="displayName",l="SideEffect("+function(e){return e.displayName||e.name||"Component"}(t)+")",c in u?Object.defineProperty(u,c,{value:l,enumerable:!0,configurable:!0,writable:!0}):u[c]=l,s}},B=function(e){for(var n=Array(e.length),t=0;t<e.length;++t)n[t]=e[t];return n},L=function(e){return Array.isArray(e)?e:[e]},W=function(e){return e.parentNode&&e.parentNode.nodeType===Node.DOCUMENT_FRAGMENT_NODE?e.parentNode.host:e.parentNode},j=function(e){return e===document||e&&e.nodeType===Node.DOCUMENT_NODE},G=function(e,n){return!e||j(e)||!function(e){if(e.nodeType!==Node.ELEMENT_NODE)return!1;var n=window.getComputedStyle(e,null);return!(!n||!n.getPropertyValue)&&("none"===n.getPropertyValue("display")||"hidden"===n.getPropertyValue("visibility"))}(e)&&n(W(e))},Z=function(e,n){var t=e.get(n);if(void 0!==t)return t;var r=G(n,Z.bind(void 0,e));return e.set(n,r),r},$=function(e,n){var t=e.get(n);if(void 0!==t)return t;var r=function(e,n){return!(e&&!j(e))||!!U(e)&&n(W(e))}(n,$.bind(void 0,e));return e.set(n,r),r},q=function(e){return e.dataset},X=function(e){return"INPUT"===e.tagName},Y=function(e){return X(e)&&"radio"===e.type},U=function(e){var n=e.getAttribute("data-no-autofocus");return![!0,"true",""].includes(n)},H=function(e){var n;return Boolean(e&&(null===(n=q(e))||void 0===n?void 0:n.focusGuard))},V=function(e){return!H(e)},z=function(e){return Boolean(e)},K=function(e,n){var t=e.tabIndex-n.tabIndex,r=e.index-n.index;if(t){if(!e.tabIndex)return 1;if(!n.tabIndex)return-1}return t||r},Q=function(e,n,t){return B(e).map((function(e,n){return{node:e,index:n,tabIndex:t&&-1===e.tabIndex?(e.dataset||{}).focusGuard?0:-1:e.tabIndex}})).filter((function(e){return!n||e.tabIndex>=0})).sort(K)},J=["button:enabled","select:enabled","textarea:enabled","input:enabled","a[href]","area[href]","summary","iframe","object","embed","audio[controls]","video[controls]","[tabindex]","[contenteditable]","[autofocus]"].join(","),ee="".concat(J,", [data-focus-guard]"),ne=function(e,n){var t;return B((null===(t=e.shadowRoot)||void 0===t?void 0:t.children)||e.children).reduce((function(e,t){return e.concat(t.matches(n?ee:J)?[t]:[],ne(t))}),[])},te=function(e,n){return e.reduce((function(e,t){return e.concat(ne(t,n),t.parentNode?B(t.parentNode.querySelectorAll(J)).filter((function(e){return e===t})):[])}),[])},re=function(e,n){return B(e).filter((function(e){return Z(n,e)})).filter((function(e){return function(e){return!((X(e)||function(e){return"BUTTON"===e.tagName}(e))&&("hidden"===e.type||e.disabled))}(e)}))},oe=function(e,n){return void 0===n&&(n=new Map),B(e).filter((function(e){return $(n,e)}))},ae=function(e,n,t){return Q(re(te(e,t),n),!0,t)},ie=function(e,n){return Q(re(te(e),n),!1)},ue=function(e,n){return re(function(e){var n=e.querySelectorAll("[".concat("data-autofocus-inside","]"));return B(n).map((function(e){return te([e])})).reduce((function(e,n){return e.concat(n)}),[])}(e),n)},ce=function(e,n){return e.shadowRoot?ce(e.shadowRoot,n):!(void 0===Object.getPrototypeOf(e).contains||!Object.getPrototypeOf(e).contains.call(e,n))||B(e.children).some((function(e){return ce(e,n)}))},le=function(e){return e.activeElement?e.activeElement.shadowRoot?le(e.activeElement.shadowRoot):e.activeElement:void 0},se=function(){return document.activeElement?document.activeElement.shadowRoot?le(document.activeElement.shadowRoot):document.activeElement:void 0},de=function(e){return e.parentNode?de(e.parentNode):e},fe=function(e){return L(e).filter(Boolean).reduce((function(e,n){var t=n.getAttribute(b);return e.push.apply(e,t?function(e){for(var n=new Set,t=e.length,r=0;r<t;r+=1)for(var o=r+1;o<t;o+=1){var a=e[r].compareDocumentPosition(e[o]);(a&Node.DOCUMENT_POSITION_CONTAINED_BY)>0&&n.add(o),(a&Node.DOCUMENT_POSITION_CONTAINS)>0&&n.add(r)}return e.filter((function(e,t){return!n.has(t)}))}(B(de(n).querySelectorAll("[".concat(b,'="').concat(t,'"]:not([').concat(y,'="disabled"])')))):[n]),e}),[])},me=function(e){return Boolean(B(e.querySelectorAll("iframe")).some((function(e){return e===document.activeElement})))},ve=function(e){var n=document&&se();return!(!n||n.dataset&&n.dataset.focusGuard)&&fe(e).some((function(e){return ce(e,n)||me(e)}))},pe=function(e,n){return Y(e)&&e.name?function(e,n){return n.filter(Y).filter((function(n){return n.name===e.name})).filter((function(e){return e.checked}))[0]||e}(e,n):e},he=function(e){return e[0]&&e.length>1?pe(e[0],e):e[0]},ge=function(e,n){return e.length>1?e.indexOf(pe(e[n],e)):n},be="NEW_FOCUS",ye=function(e,n,t,r){var o=e.length,a=e[0],i=e[o-1],u=H(t);if(!(t&&e.indexOf(t)>=0)){var c=void 0!==t?n.indexOf(t):-1,l=r?n.indexOf(r):c,s=r?e.indexOf(r):-1,d=c-l,f=n.indexOf(a),m=n.indexOf(i),v=function(e){var n=new Set;return e.forEach((function(t){return n.add(pe(t,e))})),e.filter((function(e){return n.has(e)}))}(n),p=(void 0!==t?v.indexOf(t):-1)-(r?v.indexOf(r):c),h=ge(e,0),g=ge(e,o-1);return-1===c||-1===s?be:!d&&s>=0?s:c<=f&&u&&Math.abs(d)>1?g:c>=m&&u&&Math.abs(d)>1?h:d&&Math.abs(p)>1?s:c<=f?g:c>m?h:d?Math.abs(d)>1?s:(o+s+d)%o:void 0}},Ee=function(e,n,t){var r,o=e.map((function(e){return e.node})),a=oe(o.filter((r=t,function(e){var n,t=null===(n=q(e))||void 0===n?void 0:n.autofocus;return e.autofocus||void 0!==t&&"false"!==t||r.indexOf(e)>=0})));return a&&a.length?he(a):he(oe(n))},we=function(e,n){return void 0===n&&(n=[]),n.push(e),e.parentNode&&we(e.parentNode.host||e.parentNode,n),n},ke=function(e,n){for(var t=we(e),r=we(n),o=0;o<t.length;o+=1){var a=t[o];if(r.indexOf(a)>=0)return a}return!1},Ne=function(e,n,t){var r=L(e),o=L(n),a=r[0],i=!1;return o.filter(Boolean).forEach((function(e){i=ke(i||e,e)||i,t.filter(Boolean).forEach((function(e){var n=ke(a,e);n&&(i=!i||ce(n,i)?n:ke(n,i))}))})),i},Ce=function(e,n){return e.reduce((function(e,t){return e.concat(ue(t,n))}),[])},xe=function(e,n){var t=document&&se(),r=fe(e).filter(V),o=Ne(t||e,e,r),a=new Map,i=ie(r,a),u=ae(r,a).filter((function(e){var n=e.node;return V(n)}));if(u[0]||(u=i)[0]){var c=ie([o],a).map((function(e){return e.node})),l=function(e,n){var t=new Map;return n.forEach((function(e){return t.set(e.node,e)})),e.map((function(e){return t.get(e)})).filter(z)}(c,u),s=l.map((function(e){return e.node})),d=ye(s,c,t,n);return d===be?{node:Ee(i,s,Ce(r,a))}:void 0===d?d:l[d]}},_e=0,Fe=!1,Me=function(e,n,t){void 0===t&&(t={});var r,o,a=xe(e,n);if(!Fe&&a){if(_e>2)return console.error("FocusLock: focus-fighting detected. Only one focus management system could be active. See https://github.com/theKashey/focus-lock/#focus-fighting"),Fe=!0,void setTimeout((function(){Fe=!1}),1);_e++,r=a.node,o=t.focusOptions,"focus"in r&&r.focus(o),"contentWindow"in r&&r.contentWindow&&r.contentWindow.focus(),_e--}},Oe=function(e){var n=fe(e).filter(V),t=Ne(e,e,n),r=new Map,o=ae([t],r,!0),a=ae(n,r).filter((function(e){var n=e.node;return V(n)})).map((function(e){return e.node}));return o.map((function(e){var n=e.node;return{node:n,index:e.index,lockItem:a.indexOf(n)>=0,guard:H(n)}}))};function Pe(e){var n=window.setImmediate;"undefined"!==typeof n?n(e):setTimeout(e,1)}var Se=function(){return document&&document.activeElement===document.body||function(){var e=document&&se();return!!e&&B(document.querySelectorAll("[".concat("data-no-focus-lock","]"))).some((function(n){return ce(n,e)}))}()},Ae=null,Re=null,Te=null,Ie=!1,De=function(){return!0};function Be(e,n,t,r){var o=null,a=e;do{var i=r[a];if(i.guard)i.node.dataset.focusAutoGuard&&(o=i);else{if(!i.lockItem)break;if(a!==e)return;o=null}}while((a+=t)!==n);o&&(o.node.tabIndex=0)}var Le=function(e){return e&&"current"in e?e.current:e},We=function e(n,t,r){return t&&(t.host===n&&(!t.activeElement||r.contains(t.activeElement))||t.parentNode&&e(n,t.parentNode,r))},je=function(){var e,n=!1;if(Ae){var t=Ae,r=t.observed,o=t.persistentFocus,a=t.autoFocus,i=t.shards,u=t.crossFrame,c=t.focusOptions,l=r||Te&&Te.portaledElement,s=document&&document.activeElement;if(l){var d=[l].concat(i.map(Le).filter(Boolean));if(s&&!function(e){return(Ae.whiteList||De)(e)}(s)||(o||(u?Boolean(Ie):"meanwhile"===Ie)||!Se()||!Re&&a)&&(l&&!(ve(d)||s&&function(e,n){return n.some((function(n){return We(e,n,n)}))}(s,d)||(e=s,Te&&Te.portaledElement===e))&&(document&&!Re&&s&&!a?(s.blur&&s.blur(),document.body.focus()):(n=Me(d,Re,{focusOptions:c}),Te={})),Ie=!1,Re=document&&document.activeElement),document){var f=document&&document.activeElement,m=Oe(d),v=m.map((function(e){return e.node})).indexOf(f);v>-1&&(m.filter((function(e){var n=e.guard,t=e.node;return n&&t.dataset.focusAutoGuard})).forEach((function(e){return e.node.removeAttribute("tabIndex")})),Be(v,m.length,1,m),Be(v,-1,-1,m))}}}return n},Ge=function(e){je()&&e&&(e.stopPropagation(),e.preventDefault())},Ze=function(){return Pe(je)},$e=function(e){var n=e.target,t=e.currentTarget;t.contains(n)||(Te={observerNode:t,portaledElement:n})},qe=function(){Ie="just",setTimeout((function(){Ie="meanwhile"}),0)};M.assignSyncMedium($e),O.assignMedium(Ze),P.assignMedium((function(e){return e({moveFocusInside:Me,focusInside:ve})}));var Xe=D((function(e){return e.filter((function(e){return!e.disabled}))}),(function(e){var n=e.slice(-1)[0];n&&!Ae&&(document.addEventListener("focusin",Ge),document.addEventListener("focusout",Ze),window.addEventListener("blur",qe));var t=Ae,r=t&&n&&n.id===t.id;Ae=n,t&&!r&&(t.onDeactivation(),e.filter((function(e){return e.id===t.id})).length||t.returnFocus(!n)),n?(Re=null,r&&t.observed===n.observed||n.onActivation(),je(),Pe(je)):(document.removeEventListener("focusin",Ge),document.removeEventListener("focusout",Ze),window.removeEventListener("blur",qe),Re=null)}))((function(){return null})),Ye=r.forwardRef((function(e,n){return r.createElement(T,(0,g.Z)({sideCar:Xe,ref:n},e))})),Ue=T.propTypes||{};Ue.sideCar,function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t])}(Ue,["sideCar"]);Ye.propTypes={};var He=Ye,Ve=t(5771),ze=e=>{const{initialFocusRef:n,finalFocusRef:t,contentRef:o,restoreFocus:a,children:i,isDisabled:u,autoFocus:c,persistentFocus:l,lockFocusAcrossFrames:s}=e,d=(0,r.useCallback)((()=>{if(null==n?void 0:n.current)n.current.focus();else if(null==o?void 0:o.current){0===(0,Ve.t5)(o.current).length&&requestAnimationFrame((()=>{var e;null==(e=o.current)||e.focus()}))}}),[n,o]),f=(0,r.useCallback)((()=>{var e;null==(e=null==t?void 0:t.current)||e.focus()}),[t]),m=a&&!t;return r.createElement(He,{crossFrame:s,persistentFocus:l,autoFocus:c,disabled:u,onActivation:d,onDeactivation:f,returnFocus:m},i)};ze.displayName="FocusLock";var Ke=t(5947),Qe="right-scroll-bar-position",Je="width-before-scroll-bar",en=F(),nn=function(){},tn=r.forwardRef((function(e,n){var t=r.useRef(null),o=r.useState({onScrollCapture:nn,onWheelCapture:nn,onTouchMoveCapture:nn}),a=o[0],i=o[1],u=e.forwardProps,c=e.children,l=e.className,s=e.removeScrollBar,d=e.enabled,f=e.shards,m=e.sideCar,v=e.noIsolation,p=e.inert,h=e.allowPinchZoom,g=e.as,b=void 0===g?"div":g,y=(0,N.__rest)(e,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noIsolation","inert","allowPinchZoom","as"]),w=m,k=E([t,n]),C=(0,N.__assign)((0,N.__assign)({},y),a);return r.createElement(r.Fragment,null,d&&r.createElement(w,{sideCar:en,removeScrollBar:s,shards:f,noIsolation:v,inert:p,setCallbacks:i,allowPinchZoom:!!h,lockRef:t}),u?r.cloneElement(r.Children.only(c),(0,N.__assign)((0,N.__assign)({},C),{ref:k})):r.createElement(b,(0,N.__assign)({},C,{className:l,ref:k}),c))}));tn.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1},tn.classNames={fullWidth:Je,zeroRight:Qe};var rn,on=function(e){var n=e.sideCar,t=(0,N.__rest)(e,["sideCar"]);if(!n)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var o=n.read();if(!o)throw new Error("Sidecar medium not found");return r.createElement(o,(0,N.__assign)({},t))};on.isSideCarExport=!0;function an(){if(!document)return null;var e=document.createElement("style");e.type="text/css";var n=rn||t.nc;return n&&e.setAttribute("nonce",n),e}var un=function(){var e=0,n=null;return{add:function(t){var r,o;0==e&&(n=an())&&(o=t,(r=n).styleSheet?r.styleSheet.cssText=o:r.appendChild(document.createTextNode(o)),function(e){(document.head||document.getElementsByTagName("head")[0]).appendChild(e)}(n)),e++},remove:function(){!--e&&n&&(n.parentNode&&n.parentNode.removeChild(n),n=null)}}},cn=function(){var e=function(){var e=un();return function(n,t){r.useEffect((function(){return e.add(n),function(){e.remove()}}),[n&&t])}}();return function(n){var t=n.styles,r=n.dynamic;return e(t,r),null}},ln={left:0,top:0,right:0,gap:0},sn=function(e){return parseInt(e||"",10)||0},dn=function(e){if(void 0===e&&(e="margin"),"undefined"===typeof window)return ln;var n=function(e){var n=window.getComputedStyle(document.body),t=n["padding"===e?"paddingLeft":"marginLeft"],r=n["padding"===e?"paddingTop":"marginTop"],o=n["padding"===e?"paddingRight":"marginRight"];return[sn(t),sn(r),sn(o)]}(e),t=document.documentElement.clientWidth,r=window.innerWidth;return{left:n[0],top:n[1],right:n[2],gap:Math.max(0,r-t+n[2]-n[0])}},fn=cn(),mn=function(e,n,t,r){var o=e.left,a=e.top,i=e.right,u=e.gap;return void 0===t&&(t="margin"),"\n  .".concat("with-scroll-bars-hidden"," {\n   overflow: hidden ").concat(r,";\n   padding-right: ").concat(u,"px ").concat(r,";\n  }\n  body {\n    overflow: hidden ").concat(r,";\n    overscroll-behavior: contain;\n    ").concat([n&&"position: relative ".concat(r,";"),"margin"===t&&"\n    padding-left: ".concat(o,"px;\n    padding-top: ").concat(a,"px;\n    padding-right: ").concat(i,"px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(u,"px ").concat(r,";\n    "),"padding"===t&&"padding-right: ".concat(u,"px ").concat(r,";")].filter(Boolean).join(""),"\n  }\n  \n  .").concat(Qe," {\n    right: ").concat(u,"px ").concat(r,";\n  }\n  \n  .").concat(Je," {\n    margin-right: ").concat(u,"px ").concat(r,";\n  }\n  \n  .").concat(Qe," .").concat(Qe," {\n    right: 0 ").concat(r,";\n  }\n  \n  .").concat(Je," .").concat(Je," {\n    margin-right: 0 ").concat(r,";\n  }\n  \n  body {\n    ").concat("--removed-body-scroll-bar-size",": ").concat(u,"px;\n  }\n")},vn=function(e){var n=e.noRelative,t=e.noImportant,o=e.gapMode,a=void 0===o?"margin":o,i=r.useMemo((function(){return dn(a)}),[a]);return r.createElement(fn,{styles:mn(i,!n,a,t?"":"!important")})},pn=!1;if("undefined"!==typeof window)try{var hn=Object.defineProperty({},"passive",{get:function(){return pn=!0,!0}});window.addEventListener("test",hn,hn),window.removeEventListener("test",hn,hn)}catch(rt){pn=!1}var gn=!!pn&&{passive:!1},bn=function(e,n){var t=window.getComputedStyle(e);return"hidden"!==t[n]&&!(t.overflowY===t.overflowX&&!function(e){return"TEXTAREA"===e.tagName}(e)&&"visible"===t[n])},yn=function(e,n){var t=n;do{if("undefined"!==typeof ShadowRoot&&t instanceof ShadowRoot&&(t=t.host),En(e,t)){var r=wn(e,t);if(r[1]>r[2])return!0}t=t.parentNode}while(t&&t!==document.body);return!1},En=function(e,n){return"v"===e?function(e){return bn(e,"overflowY")}(n):function(e){return bn(e,"overflowX")}(n)},wn=function(e,n){return"v"===e?[(t=n).scrollTop,t.scrollHeight,t.clientHeight]:function(e){return[e.scrollLeft,e.scrollWidth,e.clientWidth]}(n);var t},kn=function(e){return"changedTouches"in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},Nn=function(e){return[e.deltaX,e.deltaY]},Cn=function(e){return e&&"current"in e?e.current:e},xn=function(e){return"\n  .block-interactivity-".concat(e," {pointer-events: none;}\n  .allow-interactivity-").concat(e," {pointer-events: all;}\n")},_n=0,Fn=[];var Mn,On=(Mn=function(e){var n=r.useRef([]),t=r.useRef([0,0]),o=r.useRef(),a=r.useState(_n++)[0],i=r.useState((function(){return cn()}))[0],u=r.useRef(e);r.useEffect((function(){u.current=e}),[e]),r.useEffect((function(){if(e.inert){document.body.classList.add("block-interactivity-".concat(a));var n=(0,N.__spreadArray)([e.lockRef.current],(e.shards||[]).map(Cn),!0).filter(Boolean);return n.forEach((function(e){return e.classList.add("allow-interactivity-".concat(a))})),function(){document.body.classList.remove("block-interactivity-".concat(a)),n.forEach((function(e){return e.classList.remove("allow-interactivity-".concat(a))}))}}}),[e.inert,e.lockRef.current,e.shards]);var c=r.useCallback((function(e,n){if("touches"in e&&2===e.touches.length)return!u.current.allowPinchZoom;var r,a=kn(e),i=t.current,c="deltaX"in e?e.deltaX:i[0]-a[0],l="deltaY"in e?e.deltaY:i[1]-a[1],s=e.target,d=Math.abs(c)>Math.abs(l)?"h":"v";if("touches"in e&&"h"===d&&"range"===s.type)return!1;var f=yn(d,s);if(!f)return!0;if(f?r=d:(r="v"===d?"h":"v",f=yn(d,s)),!f)return!1;if(!o.current&&"changedTouches"in e&&(c||l)&&(o.current=r),!r)return!0;var m=o.current||r;return function(e,n,t,r,o){var a=function(e,n){return"h"===e&&"rtl"===n?-1:1}(e,window.getComputedStyle(n).direction),i=a*r,u=t.target,c=n.contains(u),l=!1,s=i>0,d=0,f=0;do{var m=wn(e,u),v=m[0],p=m[1]-m[2]-a*v;(v||p)&&En(e,u)&&(d+=p,f+=v),u=u.parentNode}while(!c&&u!==document.body||c&&(n.contains(u)||n===u));return(s&&(o&&0===d||!o&&i>d)||!s&&(o&&0===f||!o&&-i>f))&&(l=!0),l}(m,n,e,"h"===m?c:l,!0)}),[]),l=r.useCallback((function(e){var t=e;if(Fn.length&&Fn[Fn.length-1]===i){var r="deltaY"in t?Nn(t):kn(t),o=n.current.filter((function(e){return e.name===t.type&&e.target===t.target&&(n=e.delta,o=r,n[0]===o[0]&&n[1]===o[1]);var n,o}))[0];if(o&&o.should)t.cancelable&&t.preventDefault();else if(!o){var a=(u.current.shards||[]).map(Cn).filter(Boolean).filter((function(e){return e.contains(t.target)}));(a.length>0?c(t,a[0]):!u.current.noIsolation)&&t.cancelable&&t.preventDefault()}}}),[]),s=r.useCallback((function(e,t,r,o){var a={name:e,delta:t,target:r,should:o};n.current.push(a),setTimeout((function(){n.current=n.current.filter((function(e){return e!==a}))}),1)}),[]),d=r.useCallback((function(e){t.current=kn(e),o.current=void 0}),[]),f=r.useCallback((function(n){s(n.type,Nn(n),n.target,c(n,e.lockRef.current))}),[]),m=r.useCallback((function(n){s(n.type,kn(n),n.target,c(n,e.lockRef.current))}),[]);r.useEffect((function(){return Fn.push(i),e.setCallbacks({onScrollCapture:f,onWheelCapture:f,onTouchMoveCapture:m}),document.addEventListener("wheel",l,gn),document.addEventListener("touchmove",l,gn),document.addEventListener("touchstart",d,gn),function(){Fn=Fn.filter((function(e){return e!==i})),document.removeEventListener("wheel",l,gn),document.removeEventListener("touchmove",l,gn),document.removeEventListener("touchstart",d,gn)}}),[]);var v=e.removeScrollBar,p=e.inert;return r.createElement(r.Fragment,null,p?r.createElement(i,{styles:xn(a)}):null,v?r.createElement(vn,{gapMode:"margin"}):null)},en.useMedium(Mn),on),Pn=r.forwardRef((function(e,n){return r.createElement(tn,(0,N.__assign)({},e,{ref:n,sideCar:On}))}));Pn.classNames=tn.classNames;var Sn=Pn,An=t(1197),Rn=t(1755),Tn=(...e)=>e.filter(Boolean).join(" ");function In(...e){return function(n){e.some((e=>(null==e||e(n),null==n?void 0:n.defaultPrevented)))}}var Dn=new class{modals;constructor(){this.modals=[]}add(e){this.modals.push(e)}remove(e){this.modals=this.modals.filter((n=>n!==e))}isTopModal(e){return this.modals[this.modals.length-1]===e}};function Bn(e){const{isOpen:n,onClose:t,id:o,closeOnOverlayClick:a=!0,closeOnEsc:i=!0,useInert:u=!0,onOverlayClick:l,onEsc:s}=e,d=(0,r.useRef)(null),f=(0,r.useRef)(null),[m,v,h]=function(e,...n){const t=(0,r.useId)(),o=e||t;return(0,r.useMemo)((()=>n.map((e=>`${e}-${o}`))),[o,n])}(o,"chakra-modal","chakra-modal--header","chakra-modal--body");!function(e,n){const t=e.current;(0,r.useEffect)((()=>{if(e.current&&n)return p(e.current)}),[n,e,t])}(d,n&&u),function(e,n){(0,r.useEffect)((()=>(n&&Dn.add(e),()=>{Dn.remove(e)})),[n,e])}(d,n);const g=(0,r.useRef)(null),b=(0,r.useCallback)((e=>{g.current=e.target}),[]),y=(0,r.useCallback)((e=>{"Escape"===e.key&&(e.stopPropagation(),i&&(null==t||t()),null==s||s())}),[i,t,s]),[E,w]=(0,r.useState)(!1),[k,N]=(0,r.useState)(!1),C=(0,r.useCallback)(((e={},n=null)=>({role:"dialog",...e,ref:(0,c.lq)(n,d),id:m,tabIndex:-1,"aria-modal":!0,"aria-labelledby":E?v:void 0,"aria-describedby":k?h:void 0,onClick:In(e.onClick,(e=>e.stopPropagation()))})),[h,k,m,v,E]),x=(0,r.useCallback)((e=>{e.stopPropagation(),g.current===e.target&&Dn.isTopModal(d)&&(a&&(null==t||t()),null==l||l())}),[t,a,l]),_=(0,r.useCallback)(((e={},n=null)=>({...e,ref:(0,c.lq)(n,f),onClick:In(e.onClick,x),onKeyDown:In(e.onKeyDown,y),onMouseDown:In(e.onMouseDown,b)})),[y,b,x]);return{isOpen:n,onClose:t,headerId:v,bodyId:h,setBodyMounted:N,setHeaderMounted:w,dialogRef:d,overlayRef:f,getDialogProps:C,getDialogContainerProps:_}}var[Ln,Wn]=(0,a.k)({name:"ModalStylesContext",errorMessage:"useModalStyles returned is 'undefined'. Seems you forgot to wrap the components in \"<Modal />\" "}),[jn,Gn]=(0,a.k)({strict:!0,name:"ModalContext",errorMessage:"useModalContext: `context` is undefined. Seems you forgot to wrap modal components in `<Modal />`"}),Zn=e=>{const{portalProps:n,children:t,autoFocus:a,trapFocus:c,initialFocusRef:l,finalFocusRef:s,returnFocusOnClose:d,blockScrollOnMount:f,allowPinchZoom:m,preserveScrollBarGap:v,motionPreset:p,lockFocusAcrossFrames:h,onCloseComplete:g}=e,b=(0,i.jC)("Modal",e),y={...Bn(e),autoFocus:a,trapFocus:c,initialFocusRef:l,finalFocusRef:s,returnFocusOnClose:d,blockScrollOnMount:f,allowPinchZoom:m,preserveScrollBarGap:v,motionPreset:p,lockFocusAcrossFrames:h};return r.createElement(jn,{value:y},r.createElement(Ln,{value:b},r.createElement(u.M,{onExitComplete:g},y.isOpen&&r.createElement(o.h_,{...n},t))))};Zn.defaultProps={lockFocusAcrossFrames:!0,returnFocusOnClose:!0,scrollBehavior:"outside",trapFocus:!0,autoFocus:!0,blockScrollOnMount:!0,allowPinchZoom:!1,motionPreset:"scale"},Zn.displayName="Modal";var $n=(0,i.Gp)(((e,n)=>{const{className:t,...o}=e,{bodyId:a,setBodyMounted:u}=Gn();(0,r.useEffect)((()=>(u(!0),()=>u(!1))),[u]);const c=Tn("chakra-modal__body",t),l=Wn();return r.createElement(i.m$.div,{ref:n,className:c,id:a,...o,__css:l.body})}));function qn(e){const{autoFocus:n,trapFocus:t,dialogRef:o,initialFocusRef:a,blockScrollOnMount:i,allowPinchZoom:u,finalFocusRef:c,returnFocusOnClose:l,preserveScrollBarGap:s,lockFocusAcrossFrames:d}=Gn(),[f,m]=(0,Ke.oO)();return(0,r.useEffect)((()=>{!f&&m&&setTimeout(m)}),[f,m]),r.createElement(ze,{autoFocus:n,isDisabled:!t,initialFocusRef:a,finalFocusRef:c,restoreFocus:l,contentRef:o,lockFocusAcrossFrames:d},r.createElement(Sn,{removeScrollBar:!s,allowPinchZoom:u,enabled:i,forwardProps:!0},e.children))}$n.displayName="ModalBody",(0,i.Gp)(((e,n)=>{const{onClick:t,className:o,...a}=e,{onClose:i}=Gn(),u=Tn("chakra-modal__close-btn",o),c=Wn();return r.createElement(h.P,{ref:n,__css:c.closeButton,className:u,onClick:In(t,(e=>{e.stopPropagation(),i()})),...a})})).displayName="ModalCloseButton";var Xn={slideInBottom:{...An.Xc,custom:{offsetY:16,reverse:!0}},slideInRight:{...An.Xc,custom:{offsetX:16,reverse:!0}},scale:{...An.Qh,custom:{initialScale:.95,reverse:!0}},none:{}},Yn=(0,i.m$)(Rn.E.section),Un=e=>Xn[e||"none"],Hn=(0,r.forwardRef)(((e,n)=>{const{preset:t,motionProps:o=Un(t),...a}=e;return r.createElement(Yn,{ref:n,...o,...a})}));Hn.displayName="ModalTransition";var Vn=(0,i.Gp)(((e,n)=>{const{className:t,children:o,containerProps:a,motionProps:u,...c}=e,{getDialogProps:l,getDialogContainerProps:s}=Gn(),d=l(c,n),f=s(a),m=Tn("chakra-modal__content",t),v=Wn(),p={display:"flex",flexDirection:"column",position:"relative",width:"100%",outline:0,...v.dialog},h={display:"flex",width:"100vw",height:"$100vh",position:"fixed",left:0,top:0,...v.dialogContainer},{motionPreset:g}=Gn();return r.createElement(qn,null,r.createElement(i.m$.div,{...f,className:"chakra-modal__content-container",tabIndex:-1,__css:h},r.createElement(Hn,{preset:g,motionProps:u,className:m,...d,__css:p},o)))}));Vn.displayName="ModalContent";var zn=(0,i.Gp)(((e,n)=>{const{className:t,...o}=e,a=Tn("chakra-modal__footer",t),u={display:"flex",alignItems:"center",justifyContent:"flex-end",...Wn().footer};return r.createElement(i.m$.footer,{ref:n,...o,__css:u,className:a})}));zn.displayName="ModalFooter";var Kn=(0,i.Gp)(((e,n)=>{const{className:t,...o}=e,{headerId:a,setHeaderMounted:u}=Gn();(0,r.useEffect)((()=>(u(!0),()=>u(!1))),[u]);const c=Tn("chakra-modal__header",t),l={flex:0,...Wn().header};return r.createElement(i.m$.header,{ref:n,className:c,id:a,...o,__css:l})}));Kn.displayName="ModalHeader";var Qn=(0,i.m$)(Rn.E.div),Jn=(0,i.Gp)(((e,n)=>{const{className:t,transition:o,motionProps:a,...i}=e,u=Tn("chakra-modal__overlay",t),c={pos:"fixed",left:"0",top:"0",w:"100vw",h:"100vh",...Wn().overlay},{motionPreset:l}=Gn(),s="none"===l?{}:An.uf,d=a||s;return r.createElement(Qn,{...d,__css:c,ref:n,className:u,...i})}));Jn.displayName="ModalOverlay";(0,i.Gp)(((e,n)=>r.createElement(Vn,{ref:n,role:"alertdialog",...e})));var[et,nt]=(0,a.k)();var tt=(0,i.m$)(An.Mi);(0,i.Gp)(((e,n)=>{const{className:t,children:o,motionProps:a,containerProps:u,...c}=e,{getDialogProps:l,getDialogContainerProps:s,isOpen:d}=Gn(),f=l(c,n),m=s(u),v=Tn("chakra-modal__content",t),p=Wn(),h={display:"flex",flexDirection:"column",position:"relative",width:"100%",outline:0,...p.dialog},g={display:"flex",width:"100vw",height:"$100vh",position:"fixed",left:0,top:0,...p.dialogContainer},{placement:b}=nt();return r.createElement(i.m$.div,{...m,className:"chakra-modal__content-container",__css:g},r.createElement(qn,null,r.createElement(tt,{motionProps:a,direction:b,in:d,className:v,...f,__css:h},o)))})).displayName="DrawerContent"}}]);