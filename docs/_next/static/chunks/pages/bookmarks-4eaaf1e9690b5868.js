(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[664],{2003:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/bookmarks",function(){return t(8627)}])},8627:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return f}});var a=t(4924),r=t(5893),o=t(8641),i=t(3234),u=t(979),s=t(7294),d=t(7647),c=t(5792),l=t(2780),m=t(100),h=t(1163),p=t(4221);function f(){var e=(0,s.useState)(""),n=e[0],t=e[1],m=(0,l.oR)(),f=m.logs,_=m.dispatch,v=m.bookmarks,E=(0,h.useRouter)(),g=function(e){var n=x(e),t=w[n],a=t.date,r=t.index;_({type:l.aO.REMOVE_BOOKMARK,payload:{date:a,index:r}})},j=function(e){var n=x(e),t=w[n].meal;_({type:l.aO.SET_MEAL_ENTRY_ITEMS,payload:{name:t.name,addedItems:t.items,totalWeight:t.totalWeight,portionWeight:t.portionWeight}}),E.push("/meal-entry")},w=(0,s.useMemo)((function(){var e=v.map((function(e){return{date:e.date,index:e.index,meal:f[e.date][e.index]}})),t=new p.Z(e,{keys:["meal.name"],threshold:.25});return""===n.trim()?e:t.search(n.trim()).map((function(e){return e.item}))}),[n,v]);return(0,r.jsxs)(d.T,{heading:"Your Bookmarks",children:[(0,r.jsx)(o.rj,{as:"form",templateColumns:"auto",gap:2,alignItems:"end",onSubmit:function(e){return e.preventDefault()},children:(0,r.jsxs)(i.NI,{children:[(0,r.jsx)(i.lX,{htmlFor:"search",children:"Search bookmarks"}),(0,r.jsx)(u.II,{id:"search",value:n,placeholder:"Search",type:"search",onChange:function(e){t(e.currentTarget.value)}})]})}),(0,r.jsx)(o.xu,{mt:"4",children:w.map((function(e,n){var t,i=e.meal,u=(e.index,e.date);return(0,r.jsx)(o.xu,(t={},(0,a.Z)(t,"data-".concat(k),n),(0,a.Z)(t,"children",(0,r.jsx)(c.Z,{meal:i,onRepeat:j,onBookmark:g,bookmarked:!0})),t),"".concat(u,"-").concat(n))}))})]})}f.pageTitle="Bookmarks";var k="mealindex";function x(e){var n=(0,m.x)(e,k);if(null===n||void 0===n)throw new Error("This shouldn't have happened.\nCouldn't find proper meal position.");return Number(n)}}},function(e){e.O(0,[13,177,826,679,368,341,774,888,179],(function(){return n=2003,e(e.s=n);var n}));var n=e.O();_N_E=n}]);