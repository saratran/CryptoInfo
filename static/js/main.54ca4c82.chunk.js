(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{100:function(e,t,n){},159:function(e,t,n){},165:function(e,t,n){"use strict";n.r(t);var a=n(237),r=n(0),c=n.n(r),i=n(42),o=n.n(i),s=n(44),l=(n(91),n(16)),u=n(29),j=n(26),d=n.n(j),h=n(17),p=n(56),b=n(13),m=n(109),O=n.n(m),f=n(31),g=n(224),x=n(226),y=n(233),v=n(234),C=n(81),S=n.n(C),w=n(82),k=S.a.create({baseURL:"https://api.coingecko.com/api/v3",headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Credentials":"true"}});Object(w.a)(S.a.create(),{retries:2,retryDelay:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=1e3*Math.pow(2,e),n=1e3*Math.random();return t+n},retryCondition:w.a.isRetryableError});var N=function(){var e=Object(p.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",k.get("/coins/list").then((function(e){return e.data})).catch((function(e){throw e})));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),_=function(){var e=Object(p.a)(d.a.mark((function e(){var t,n,a=arguments;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=a.length>0&&void 0!==a[0]?a[0]:1,n=a.length>1&&void 0!==a[1]?a[1]:[],e.abrupt("return",k.get("/coins/markets",{params:{vs_currency:"usd",page:t,ids:n.join(",")}}).then((function(e){return e.data})).catch((function(e){throw e})));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),L=n(3),R=n(111),E=n(225),P=n(222),T=n(220),F=n(218),A=n(5),I=n(219),U=n(14),z=n(221),D=n(112),W=(n(100),n(2)),B=Object(z.a)({root:{padding:20},autoComplete:{maxWidth:800},applyButton:{marginTop:20}});function M(e){var t=e.data,n=e.index,a=e.style,r=t[n],c=Object(u.a)(Object(u.a)({},a),{},{top:a.top+8});return Object(W.jsx)(g.a,Object(u.a)(Object(u.a)({component:"li"},r[0]),{},{noWrap:!0,style:c,children:r[1].name}))}var H=c.a.createContext({}),J=c.a.forwardRef((function(e,t){var n=c.a.useContext(H);return Object(W.jsx)("div",Object(u.a)(Object(u.a)({ref:t},e),n))}));var $=c.a.forwardRef((function(e,t){var n=e.children,a=Object(R.a)(e,["children"]),r=[];n.forEach((function(e){r.push(e),r.push.apply(r,Object(h.a)(e.children||[]))}));var i=Object(f.a)(),o=Object(F.a)(i.breakpoints.up("sm"),{noSsr:!0}),s=r.length,l=o?36:48,u=function(e){return e.hasOwnProperty("group")?48:l},j=function(e){var t=c.a.useRef(null);return c.a.useEffect((function(){null!=t.current&&t.current.resetAfterIndex(0,!0)}),[e]),t}(s);return Object(W.jsx)("div",{ref:t,children:Object(W.jsx)(H.Provider,{value:a,children:Object(W.jsx)(D.a,{itemData:r,height:(s>8?8*l:r.map(u).reduce((function(e,t){return e+t}),0))+16,width:"100%",ref:j,outerElementType:J,innerElementType:"ul",itemSize:function(e){return u(r[e])},overscanCount:5,itemCount:s,children:M})})})})),q=Object(A.a)(I.a)(Object(L.a)({},"& .".concat(U.a.listbox),{boxSizing:"border-box","& ul":{padding:0,margin:0}})),G=function(e){var t=e.coins,n=e.isLoadingCoins,a=e.handleFilterApply,c=B(),i=Object(r.useState)([]),o=Object(b.a)(i,2),s=o[0],l=o[1];return Object(W.jsxs)(E.a,{className:c.root,children:[Object(W.jsx)(P.a,{className:c.autoComplete,multiple:!0,"data-testid":"coin-names-input",options:t,filterSelectedOptions:!0,getOptionLabel:function(e){return e.name},isOptionEqualToValue:function(e,t){return e.id===t.id},onChange:function(e,t){t&&l(t.map((function(e){return e.id})))},loading:n,disableListWrap:!0,PopperComponent:q,ListboxComponent:$,renderOption:function(e,t){return[e,t]},renderGroup:function(e){return e},renderInput:function(e){return Object(W.jsx)(T.a,Object(u.a)(Object(u.a)({},e),{},{variant:"standard",label:"Coin names",placeholder:"e.g. bitcoin"}))}}),Object(W.jsx)(x.a,{className:c.applyButton,variant:"contained",color:"primary",onClick:function(){return a(s)},children:"Apply"})]})},V=n(227),K=n(228),Q=n(229),X=n(230),Y=n(231),Z=n(232),ee=Object(z.a)({root:{marginTop:20,marginBottom:20},row:{height:40},headerRow:{},headerCell:{fontWeight:"bold"},cell:{},expandingCell:{},column:{}}),te=function(e){var t=e.coins,n=ee();return Object(W.jsx)("div",{className:n.root,children:Object(W.jsx)(V.a,{component:E.a,children:Object(W.jsxs)(K.a,{stickyHeader:!0,children:[Object(W.jsx)(Q.a,{component:E.a,children:Object(W.jsxs)(X.a,{className:n.headerRow,children:[Object(W.jsx)(Y.a,{className:n.headerCell,width:4,children:"Rank"}),Object(W.jsx)(Y.a,{className:n.headerCell,align:"left",width:200,children:"Name"}),Object(W.jsx)(Y.a,{className:n.headerCell,align:"left",children:"Symbol"}),Object(W.jsx)(Y.a,{className:n.headerCell,align:"right",children:"Current Price (USD)"}),Object(W.jsx)(Y.a,{className:n.headerCell,align:"right",children:"Market Cap (USD)"}),Object(W.jsx)(Y.a,{className:n.headerCell,align:"right",children:"Circulating Supply"}),Object(W.jsx)(Y.a,{className:n.headerCell,align:"right",children:"%24h"})]})}),Object(W.jsx)(Z.a,{children:t.map((function(e,t){return Object(W.jsxs)(X.a,{className:n.row,children:[Object(W.jsx)(Y.a,{scope:"row",component:"th",style:{height:"100%"},className:n.headerCell,children:e.market_cap_rank}),Object(W.jsxs)(Y.a,{children:[Object(W.jsx)("img",{src:e.image,alt:"".concat(e.name," icon"),style:{height:20,width:20,marginRight:10}}),e.name]}),Object(W.jsx)(Y.a,{align:"left",children:e.symbol.toUpperCase()}),Object(W.jsx)(Y.a,{align:"right",children:e.current_price&&"$".concat(e.current_price.toLocaleString())}),Object(W.jsx)(Y.a,{align:"right",children:e.market_cap&&"$".concat(e.market_cap.toLocaleString())}),Object(W.jsx)(Y.a,{align:"right",children:e.circulating_supply&&"".concat(e.circulating_supply.toLocaleString()," ").concat(e.symbol.toUpperCase())}),Object(W.jsx)(Y.a,{align:"right",style:{color:e.price_change_percentage_24h&&e.price_change_percentage_24h<0?"red":"green"},children:e.price_change_percentage_24h&&"".concat(e.price_change_percentage_24h.toFixed(3),"%")})]},t)}))})]})})})},ne=function(){var e=Object(f.a)();return Object(W.jsx)("div",{className:"top-bar",children:Object(W.jsx)("nav",{children:Object(W.jsx)("div",{className:"links",children:re.map((function(t,n){return Object(W.jsxs)(s.c,{exact:!0,to:t.pathname,className:"link",activeClassName:"link-active",children:[Object(W.jsx)(g.a,{variant:"body1",children:t.title}),Object(W.jsx)("div",{className:"underline",style:{backgroundColor:e.palette.primary.main}})]},n)}))})})})},ae=(n(159),function(){return Object(W.jsxs)("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",position:"fixed",height:"100vh",left:0,right:0},children:[Object(W.jsx)(g.a,{variant:"h2",children:"404: Page not found"}),Object(W.jsx)(s.b,{to:"/",style:{textDecoration:"none",paddingTop:10},children:Object(W.jsx)(g.a,{color:"primary",children:"Return home"})})]})}),re=[{pathname:"/",component:function(){var e=Object(f.a)(),t=Object(r.useState)([]),n=Object(b.a)(t,2),a=n[0],c=n[1],i=Object(r.useState)({isLoading:!1,error:!1}),o=Object(b.a)(i,2),s=o[0],l=o[1],j=Object(r.useState)(!1),m=Object(b.a)(j,2),C=m[0],S=m[1],w=Object(r.useState)([]),k=Object(b.a)(w,2),L=k[0],R=k[1],E=Object(r.useState)(!1),P=Object(b.a)(E,2),T=P[0],F=P[1],A=Object(r.useState)({currentPage:1,coinFilters:[]}),I=Object(b.a)(A,2),U=I[0],z=I[1],D=function(){var e=Object(p.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l({isLoading:!0,error:!1}),e.abrupt("return",_(t.currentPage,t.coinFilters).then((function(e){c((function(t){return[].concat(Object(h.a)(t),Object(h.a)(e))})),l({isLoading:!1,error:!1})})).catch((function(e){throw l({isLoading:!1,error:!0}),e})));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function B(){z((function(e){return Object(u.a)(Object(u.a)({},e),{},{currentPage:e.currentPage+1})}))}function M(){D(U)}Object(r.useEffect)((function(){D(U)}),[U]),Object(r.useEffect)((function(){F(!0),N().then((function(e){R(e.sort((function(e,t){return e.name>t.name?1:t.name>e.name?-1:0})))})).catch((function(e){console.log(e)})).finally((function(){F(!1)}))}),[]);return Object(W.jsxs)("div",{className:"main",children:[Object(W.jsx)(ne,{}),Object(W.jsx)("div",{className:"main-text",children:Object(W.jsxs)(g.a,{variant:"h1",children:[Object(W.jsx)("span",{style:{color:e.palette.secondary.main},children:"Cryptocurrency Info"})," "]})}),Object(W.jsxs)("div",{className:"main-text",children:[Object(W.jsxs)(x.a,{variant:"outlined",color:"primary",onClick:function(){S((function(e){return!e}))},children:[Object(W.jsx)(O.a,{}),Object(W.jsx)("div",{children:"Filter"})]}),Object(W.jsx)(v.a,{in:C,children:Object(W.jsx)(G,{coins:L,isLoadingCoins:T,handleFilterApply:function(e){c([]),z({currentPage:1,coinFilters:e})}})}),Object(W.jsx)(te,{coins:a}),s.error?Object(W.jsxs)("div",{style:{marginTop:30,display:"flex",flexDirection:"column",justifyContent:"center"},children:[Object(W.jsx)(g.a,{variant:"body1",align:"center",children:Object(W.jsx)("div",{children:"Something went wrong. Please try again."})}),Object(W.jsx)(x.a,{sx:{marginTop:3,marginLeft:"auto",marginRight:"auto",display:"block"},variant:"contained",color:"primary",onClick:M,children:"Retry"})]}):s.isLoading?Object(W.jsx)(y.a,{color:"secondary",sx:{marginTop:0,marginBottom:0,marginLeft:"auto",marginRight:"auto",display:"block"}}):Object(W.jsx)(W.Fragment,{children:Object(W.jsx)(x.a,{sx:{marginLeft:"auto",marginRight:"auto",display:"block"},variant:"contained",color:"primary",onClick:B,children:"Load more"})}),Object(W.jsx)(x.a,{sx:{marginTop:5,float:"right"},variant:"outlined",color:"primary",onClick:function(){window.location.reload()},children:"<- Return to top 100"})]})]})},title:"Home"}],ce=function(){return Object(W.jsxs)(l.c,{children:[re.map((function(e,t){return Object(W.jsx)(l.a,{exact:!0,path:e.pathname,component:e.component},t)})),Object(W.jsx)(l.a,{exact:!0,path:"/404",component:ae}),Object(W.jsx)(l.a,{component:ae})]})},ie=n(235),oe=n(110),se=Object(ie.a)(Object(oe.a)({palette:{primary:{main:"#4e46b4"},secondary:{main:"#ff7878"}},typography:{h1:{fontSize:60,fontWeight:800},h2:{fontSize:44,fontWeight:800},h3:{fontSize:36,fontWeight:600},body1:{fontSize:24,color:"#777777"},body2:{fontSize:14,color:"#777777"},fontFamily:["Nunito","-apple-system","BlinkMacSystemFont",'"Segoe UI"',"Roboto",'"Helvetica Neue"',"Arial","sans-serif",'"Apple Color Emoji"','"Segoe UI Emoji"','"Segoe UI Symbol"'].join(",")}}));n(162).config(),o.a.render(Object(W.jsxs)(c.a.StrictMode,{children:[Object(W.jsx)(a.a,{theme:se,children:Object(W.jsx)(s.a,{basename:"/CryptoInfo",children:Object(W.jsx)(ce,{})})}),","]}),document.getElementById("root"))},91:function(e,t,n){}},[[165,1,2]]]);
//# sourceMappingURL=main.54ca4c82.chunk.js.map