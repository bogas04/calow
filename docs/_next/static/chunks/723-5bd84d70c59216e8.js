"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[723],{4175:function(e,n,i){var t=i(828),r=i(5893),o=i(3826),s=i(8641),l=i(7741),a=i(5868),c=i(7294),u=i(1976);function d(e){var n,i,c=e.item,d=e.isOpen,h=e.hideWeight,x=void 0!==h&&h,m=e.onClose,j=0!==Object.keys(null!==(n=c.micro)&&void 0!==n?n:{}).length;return(0,r.jsxs)(o.u_,{isOpen:d,onClose:m,size:"full",scrollBehavior:"inside",children:[(0,r.jsx)(o.ZA,{}),(0,r.jsxs)(o.hz,{pb:5,children:[(0,r.jsx)(o.xB,{children:(0,r.jsxs)(s.kC,{align:"center",justify:"space-between",children:[c.name," ",x?"":"(".concat(c.weight,"g)"),(0,r.jsx)(l.hU,{"aria-label":"close",rounded:"full",icon:(0,r.jsx)(a.P,{}),variant:"ghost",onClick:m})]})}),(0,r.jsxs)(o.fe,{children:[(0,r.jsx)(u.Z,{nutrition:c.nutrition,border:!1}),j&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.xv,{size:"lg",fontWeight:"600",mt:"5",mb:"2",children:"Micro Nutrients (in grams):"}),Object.entries(null!==(i=c.micro)&&void 0!==i?i:{}).map((function(e){var n=(0,t.Z)(e,2),i=n[0],o=n[1];return(0,r.jsxs)(s.kC,{justify:"space-between",align:"center",my:"1",children:[(0,r.jsx)(s.xv,{textTransform:"capitalize",fontWeight:"400",children:i}),(0,r.jsx)(s.xv,{children:Number(o*c.weight/100).toFixed(2)})]},i)}))]})]})]})]})}n.Z=(0,c.memo)(d)},6917:function(e,n,i){var t=i(6042),r=i(9396),o=i(9534),s=i(5893),l=i(1664),a=i.n(l),c=i(8641),u=i(7741),d=i(7294),h=i(1976),x=i(3750),m=i(4175);function j(e){var n=e.item,i=e.size,l=void 0===i?"lg":i,j=(0,o.Z)(e,["item","size"]),f=(0,d.useState)(!1),g=f[0],p=f[1];return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(c.xu,(0,r.Z)((0,t.Z)({borderWidth:"1px",borderStyle:"solid",borderColor:"gray.200",borderRadius:8,my:"sm"===l?3:5,p:"sm"===l?3:5},j),{children:[(0,s.jsx)(c.kC,{mb:"sm"===l?2:4,justify:"space-between",children:(0,s.jsx)(c.X6,{size:"sm"===l?"sm":"md",children:(0,s.jsx)(a(),{href:"/items?search=".concat(n.name),children:(0,s.jsxs)("a",{children:[(0,s.jsx)(c.xu,{as:"span",mx:"sm"===l?0:2,children:n.icon||"\ud83c\udf5b"})," ",n.name]})})})}),(0,s.jsxs)(c.kC,{justify:"space-between",align:"flex-start",children:[(0,s.jsx)(h.Z,{border:!1,nutrition:n.nutrition}),n.micro&&(0,s.jsx)(u.hU,{variant:"ghost",rounded:"full",color:"gray.500",icon:(0,s.jsx)(x.evw,{}),"aria-label":"Micronutrients",onClick:function(){return p(!0)}})]}),(0,s.jsxs)(c.xv,{mt:"2",fontSize:"xs",color:"gray.600",fontWeight:"300",children:[n.weight,"g"]})]})),(0,s.jsx)(m.Z,{item:n,onClose:function(){return p(!1)},isOpen:g})]})}n.Z=(0,d.memo)(j)},196:function(e,n,i){i.d(n,{Z:function(){return k}});var t=i(5893),r=i(3382),o=i(8641),s=i(7741),l=i(5679),a=i(1197),c=i(7294),u=i(7516),d=i(3750),h=i(3437),x=i(5385),m=i(4175),j=i(6917),f=i(1976),g=i(4221),p=i(3826),v=i(979),b=(0,c.memo)((function(e){var n,i,l=e.isOpen,a=e.onClose,u=e.meal,d=(0,g.pm)(),h=(0,c.useMemo)((function(){var e;if(!l)return"";var n={name:u.name,timestamp:Date.now(),items:u.items,totalWeight:u.totalWeight,portionWeight:u.portionWeight,nutrition:u.nutrition,micro:u.micro,water:u.water},i=(null===(e=document.querySelector('meta[property="og:url"'))||void 0===e?void 0:e.getAttribute("content"))||"https://bogas04.github.io/calow/";return"".concat(i,"meal-entry?shared_meal=").concat(encodeURIComponent(JSON.stringify(n)))}),[l,u]),x=(0,c.useCallback)((function(){var e,n,i=function(){return d({title:"Oops!",description:"We couldn't share the link at this moment",status:"error",duration:5e3,isClosable:!0})};(null===window||void 0===window||null===(e=window.navigator)||void 0===e||null===(n=e.share)||void 0===n?void 0:n.call(e,{title:u.name,url:h}).catch((function(){i()})))||i()}),[h,u.name,d]),m=(0,c.useCallback)((function(){window.navigator.clipboard.writeText(h).then((function(){d({title:"Copied!",description:"The shareable link is now in your clipboard",status:"success",duration:5e3,isClosable:!0})})).catch((function(){d({title:"Opps!",description:"We couldn't copy the link to your clipboard",status:"error",duration:5e3,isClosable:!0})}))}),[h,d]),j=(null===window||void 0===window||null===(n=window.navigator)||void 0===n||null===(i=n.canShare)||void 0===i?void 0:i.call(n))||"function"===typeof(null===window||void 0===window?void 0:window.navigator.share);return(0,t.jsxs)(p.u_,{isOpen:l,onClose:a,isCentered:!0,scrollBehavior:"outside",motionPreset:"slideInBottom",children:[(0,t.jsx)(p.ZA,{height:"100vh"}),(0,t.jsxs)(p.hz,{position:"fixed",bottom:"0px",mb:"0",borderRadius:"1.75rem 1.75rem 0px 0px",minW:["100vw","lg"],children:[(0,t.jsx)(p.xB,{mt:"2",children:"Share Meal"}),(0,t.jsx)(p.ol,{mt:"2"}),(0,t.jsxs)(p.fe,{pb:"5",children:[(0,t.jsx)(o.xv,{children:"Here's a link you can share with your buddy who wants to add this meal to their log."}),(0,t.jsxs)(v.BZ,{my:"4",children:[(0,t.jsx)(v.II,{type:"text",defaultValue:h,disabled:!0}),(0,t.jsx)(v.xW,{px:0,mx:0,bg:"gray.50",children:(0,t.jsx)(s.hU,{icon:(0,t.jsx)(r.TI,{}),variant:"flushed",onClick:m,"aria-label":"Copy Link"})})]}),j?(0,t.jsx)(s.zx,{w:"full",onClick:x,bg:"blue.500",color:"white",size:"lg",children:"Share"}):null]})]})]})}));function w(e){var n=e.meal,i=e.onRepeat,g=e.onDelete,p=e.onEdit,v=e.onBookmark,w=e.bookmarked,k=(0,c.useState)(!1),C=k[0],y=k[1],W=(0,c.useState)(!1),Z=W[0],z=W[1],S=(0,c.useState)(!1),O=S[0],N=S[1],T=(0,c.useCallback)((function(){return z(!1)}),[]),B=(0,c.useCallback)((function(){return z(!0)}),[]),R=(0,c.useCallback)((function(){return N(!1)}),[]),U=(0,c.useCallback)((function(){return N(!0)}),[]);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(o.kC,{justify:"space-between",align:"center",mb:"2",children:[(0,t.jsx)(o.X6,{size:"md",children:n.name}),(0,t.jsxs)(o.kC,{justify:"flex-end",align:"center",children:[(0,t.jsx)(s.hU,{isRound:!0,size:"sm",variant:"ghost","aria-label":C?"Hide Details":"Show Details",onClick:function(){return y(!C)},icon:C?(0,t.jsx)(r.g8,{}):(0,t.jsx)(r.v4,{})}),(0,t.jsxs)(l.v2,{children:[(0,t.jsx)(l.j2,{as:s.hU,icon:(0,t.jsx)(d.FQA,{}),"aria-label":"Options",variant:"ghost",size:"sm",rounded:"full"}),(0,t.jsxs)(l.qy,{minW:10,children:[p&&(0,t.jsxs)(l.sN,{onClick:p,children:[(0,t.jsx)(r.dY,{mr:2}),"Edit"]}),g&&(0,t.jsxs)(l.sN,{onClick:g,children:[(0,t.jsx)(r.pJ,{mr:2}),"Delete"]}),(0,t.jsxs)(l.sN,{onClick:U,children:[(0,t.jsx)(r.xP,{mr:2}),"Share"]}),i&&(0,t.jsxs)(l.sN,{onClick:i,children:[(0,t.jsx)(r.Ay,{mr:2}),"Repeat"]}),v&&(0,t.jsxs)(l.sN,{onClick:v,children:[(0,t.jsx)(o.xu,{mr:2,children:w?(0,t.jsx)(u.enf,{}):(0,t.jsx)(u.XiH,{})}),w?"Remove Bookmark":"Add Bookmark"]})]})]})]})]}),(0,t.jsxs)(o.kC,{justify:"space-between",align:"flex-start",children:[(0,t.jsx)(f.Z,{nutrition:n.nutrition,border:!1}),(0,t.jsx)(s.hU,{variant:"ghost",rounded:"full",color:"gray.500",icon:(0,t.jsx)(d.evw,{}),"aria-label":"Micronutrients",onClick:B})]}),(0,t.jsxs)(o.kC,{align:"center",flex:"1",mt:"2",mb:"6",children:[(0,t.jsx)(o.xv,{fontSize:"xs",color:"gray.600",fontWeight:"300",children:n.portionWeight===n.totalWeight?"".concat(n.totalWeight,"g"):"".concat(n.portionWeight,"g / ").concat(n.totalWeight,"g")}),(0,t.jsx)(o.xu,{w:"1px",h:"20px",bg:"gray.500",mx:"2"}),(0,t.jsx)(o.xv,{fontSize:"xs",color:"gray.600",fontWeight:"300",children:(0,x.FU)(n.timestamp)})]}),(0,t.jsx)(a.UO,{in:C,children:(0,t.jsxs)(o.xu,{pl:"4",children:[(0,t.jsx)(j.Z,{size:"sm",item:{name:"Nutritional Value / 100 grams",weight:100,nutrition:(0,h.Q_)(n.nutrition,(function(e,i){return 100*i/n.portionWeight}))},bg:"blue.50",rounded:"md"}),n.items.map((function(e,n){return(0,t.jsx)(j.Z,{item:e,size:"sm"},n)}))]})}),(0,t.jsx)(m.Z,{hideWeight:!0,item:{name:n.name,nutrition:n.nutrition,micro:n.micro,weight:100},onClose:T,isOpen:Z}),(0,t.jsx)(b,{isOpen:O,onClose:R,meal:n})]})}var k=(0,c.memo)(w)},1976:function(e,n,i){var t=i(6042),r=i(9396),o=i(5893),s=i(8641),l=i(7294),a=i(2780);function c(e){var n=e.nutrition,i=e.border,l=void 0===i||i,c=e.showLegend,u=void 0===c?!l:c;return(0,o.jsx)(s.rj,(0,r.Z)((0,t.Z)({gridTemplateColumns:"repeat(4, auto)",gridGap:l?4:6},l?{boxShadow:"md",borderRadius:50,p:4,px:u&&l?6:4}:{}),{children:a.$I.map((function(e,i){var t=n[e];return(0,o.jsxs)(s.kC,{direction:"column",textTransform:"capitalize",justify:"center",align:"flex-start",children:[(0,o.jsxs)(s.xv,{color:a.MT[e],fontWeight:"600",fontSize:"xs",children:[Number.isInteger(t)?t:t.toFixed(2),a.sw[e]]}),u&&(0,o.jsx)(s.xv,{fontSize:"xs",children:a.S$[e]})]},i)}))}))}n.Z=(0,l.memo)(c)},7647:function(e,n,i){i.d(n,{T:function(){return a}});var t=i(6042),r=i(9396),o=i(9534),s=i(5893),l=i(8641),a=function(e){var n=e.heading,i=e.children,a=(0,o.Z)(e,["heading","children"]);return(0,s.jsxs)(l.xu,(0,r.Z)((0,t.Z)({py:["2","6","12"],px:["4","16","32"]},a),{children:[n&&"string"===typeof n?(0,s.jsx)(l.X6,{my:"6",children:n}):n,i]}))}},100:function(e,n,i){function t(e,n){var i=e.currentTarget.closest("[data-".concat(n,"]"));return i?i.dataset[n]:null}function r(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"utf-8";return new Promise((function(i,t){var r=new FileReader;r.onload=function(e){var n;i(null===(n=e.target)||void 0===n?void 0:n.result)},r.onerror=function(){t(r.error),r.abort()},r.readAsText(e,n)}))}i.d(n,{p:function(){return r},x:function(){return t}})}}]);