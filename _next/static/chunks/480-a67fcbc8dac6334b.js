"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[480],{701:function(e,t,n){n.d(t,{Z:function(){return s},e:function(){return a}});var r=n(2804),a=(0,r.cn)({key:"modalState",default:!1}),s=(0,r.cn)({key:"storyViewState",default:!1})},9980:function(e,t,n){var r=n(4051),a=n.n(r),s=n(5893),o=n(3854),i=n(5321),l=n(1153),c=n(1163),u=n(7294),d=n(8193),f=n(7516),p=n(3750),x=n(9583),m=n(6084),h=n(2804),v=n(701),y=n(6357),b=n(1984),g=n(9815);function w(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function j(e,t,n,r,a,s,o){try{var i=e[s](o),l=i.value}catch(c){return void n(c)}i.done?t(l):Promise.resolve(l).then(r,a)}function N(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var s=e.apply(t,n);function o(e){j(s,r,a,o,i,"next",e)}function i(e){j(s,r,a,o,i,"throw",e)}o(void 0)}))}}function k(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,s=[],o=!0,i=!1;try{for(n=n.call(e);!(o=(r=n.next()).done)&&(s.push(r.value),!t||s.length!==t);o=!0);}catch(l){i=!0,a=l}finally{try{o||null==n.return||n.return()}finally{if(i)throw a}}return s}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return w(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return w(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}t.Z=function(){var e=k((0,h.FV)(v.e),2),t=(e[0],e[1]),n=(0,g.a)(),r=n.currentUser,w=n.logout,j=(0,u.useState)(!1),C=j[0],S=j[1],U=(0,u.useRef)(),A=(0,u.useState)(null),R=A[0],L=A[1],_=(0,u.useState)(!1),I=_[0],E=_[1],F=(0,c.useRouter)(),O=(0,u.useState)([]),P=O[0],J=O[1],T=(0,u.useRef)(),V=function(){var e=N(a().mark((function e(){var n;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!I){e.next=2;break}return e.abrupt("return");case 2:return E(!0),(n=(0,l.iH)(y.tO,"".concat(r.uid,"/profile.png"))).bucket.replace("appspot.com","firebaseapp.com"),e.next=7,(0,l.sf)(n,R,"data_url").then(N(a().mark((function e(){var t;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,l.Jt)(n);case 2:t=e.sent,(0,o.ck)(r,{image:t});case 4:case"end":return e.stop()}}),e)})))).catch((function(e){return console.log(e)}));case 7:t(!1),E(!1),L(null);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),z=function(){F.push("".concat("/my-feed","/"))},D=function(){var e=N(a().mark((function e(t){var n,r,s;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.replace(/.$/,(function(e){return String.fromCharCode(e.charCodeAt(0)+1)})),e.next=3,(0,i.PL)((0,i.IO)((0,i.hJ)(y.db,"users"),(0,i.ar)("username",">=",t),(0,i.ar)("username","<",n)));case 3:return r=e.sent,s=[],e.next=7,null===r||void 0===r?void 0:r.docs.forEach((function(e){var t;s.push(null===(t=null===e||void 0===e?void 0:e.data())||void 0===t?void 0:t.username)}));case 7:J(s);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return(0,s.jsx)(s.Fragment,{children:(0,s.jsx)("div",{className:"relative w-full min-h-[50px] sm:min-h-[60px] border-none flex justify-center items-center",children:(0,s.jsx)("div",{className:"w-full lg:w-[1024px] md:w-[768px] sm:w-[640px] sm:rounded-[32px] sm:rounded-t-none bg-[rgb(254,254,255)] sm:bg-white sm:shadow-sm fixed z-50",children:(0,s.jsxs)("div",{className:"min-h-[50px] sm:min-h-[60px] flex flex-row px-4 justify-between items-center sm:py-[10px] max-w-[970px] lg:mx-auto",children:[(0,s.jsx)("div",{className:"relative inline-grid flex-shrink-0",children:(0,s.jsx)("img",{onClick:z,className:"h-[29px] w-auto relative top-1 cursor-pointer",src:"".concat("/my-feed","/instTextLogo.svg")})}),(0,s.jsxs)("div",{className:"hidden sm:block sm:relative max-w-xs",children:[(0,s.jsx)("div",{className:"absolute inset-y-0 pl-3 flex items-center",children:(0,s.jsx)(f.Goc,{className:"w-5 h-5 text-gray-300"})}),(0,s.jsx)("input",{ref:T,onKeyUp:function(e){return D(e.currentTarget.value)},className:"block w-full pl-10 bg-gray-50 placeholder-gray-300 sm:text-sm border-none rounded-[32px] focus:ring-0",type:"text",placeholder:"Search"}),P.length>0?(0,s.jsx)("div",{className:"absolute top-[32px] w-full max-h-[300px] bg-gray-50 overflow-y-scroll rounded-[32px] shadow-lg",children:(0,s.jsx)("ul",{className:"px-4 py-2",children:P.map((function(e,t){return(0,s.jsx)("li",{className:"w-full h-full cursor-pointer font-light",onClick:function(){return function(e){T.current.value="",J([]),F.push("".concat("/my-feed","/").concat(e))}(e)},children:e},t)}))})}):(0,s.jsx)(s.Fragment,{})]}),(0,s.jsxs)("div",{className:"flex flex-row items-center justify-end space-x-3 sm:space-x-3 md:space-x-4 lg:space-x-6 relative",children:[(0,s.jsx)(d.V9Z,{onClick:z,className:"hidden sm:block navbtn"}),(0,s.jsxs)("div",{className:"relative",children:[(0,s.jsx)(m.dVn,{onClick:b.B,className:"navbtn rotate-45 relative bottom-1 left-1"}),(0,s.jsx)("div",{className:"hidden md:flex absolute -top-1.5 left-[16px] text-xs w-4 h-4 bg-red-500 rounded-full items-center justify-center animate-pulse text-white",children:"3"})]}),(0,s.jsx)(p.X4Q,{onClick:function(){return t(!0)},className:"navbtn w-6 h-6"}),(0,s.jsx)(d.lo,{className:"hidden navbtn w-8 h-8"}),(0,s.jsxs)("div",{className:"cursor-pointer",onClick:function(){return S(!C)},children:[" ",r.photoURL?(0,s.jsx)("img",{className:"h-9 w-9 rounded-full object-cover",src:r.photoURL}):(0,s.jsx)(x.wzp,{className:"h-7 w-7"})]}),C?(0,s.jsxs)("div",{className:"absolute top-[76px] right-0 bg-[rgb(254,254,255)] border-[1px] border-gray-200 rounded-[32px] shadow-md flex flex-col items-center justify-center min-h-[280px] min-w-[210px]",children:[r.photoURL||R?(0,s.jsx)("img",{onClick:function(){return U.current.click()},className:"h-28 w-28 object-cover rounded-full cursor-pointer mt-[12px]",src:R||r.photoURL}):(0,s.jsx)(x.wzp,{onClick:function(){return U.current.click()},className:"h-28 w-28 cursor-pointer"}),(0,s.jsx)("input",{ref:U,type:"file",className:"absolute",hidden:!0,onChange:function(e){var t=new FileReader;e.target.files[0]&&t.readAsDataURL(e.target.files[0]),t.onload=function(e){var t,n;(null===(t=e.target)||void 0===t?void 0:t.result)&&L(null===(n=e.target)||void 0===n?void 0:n.result)}}}),R?(0,s.jsx)("button",{className:"mt-5 mb-1 bg-gray-800 h-[28px] w-[112px] text-white text-sm rounded-[32px] font-light",onClick:V,children:I?"Loading...":"Upload"}):(0,s.jsx)("button",{className:"text-sm mt-5 mb-1 w-[112px] bg-gray-800 text-white rounded-[32px] py-2 px-4",onClick:function(){return U.current.click()},children:"Click to change"}),(0,s.jsx)("button",{onClick:w,className:"text-sm text-blue-500 mt-2 font-medium",children:"Sign out"})]}):(0,s.jsx)(s.Fragment,{})]})]})})})})}},5050:function(e,t,n){var r=n(4051),a=n.n(r),s=n(5893),o=n(5321),i=n(1153),l=n(7294),c=n(8193),u=n(5155),d=n(2804),f=n(9959),p=n(701),x=n(6357),m=n(9815);function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function v(e,t,n,r,a,s,o){try{var i=e[s](o),l=i.value}catch(c){return void n(c)}i.done?t(l):Promise.resolve(l).then(r,a)}function y(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var s=e.apply(t,n);function o(e){v(s,r,a,o,i,"next",e)}function i(e){v(s,r,a,o,i,"throw",e)}o(void 0)}))}}function b(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,s=[],o=!0,i=!1;try{for(n=n.call(e);!(o=(r=n.next()).done)&&(s.push(r.value),!t||s.length!==t);o=!0);}catch(l){i=!0,a=l}finally{try{o||null==n.return||n.return()}finally{if(i)throw a}}return s}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return h(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return h(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}t.Z=function(){var e=b((0,d.FV)(p.e),2),t=e[0],n=e[1],r=(0,l.useRef)(),h=(0,l.useRef)(),v=(0,l.useState)(null),g=v[0],w=v[1],j=(0,l.useState)(!1),N=j[0],k=j[1],C=(0,m.a)().currentUser,S=function(){var e=y(a().mark((function e(t){var r,s,l,c,u;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!N){e.next=4;break}return e.abrupt("return");case 4:return k(!0),e.next=7,(0,o.PL)((0,o.IO)((0,o.hJ)(x.db,"users"),(0,o.ar)("uid","==",C.uid)));case 7:return s=e.sent,e.next=10,null===(r=null===s||void 0===s?void 0:s.docs[0])||void 0===r?void 0:r.data().username;case 10:return l=e.sent,e.next=13,(0,o.ET)((0,o.hJ)(x.db,"posts"),{uid:(0,f.h)(),user_uid:C.uid,username:l,caption:h.current.value,profileImg:C.photoURL||"",timeStamp:(0,o.Bt)()});case 13:return c=e.sent,(u=(0,i.iH)(x.tO,"posts/".concat(c.id,"/image"))).bucket.replace("appspot.com","firebaseapp.com"),e.next=18,(0,i.sf)(u,g,"data_url").then(y(a().mark((function e(){var t;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,i.Jt)(u);case 2:return t=e.sent,e.next=5,(0,o.r7)((0,o.JU)(x.db,"posts",c.id),{imageURL:t});case 5:case"end":return e.stop()}}),e)}))));case 18:n(!1),k(!1),w(null);case 21:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return(0,l.useEffect)((function(){t&&(document.body.style.overflow="hidden"),!t&&(document.body.style.overflow="unset")}),[t]),(0,s.jsx)(s.Fragment,{children:t&&(0,s.jsx)("div",{className:" w-full vh_for_iphones fixed bg-[#030303c7] top-0 z-50 scrollbar-hide",children:(0,s.jsx)("div",{className:"w-full vh_for_iphones flex items-center justify-center",children:(0,s.jsxs)("div",{className:"flex flex-col w-[90%] md:w-[50%] h-[80%] min-h-[400px] sm:min-h-[680px] bg-white border-[1px] border-gray-300 rounded-[32px] min-w-[250px] relative",children:[(0,s.jsx)("div",{className:"min-h-[50px] flex h-14 justify-center items-center w-full border-b-[1px]",children:(0,s.jsx)("p",{children:"Create new post"})}),(0,s.jsxs)("div",{className:"flex flex-col h-full justify-center items-center pb-6",children:[(0,s.jsx)("div",{className:"flex justify-center items-center h-[60%] w-full min-h-[80px] py-4",children:g?(0,s.jsx)("div",{className:"flex items-center justify-center h-[300px] md:h-[400px] overflow-hidden",children:(0,s.jsx)("img",{onClick:function(){return w(null)},src:g,alt:"uploaded_img"})}):(0,s.jsx)(c.IEK,{onClick:function(){return r.current.click()},className:"w-[50%] h-[80%] text-gray-300"})}),(0,s.jsx)("p",{className:"py-4 text-xl",children:"Drag photos here"}),(0,s.jsxs)("div",{className:"flex flex-col space-y-4 mb-8",children:[(0,s.jsx)("button",{onClick:function(){return r.current.click()},className:" bg-gray-800 text-white p-2 px-4 rounded-[32px]",children:"Select from Computer"}),(0,s.jsx)("div",{className:"absolute",children:(0,s.jsx)("input",{ref:r,onChange:function(e){var t=new FileReader;e.target.files[0]&&t.readAsDataURL(e.target.files[0]),t.onload=function(e){var t,n;(null===(t=e.target)||void 0===t?void 0:t.result)&&w(null===(n=e.target)||void 0===n?void 0:n.result)}},type:"file",hidden:!0})}),(0,s.jsxs)("form",{className:"flex flex-col space-y-4",onSubmit:S,children:[(0,s.jsx)("input",{ref:h,placeholder:"Please enter a caption",className:" py-1 px-4 outline-none text-[16px] border-[1px] rounded-[32px] text-gray-500 w-[192px] font-light"}),(0,s.jsx)("button",{hidden:!g,className:" bg-blue-400 p-2 px-4 rounded-[32px] text-white my-4",children:N?"Uploading...":"Upload post"})]})]})]}),(0,s.jsx)(u.v8y,{onClick:function(){n(!1)},className:"absolute h-6 w-6 text-gray-800 top-[14px] right-3"})]})})})})}},1984:function(e,t,n){function r(){alert("\u0415\u0449\u0435 \u0447\u0443\u0442\u044c-\u0447\u0443\u0442\u044c \u0431\u044d\u043a\u0435\u043d\u0434\u0430.. \u0418 \u0431\u0443\u0434\u0435\u0442 \u0433\u043e\u0442\u043e\u0432\u043e :)")}n.d(t,{B:function(){return r}})}}]);