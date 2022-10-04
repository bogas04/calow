(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[662],{2837:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/settings",function(){return t(1963)}])},1976:function(e,n,t){"use strict";var i=t(6042),r=t(9396),s=t(5893),o=t(8641),a=t(7294),l=t(2780);function c(e){var n=e.nutrition,t=e.border,a=void 0===t||t,c=e.showLegend,d=void 0===c?!a:c;return(0,s.jsx)(o.rj,(0,r.Z)((0,i.Z)({gridTemplateColumns:"repeat(4, auto)",gridGap:a?4:6},a?{boxShadow:"md",borderRadius:50,p:4,px:d&&a?6:4}:{}),{children:l.$I.map((function(e,t){var i=n[e];return(0,s.jsxs)(o.kC,{direction:"column",textTransform:"capitalize",justify:"center",align:"flex-start",children:[(0,s.jsxs)(o.xv,{color:l.MT[e],fontWeight:"600",fontSize:"xs",children:[Number.isInteger(i)?i:i.toFixed(2),l.sw[e]]}),d&&(0,s.jsx)(o.xv,{fontSize:"xs",children:l.S$[e]})]},t)}))}))}n.Z=(0,a.memo)(c)},7647:function(e,n,t){"use strict";t.d(n,{T:function(){return l}});var i=t(6042),r=t(9396),s=t(9534),o=t(5893),a=t(8641),l=function(e){var n=e.heading,t=e.children,l=(0,s.Z)(e,["heading","children"]);return(0,o.jsxs)(a.xu,(0,r.Z)((0,i.Z)({py:["2","6","12"],px:["4","16","32"]},l),{children:[n&&"string"===typeof n?(0,o.jsx)(a.X6,{my:"6",children:n}):n,t]}))}},1963:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return I}});var i=t(7568),r=t(9534),s=t(655),o=t(5893),a=t(3382),l=t(8641),c=t(7741),d=t(3234),u=t(1197),h=t(4373),x=t(7026),f=t(2198),m=t(979),j=t(7294),g=t(3990),p=t(8561);function y(e){var n=e.metrics,t=e.onChange;return(0,o.jsxs)("form",{onSubmit:function(e){e.preventDefault();var n=e.currentTarget,i=n.activity.value,r=n.gender.value,s=n.age.value,o=n.weight.value,a=n.height.value;t({activity:i,gender:r,age:s,weight:o,height:a})},children:[(0,o.jsxs)(d.NI,{px:1,as:"fieldset",display:"flex",flexDirection:"column",justifyContent:"space-between",my:"2",children:[(0,o.jsx)(d.lX,{as:"legend",children:"Gender"}),(0,o.jsxs)(p.Ee,{display:"flex",justifyContent:"space-between",name:"gender",defaultValue:n.gender,children:[(0,o.jsx)(p.Y8,{name:"gender",value:"female",children:"\ud83d\ude4d\u200d\u2640\ufe0f Female"}),(0,o.jsx)(p.Y8,{name:"gender",value:"male",children:"\ud83d\ude4d\u200d\u2642\ufe0f Male"})]})]}),(0,o.jsxs)(d.NI,{my:"2",px:1,children:[(0,o.jsx)(d.lX,{children:"Age"}),(0,o.jsx)(m.II,{inputMode:"numeric",defaultValue:n.age||void 0,placeholder:"Age in years",name:"age",isRequired:!0})]}),(0,o.jsxs)(l.rj,{my:"2",templateColumns:"repeat(2,1fr)",gap:1,px:1,children:[(0,o.jsxs)(d.NI,{children:[(0,o.jsx)(d.lX,{children:"Height"}),(0,o.jsx)(m.II,{defaultValue:n.height||void 0,inputMode:"numeric",placeholder:"Height in centimeters",isRequired:!0,name:"height"})]}),(0,o.jsxs)(d.NI,{children:[(0,o.jsx)(d.lX,{children:"Weight"}),(0,o.jsx)(m.II,{inputMode:"numeric",defaultValue:n.weight||void 0,placeholder:"Weight in kilograms",isRequired:!0,name:"weight"})]})]}),(0,o.jsxs)(d.NI,{my:"2",px:1,children:[(0,o.jsx)(d.lX,{children:"Activity"}),(0,o.jsxs)(x.Ph,{name:"activity",isRequired:!0,defaultValue:n.activity||void 0,placeholder:"Select your daily activity",children:[(0,o.jsx)("option",{value:"1.2",children:"Little to no exercise"}),(0,o.jsx)("option",{value:"1.375",children:"Light exercise (1-3 days per week)"}),(0,o.jsx)("option",{value:"1.55",children:"Moderate exercise (3-5 days per week)"}),(0,o.jsx)("option",{value:"1.725",children:"Heavy exercise (6-7 days per week)"}),(0,o.jsx)("option",{value:"1.9",children:"Very heavy exercise (twice per day, extra heavy workouts)"})]})]}),(0,o.jsx)(l.xu,{px:1,pt:6,children:(0,o.jsx)(c.zx,{type:"submit",children:"Calculate"})})]})}var v=(0,j.memo)(y),w=t(7647),b=t(1976),C=t(2780),k=t(100),S=t(3437),E=function(e){return 10*Math.floor(e/10)};function I(){var e=(0,C.oR)(),n=e.dispatch,t=(0,r.Z)(e,["dispatch"]),p=(0,j.useState)(!1),y=p[0],I=p[1],z=(0,j.useState)(!1),N=z[0],T=z[1],O=(0,j.useState)(),R=O[0],_=O[1],X=(0,j.useState)(),L=X[0],U=X[1],Y=(0,j.useState)(!0),M=Y[0],V=Y[1],Z=t.body,D=t.goal,A=t.logs,W=(0,j.useMemo)((function(){return(0,S.kE)(Z)}),[Z]),q=W.bmr,P=W.caloricNeeds,Q=Object.keys(A).length;(0,j.useEffect)((function(){var e=null!==R&&void 0!==R?R:D.nutrition.calories,t=null!==L&&void 0!==L?L:D.diet;n({type:C.aO.SET_GOAL,payload:{nutrition:(0,S.Uq)(e,S.E5[t].macros),diet:t}})}),[R,L]);var F=function(e,n){var t="You've set a goal within the limits of your maintenance needs. You would continue to have same weight if you maintain your lifestyle.",i="gray.500",r="maintenance",s=50;e<n-s?(t="You've set a goal lower than your maintenance needs. You would lose weight if you continue to stay calorie deficit.",i="red.500",r="deficit"):e>n+s&&(t="You've set a goal higher than your maintenance needs. You would gain weight if you continue to stay calorie surplus.",i="green.500",r="surplus");return{description:t,color:i,text:r}}(D.nutrition.calories||P.calories,P.calories),G=L||D.diet,H=0!==P.calories||!!Z.height||!!Z.weight;return(0,o.jsxs)(w.T,{heading:"Settings",children:[(0,o.jsxs)(l.xu,{mb:"12",as:"section",children:[(0,o.jsxs)(l.X6,{size:"lg",mb:"4",display:"flex",justifyContent:"space-between",alignItems:"center",children:["Maintenance Needs",H&&(0,o.jsx)(c.hU,{isRound:!0,variant:"ghost","aria-label":y?"Collapse":"Expand",onClick:function(){return I(!y)},icon:y?(0,o.jsx)(a.g8,{}):(0,o.jsx)(a.v4,{})})]}),(0,o.jsx)(d.NI,{children:(0,o.jsx)(d.Q6,{children:"These are your daily caloric needs in order to maintain your body weight, based on your body metrics."})}),(0,o.jsx)(u.UO,{in:y||!H,children:(0,o.jsx)(v,{metrics:Z,onChange:function(e){return n({type:C.aO.SET_BODY,payload:e})}})}),H&&(0,o.jsx)(l.kC,{mt:"4",align:"center",justify:["center","flex-start"],children:(0,o.jsx)(b.Z,{nutrition:P,showLegend:!0,border:!1})})]}),H&&(0,o.jsxs)(l.xu,{mb:"12",as:"section",children:[(0,o.jsxs)(l.X6,{size:"lg",my:"4",justifyContent:"space-between",alignItems:"center",display:"flex",children:["Your Goal",(0,o.jsx)(h.Vp,{size:"sm",textTransform:"uppercase",color:F.color,children:F.text})]}),(0,o.jsx)(l.xv,{fontSize:"sm",children:F.description}),(0,o.jsxs)(d.NI,{mt:4,mb:4,children:[(0,o.jsxs)(d.lX,{fontSize:"md",display:"flex",alignItems:"center",pr:"0",mt:"2",justifyContent:"space-between",children:[(0,o.jsx)(l.xv,{fontWeight:"bold",children:"Water"}),(0,o.jsxs)(l.xv,{children:[D.water," mL"]})]}),(0,o.jsxs)(d.Q6,{children:["For ",Z.gender,"s, recommended water intake (excluding water content of foods) is ",D.water," mL"]})]}),(0,o.jsxs)(d.NI,{my:4,children:[(0,o.jsxs)(l.kC,{justify:"space-between",align:"center",children:[(0,o.jsx)(d.lX,{fontSize:"md",mt:"2",flex:.4,fontWeight:"bold",children:"Diet"}),(0,o.jsx)(x.Ph,{size:"sm",variant:"flushed",width:"auto",onChange:function(e){return U(e.currentTarget.value)},defaultValue:G,children:Object.keys(S.E5).map((function(e){return(0,o.jsx)(l.xu,{as:"option",value:e,children:S.E5[e].name})}))})]}),(0,o.jsx)(d.Q6,{my:2,children:S.E5[G].description}),(0,o.jsx)(d.Q6,{children:(0,o.jsx)(l.xu,{children:Object.keys(S.E5[G].macros).map((function(e,n,t){return"".concat((i=e,i.charAt(0).toUpperCase()+i.slice(1))," - ").concat(100*S.E5[G].macros[e],"% ").concat(n!==t.length-1?" \xb7 ":"");var i}))})})]}),(0,o.jsx)(d.NI,{my:4,children:(0,o.jsxs)(d.lX,{display:"flex",alignItems:"center",pr:"0",mt:"2",justifyContent:"space-between",children:[(0,o.jsx)(l.xv,{fontSize:"md",textTransform:"capitalize",fontWeight:"bold",children:"Calories"}),(0,o.jsx)(l.xu,{fontSize:"sm",children:(0,o.jsx)(c.zx,{onClick:function(){return V(!M)},size:"sm",variant:M?"ghost":"solid",colorScheme:M?void 0:"green",children:M?"Edit":"Done"})})]})}),(0,o.jsx)(u.UO,{in:!M,children:(0,o.jsx)(l.xu,{py:2,children:(0,o.jsxs)(f.iR,{step:10,defaultValue:D.nutrition.calories||P.calories,value:R,onChange:_,isDisabled:M,min:E(1.05*q),max:E(2*P.calories-q),children:[(0,o.jsx)(f.Uj,{children:(0,o.jsx)(f.Ms,{bg:F.color})}),(0,o.jsx)(f.gs,{boxSize:6,bg:F.color,children:(0,o.jsx)(g.VcR,{color:"white",size:"12"})})]})})}),(0,o.jsx)(l.kC,{mt:"4",justify:["center","flex-start"],align:"center",children:(0,o.jsx)(b.Z,{nutrition:D.nutrition,showLegend:!0,border:!1})})]}),(0,o.jsxs)(l.xu,{mb:"12",as:"section",children:[(0,o.jsxs)(l.X6,{size:"lg",display:"flex",my:"4",justifyContent:"space-between",alignItems:"center",children:["Your Data",(0,o.jsx)(c.hU,{isRound:!0,variant:"ghost","aria-label":N?"Collapse":"Expand",onClick:function(){return T(!N)},icon:N?(0,o.jsx)(a.g8,{}):(0,o.jsx)(a.v4,{})})]}),(0,o.jsx)(d.NI,{children:(0,o.jsx)(d.Q6,{mb:"6",children:"All your data is stored locally on your device."})}),(0,o.jsx)(u.UO,{in:N,children:(0,o.jsxs)(l.kC,{direction:["column","row"],children:[(0,o.jsxs)(c.zx,{my:"2",colorScheme:"blue",mr:[0,"2"],onClick:function(){var e=URL.createObjectURL(new Blob([JSON.stringify(t)],{type:"application/json"})),n=document.createElement("a");n.href=e,n.download="my-calow-data.json",document.body.appendChild(n),n.click(),document.body.removeChild(n),window.URL.revokeObjectURL(e)},children:["Export as ",(0,o.jsx)(l.EK,{variant:"ghost",children:".json"})]}),(0,o.jsxs)(c.zx,{colorScheme:"teal",onClick:function(){var e;return null===(e=document.querySelector("#import-file-input"))||void 0===e?void 0:e.click()},children:["Import from ",(0,o.jsx)(l.EK,{variant:"ghost",children:".json"})]}),(0,o.jsx)(m.II,{hidden:!0,id:"import-file-input",type:"file",accept:".json",onChange:function(){var e=(0,i.Z)((function(e){var t,i,r,o,a;return(0,s.__generator)(this,(function(s){switch(s.label){case 0:return s.trys.push([0,4,,5]),e.target&&e.target.files?[4,(0,k.p)(null===(t=e.target)||void 0===t||null===(i=t.files)||void 0===i?void 0:i[0])]:[3,2];case 1:if(r=s.sent(),!(o=JSON.parse(r)).goal||!o.body||!o.logs)throw new Error("Invalid file");return n({type:C.aO.SET,payload:{goal:o.goal,logs:o.logs,body:o.body,bookmarks:o.bookmarks}}),alert("Successfully imported!"),[3,3];case 2:throw new Error("No file selected");case 3:return[3,5];case 4:return a=s.sent(),alert(a.message),[3,5];case 5:return[2]}}))}));return function(n){return e.apply(this,arguments)}}()}),(0,o.jsx)(c.zx,{my:"2",ml:[0,"2"],variant:"solid",colorScheme:"red",onClick:function(){window.confirm("Are you sure? You'll lose data of ".concat(Q," day").concat(1===Q?"":"s","."))&&n({type:C.aO.RESET})},children:"Delete My Data"})]})})]})]})}I.pageTitle="Settings"},100:function(e,n,t){"use strict";function i(e,n){var t=e.currentTarget.closest("[data-".concat(n,"]"));return t?t.dataset[n]:null}function r(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"utf-8";return new Promise((function(t,i){var r=new FileReader;r.onload=function(e){var n;t(null===(n=e.target)||void 0===n?void 0:n.result)},r.onerror=function(){i(r.error),r.abort()},r.readAsText(e,n)}))}t.d(n,{p:function(){return r},x:function(){return i}})}},function(e){e.O(0,[609,177,338,774,888,179],(function(){return n=2837,e(e.s=n);var n}));var n=e.O();_N_E=n}]);