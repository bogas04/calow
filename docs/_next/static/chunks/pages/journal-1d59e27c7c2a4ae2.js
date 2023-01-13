(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[564],{7741:function(e,n,t){"use strict";t.d(n,{hU:function(){return g},zx:function(){return h}});var r=t(7294),i=t(6734),o=t(6256),a=t(4520),s=t(8387),l=t(5610),c=(...e)=>e.filter(Boolean).join(" "),u=e=>e?"":void 0,[d,f]=(0,s.k)({strict:!1,name:"ButtonGroupContext"});function m(e){const{children:n,className:t,...i}=e,a=(0,r.isValidElement)(n)?(0,r.cloneElement)(n,{"aria-hidden":!0,focusable:!1}):n,s=c("chakra-button__icon",t);return r.createElement(o.m$.span,{display:"inline-flex",alignSelf:"center",flexShrink:0,...i,className:s},a)}function p(e){const{label:n,placement:t,spacing:i="0.5rem",children:a=r.createElement(l.$,{color:"currentColor",width:"1em",height:"1em"}),className:s,__css:u,...d}=e,f=c("chakra-button__spinner",s),m="start"===t?"marginEnd":"marginStart",p=(0,r.useMemo)((()=>({display:"flex",alignItems:"center",position:n?"relative":"absolute",[m]:n?i:0,fontSize:"1em",lineHeight:"normal",...u})),[u,n,m,i]);return r.createElement(o.m$.div,{className:f,...d,__css:p},a)}m.displayName="ButtonIcon",p.displayName="ButtonSpinner";var h=(0,o.Gp)(((e,n)=>{const t=f(),s=(0,o.mq)("Button",{...t,...e}),{isDisabled:l=(null==t?void 0:t.isDisabled),isLoading:d,isActive:m,children:h,leftIcon:g,rightIcon:b,loadingText:v,iconSpacing:y="0.5rem",type:j,spinner:_,spinnerPlacement:E="start",className:w,as:S,...k}=(0,a.Lr)(e),N=(0,r.useMemo)((()=>{const e={...null==s?void 0:s._focus,zIndex:1};return{display:"inline-flex",appearance:"none",alignItems:"center",justifyContent:"center",userSelect:"none",position:"relative",whiteSpace:"nowrap",verticalAlign:"middle",outline:"none",...s,...!!t&&{_focus:e}}}),[s,t]),{ref:C,type:z}=function(e){const[n,t]=(0,r.useState)(!e);return{ref:(0,r.useCallback)((e=>{e&&t("BUTTON"===e.tagName)}),[]),type:n?"button":void 0}}(S),I={rightIcon:b,leftIcon:g,iconSpacing:y,children:h};return r.createElement(o.m$.button,{disabled:l||d,ref:(0,i.qq)(n,C),as:S,type:j??z,"data-active":u(m),"data-loading":u(d),__css:N,className:c("chakra-button",w),...k},d&&"start"===E&&r.createElement(p,{className:"chakra-button__spinner--start",label:v,placement:"start",spacing:y},_),d?v||r.createElement(o.m$.span,{opacity:0},r.createElement(x,{...I})):r.createElement(x,{...I}),d&&"end"===E&&r.createElement(p,{className:"chakra-button__spinner--end",label:v,placement:"end",spacing:y},_))}));function x(e){const{leftIcon:n,rightIcon:t,children:i,iconSpacing:o}=e;return r.createElement(r.Fragment,null,n&&r.createElement(m,{marginEnd:o},n),i,t&&r.createElement(m,{marginStart:o},t))}h.displayName="Button",(0,o.Gp)((function(e,n){const{size:t,colorScheme:i,variant:a,className:s,spacing:l="0.5rem",isAttached:u,isDisabled:f,...m}=e,p=c("chakra-button__group",s),h=(0,r.useMemo)((()=>({size:t,colorScheme:i,variant:a,isDisabled:f})),[t,i,a,f]);let x={display:"inline-flex"};return x=u?{...x,"> *:first-of-type:not(:last-of-type)":{borderEndRadius:0},"> *:not(:first-of-type):not(:last-of-type)":{borderRadius:0},"> *:not(:first-of-type):last-of-type":{borderStartRadius:0}}:{...x,"& > *:not(style) ~ *:not(style)":{marginStart:l}},r.createElement(d,{value:h},r.createElement(o.m$.div,{ref:n,role:"group",__css:x,className:p,"data-attached":u?"":void 0,...m}))})).displayName="ButtonGroup";var g=(0,o.Gp)(((e,n)=>{const{icon:t,children:i,isRound:o,"aria-label":a,...s}=e,l=t||i,c=(0,r.isValidElement)(l)?(0,r.cloneElement)(l,{"aria-hidden":!0,focusable:!1}):null;return r.createElement(h,{padding:"0",borderRadius:o?"full":void 0,ref:n,"aria-label":a,...s},c)}));g.displayName="IconButton"},6734:function(e,n,t){"use strict";t.d(n,{lq:function(){return i},qq:function(){return o}});var r=t(7294);function i(...e){return n=>{e.forEach((e=>{!function(e,n){if(null!=e)if("function"!==typeof e)try{e.current=n}catch(t){throw new Error(`Cannot assign value '${n}' to ref '${e}'`)}else e(n)}(e,n)}))}}function o(...e){return(0,r.useMemo)((()=>i(...e)),e)}},1398:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/journal",function(){return t(1203)}])},1976:function(e,n,t){"use strict";var r=t(6042),i=t(9396),o=t(5893),a=t(8641),s=t(7294),l=t(2780);function c(e){var n=e.nutrition,t=e.border,s=void 0===t||t,c=e.showLegend,u=void 0===c?!s:c;return(0,o.jsx)(a.rj,(0,i.Z)((0,r.Z)({gridTemplateColumns:"repeat(4, auto)",gridGap:s?4:6},s?{boxShadow:"md",borderRadius:50,p:4,px:u&&s?6:4}:{}),{children:l.$I.map((function(e,t){var r=n[e];return(0,o.jsxs)(a.kC,{direction:"column",textTransform:"capitalize",justify:"center",align:"flex-start",children:[(0,o.jsxs)(a.xv,{color:l.MT[e],fontWeight:"600",fontSize:"xs",children:[Number.isInteger(r)?r:r.toFixed(2),l.sw[e]]}),u&&(0,o.jsx)(a.xv,{fontSize:"xs",children:l.S$[e]})]},t)}))}))}n.Z=(0,s.memo)(c)},7647:function(e,n,t){"use strict";t.d(n,{T:function(){return l}});var r=t(6042),i=t(9396),o=t(9534),a=t(5893),s=t(8641),l=function(e){var n=e.heading,t=e.children,l=(0,o.Z)(e,["heading","children"]);return(0,a.jsxs)(s.xu,(0,i.Z)((0,r.Z)({py:["2","6","12"],px:["4","16","32"]},l),{children:[n&&"string"===typeof n?(0,a.jsx)(s.X6,{my:"6",children:n}):n,t]}))}},1203:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return p}});var r=t(5893),i=t(8641),o=t(7741),a=t(1664),s=t.n(a),l=t(7294),c=t(7647),u=t(1976),d=t(2780),f=t(3437),m=t(5385);function p(){var e=(0,d.oR)(),n=e.logs,t=e.goal,a=(0,l.useState)("calories"),s=a[0],p=a[1],x=(0,l.useMemo)((function(){return Object.keys(n).sort((0,m.rm)(!1)).slice(0,7).sort((0,m.rm)(!0))}),[n]),g=(0,l.useMemo)((function(){return x.map((function(e){return{nutrition:(0,f.bZ)(n[e]),dateKey:e}}))}),[n,x]),b=(0,l.useMemo)((function(){return g.reduce((function(e,n){return(0,f.Q_)(e,(function(e,r){return(r+(n.nutrition[e]||t.nutrition[e]))/2}))}),(0,f.GV)((function(){return 0})))}),[t.nutrition,g]);return(0,r.jsxs)(c.T,{heading:"Journal",children:[(0,r.jsx)(i.kC,{justify:"space-between",mb:"20",children:d.$I.map((function(e){return(0,r.jsx)(o.zx,{onClick:function(){return p(e)},variant:e===s?"solid":"outline",size:"sm",children:e},e)}))}),(0,r.jsxs)(i.xu,{position:"relative",flex:1,my:12,children:[(0,r.jsxs)(i.xu,{position:"absolute",top:0,zIndex:999,w:"100%",children:[(0,r.jsx)(i.xu,{w:"100%",borderBottom:"dotted",h:"2",borderColor:d.MT[s],mt:-2}),(0,r.jsxs)(i.xv,{textAlign:"right",fontSize:"9",children:[t.nutrition[s]," ",d.sw[s]]})]}),(0,r.jsx)(h,{macrosForLogs:g,selectedMacro:s,goal:t})]}),(0,r.jsxs)(i.kC,{flexDir:"column",gap:2,children:[(0,r.jsx)(i.kC,{rounded:"xl",bg:"gray.100",px:"4",py:"2",gap:2,children:b.calories<t.nutrition.calories?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.xv,{fontSize:"32",display:"inline",children:"\ud83c\udfc6"}),(0,r.jsx)(i.xv,{children:"Congrats! You've been hitting your goals."})]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.xv,{fontSize:"32",display:"inline",children:"\ud83d\udcaa"}),(0,r.jsx)(i.xv,{children:"Don't worry, keep trying, you'll get there."})]})}),(0,r.jsxs)(i.kC,{mt:4,flexDirection:"column",gap:3,children:[(0,r.jsxs)(i.xu,{children:[(0,r.jsx)(i.xv,{fontSize:14,children:"Average"}),(0,r.jsx)(u.Z,{nutrition:b,showLegend:!0,border:!1})]}),(0,r.jsxs)(i.xu,{children:[(0,r.jsx)(i.xv,{fontSize:14,children:"Goal"}),(0,r.jsx)(u.Z,{nutrition:t.nutrition,showLegend:!0,border:!1})]})]})]})]})}p.pageTitle="Journal";var h=(0,l.memo)((function(e){var n=e.macrosForLogs,t=e.goal,o=e.selectedMacro;return(0,r.jsx)(i.kC,{justify:"space-between",align:"flex-end",height:200,width:"95%",children:n.map((function(e){var n=e.nutrition,a=e.dateKey,l=n[o]/t.nutrition[o];return(0,r.jsx)(s(),{href:"/?date=".concat(a),children:(0,r.jsxs)(i.xu,{display:"flex",alignItems:"flex-end",justifyContent:"space-between",w:"100%",position:"relative",children:[(0,r.jsx)(i.xu,{bg:d.MT[o],w:"3",h:Math.min(200*l,250)},a),(0,r.jsxs)(i.xv,{fontSize:"xs",position:"absolute",bottom:-5,left:-2,children:[(0,m._x)(a).getDate()," ",(0,m.Bw)((0,m._x)(a).getMonth())]})]})},a)}))})}))},9534:function(e,n,t){"use strict";function r(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}t.d(n,{Z:function(){return r}})}},function(e){e.O(0,[774,888,179],(function(){return n=1398,e(e.s=n);var n}));var n=e.O();_N_E=n}]);