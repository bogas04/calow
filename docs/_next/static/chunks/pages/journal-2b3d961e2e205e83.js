(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[564],{7741:function(e,n,t){"use strict";t.d(n,{hU:function(){return g},zx:function(){return p}});var r=t(7294),i=t(6734),o=t(6256),a=t(4520),s=t(8387),l=t(5610),c=(...e)=>e.filter(Boolean).join(" "),u=e=>e?"":void 0,[d,f]=(0,s.k)({strict:!1,name:"ButtonGroupContext"});function m(e){const{children:n,className:t,...i}=e,a=(0,r.isValidElement)(n)?(0,r.cloneElement)(n,{"aria-hidden":!0,focusable:!1}):n,s=c("chakra-button__icon",t);return r.createElement(o.m$.span,{display:"inline-flex",alignSelf:"center",flexShrink:0,...i,className:s},a)}function h(e){const{label:n,placement:t,spacing:i="0.5rem",children:a=r.createElement(l.$,{color:"currentColor",width:"1em",height:"1em"}),className:s,__css:u,...d}=e,f=c("chakra-button__spinner",s),m="start"===t?"marginEnd":"marginStart",h=(0,r.useMemo)((()=>({display:"flex",alignItems:"center",position:n?"relative":"absolute",[m]:n?i:0,fontSize:"1em",lineHeight:"normal",...u})),[u,n,m,i]);return r.createElement(o.m$.div,{className:f,...d,__css:h},a)}m.displayName="ButtonIcon",h.displayName="ButtonSpinner";var p=(0,o.Gp)(((e,n)=>{const t=f(),s=(0,o.mq)("Button",{...t,...e}),{isDisabled:l=(null==t?void 0:t.isDisabled),isLoading:d,isActive:m,children:p,leftIcon:g,rightIcon:v,loadingText:b,iconSpacing:j="0.5rem",type:y,spinner:w,spinnerPlacement:_="start",className:S,as:E,...k}=(0,a.Lr)(e),N=(0,r.useMemo)((()=>{const e={...null==s?void 0:s._focus,zIndex:1};return{display:"inline-flex",appearance:"none",alignItems:"center",justifyContent:"center",userSelect:"none",position:"relative",whiteSpace:"nowrap",verticalAlign:"middle",outline:"none",...s,...!!t&&{_focus:e}}}),[s,t]),{ref:C,type:z}=function(e){const[n,t]=(0,r.useState)(!e);return{ref:(0,r.useCallback)((e=>{e&&t("BUTTON"===e.tagName)}),[]),type:n?"button":void 0}}(E),T={rightIcon:v,leftIcon:g,iconSpacing:j,children:p};return r.createElement(o.m$.button,{disabled:l||d,ref:(0,i.qq)(n,C),as:E,type:y??z,"data-active":u(m),"data-loading":u(d),__css:N,className:c("chakra-button",S),...k},d&&"start"===_&&r.createElement(h,{className:"chakra-button__spinner--start",label:b,placement:"start",spacing:j},w),d?b||r.createElement(o.m$.span,{opacity:0},r.createElement(x,{...T})):r.createElement(x,{...T}),d&&"end"===_&&r.createElement(h,{className:"chakra-button__spinner--end",label:b,placement:"end",spacing:j},w))}));function x(e){const{leftIcon:n,rightIcon:t,children:i,iconSpacing:o}=e;return r.createElement(r.Fragment,null,n&&r.createElement(m,{marginEnd:o},n),i,t&&r.createElement(m,{marginStart:o},t))}p.displayName="Button",(0,o.Gp)((function(e,n){const{size:t,colorScheme:i,variant:a,className:s,spacing:l="0.5rem",isAttached:u,isDisabled:f,...m}=e,h=c("chakra-button__group",s),p=(0,r.useMemo)((()=>({size:t,colorScheme:i,variant:a,isDisabled:f})),[t,i,a,f]);let x={display:"inline-flex"};return x=u?{...x,"> *:first-of-type:not(:last-of-type)":{borderEndRadius:0},"> *:not(:first-of-type):not(:last-of-type)":{borderRadius:0},"> *:not(:first-of-type):last-of-type":{borderStartRadius:0}}:{...x,"& > *:not(style) ~ *:not(style)":{marginStart:l}},r.createElement(d,{value:p},r.createElement(o.m$.div,{ref:n,role:"group",__css:x,className:h,"data-attached":u?"":void 0,...m}))})).displayName="ButtonGroup";var g=(0,o.Gp)(((e,n)=>{const{icon:t,children:i,isRound:o,"aria-label":a,...s}=e,l=t||i,c=(0,r.isValidElement)(l)?(0,r.cloneElement)(l,{"aria-hidden":!0,focusable:!1}):null;return r.createElement(p,{padding:"0",borderRadius:o?"full":void 0,ref:n,"aria-label":a,...s},c)}));g.displayName="IconButton"},6734:function(e,n,t){"use strict";t.d(n,{lq:function(){return i},qq:function(){return o}});var r=t(7294);function i(...e){return n=>{e.forEach((e=>{!function(e,n){if(null!=e)if("function"!==typeof e)try{e.current=n}catch(t){throw new Error(`Cannot assign value '${n}' to ref '${e}'`)}else e(n)}(e,n)}))}}function o(...e){return(0,r.useMemo)((()=>i(...e)),e)}},1398:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/journal",function(){return t(1203)}])},1976:function(e,n,t){"use strict";var r=t(6042),i=t(9396),o=t(5893),a=t(8641),s=t(7294),l=t(2780);function c(e){var n=e.nutrition,t=e.border,s=void 0===t||t,c=e.showLegend,u=void 0===c?!s:c;return(0,o.jsx)(a.rj,(0,i.Z)((0,r.Z)({gridTemplateColumns:"repeat(4, auto)",gridGap:s?4:6},s?{boxShadow:"md",borderRadius:50,p:4,px:u&&s?6:4}:{}),{children:l.$I.map((function(e,t){var r=n[e];return(0,o.jsxs)(a.kC,{direction:"column",textTransform:"capitalize",justify:"center",align:"flex-start",children:[(0,o.jsxs)(a.xv,{color:l.MT[e],fontWeight:"600",fontSize:"xs",children:[Number.isInteger(r)?r:r.toFixed(2),l.sw[e]]}),u&&(0,o.jsx)(a.xv,{fontSize:"xs",children:l.S$[e]})]},t)}))}))}n.Z=(0,s.memo)(c)},7647:function(e,n,t){"use strict";t.d(n,{T:function(){return l}});var r=t(6042),i=t(9396),o=t(9534),a=t(5893),s=t(8641),l=function(e){var n=e.heading,t=e.children,l=(0,o.Z)(e,["heading","children"]);return(0,a.jsxs)(s.xu,(0,i.Z)((0,r.Z)({py:["2","6","12"],px:["4","16","32"]},l),{children:[n&&"string"===typeof n?(0,a.jsx)(s.X6,{my:"6",children:n}):n,t]}))}},1203:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return p}});var r=t(9815),i=t(5893),o=t(8641),a=t(7741),s=t(1664),l=t.n(s),c=t(7294),u=t(7647),d=t(1976),f=t(2780),m=t(3437),h=t(5385);function p(){var e=(0,f.oR)(),n=e.logs,t=e.goal,s=(0,c.useState)("calories"),p=s[0],g=s[1],v=(0,c.useReducer)((function(e,n){return{next:function(){var n=new Date(e.getTime());return n.setDate(e.getDate()+7),n},previous:function(){var n=new Date(e.getTime());return n.setDate(e.getDate()-7),n}}[n]()}),new Date),b=v[0],j=v[1],y=(0,c.useMemo)((function(){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:7;return(0,r.Z)(Array(n).keys()).map((function(n){var t=new Date(e.getTime());return t.setDate(t.getDate()-n),(0,h.iZ)(t.getTime())})).reverse()}(b)}),[b]),w=(0,c.useMemo)((function(){return y.map((function(e){return{nutrition:(0,m.bZ)(n[e]||[]),dateKey:e}}))}),[n,y]),_=(0,c.useMemo)((function(){return w.reduce((function(e,n){return(0,m.Q_)(e,(function(e,r){return(r+(n.nutrition[e]||t.nutrition[e]))/2}))}),(0,m.GV)((function(){return 0})))}),[t.nutrition,w]),S=(0,c.useMemo)((function(){return y.flatMap((function(e){return n[e]||[]})).sort((function(e,n){return n.nutrition[p]-e.nutrition[p]})).slice(0,5)}),[y,n,p]);return(0,i.jsxs)(u.T,{heading:"Journal",children:[(0,i.jsxs)(o.kC,{flexDir:"column",gap:2,children:[(0,i.jsx)(o.kC,{rounded:"xl",bg:"gray.100",px:"4",py:"2",gap:2,align:"center",children:_.calories<t.nutrition.calories?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o.xv,{fontSize:"32",display:"inline",children:"\ud83c\udfc6"}),(0,i.jsx)(o.xv,{children:"Congrats! You've been hitting your goals."})]}):(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o.xv,{fontSize:"32",display:"inline",children:"\ud83d\udcaa"}),(0,i.jsx)(o.xv,{children:"Don't worry, keep trying, you'll get there."})]})}),(0,i.jsxs)("div",{className:"my-4 grid gap-2",children:[(0,i.jsxs)("div",{children:[(0,i.jsx)("p",{className:"text-sm font-semibold",children:"Weekly Average"}),(0,i.jsx)(d.Z,{nutrition:_,showLegend:!0,border:!1})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("p",{className:"text-sm font-semibold",children:"Goal"}),(0,i.jsx)(d.Z,{nutrition:t.nutrition,showLegend:!0,border:!1})]})]})]}),(0,i.jsxs)(o.xu,{position:"relative",flex:1,mt:"12",pl:"2",bg:"gray.50",children:[(0,i.jsxs)(o.xu,{position:"absolute",top:0,zIndex:999,w:"100%",children:[(0,i.jsx)(o.xu,{w:"100%",borderBottom:"dotted",h:"2",borderColor:f.MT[p],mt:-2}),(0,i.jsxs)(o.xv,{textAlign:"right",fontSize:"9",children:[t.nutrition[p]," ",f.sw[p]]})]}),(0,i.jsx)(x,{macrosForLogs:w,selectedMacro:p,goal:t})]}),(0,i.jsxs)("div",{className:"mt-12 flex justify-between",children:[(0,i.jsx)(a.zx,{variant:"outline",onClick:function(){return j("previous")},children:"Previous Week"}),(0,i.jsx)(a.zx,{variant:"outline",onClick:function(){return j("next")},children:"Next Week"})]}),(0,i.jsx)(o.kC,{justify:"space-between",mt:"8",mb:"4",children:f.$I.map((function(e){return(0,i.jsx)(a.zx,{onClick:function(){return g(e)},variant:e===p?"solid":"outline",size:"sm",children:e},e)}))}),(0,i.jsxs)(o.xu,{children:[(0,i.jsxs)(o.kC,{gap:"1",children:[(0,i.jsx)(o.xv,{fontSize:"16",fontWeight:"bold",children:"Meals with most amount of"}),(0,i.jsx)(o.xv,{fontWeight:"bold",fontSize:"16",display:"inline",textTransform:"capitalize",color:f.MT[p],children:p})]}),S.map((function(e,n){var t=(0,h.iZ)(e.timestamp),r=new Date(e.timestamp);return(0,i.jsx)(l(),{href:"/?date=".concat(t),children:(0,i.jsxs)(o.xu,{my:"4",children:[(0,i.jsxs)(o.kC,{justify:"space-between",children:[(0,i.jsx)(o.xv,{fontWeight:"semibold",fontSize:14,flex:"1",children:e.name}),(0,i.jsxs)(o.xv,{fontSize:"10",color:"gray.600",align:"right",children:[(0,h.CC)(r),", ",(0,h.a3)(r)]})]}),(0,i.jsx)(d.Z,{nutrition:e.nutrition,showLegend:!0,border:!1})]})},n)}))]})]})}p.pageTitle="Journal";var x=(0,c.memo)((function(e){var n=e.macrosForLogs,t=e.goal,r=e.selectedMacro;return(0,i.jsx)(o.kC,{justify:"space-between",align:"flex-end",height:200,width:"95%",children:n.map((function(e){var n=e.nutrition,a=e.dateKey,s=n[r]/t.nutrition[r],c=(0,h._x)(a),u=!!c&&(0,h.iZ)(c.getTime())===(0,h.iZ)(Date.now()),d=c?(0,h.a3)(c):null;return(0,i.jsx)(l(),{href:"/?date=".concat(a),children:(0,i.jsxs)(o.xu,{display:"flex",alignItems:"flex-end",justifyContent:"space-between",w:"100%",position:"relative",children:[(0,i.jsx)(o.xu,{bg:f.MT[r],w:"3",h:Math.min(200*s,250)},a),d?(0,i.jsx)(o.xv,{fontSize:"xs",position:"absolute",bottom:-5,left:-2,fontWeight:u?"bold":void 0,children:d}):null]})},a)}))})}))},9534:function(e,n,t){"use strict";function r(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}t.d(n,{Z:function(){return r}})}},function(e){e.O(0,[774,888,179],(function(){return n=1398,e(e.s=n);var n}));var n=e.O();_N_E=n}]);