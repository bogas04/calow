_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[9],{"+Cyc":function(e,r,t){"use strict";var o=t("5D9J"),a=t("OJSm"),i=t("BMxC"),n=t("QdyT"),d=Object(o.a)(i.a)((function(e){var r,t=e._after,o=e._focus,i=e._selected,d=e._focusWithin,l=e._hover,s=e._invalid,c=e._active,b=e._disabled,u=e._grabbed,f=e._pressed,p=e._expanded,O=e._visited,h=e._before,v=e._readOnly,y=e._first,j=e._notFirst,_=e._notLast,g=e._last,x=e._placeholder,m=e._checked,w=e._groupHover,C=e._mixed,B=e._odd,R=e._even;return Object(a.a)(((r={})["&:hover"]=Object(n.b)(l),r["&:focus"]=Object(n.b)(o),r["&:active, &[data-active=true]"]=Object(n.b)(c),r["&:visited"]=Object(n.b)(O),r["&:disabled, &:disabled:focus, &:disabled:hover, &[aria-disabled=true], &[aria-disabled=true]:focus, &[aria-disabled=true]:hover"]=Object(n.b)(b),r["&[aria-selected=true]"]=Object(n.b)(i),r["&[aria-invalid=true]"]=Object(n.b)(s),r["&[aria-expanded=true]"]=Object(n.b)(p),r["&[aria-grabbed=true]"]=Object(n.b)(u),r["&[aria-readonly=true], &[readonly]"]=Object(n.b)(v),r["&:first-of-type"]=Object(n.b)(y),r["&:not(:first-of-type)"]=Object(n.b)(j),r["&:not(:last-of-type)"]=Object(n.b)(_),r["&:last-of-type"]=Object(n.b)(g),r["&:nth-of-type(odd)"]=Object(n.b)(B),r["&:nth-of-type(even)"]=Object(n.b)(R),r["&[aria-checked=mixed]"]=Object(n.b)(C),r["&[aria-checked=true]"]=Object(n.b)(m),r["&[aria-pressed=true]"]=Object(n.b)(f),r["[role=group]:hover &"]=Object(n.b)(w),r["&:before"]=Object(n.b)(h),r["&:after"]=Object(n.b)(t),r["&:focus-within"]=Object(n.b)(d),r["&::placeholder"]=x,r))}));d.displayName="PseudoBox",r.a=d},"8OQS":function(e,r){e.exports=function(e,r){if(null==e)return{};var t,o,a={},i=Object.keys(e);for(o=0;o<i.length;o++)t=i[o],r.indexOf(t)>=0||(a[t]=e[t]);return a}},b804:function(e,r,t){"use strict";t.r(r),t.d(r,"default",(function(){return D}));var o=t("rePB"),a=t("BMxC"),i=t("qWyU"),n=t("sK1y"),d=t("pVnL"),l=t.n(d),s=t("8OQS"),c=t.n(s),b=t("qKvR"),u=t("q1tI"),f=Object(u.createContext)(),p=function(){return Object(u.useContext)(f)},O=Object(u.forwardRef)((function(e,r){var t=e.isInvalid,o=e.isRequired,i=e.isDisabled,n=e.isReadOnly,d=c()(e,["isInvalid","isRequired","isDisabled","isReadOnly"]),s={isRequired:o,isDisabled:i,isInvalid:t,isReadOnly:n};return Object(b.d)(f.Provider,{value:s},Object(b.d)(a.a,l()({role:"group",ref:r},d)))}));O.displayName="FormControl";var h=t("+Cyc"),v=t("lSNA"),y=t.n(v),j=t("CjxU"),_=t("mf32"),g=t("za5s");function x(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function m(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?x(t,!0).forEach((function(r){y()(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):x(t).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var w={_readOnly:{bg:"transparent",boxShadow:"none !important",userSelect:"all"}},C={bg:"transparent",px:void 0,height:void 0},B=function(e){switch(e.variant){case"flushed":return function(e){var r=e.theme,t=e.focusBorderColor,o=e.errorBorderColor,a=Object(g.h)(r.colors,t,t),i=Object(g.h)(r.colors,o,o);return m({},w,{borderBottom:"2px",borderColor:"inherit",rounded:0,px:void 0,bg:"transparent",_focus:{zIndex:1,borderColor:a},_invalid:{borderColor:i}})}(e);case"unstyled":return C;case"filled":return function(e){var r=e.theme,t=e.focusBorderColor,o=e.errorBorderColor,a=e.colorMode,i=Object(g.h)(r.colors,t,t),n=Object(g.h)(r.colors,o,o);return m({},w,{border:"2px",borderColor:"transparent",bg:{light:"gray.100",dark:"whiteAlpha.50"}[a],_hover:{bg:{light:"gray.200",dark:"whiteAlpha.100"}[a]},_disabled:{opacity:"0.4",cursor:"not-allowed"},_focus:{zIndex:1,bg:"transparent",borderColor:i},_invalid:{borderColor:n}})}(e);case"outline":return function(e){var r=e.theme,t=e.colorMode,o=e.focusBorderColor,a=e.errorBorderColor,i=Object(g.h)(r.colors,o,o),n=Object(g.h)(r.colors,a,a);return m({},w,{border:"1px",borderColor:{light:"inherit",dark:"whiteAlpha.50"}[t],bg:{light:"white",dark:"whiteAlpha.100"}[t],_hover:{borderColor:{light:"gray.300",dark:"whiteAlpha.200"}[t]},_disabled:{opacity:"0.4",cursor:"not-allowed"},_focus:{zIndex:1,borderColor:i,boxShadow:"0 0 0 1px "+i},_invalid:{borderColor:n,boxShadow:"0 0 0 1px "+n}})}(e);default:return{}}},R={display:"flex",alignItems:"center",position:"relative",transition:"all 0.2s",outline:"none",appearance:"none"},q={lg:{fontSize:"lg",px:4,height:12,rounded:"md"},md:{fontSize:"md",px:4,height:10,rounded:"md"},sm:{fontSize:"sm",px:3,height:8,rounded:"sm"}},S=function(e){var r=m({},e,{theme:Object(j.b)(),colorMode:Object(_.b)().colorMode});return m({width:e.isFullWidth?"100%":void 0},R,{},function(e){return q[e.size]}(r),{},B(r))},z=Object(u.forwardRef)((function(e,r){e.size,e.variant;var t=e.as,o=e["aria-label"],a=e["aria-describedby"],i=e.isReadOnly,n=(e.isFullWidth,e.isDisabled,e.isInvalid,e.isRequired,e.focusBorderColor,e.errorBorderColor,c()(e,["size","variant","as","aria-label","aria-describedby","isReadOnly","isFullWidth","isDisabled","isInvalid","isRequired","focusBorderColor","errorBorderColor"])),d=S(e),s=function(e){var r=p();return r?Object.keys(r).reduce((function(t,o){return t[o]=e[o],r&&null==e[o]&&(t[o]=r[o]),t}),{}):e}(e);return Object(b.d)(h.a,l()({ref:r,as:t,readOnly:s.isReadOnly,"aria-readonly":i,disabled:s.isDisabled,"aria-label":o,"aria-invalid":s.isInvalid,required:s.isRequired,"aria-required":s.isRequired,"aria-disabled":s.isDisabled,"aria-describedby":a},d,n))}));z.displayName="Input",z.defaultProps={size:"md",as:"input",variant:"outline",isFullWidth:!0,focusBorderColor:"blue.500",errorBorderColor:"red.500"};var I=z,P=t("Ogvq"),k=u.createElement;function D(){var e=Object(P.f)(),r=e.goal,t=e.dispatch,d=function(e){return function(r){t({type:P.a.SET_GOAL,payload:Object(o.a)({},e,Number(r.currentTarget.value))})}};return k(a.a,{p:"6"},k(i.a,null,"Your Goal"),P.d.map((function(e){return k(a.a,null,k(n.a,{textTransform:"capitalize"},e)," ",k(I,{value:r[e],onChange:d(e)}))})))}D.pageTitle="Settings"},qWyU:function(e,r,t){"use strict";var o=t("pVnL"),a=t.n(o),i=t("8OQS"),n=t.n(i),d=t("qKvR"),l=t("BMxC"),s=t("q1tI"),c={"2xl":["4xl",null,"5xl"],xl:["3xl",null,"4xl"],lg:["xl",null,"2xl"],md:"xl",sm:"md",xs:"sm"},b=Object(s.forwardRef)((function(e,r){var t=e.size,o=void 0===t?"xl":t,i=n()(e,["size"]);return Object(d.d)(l.a,a()({ref:r,as:"h2",fontSize:c[o],lineHeight:"shorter",fontWeight:"bold",fontFamily:"heading"},i))}));b.displayName="Heading",r.a=b},rrX4:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/settings",function(){return t("b804")}])},sK1y:function(e,r,t){"use strict";var o=t("pVnL"),a=t.n(o),i=t("q1tI"),n=t.n(i),d=t("BMxC"),l=n.a.forwardRef((function(e,r){return n.a.createElement(d.a,a()({ref:r,as:"p",fontFamily:"body"},e))}));l.displayName="Text",r.a=l}},[["rrX4",0,1,2]]]);