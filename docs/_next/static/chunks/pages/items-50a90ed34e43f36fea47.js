(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[689],{3614:function(e,t,r){"use strict";var n=r(5893),i=r(4121),o=r(6379),s=r(8017),a=r(8420),c=r(1033),l=r(4115),u=r(7294),d=r(2230);function h(e){var t,r,u=e.item,h=e.isOpen,f=e.hideWeight,p=void 0!==f&&f,m=e.onClose,j=0!==Object.keys(null!==(t=u.micro)&&void 0!==t?t:{}).length;return(0,n.jsxs)(o.u_,{isOpen:h,onClose:m,size:"full",scrollBehavior:"inside",children:[(0,n.jsx)(o.ZA,{}),(0,n.jsxs)(o.hz,{pb:5,children:[(0,n.jsx)(o.xB,{children:(0,n.jsxs)(s.xu,{d:"flex",alignItems:"center",justifyContent:"space-between",children:[u.name," ",p?"":"(".concat(u.weight,"g)"),(0,n.jsx)(a.h,{"aria-label":"close",rounded:"full",icon:(0,n.jsx)(c.P,{}),variant:"ghost",onClick:m})]})}),(0,n.jsxs)(o.fe,{children:[(0,n.jsx)(d.Z,{nutrition:u.nutrition,border:!1}),j&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(l.x,{size:"lg",fontWeight:"600",mt:"5",mb:"2",children:"Micro Nutrients (in grams):"}),Object.entries(null!==(r=u.micro)&&void 0!==r?r:{}).map((function(e){var t=(0,i.Z)(e,2),r=t[0],o=t[1];return(0,n.jsxs)(s.xu,{d:"flex",justifyContent:"space-between",alignItems:"center",my:"1",children:[(0,n.jsx)(l.x,{textTransform:"capitalize",fontWeight:"400",children:r}),(0,n.jsx)(l.x,{children:Number(o*u.weight/100).toFixed(2)})]},r)}))]})]})]})]})}t.Z=(0,u.memo)(h)},6870:function(e,t,r){"use strict";var n=r(5893),i=r(6265),o=r(8347),s=r(1664),a=r(8017),c=r(4096),l=r(336),u=r(8420),d=r(4115),h=r(7294),f=r(2230),p=r(3750),m=r(3614);function j(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function x(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?j(Object(r),!0).forEach((function(t){(0,i.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):j(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function b(e){var t=e.item,r=e.size,i=void 0===r?"lg":r,j=(0,o.Z)(e,["item","size"]),b=(0,h.useState)(!1),g=b[0],y=b[1];return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(a.xu,x(x({borderWidth:"1px",borderStyle:"solid",borderColor:"gray.200",borderRadius:8,my:"sm"===i?3:5,p:"sm"===i?3:5},j),{},{children:[(0,n.jsx)(c.k,{mb:"sm"===i?2:4,justify:"space-between",children:(0,n.jsx)(l.X,{size:"sm"===i?"sm":"md",children:(0,n.jsx)(s.default,{href:"/items?search=".concat(t.name),children:(0,n.jsxs)("a",{children:[(0,n.jsx)(a.xu,{as:"span",mx:"sm"===i?0:2,children:t.icon||"\ud83c\udf5b"})," ",t.name]})})})}),(0,n.jsxs)(c.k,{justify:"space-between",align:"flex-start",children:[(0,n.jsx)(f.Z,{border:!1,nutrition:t.nutrition}),t.micro&&(0,n.jsx)(u.h,{variant:"ghost",rounded:"full",color:"gray.500",icon:(0,n.jsx)(p.evw,{}),"aria-label":"Micronutrients",onClick:function(){return y(!0)}})]}),(0,n.jsxs)(d.x,{mt:"2",fontSize:"xs",color:"gray.600",fontWeight:"300",children:[t.weight,"g"]})]})),(0,n.jsx)(m.Z,{item:t,onClose:function(){return y(!1)},isOpen:g})]})}t.Z=(0,h.memo)(b)},2230:function(e,t,r){"use strict";var n=r(6265),i=r(5893),o=r(9345),s=r(4096),a=r(4115),c=r(7294),l=r(6084);function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function h(e){var t=e.nutrition,r=e.border,n=void 0===r||r,c=e.showLegend,u=void 0===c?!n:c;return(0,i.jsx)(o.r,d(d({gridTemplateColumns:"repeat(4, auto)",gridGap:n?4:6},n?{boxShadow:"md",borderRadius:50,p:4,px:u&&n?6:4}:{}),{},{children:l.nutritionKeys.map((function(e,r){var n=t[e];return(0,i.jsxs)(s.k,{direction:"column",textTransform:"capitalize",justify:"center",align:"flex-start",children:[(0,i.jsxs)(a.x,{color:l.nutritionColors[e],fontWeight:"600",fontSize:"xs",children:[Number.isInteger(n)?n:n.toFixed(2),l.nutritionShortUnits[e]]}),u&&(0,i.jsx)(a.x,{fontSize:"xs",children:l.nutritionShortNames[e]})]},r)}))}))}t.Z=(0,c.memo)(h)},9868:function(e,t,r){"use strict";r.d(t,{T:function(){return u}});var n=r(6265),i=r(5893),o=r(8347),s=r(8017),a=r(336);function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var u=function(e){var t=e.heading,r=e.children,n=(0,o.Z)(e,["heading","children"]);return(0,i.jsxs)(s.xu,l(l({py:["2","6","12"],px:["4","16","32"]},n),{},{children:[t&&"string"===typeof t?(0,i.jsx)(a.X,{my:"6",children:t}):t,r]}))}},7269:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return W}});var n=r(5893),i=r(9999),o=r(9867),s=r(7294),a=(0,o.I)({viewBox:"0 0 14 14",path:s.createElement("g",{fill:"currentColor"},s.createElement("polygon",{points:"5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"}))}),c=r(6569),l=r(2110),u=(r(9676),r(3808));r(4651),r(6678);var d=r(227),h=r(917),f=r(63),p=r(2326),m=r(5284),j=r(4461);function x(){return(x=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function b(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}var g=(0,d.m$)("div",{baseStyle:{boxShadow:"none",backgroundClip:"padding-box",cursor:"default",color:"transparent",pointerEvents:"none",userSelect:"none","&::before, &::after, *":{visibility:"hidden"}}}),y=(0,h.F4)({from:{opacity:0},to:{opacity:1}}),v=(0,f.G)(((e,t)=>{var r=(0,p.m)("Skeleton",e),n=(()=>{var e=s.useRef(!0);return s.useEffect((()=>{e.current=!1}),[]),e.current})(),i=(0,m.Lr)(e),{isLoaded:o,fadeDuration:a,className:c}=i,l=b(i,["startColor","endColor","isLoaded","fadeDuration","speed","className"]),u=(0,j.cx)("chakra-skeleton",c);if(o){var h=n?"none":y+" "+a+"s";return s.createElement(d.m$.div,x({ref:t,className:u,__css:{animation:h}},l))}return s.createElement(g,x({ref:t,className:u},l,{__css:r}))}));v.defaultProps={fadeDuration:.4,speed:.8},u.Ts&&(v.displayName="Skeleton");u.Ts;u.Ts;var w=r(9345),O=r(6729),k=r(6618),P=r(9887),S=r(4096),C=r(4619),E=r(155),_=r(8017),D=r(4115),N=r(8420),Z=r(5267),z=r(4221),T=r(6870),F=r(9868),I=r(6084);function W(){var e=(0,I.useItems)(),t=e.items,r=e.isLoading,o=(0,s.useState)("name"),u=o[0],d=o[1],h=(0,s.useState)(""),f=h[0],p=h[1],m=(0,s.useState)(!1),j=m[0],x=m[1];(0,s.useEffect)((function(){var e=new URLSearchParams(location.search).get("search");e&&p(e)}),[]);var b=(0,s.useMemo)((function(){var e=(0,i.Z)(t);if(f){var r=new z.Z(t,{keys:["name"],threshold:.25});e=f.includes(",")?f.split(",").map((function(e){return e.trim()})).map((function(e){return r.search(e).map((function(e){return e.item}))})).flat():r.search(f).map((function(e){return e.item}))}return e.sort((function(e,t){switch(u){case"calories/weight":return t.nutrition.calories/t.weight-e.nutrition.calories/e.weight;case"name":return e.name<t.name?-1:e.name>t.name?1:0;case"carbs/calories":return t.nutrition.carbohydrates/(t.weight*t.nutrition.calories)-e.nutrition.carbohydrates/(e.weight*e.nutrition.calories);case"fat/calories":return t.nutrition.fat/(t.weight*t.nutrition.calories)-e.nutrition.fat/(e.weight*e.nutrition.calories);case"protein/weight":return t.nutrition.protein/t.weight-e.nutrition.protein/e.weight;case"protein/calories":return t.nutrition.protein/(t.weight*t.nutrition.calories)-e.nutrition.protein/(e.weight*e.nutrition.calories)}}))}),[f,t,u]);return(0,n.jsxs)(F.T,{heading:"Your Items",children:[(0,n.jsxs)(w.r,{as:"form",templateColumns:"auto 100px",gap:2,alignItems:"end",onSubmit:function(e){return e.preventDefault()},children:[(0,n.jsxs)(O.NI,{children:[(0,n.jsx)(k.l,{htmlFor:"search",children:"Search for items."}),(0,n.jsx)(P.I,{id:"search",value:f,placeholder:"Search",type:"search",onChange:function(e){p(e.currentTarget.value)}})]}),(0,n.jsx)(S.k,{justify:"end",children:(0,n.jsxs)(C.v2,{children:[(0,n.jsx)(C.j2,{as:E.z,rightIcon:(0,n.jsx)(c.v,{}),children:"Sort"}),(0,n.jsx)(C.qy,{children:Object.keys(L).map((function(e){return(0,n.jsxs)(C.sN,{onClick:function(){return d((function(t){return t===e?"name":e}))},children:[u===e&&(0,n.jsx)(a,{mr:"1"}),"By ",L[e].title]},e)}))})]})})]}),r?(0,n.jsxs)(_.xu,{mt:"4",children:[(0,n.jsx)(v,{h:"2",mt:"6",mb:"6",w:"30%"}),(0,i.Z)(new Array(4)).map((function(e,t){return(0,n.jsxs)(_.xu,{borderWidth:"1px",borderStyle:"solid",borderColor:"gray.200",borderRadius:8,my:"4",p:"6",children:[(0,n.jsxs)(S.k,{direction:"row",mb:"6",children:[(0,n.jsx)(v,{w:"30px",h:"30px",rounded:"50%",mr:"4"}),(0,n.jsx)(v,{flex:"0.8",h:"4",rounded:"md"})]}),(0,n.jsxs)(S.k,{align:"center",justify:"flex-start",my:"3",children:[(0,n.jsx)(v,{w:"10",h:"2",mr:"2"}),(0,n.jsx)(v,{w:"10",h:"2",mr:"2"}),(0,n.jsx)(v,{w:"10",h:"2",mr:"2"}),(0,n.jsx)(v,{w:"10",h:"2"})]})]},t)}))]}):(0,n.jsxs)(n.Fragment,{children:[0!==b.length&&(0,n.jsxs)(_.xu,{mt:"4",children:[(0,n.jsxs)(S.k,{justify:"space-between",align:"center",children:[(0,n.jsxs)(D.x,{children:["Sorted by ",L[u].title]}),L[u].description&&(0,n.jsx)(N.h,{isRound:!0,size:"sm",variant:"ghost","aria-label":j?"Collapse":"Expand",onClick:function(){return x(!j)},color:j?"gray.800":"gray.400",icon:(0,n.jsx)(l.s,{})})]}),L[u].description&&(0,n.jsx)(Z.U,{in:j,startingHeight:45,children:(0,n.jsx)(D.x,{bg:"gray.50",p:"2",fontSize:"sm",rounded:"md",onClick:function(){return x(!j)},children:L[u].description})})]}),b.map((function(e,t){return(0,n.jsx)(T.Z,{item:e},t)}))]})]})}W.pageTitle="Items";var L={name:{title:"Name",description:"",source:""},"calories/weight":{title:"Calories",description:"",source:""},"protein/weight":{title:"Protein per Weight",description:"",source:""},"protein/calories":{title:"Protein per Calories",description:"",source:""},"fat/calories":{title:"Fat per Calories",description:"Fats are sources of essential fatty acids, an important dietary requirement, especially to absorb Vitamins A, D, E, and K. Fats also play a vital role in maintaining healthy skin and hair, insulating body organs against shock, maintaining body temperature, and promoting healthy cell function. Fat also serves as a useful buffer against a host of diseases. When a particular substance, whether chemical or biotic, reaches unsafe levels in the bloodstream, the body can effectively dilute or at least maintain equilibrium of the offending substances by storing it in new fat tissue. This helps to protect vital organs, until such time as the offending substances can be metabolized or removed from the body by such means as excretion, urination, accidental or intentional bloodletting, sebum excretion, and hair growth.",source:"https://en.wikipedia.org/wiki/Fat#Biological_importance"},"carbs/calories":{title:"Carbs per Calories",description:""}}},3401:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/items",function(){return r(7269)}])}},function(e){e.O(0,[774,13,511,753,243,228,888,179],(function(){return t=3401,e(e.s=t);var t}));var t=e.O();_N_E=t}]);