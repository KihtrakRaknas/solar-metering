(this["webpackJsonpsolar-metering"]=this["webpackJsonpsolar-metering"]||[]).push([[0],{13:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var r=a(4),c=(a(2),a(69)),n=a.n(c);function s(){return Object(r.jsx)(n.a,{type:"bars",color:"black",height:667,width:375})}},131:function(e,t,a){"use strict";a.r(t);var r=a(4),c=a(2),n=a.n(c),s=a(36),i=a.n(s),l=(a(81),a(82),a(83),a(84),a(62)),o=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,135)).then((function(t){var a=t.getCLS,r=t.getFID,c=t.getFCP,n=t.getLCP,s=t.getTTFB;a(e),r(e),c(e),n(e),s(e)}))};i.a.render(Object(r.jsx)(n.a.StrictMode,{children:Object(r.jsx)(l.a,{})}),document.getElementById("root")),o()},31:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var r=["cc1csv","cc2csv","cc3csv"]},35:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var r=a(40),c=a(4),n=(a(2),a(16)),s=a(41);function i(e){var t=Object(s.a)(e.data,e.fields),a=t.key,i=t.tableData;return console.log(e.reverse),Object(c.jsx)(n.c,{striped:!0,borderless:!0,small:!0,scrollX:!0,hover:!0,sortable:!1,data:{columns:a,rows:e.reverse?i:Object(r.a)(i).reverse()}})}},41:function(e,t,a){"use strict";function r(e,t){return e.forEach((function(e){var t="time (UTC)";e[t]=new Date(e[t]).toUTCString()})),{tableData:e,key:Object.keys(e[0]).filter((function(e){return!t||t.includes(e)})).map((function(e){return{label:e.split("_").join(" ").replace("Vb max daily","Battery Voltage Max (Daily)").replace("Vb min daily","Battery Voltage Min (Daily)").replace("Whc daily","Battery Wh (Daily)").replace("fault daily","Fault Daily").replace("alarm daily","Alarm Daily"),field:e}}))}}a.d(t,"a",(function(){return r}))},62:function(e,t,a){"use strict";(function(e){var r=a(20),c=a(4),n=a(2),s=a(75),i=a(71),l=a(72),o=a(74),j=a(32),u=a(10),b=a(39);a(130);try{b.a.initializeApp({apiKey:"AIzaSyD2K0qINs7uoG6-2whLT8Wgab_AvAhVEzI",authDomain:"sierra-leone-cec24.firebaseapp.com",projectId:"sierra-leone-cec24",storageBucket:"sierra-leone-cec24.appspot.com",messagingSenderId:"458713135578",appId:"1:458713135578:web:d5a3e153fa883269ace8e3"})}catch(h){}var d=b.a.firestore();t.a=function(){var t=Object(n.useState)([]),a=Object(r.a)(t,2),b=a[0],h=a[1],O=Object(n.useState)(-1),g=Object(r.a)(O,2),x=g[0],y=g[1],f=Object(n.useState)((new Date).getUTCFullYear()),p=Object(r.a)(f,2),m=p[0],v=p[1],T=function(){console.log("fetching!"),fetch("http://localhost:4001/logfile").then((function(e){return e.json()})).then((function(t){console.log(t),h(t),e.firebaseListener&&(e.firebaseListener(),e.firebaseListener=null)})).catch((function(t){if(null==e.firebaseListener){var a=d.collection("logData").doc(""+m);e.firebaseListener=a.onSnapshot((function(e){h(e.data().data),console.log(e.data().timestamp.seconds),y(1e3*e.data().timestamp.seconds)}))}console.log(t)}))};return Object(n.useEffect)((function(){T(),setInterval(T,3e4)}),[!0]),Object(c.jsxs)(j.a,{children:[Object(c.jsx)(o.a,{firebaseTimestamp:x,year:m}),Object(c.jsxs)(u.c,{children:[Object(c.jsx)(u.a,{path:"/full-table",children:Object(c.jsx)(i.a,{data:b})}),Object(c.jsx)(u.a,{path:"/historical-data",children:Object(c.jsx)(l.a,{year:m,setYear:v})}),Object(c.jsx)(u.a,{path:"/",children:Object(c.jsx)(s.a,{data:b})})]})]})}}).call(this,a(24))},71:function(e,t,a){"use strict";a.d(t,"a",(function(){return j}));var r=a(20),c=a(4),n=a(2),s=a(35),i=a(13),l=a(16),o=a(31);function j(e){var t=e.data,a=Object(n.useState)(!1),j=Object(r.a)(a,2),u=j[0],b=j[1];return Object(c.jsxs)("div",{className:"App",children:[Object(c.jsx)("br",{}),Object(c.jsx)("div",{className:"title_component",children:Object(c.jsx)("header",{className:"App-header",children:Object(c.jsx)("h1",{className:"App-title",style:{textAlign:"center"},children:"Complete Solar Data from MSView"})})}),Object(c.jsx)("br",{}),Object(c.jsxs)("div",{style:{padding:15,overflowX:"auto"},children:[Object.keys(t).length>0?o.a.map((function(e){return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("h1",{className:"title",style:{textAlign:"center"},children:e}),Object(c.jsx)(s.a,{data:t[e],reverse:u})]})})):Object(c.jsx)(i.a,{}),Object(c.jsx)("div",{style:{textAlign:"center"},children:Object(c.jsx)(l.b,{gradient:u?"peach":"purple",onClick:function(){return b(!u)},children:"Reverse Order"})})]})]})}},72:function(e,t,a){"use strict";a.d(t,"a",(function(){return O}));var r=a(50),c=a.n(r),n=a(42),s=a(51),i=a(73),l=a(40),o=a(20),j=a(4),u=a(2),b=(a(35),a(13)),d=a(16),h=a(39);function O(e){var t=e.year,a=e.setYear,r=Object(u.useState)([]),O=Object(o.a)(r,2),g=O[0],x=O[1],y=Object(u.useState)({}),f=Object(o.a)(y,2),p=f[0],m=f[1];return Object(u.useEffect)((function(){var e=h.a.firestore(),t=[],a=e.collection("logData").get().then((function(e){e.forEach((function(e){console.log(e.id),t.push(e)}))}));return x(t),a}),[]),Object(j.jsxs)("div",{className:"App",children:[Object(j.jsx)("br",{}),Object(j.jsx)("div",{className:"title_component",children:Object(j.jsx)("header",{className:"App-header",children:Object(j.jsx)("h1",{className:"App-title",style:{textAlign:"center"},children:"Historical Data"})})}),Object(j.jsx)("br",{}),Object(j.jsxs)("div",{style:{padding:15,overflowX:"auto"},children:[Object(j.jsxs)("h2",{children:["Currently loaded data for ",t]}),Object(j.jsxs)("p",{children:["The site will be populated with data from ",t,"."]}),g.length>0?Object(j.jsxs)(j.Fragment,{children:[Object(j.jsxs)(d.d,{children:[Object(j.jsx)(d.g,{caret:!0,color:"primary",children:"Load year"}),Object(j.jsx)(d.f,{basic:!0,children:Object(l.a)(g).map((function(e){return Object(j.jsx)(d.e,{onClick:function(){return a(e.id)},children:e.id})}))})]}),Object(j.jsx)("br",{}),Object(j.jsx)("br",{}),Object(j.jsx)("br",{}),Object(j.jsx)("h2",{children:"Download links:"}),Object(l.a)(g).map((function(e){return null==p[e.id]&&Object(i.a)(c.a.mark((function t(){var a,r,i;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a=e.data(),r=new Blob([JSON.stringify(a)],{type:"application/json"}),i=URL.createObjectURL(r),console.log(i),m(Object(s.a)(Object(s.a)({},p),{},Object(n.a)({},e.id,i)));case 5:case"end":return t.stop()}}),t)})))(),Object(j.jsx)(d.b,{disabled:null==p[e.id],download:e.id+".json",href:p[e.id],children:null==p[e.id]?"loading...":e.id})}))]}):Object(j.jsx)(b.a,{})]})]})}},74:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var r=a(20),c=a(4),n=a(2),s=a(16);function i(e){var t=e.firebaseTimestamp,a=e.year,i=Object(n.useState)(null),l=Object(r.a)(i,2),o=l[0],j=l[1],u=function(){fetch("http://localhost:4001/last-write").then((function(e){return e.json()})).then((function(e){console.log("Last Write: ".concat(e.lastWrite)),j(e.lastWrite)})).catch((function(e){console.log(e)}))};Object(n.useEffect)((function(){u(),setInterval(u,3e4)}),[!0]);var b=function(e){var t=(new Date-e)/36e5;return{hours:Math.floor(t%24),days:Math.floor(t/24),recent:t<1,hoursFixed:(t%24).toFixed(2)}}(-1!=o&&null!=o?o:t);return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("nav",{children:Object(c.jsxs)(s.k,{color:"gray",expand:"md",fixed:"top",scrolling:!0,style:{backgroundColor:"white"},children:[Object(c.jsx)(s.l,{children:Object(c.jsx)("strong",{className:"black-text",children:"Solar Metering"})}),Object(c.jsx)(s.j,{to:"/home",children:"Graphs"}),Object(c.jsx)(s.j,{to:"/full-table",children:"Full Table"}),-1!=t&&Object(c.jsxs)(s.j,{to:"/historical-data",children:["Historical Data ",(new Date).getUTCFullYear()!=a?"(".concat(a,")"):""]}),Object(c.jsx)("div",{className:"ml-auto",children:null!=o?-1==o?"No uploads have happened yet":b.recent?"An upload recently took place":"Last upload was ".concat(b.hours," hours and ").concat(b.days," days ago"):-1!=t?"Logs are from ".concat(b.hoursFixed," hours and ").concat(b.days," days ago"):""})]})}),Object(c.jsx)("br",{}),Object(c.jsx)("br",{}),Object(c.jsx)("br",{})]})}},75:function(e,t,a){"use strict";a.d(t,"a",(function(){return O}));var r=a(4),c=a(35),n=a(13),s=a(20),i=a(49),l=a(2),o=a(41),j=a(70),u=a.n(j),b=a(31);function d(e){var t,a=function(){var e=Object(l.useState)({width:void 0,height:void 0}),t=Object(s.a)(e,2),a=t[0],r=t[1];return Object(l.useEffect)((function(){function e(){r({width:window.innerWidth,height:window.innerHeight})}return window.addEventListener("resize",e),e(),function(){return window.removeEventListener("resize",e)}}),[]),a}(),c=[],n=Object(i.a)(b.a);try{for(n.s();!(t=n.n()).done;){var j,d=t.value,O=Object(o.a)(e.data[d]).tableData,g=Object(i.a)(e.categories);try{for(g.s();!(j=g.n()).done;){var x=j.value,y=h(x,O),f=y.x,p=y.y;c.push({x:f,y:p,name:"".concat(d," - ").concat(x),type:"scatter",mode:"lines+markers"})}}catch(m){g.e(m)}finally{g.f()}}}catch(m){n.e(m)}finally{n.f()}return Object(r.jsx)(u.a,{data:c,layout:{width:a.width-20,height:500,title:e.title,xaxis:{title:"Time"},yaxis:{title:e.yTitle}},config:{responsive:!0}})}function h(e,t){return{x:t.map((function(e){return new Date(e["time (UTC)"])})),y:t.map((function(t){return Number(t[e])}))}}function O(e){var t=e.data;return Object(r.jsxs)("div",{className:"App",children:[Object(r.jsx)("br",{}),Object(r.jsx)("div",{className:"title_component",children:Object(r.jsx)("header",{className:"App-header",children:Object(r.jsx)("h1",{className:"App-title",style:{textAlign:"center"},children:"Real-Time Solar Output"})})}),Object.keys(t).length>0?Object(r.jsx)(d,{data:t,categories:["Array Voltage (V)"],title:"Array Voltage",yTitle:"Array Voltage (V)"}):Object(r.jsx)(n.a,{}),Object.keys(t).length>0?Object(r.jsx)(d,{data:t,categories:["Array Current (A)"],title:"Array Current",yTitle:"Array Current (A)"}):Object(r.jsx)(n.a,{}),Object.keys(t).length>0?Object(r.jsx)(d,{data:t,categories:["Input Power (W)"],title:"Input Power",yTitle:"Input Power (W)"}):Object(r.jsx)(n.a,{}),Object.keys(t).length>0?Object(r.jsx)(d,{data:t,categories:["Output Power (W)"],title:"Output Power",yTitle:"Output Power (W)"}):Object(r.jsx)(n.a,{}),Object.keys(t).length>0?Object(r.jsx)(d,{data:t,categories:["Battery Voltage (V)"],title:"Battery Voltage",yTitle:"Battery Voltage (V)"}):Object(r.jsx)(n.a,{}),Object.keys(t).length>0?Object(r.jsx)(d,{data:t,categories:["Battery Terminal Voltage (V)"],title:"Battery Terminal Voltage",yTitle:"Battery Terminal Voltage (V)"}):Object(r.jsx)(n.a,{}),Object.keys(t).length>0?Object(r.jsx)(d,{data:t,categories:["Battery Sense Voltage (V)"],title:"Battery Sense Voltage",yTitle:"Battery Sense Voltage (V)"}):Object(r.jsx)(n.a,{}),Object.keys(t).length>0?Object(r.jsx)(d,{data:t,categories:["Battery Current (A)"],title:"Battery Current",yTitle:"Battery Current (A)"}):Object(r.jsx)(n.a,{}),Object.keys(t).length>0?Object(r.jsx)(d,{data:t,categories:["Output Power (W)"],title:"Output Power",yTitle:"Output Power (W)"}):Object(r.jsx)(n.a,{}),Object.keys(t).length>0?Object(r.jsx)(d,{data:t,categories:["Target Regulation Voltage (V)"],title:"Target Regulation Voltage",yTitle:"Target Regulation Voltage (V)"}):Object(r.jsx)(n.a,{}),Object.keys(t).length>0?Object(r.jsx)(d,{data:t,categories:["RTS Temperature (C)"],title:"RTS Temperature",yTitle:"RTS Temperature (C)"}):Object(r.jsx)(n.a,{}),Object.keys(t).length>0?Object(r.jsx)(d,{data:t,categories:["Battery Temperature (C)"],title:"Battery Temperature",yTitle:"Battery Temperature (C)"}):Object(r.jsx)(n.a,{}),Object.keys(t).length>0?Object(r.jsx)(d,{data:t,categories:["Heatsink Temperature (C)"],title:"Heatsink Temperature",yTitle:"Heatsink Temperature (C)"}):Object(r.jsx)(n.a,{}),Object.keys(t).length>0?Object(r.jsx)(d,{data:t,categories:["Ah Charge Resetable (Ah)"],title:"Ah Charge Resetable",yTitle:"Ah Charge Resetable (Ah)"}):Object(r.jsx)(n.a,{}),Object.keys(t).length>0?Object(r.jsx)(d,{data:t,categories:["Ah Charge Total (Ah)"],title:"Ah Charge Total",yTitle:"Ah Charge Total (Ah)"}):Object(r.jsx)(n.a,{}),Object.keys(t).length>0?Object(r.jsx)(d,{data:t,categories:["kWh Charge Resetable (kWh)"],title:"kWh Charge Resetable",yTitle:"kWh Charge Resetable (kWh)"}):Object(r.jsx)(n.a,{}),Object.keys(t).length>0?Object(r.jsx)(d,{data:t,categories:["kWh Charge Total (kWh)"],title:"kWh Charge Total",yTitle:"kWh Charge Total (kWh)"}):Object(r.jsx)(n.a,{}),Object(r.jsx)("div",{style:{padding:15,overflowX:"auto"},children:Object.keys(t).length>0?Object(r.jsx)(r.Fragment,{children:b.a.map((function(e){return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("h1",{className:"title",style:{textAlign:"center"},children:[e," Summary"]}),Object(r.jsx)(c.a,{data:t[e],fields:["time (UTC)","Alarms ()","Faults ()","Array Voltage (V)","Array Current (A)","Input Power (W)","Battery Voltage (V)","Battery Current (A)","Output Power (W)","Heatsink Temperature (C)"]})]})}))}):Object(r.jsx)(n.a,{})})]})}},81:function(e,t,a){}},[[131,1,2]]]);
//# sourceMappingURL=main.9880bd99.chunk.js.map