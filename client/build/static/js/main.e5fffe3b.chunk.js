(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{136:function(e,t){},139:function(e,t,a){var n={"./2C.png":140,"./2D.png":141,"./2H.png":142,"./2S.png":143,"./3C.png":144,"./3D.png":145,"./3H.png":146,"./3S.png":147,"./4C.png":148,"./4D.png":149,"./4H.png":150,"./4S.png":151,"./5C.png":152,"./5D.png":153,"./5H.png":154,"./5S.png":155,"./6C.png":156,"./6D.png":157,"./6H.png":158,"./6S.png":159,"./7C.png":160,"./7D.png":161,"./7H.png":162,"./7S.png":163,"./8C.png":164,"./8D.png":165,"./8H.png":166,"./8S.png":167,"./9C.png":168,"./9D.png":169,"./9H.png":170,"./9S.png":171,"./AC.png":172,"./AD.png":173,"./AH.png":174,"./AS.png":175,"./BACK.png":176,"./JC.png":177,"./JD.png":178,"./JH.png":179,"./JS.png":180,"./KC.png":181,"./KD.png":182,"./KH.png":183,"./KS.png":184,"./QC.png":185,"./QD.png":186,"./QH.png":187,"./QS.png":188,"./TC.png":189,"./TD.png":190,"./TH.png":191,"./TS.png":192,"./extra/aces.png":193,"./extra/back.png":194,"./extra/bridge-back-blue.png":195,"./extra/bridge-back-gray.png":196,"./extra/bridge-back-green.png":197,"./extra/bridge-back-purple.png":198,"./extra/bridge-back-red.png":199,"./extra/bridge-back-yellow.png":200,"./extra/bridge-backs.png":201,"./extra/honor-clubs.png":202,"./extra/honor-diamonds.png":203,"./extra/honor-hearts.png":204,"./extra/honor-spades.png":205};function r(e){var t=o(e);return a(t)}function o(e){if(!a.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}r.keys=function(){return Object.keys(n)},r.resolve=o,e.exports=r,r.id=139},206:function(e,t,a){var n={"./black.png":207,"./blue.png":208,"./green.png":209,"./red.png":210,"./white.png":211};function r(e){var t=o(e);return a(t)}function o(e){if(!a.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}r.keys=function(){return Object.keys(n)},r.resolve=o,e.exports=r,r.id=206},212:function(e,t,a){var n={"./burlap.png":213,"./cardboard.png":214,"./default-light.png":215,"./default.png":216,"./fabric.png":217,"./felt.png":218,"./leather.png":219,"./noise.png":220,"./paper.png":221,"./pinstripe.png":222,"./slate.png":223,"./subtle.png":224,"./suede.png":225,"./twill.png":226};function r(e){var t=o(e);return a(t)}function o(e){if(!a.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}r.keys=function(){return Object.keys(n)},r.resolve=o,e.exports=r,r.id=212},227:function(e,t,a){"use strict";a.r(t),function(e){var t=a(21);function n(){var e=Object(t.a)(Array(81)).map((function(e,t){return t}));return function(e){var t,a,n;for(n=e.length-1;n>0;n--)t=Math.floor(Math.random()*(n+1)),a=e[n],e[n]=e[t],e[t]=a}(e),e}var r={deck:[],board:[],collected:[],selected:{}};e.exports={cardsInitialState:r,startNewGame:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:r,a=n(),o=a.splice(0,12);return Object.assign({},e,{deck:Object(t.a)(a),board:o})},deal:function(e){}}}.call(this,a(61)(e))},228:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(30),s=a.n(o),c=a(3),l=a(2),i=a(32),u=a.n(i),d=a(20),p=a.n(d),m=function(e){e?p.a.defaults.headers.common.Authorization=e:delete p.a.defaults.headers.common.Authorization},g=function(e){return{type:"SET_CURRENT_USER",payload:e}},h=function(){return function(e){localStorage.removeItem("jwtToken"),m(!1),e(g({}))}},f=a(12),b=a(5),v=a(33),E=a(24),y=a(105),w={isAuthenticated:!1,user:{},loading:!1},k={},S=Object(b.c)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_CURRENT_USER":return Object(E.a)(Object(E.a)({},e),{},{isAuthenticated:!y(t.payload),user:t.payload});case"USER_LOADING":return Object(E.a)(Object(E.a)({},e),{},{loading:!0});default:return e}},errors:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_ERRORS":return t.payload;default:return e}}}),C=[v.a],N=Object(b.e)(S,{},Object(b.d)(b.a.apply(void 0,C),window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()||b.d)),O=a(9),x=a(10),j=a(11),R=a(13),T=function(e){Object(j.a)(a,e);var t=Object(R.a)(a);function a(){return Object(O.a)(this,a),t.apply(this,arguments)}return Object(x.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"navbar-fixed"},r.a.createElement("nav",{className:"z-depth-0"},r.a.createElement("div",{className:"nav-wrapper white"},r.a.createElement(c.b,{to:"/",style:{fontFamily:"Calibri",fontSize:18},className:"col s12 left black-text"},"Bridge.com"),r.a.createElement(c.b,{to:"/room",style:{fontFamily:"Calibri",fontSize:18},className:"col s12 right black-text"},"Continue as guest"))))}}]),a}(n.Component),D=function(e){Object(j.a)(a,e);var t=Object(R.a)(a);function a(){return Object(O.a)(this,a),t.apply(this,arguments)}return Object(x.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{style:{height:"75vh"},className:"container valign-wrapper"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col s12 center-align"},r.a.createElement("h4",null,r.a.createElement("b",null,"BRIDGE")," that gap with your friends"),r.a.createElement("p",{className:"flow-text grey-text text-darken-1"},"Register or login"),r.a.createElement("br",null),r.a.createElement("div",{className:"col s6"},r.a.createElement(c.b,{to:"/register",style:{width:"140px",borderRadius:"3px",letterSpacing:"1.5px"},className:"btn btn-large waves-effect waves-light hoverable blue accent-3"},"Register")),r.a.createElement("div",{className:"col s6"},r.a.createElement(c.b,{to:"/login",style:{width:"140px",borderRadius:"3px",letterSpacing:"1.5px"},className:"btn btn-large btn-flat waves-effect white black-text"},"Log In")))))}}]),a}(n.Component),_=a(19),H=a(16),I=a.n(H),A=function(e){Object(j.a)(a,e);var t=Object(R.a)(a);function a(){var e;return Object(O.a)(this,a),(e=t.call(this)).onChange=function(t){e.setState(Object(_.a)({},t.target.id,t.target.value))},e.onSubmit=function(t){t.preventDefault();var a={name:e.state.name,email:e.state.email,password:e.state.password,password2:e.state.password2};e.props.registerUser(a,e.props.history)},e.state={name:"",email:"",password:"",password2:"",errors:{}},e}return Object(x.a)(a,[{key:"componentDidMount",value:function(){this.props.auth.isAuthenticated&&this.props.history.push("/dashboard")}},{key:"componentWillReceiveProps",value:function(e){e.errors&&this.setState({errors:e.errors})}},{key:"render",value:function(){var e=this.state.errors;return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col s8 offset-s2"},r.a.createElement(c.b,{to:"/",className:"btn-flat waves-effect"},r.a.createElement("i",{className:"material-icons left"},"keyboard_backspace")," Back to home"),r.a.createElement("div",{className:"col s12",style:{paddingLeft:"11.250px"}},r.a.createElement("h4",null,r.a.createElement("b",null,"Register")," below"),r.a.createElement("p",{className:"grey-text text-darken-1"},"Already have an account? ",r.a.createElement(c.b,{to:"/login"},"Log in"))),r.a.createElement("form",{noValidate:!0,onSubmit:this.onSubmit},r.a.createElement("div",{className:"input-field col s12"},r.a.createElement("input",{onChange:this.onChange,value:this.state.name,error:e.name,id:"name",type:"text",className:I()("",{invalid:e.name})}),r.a.createElement("label",{htmlFor:"name"},"Name"),r.a.createElement("span",{className:"red-text"},e.name)),r.a.createElement("div",{className:"input-field col s12"},r.a.createElement("input",{onChange:this.onChange,value:this.state.email,error:e.email,id:"email",type:"email",className:I()("",{invalid:e.email})}),r.a.createElement("label",{htmlFor:"email"},"Email"),r.a.createElement("span",{className:"red-text"},e.email)),r.a.createElement("div",{className:"input-field col s12"},r.a.createElement("input",{onChange:this.onChange,value:this.state.password,error:e.password,id:"password",type:"password",className:I()("",{invalid:e.password})}),r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement("span",{className:"red-text"},e.password)),r.a.createElement("div",{className:"input-field col s12"},r.a.createElement("input",{onChange:this.onChange,value:this.state.password2,error:e.password2,id:"password2",type:"password",className:I()("",{invalid:e.password2})}),r.a.createElement("label",{htmlFor:"password2"},"Confirm Password"),r.a.createElement("span",{className:"red-text"},e.password2)),r.a.createElement("div",{className:"col s12",style:{paddingLeft:"11.250px"}},r.a.createElement("button",{style:{width:"150px",borderRadius:"3px",letterSpacing:"1.5px",marginTop:"1rem"},type:"submit",className:"btn btn-large waves-effect waves-light hoverable blue accent-3"},"Sign up"))))))}}]),a}(n.Component),L=Object(f.b)((function(e){return{auth:e.auth,errors:e.errors}}),{registerUser:function(e,t){return function(a){p.a.post("/api/users/register",e).then((function(e){return t.push("/login")})).catch((function(e){return a({type:"GET_ERRORS",payload:e.response.data})}))}}})(Object(l.g)(A)),B=function(e){Object(j.a)(a,e);var t=Object(R.a)(a);function a(){var e;return Object(O.a)(this,a),(e=t.call(this)).onChange=function(t){e.setState(Object(_.a)({},t.target.id,t.target.value))},e.onSubmit=function(t){t.preventDefault();var a={email:e.state.email,password:e.state.password};e.props.loginUser(a)},e.state={email:"",password:"",errors:{}},e}return Object(x.a)(a,[{key:"componentDidMount",value:function(){this.props.auth.isAuthenticated&&this.props.history.push("/dashboard")}},{key:"componentWillReceiveProps",value:function(e){e.auth.isAuthenticated&&this.props.history.push("/dashboard"),e.errors&&this.setState({errors:e.errors})}},{key:"render",value:function(){var e=this.state.errors;return r.a.createElement("div",{className:"container"},r.a.createElement("div",{style:{marginTop:"4rem"},className:"row"},r.a.createElement("div",{className:"col s8 offset-s2"},r.a.createElement(c.b,{to:"/",className:"btn-flat waves-effect"},r.a.createElement("i",{className:"material-icons left"},"keyboard_backspace")," ","Back to home"),r.a.createElement("div",{className:"col s12",style:{paddingLeft:"11.250px"}},r.a.createElement("h4",null,r.a.createElement("b",null,"Login")," below"),r.a.createElement("p",{className:"grey-text text-darken-1"},"Don't have an account?"," ",r.a.createElement(c.b,{to:"/register"},"Register"))),r.a.createElement("form",{noValidate:!0,onSubmit:this.onSubmit},r.a.createElement("div",{className:"input-field col s12"},r.a.createElement("input",{onChange:this.onChange,value:this.state.email,error:e.email,id:"email",type:"email",className:I()("",{invalid:e.email||e.emailnotfound})}),r.a.createElement("label",{htmlFor:"email"},"Email"),r.a.createElement("span",{className:"red-text"},e.email,e.emailnotfound)),r.a.createElement("div",{className:"input-field col s12"},r.a.createElement("input",{onChange:this.onChange,value:this.state.password,error:e.password,id:"password",type:"password",className:I()("",{invalid:e.password||e.passwordincorrect})}),r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement("span",{className:"red-text"},e.password,e.passwordincorrect)),r.a.createElement("div",{className:"col s12",style:{paddingLeft:"11.250px"}},r.a.createElement("button",{style:{width:"150px",borderRadius:"3px",letterSpacing:"1.5px",marginTop:"1rem"},type:"submit",className:"btn btn-large waves-effect waves-light hoverable blue accent-3"},"Login"))))))}}]),a}(n.Component),P=Object(f.b)((function(e){return{auth:e.auth,errors:e.errors}}),{loginUser:function(e){return function(t){p.a.post("/api/users/login",e).then((function(e){var a=e.data.token;localStorage.setItem("jwtToken",a),m(a);var n=u()(a);t(g(n))})).catch((function(e){return t({type:"GET_ERRORS",payload:e.response.data})}))}}})(B),U=a(78),F=Object(f.b)((function(e){return{auth:e.auth}}))((function(e){var t=e.component,a=e.auth,n=Object(U.a)(e,["component","auth"]);return r.a.createElement(l.b,Object.assign({},n,{render:function(e){return!0===a.isAuthenticated?r.a.createElement(t,e):r.a.createElement(l.a,{to:"/login"})}}))})),W=function(e){Object(j.a)(a,e);var t=Object(R.a)(a);function a(){var e;Object(O.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).onLogoutClick=function(t){t.preventDefault(),e.props.logoutUser()},e.onPlayClick=function(){window.location="./lobby"},e}return Object(x.a)(a,[{key:"render",value:function(){var e=this.props.auth.user;return r.a.createElement("div",{style:{height:"75vh"},className:"container valign-wrapper"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col s12 center-align"},r.a.createElement("h4",null,r.a.createElement("b",null,"Hey there,")," ",e.name.split(" ")[0],r.a.createElement("p",{className:"flow-text grey-text text-darken-1"},"You are logged into your favourite"," ",r.a.createElement("span",{style:{fontFamily:"monospace"}},"BRIDGE")," website \ud83d\udc4f")),r.a.createElement("button",{style:{width:"150px",borderRadius:"3px",letterSpacing:"1.5px",marginTop:"1rem"},onClick:this.onPlayClick,className:"btn btn-large waves-effect waves-light hoverable blue accent-3"},"Proceed to Lobby"),r.a.createElement("button",{style:{width:"150px",borderRadius:"3px",letterSpacing:"1.5px",marginTop:"1rem"},onClick:this.onLogoutClick,className:"btn btn-large waves-effect waves-light hoverable blue accent-3"},"Logout"))))}}]),a}(n.Component),G=Object(f.b)((function(e){return{auth:e.auth}}),{logoutUser:h})(W),M=a(76),J=a(21),z=a(51),Q=a(77),K=a.n(Q),V=a(15),X=a.n(V),Y=a(37);a(47);function q(e){var t;return e%5===0?t="No trump":e%5===1?t="Diamond":e%5===2?t="Club":e%5===3?t="Heart":e%5===4&&(t="Spade"),(e%5===0?e/5:Math.floor(e/5)+1)+" "+t}X.a.mixin({customClass:{confirmButton:"btn btn-success",cancelButton:"btn btn-danger"},buttonsStyling:!1});var Z=function(e){Object(j.a)(a,e);var t=Object(R.a)(a);function a(e){var n;Object(O.a)(this,a),(n=t.call(this,e)).clickCard=function(e,t){var a=JSON.stringify(t);console.log(a);var r=a.slice(9,10),o=a.slice(20,21);n.state.socket.emit("clickedCard",n.state.roomId+r+o);var s=n.state.hand.filter((function(e){return e!==r+o}));n.setState({hand:s})},n.startGame=function(e,t){n.props.match.params;n.state.socket.emit("startGame",e+" "+t)},n.dealQuery=function(){n.state.socket.emit("dealQuery",n.state.roomId),n.state.socket.on("playersNeeded",(function(){X.a.fire({title:"Not enough players yet"})}))},n.selectPartner=function(){X.a.fire({title:"Select your partner, enter value in [face][suit]",input:"text",confirmButtonText:"Confirm"}).then((function(e){n.state.hand.includes(e.value)?(X.a.fire({title:"You cannot select yourself",timer:2e3}),console.log("cannot select yourself as partner"),n.selectPartner()):""===e.value?(console.log("no partner selected"),X.a.fire({title:"no partner selected",timer:"2000"}),n.selectPartner()):(console.log("other partner selected"),n.state.socket.emit("partnerQuery",n.state.roomId+" "+e.value))})),n.state.socket.on("assignPartner",(function(e){if(console.log("assigning in progress"),n.state.hand.includes(e)){var t=Math.floor(n.state.currHighest/5)+parseInt(n.state.needToWin);n.setState({needToWin:t})}}))},n.callProcess=function(){n.state.socket.emit("callStart",n.state.roomId+" "+n.state.socket.id),n.state.socket.on("startCallSuccess",(function(){X.a.fire({title:"start calling!",input:"select",inputOptions:{0:"Pass",1:"1 Diamond",2:"1 Clubs",3:"1 Heart",4:"1 Spade",5:"1 No trump",6:"2 Diamond",7:"2 Clubs",8:"2 Heart",9:"2 Spade",10:"2 No trump",11:"3 Diamond",12:"3 Clubs",13:"3 Heart",14:"3 Spade",15:"3 No trump",16:"4 Diamond",17:"4 Clubs",18:"4 Heart",19:"4 Spade",20:"4 No trump",21:"5 Diamond",22:"5 Clubs",23:"5 Heart",24:"5 Spade",25:"5 No trump"}}).then((function(e){console.log("result "+JSON.stringify(e)+" currHighest: "+n.state.currHighest),e.isConfirmed&&(0===parseInt(e.value,10)?n.state.socket.emit("readyToStart",n.state.socket.id+" "+n.state.roomId+" "+n.state.isReady.size):parseInt(e.value,10)<=parseInt(n.state.currHighest,10)?X.a.fire({title:"Call something higher than \n                                \n".concat(q(n.state.currHighest))}):n.state.socket.emit("callResult",n.state.socket.id+" "+n.state.roomId+" "+e.value.valueOf()))}))})),n.state.socket.on("isReady",(function(e){var t=n.state.isReady.add(e);n.setState({isReady:t}),4===n.state.isReady.size&&n.startGame(n.state.roomId,e)})),n.state.socket.on("updateHighest",(function(e){var t=e.slice(0,20),a=e.slice(21);n.setState({calledBy:t,currHighest:a}),console.log("updateHighest rec'd: ".concat(a))})),n.state.socket.on("startCallFail",(function(){X.a.fire({title:"Cannot start calling, not enough people",timer:2e3})})),n.state.socket.on("updateNeedToWin",(function(){var e=Math.floor(n.state.currHighest/5)+parseInt(n.state.needToWin);n.setState({needToWin:e})})),n.state.socket.on("selectPartner",(function(){n.selectPartner()}))};e.match.params;return n.state={board:[],selected:new Set,deck:{},collected:new Set,socket:K()("http://127.0.0.1:5000"),roomId:"",displayStart:!0,hand:[],currHighest:"0",calledBy:"",isReady:new Set,needToWin:"7"},n}return Object(x.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.state.socket.on("dealHand",(function(t){e.setState({hand:t}),console.log("".concat(e.state.socket.id," rec'd hando of ").concat(e.state.hand))})),this.state.socket.on("cardSelected",(function(t){var a;console.log(t),e.setState({selected:e.state.selected.add(t)}),(a=3e3,new Promise((function(e){return setTimeout(e,a)}))).then((function(){if(4===e.state.selected.size){e.state.currHighest;var t,a=e.state.collected,n=Object(z.a)(e.state.selected.values());try{for(n.s();!(t=n.n()).done;){var r=t.value;a.add(r)}}catch(o){n.e(o)}finally{n.f()}console.log(a),e.setState({collected:a,selected:new Set})}}))})),this.state.socket.on("updateNTW",(function(){e.setState({needToWin:e.state.needToWin-1})}))}},{key:"render",value:function(){var e=this,t=this.state,a=t.board,n=t.selected,o=t.socket,s=t.roomId,c=t.hand,l=t.currHighest,i=t.calledBy,u=t.isReady,d=t.needToWin,p={width:"350px",justifyContent:"center",alignItems:"center",fontSize:"20px",fontFamily:"Josephin Sans",background:"black",borderRadius:"5px",color:"white",margin:"10px 0px",padding:"10px 60px",cursor:"pointer"};return r.a.createElement("div",null,r.a.createElement("div",null,"Welcome, player ",this.state.socket.id," to room"," ",this.state.roomId),r.a.createElement("button",{style:p,onClick:function(){X.a.fire({title:"You are making your own room",text:"Room code: "+e.state.socket.id,confirmButtonText:"Join room"}).then((function(){e.setState({roomId:e.state.socket.id}),e.state.socket.emit("new_room")}))}},"Create Room"),r.a.createElement("button",{style:p,onClick:function(){X.a.fire({title:"Please enter the room code to join:",input:"text",confirmButtonText:"Join",showCancelButton:!0,showLoaderOnConfirm:!0}).then((function(t){e.state.socket.emit("joinRoom",t),e.state.socket.on("RoomFound",(function(){e.setState({roomId:t.value}),e.state.socket.emit("checkNumber",e.state.roomId)})),e.state.socket.on("NoRoom",(function(e){X.a.fire({title:e,cancelButton:!0}).then(window.location="./room")}))}))}},"Join Room"),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:{position:"relative"}},r.a.createElement($,{board:a,selected:n,clickCard:this.clickCard,socket:o,roomId:s,hand:c,currHighest:l,calledBy:i,isReady:u,needToWin:d})),r.a.createElement("button",{style:p,onClick:this.callProcess},"Begin calling")))}}]),a}(n.Component),$=function(e){var t=[];!function(t,a){t.forEach((function(t){return a.push(r.a.createElement(Y.Card,{face:t.slice(0,1),suit:t.slice(1),onClick:function(t,a){return e.clickCard(t,a)}}))}))}(e.hand,t);var a=function(){return t};return r.a.createElement("div",null,r.a.createElement(ee,{selected:e.selected}),r.a.createElement(a,null),r.a.createElement("div",null,"Current highest is: ",q(e.currHighest),", called by ",e.calledBy,r.a.createElement("br",null),Object(M.a)(Array,Object(J.a)(e.isReady)).join(", ")," is/are ready to start",r.a.createElement("br",null),"You need ",e.needToWin," sets to win"))},ee=function(e){var t=new Set;!function(e,t){var a,n=Object(z.a)(e.keys());try{for(n.s();!(a=n.n()).done;){var o=a.value;t.add(r.a.createElement(Y.Card,{face:o.slice(0,1),suit:o.slice(1)}))}}catch(s){n.e(s)}finally{n.f()}}(e.selected,t.add(r.a.createElement(Y.CardStyles,null)));var a=function(){return Object(J.a)(t)};return r.a.createElement("div",null,r.a.createElement(a,null))},te=Z;if(localStorage.jwtToken){var ae=localStorage.jwtToken;m(ae);var ne=u()(ae);N.dispatch(g(ne));var re=Date.now()/1e3;ne.exp<re&&(N.dispatch(h()),window.location.href="./login")}var oe=function(){return r.a.createElement(f.a,{store:N},r.a.createElement(c.a,null,r.a.createElement("div",{className:"App"},r.a.createElement(T,null),r.a.createElement(l.b,{exact:!0,path:"/",component:D}),r.a.createElement(l.b,{exact:!0,path:"/register",component:L}),r.a.createElement(l.b,{exact:!0,path:"/login",component:P}),r.a.createElement(l.b,{exact:!0,path:"/room",component:te}),r.a.createElement(l.d,null,r.a.createElement(F,{exact:!0,path:"/dashboard",component:G})))))},se=a(227),ce=se.cardsInitialState,le=se._startNewGame,ie=se._deal,ue=se._cleanBoard,de=se._toggleCard,pe=(se._checkSet,se._collectSet),me=(se.tTime,Object.assign({},ce));var ge=Object(b.c)({cards:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:me,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CLEAR_STATE":return Object.assign({},ce);case"START_NEW_GAME":return le();case"DEAL":return ie(e);case"CLEAN_BOARD":return ue(e);case"TOGGLE_CARD":var a=t.index;return de(a,e);case"COLLECT_SET":var n=t.indices;return pe(n,e);case"RESET_SELECTED":return Object.assign({},e,{selected:{}});default:return e}}});var he=Object(b.e)(ge,Object(b.a)(v.a));s.a.render(r.a.createElement(f.a,{store:he},r.a.createElement(oe,null)),document.getElementById("root"))},79:function(e,t,a){e.exports=a(228)}},[[79,1,2]]]);
//# sourceMappingURL=main.e5fffe3b.chunk.js.map