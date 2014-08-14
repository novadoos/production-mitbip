window.language_en_US={"Sign in / up":"Sign in / up",MenuChat:"Chat",MenuVideoChat:"Video Chat",PrincipalHeader:"Anyone Anywhere",SecondHeader:"A free, premium quality, responsive one page Bootstrap theme created by Start Bootstrap.",SignUp:"Sign up",SignIn:"Sign in",Email:"Email",FormatIncorrect:"format is incorrect",Username:"Username",UsernameExists:"exist",Password:"Password",Or:"or",Incorrect:"incorrect",UsernameOrEmail:"Username or email",ForgotPassword:"Forgot password",EnterEmail:"Please enter your email.",Success:"Success!",EmailHasBeenSent:"an email has been send, please check your inbox",Oops:"Oops!",EmailDoesNotExist:"looks like that email does not exist on out servers.",Send:"Send",Test:"Test"},window.language_es_CO={"Sign in / up":"Crear o iniciar sesion",MenuChat:"Chat",MenuVideoChat:"Video Chat",PrincipalHeader:"Anyone Anywhere",SecondHeader:"A free, premium quality, responsive one page Bootstrap theme created by Start Bootstrap.",SignUp:"Sign up",SignIn:"Sign in",Email:"Email",FormatIncorrect:"format is incorrect",Username:"Username",UsernameExists:"exist",Password:"Password",Or:"or",Incorrect:"incorrect",UsernameOrEmail:"Username or email",ForgotPassword:"Forgot password",EnterEmail:"Please enter your email.",Success:"Success!",EmailHasBeenSent:"an email has been send, please check your inbox",Oops:"Oops!",EmailDoesNotExist:"looks like that email does not exist on out servers.",Send:"Send"};var Modules={controllers:angular.module("talkusApp.controllers",["talkusApp.services"]),services:angular.module("talkusApp.services",[]),directives:angular.module("talkusApp.directives",[]),filters:angular.module("talkusApp.filters",[])},App=angular.module("talkusApp",["ngCookies","ngResource","ngSanitize","ngRoute","angularFileUpload","ui.bootstrap","pascalprecht.translate","talkusApp.controllers","talkusApp.directives","talkusApp.filters","talkusApp.services"]);App.config(["$routeProvider","$locationProvider","$translateProvider",function(a,b,c){c.translations("es",language_es_CO),c.translations("en",language_en_US),c.preferredLanguage("en"),c.useCookieStorage(),a.when("/",{templateUrl:"/partials/chat",controller:"ChatController",resolve:{isVideoChat:function(){return!1}}}).when("/chat",{templateUrl:"/partials/chat",controller:"ChatController",resolve:{isVideoChat:function(){return!1}}}).when("/video-chat",{templateUrl:"/partials/chat",controller:"ChatController",resolve:{isVideoChat:function(){return!0}}}).otherwise({redirectTo:"/"}),b.html5Mode(!0)}]),Modules.services.directive("appVersion",["version",function(a){return function(b,c){c.text(a)}}]),angular.module("talkusApp").directive("upload",function(){return{restrict:"E",templateUrl:"/partials/upload",controller:"UploadController"}}),angular.module("talkusApp").directive("home",function(){return{restrict:"E",templateUrl:"/partials/index",controller:"LoginController"}}),Modules.services.filter("interpolate",["version",function(a){return function(b){return String(b).replace(/\%VERSION\%/gm,a)}}]),Modules.services.factory("ChatUser",["$resource",function(a){var b="/API/chat/:username",c="/API/chat/chatUsername/:username/get",d=a(b),e=a(c,{},{getUsername:{method:"GET",isArray:!1,params:{username:"@username"}}});return d.getUsername=e.getUsername,d}]),angular.module("talkusApp").factory("upload",["$resource",function(a){return a("/API/upload/photo",{})}]).factory("uploadget",["$resource",function(a){return a("/API/upload/get",{})}]),Modules.services.factory("Mails",["$resource",function(a){var b="/API/mails/:id ",c=a(b,null,{update:{method:"PUT"}});return c}]),Modules.services.factory("Remember",["$resource",function(a){var b="/API/remember",c=a(b);return c}]),Modules.services.factory("Session",["$resource",function(a){var b="/API/sessions",c=a(b,{username:"@username"},{update:{method:"PUT"}});return c}]),Modules.services.factory("User",["$resource",function(a){var b="/API/users/:username",c=a(b,{username:"@username"},{update:{method:"PUT"}});return c}]),angular.module("talkusApp").factory("bip",["$resource",function(a){return a("/API/bip/:id",{})}]),Modules.services.factory("Valid",["$resource",function(a){var b="/API/valid",c=a(b);return c}]),Modules.controllers.controller("ChatController",["$rootScope","$scope","$http","$window","$location","$filter","$cookies","$route","Session","User","Mails","ChatUser","uploadget","isVideoChat","bip","$translate",function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){function q(a){a=void 0!==a?a:"Anonym",$(".alert.alert-danger.down").remove(),n?(hideMyImageShowCamera(),E.emit("adduser",a,"video")):(showMyImageHideCamera(),E.emit("adduser",a,"text")),hideAnonymImageAndCamera(),H.hide()}function r(a){E.emit("nextText",a)}function s(a,b,c,d){window.channelReady=!0,d?startVideo(a,c,b):E.emit("nextVideo",a)}function t(){}function u(){"none"===K.css("display")&&(K.show(),document.title="User Typing..",$(window).focus(function(){document.title="Talkus"}))}function v(){"block"===K.css("display")&&(K.hide(),document.title="New Message",$(window).focus(function(){document.title="Talkus"}))}function w(a,c,d,e,f,g,h){if(void 0!==d){var i,j,k=!1;switch(d){case"leave":M.attr("disabled",!0),$("#datasend").attr("disabled",!0),b.validations.anonymOtherUserValidationFields.Email=!0,b.validations.anonymOtherUserValidationFields.Name=!0,b.validations.anonymOtherUserValidationFields.Gender=!0,b.validations.anonymOtherUserValidationFields.Description=!0,b.validations.anonymOtherUserValidationFields.Location=!0,b.validations.anonymOtherUserValidationFields.Birth=!0,void 0!==b.otherUserInfo&&(b.otherUserInfo.username=""),n&&(hangUp(),stopVideo(),showMyImageHideCamera()),$(".fieldsetProfile").hide(),H.hide(),I.hide(),new PNotify({title:"Woa",text:"Looks like the user left",remove:!0});break;case"connect":J.empty(),"text"===e?(showAnonymImageHideCamera(),I.show()):(hideAnonymImageShowCamera(),H.hide(),I.hide()),h&&"me"===h&&connect(),new PNotify({title:"Welcome",text:c,type:"success",remove:!0});break;case"showMessageVideoMe":I.hide(),H.show(),hideMyImageShowCamera();break;case"showMessageVideoAnonym":new PNotify({title:"Video Chat",text:"<div class='clear'></div><div class='startChatNow serverchat'><i class='icon-user'></i><div><span class='muted'>user wants to do video chat</span><input class='btn btn-primary log' type='button' value='Accept' id='startVideoChat' /><input class='btn btn-primary log' type='button' value='Cancel' id='cancelVideoChat' /></div></div><div class='clear'></div>",type:"success",remove:!1});break;case"succesMessageVideoMe":E.emit("newVideoChat","text","Anonym");break;case"succesMessageVideoAnonym":hideAnonymImageShowCamera();break;case"failMessageVideoMe":hangUp(),stopVideo(),showMyImageHideCamera(),showAnonymImageHideCamera(),new PNotify({title:"Fail",text:"The video failed to initialize",remove:!0});break;case"failMessageVideoAnonym":hangUp(),stopVideo(),showMyImageHideCamera(),showAnonymImageHideCamera(),new PNotify({title:"Fail",text:"The video failed to initialize",remove:!0});break;case"cancelMessageVideoMe":hangUp(),stopVideo(),showMyImageHideCamera(),showAnonymImageHideCamera(),H.hide(),I.show();break;case"cancelMessageVideoAnonym":hangUp(),stopVideo(),showMyImageHideCamera(),showAnonymImageHideCamera(),H.hide(),I.show();break;case"message":for(var l=c,m=l.split(" "),o=[],p=0;p<m.length;p++)o.push(checkURL(m[p])?'<a target="_blank" href="'+m[p]+'"><img src="'+m[p]+'" alt="img" class="in-image"></a>':m[p]),checkURLVideo(m[p])&&(i=$(".ytplayer").size()+"ytplayer",o.splice(p,1),o.push('<div class="ytplayer" id='+i+"></div>"),k=!0,j=returnVideoId(m[p]));c=o.join(" "),"me"===e?f?(J.append("<div class='me'><i class='icon-user'></i> <span class='text-info'>"+a+':</span> <a target="_blank" href="'+c+'"><img src="'+c+'" alt="image" class="in-image" /></a></div>'),k&&onYouTubePlayerAPIReady("390","640",j,i)):g?(J.append("<div class='me'><i class='icon-user'></i> <span class='text-info'>"+a+':</span> <audio controls src="'+c+'" class="in-audio"></audio></div>'),k&&onYouTubePlayerAPIReady("390","640",j,i)):(J.append("<div class='me'><i class='icon-user'></i> <span class='text-info'>"+a+":</span> "+c+"</div>"),k&&onYouTubePlayerAPIReady("390","640",j,i)):f?(J.append("<div class='anonym'><i class='icon-user'></i> <span class='text-info'>"+a+':</span> <a target="_blank" href="'+c+'"><img src="'+c+'" alt="image" class="in-image" /></a></div>'),k&&onYouTubePlayerAPIReady("390","640",j,i)):g?(J.append("<div class='anonym'><i class='icon-user'></i> <span class='text-info'>"+a+':</span> <audio controls src="'+c+'" class="in-audio"></audio></div>'),k&&onYouTubePlayerAPIReady("390","640",j,i)):(J.append("<div class='anonym'><i class='icon-user'></i> <span class='text-info'>"+a+":</span> "+c+"</div>"),k&&onYouTubePlayerAPIReady("390","640",j,i))}}}function x(){$("#confirm").click(),M.attr("disabled",!1),$("#datasend").attr("disabled",!1),$(".fieldsetProfile").show()}function y(a){hideAnonymImageAndCamera(),H.hide(),I.hide(),J.empty(),"text"===a?showMyImageHideCamera():hangUp()}function z(a,b){hideAnonymImageAndCamera(),H.hide(),I.hide(),J.empty(),"text"===b?(hangUp(),stopVideo(),showMyImageHideCamera(),r(a)):(hangUp(),s(a,b,a.username,!1))}function A(){stopStreamingNoCamera()}function B(){j.update(b.userInformation,function(){i.update({userObject:b.userInformation},function(){b.alerts=[{type:"success",msg:"Profile Updated!"}]},function(){b.alerts=[{type:"danger",msg:"Error while updating please try again later"}]})},function(){b.alerts=[{type:"danger",msg:"Error while updating please try again later"}]})}b.lang=function(a){p.use(a)},document.title="Talkus";var C=window.location.host.split(":")[0],D=void 0!==window.location.host.split(":")[1]?window.location.host.split(":")[1]:80,E=io.connect(C,{port:D}),F=!1,G=$("html"),H=$("#exitVideoChat"),I=$("#newVideoChat"),J=$("#conversation"),K=$("#userTyping"),L=$("#videoButtons"),M=$("#data");b.emitSessionDescription=function(a){E.emit("sessionDescription",a)},b.emitSendVideoNotification=function(){E.emit("newVideoChat2")},b.emitVideoStart=function(a){E.emit("nextVideo",a)},b.emitSendVideoNotificationAnonym=function(){hideMyImageShowCamera(),hideAnonymImageShowCamera(),I.hide(),H.show(),connect()},b.noCameraNotification=function(){$("#cameraModal").modal("show"),E.emit("userNoCamera")},b.emitAddUser=function(a,b){E.emit("adduser",a,b)},b.emitCandidate=function(a){E.emit("candidate",a)},b.emitHangUp=function(a){E.emit("hangUp",a)},b.initchat=function(){setTimeout(function(){b.userHasCamera=hasCamera(),n&&(b.userHasCamera||$("#camera2Modal").modal("show"))},1e3),$("#locationgeo").geocomplete().bind("geocode:result",function(a,c){b.userInformation.location=c.formatted_address}),n?(G.addClass("chat"),G.addClass("video")):(G.addClass("chat"),G.removeClass("video")),I.hide(),H.hide(),E.on("connect",b.addUserToChat),E.on("message",onMessage),E.on("initialVideo",s),E.on("empty",t),E.on("showWriting",u),E.on("hideWriting",v),E.on("updatechat",w),E.on("updateAnonymInfo",x),E.on("initialText",r),E.on("disconnectPartner",y),E.on("disconnectMe",z),E.on("partnerNoCamera",A),E.on("disconnect",function(){J.append("<div class='clear'></div><div class='startChatNow serverchat'><i class='icon-user'></i><div><span class='muted'>oops, something went wrong, try again</span></div></div><div class='clear'></div>")}),$("#datasend").on("click",function(){var a,b=/(<([^>]+)>)/gi,c=M,d=c.val();d=d.replace(b,""),c.val(d),a=c.val(),a=emotify(a),M.val(""),E.emit("sendchat",a)}),M.keydown(function(a){8===a.keyCode||46===a.keyCode?$(this).val().length<=1&&E.emit("userNotWriting"):13!==a.keyCode&&E.emit("userWriting")}),M.keypress(function(a){13===a.keyCode&&(0!==$(this).val().length&&($(this).blur(),$("#datasend").focus().click(),M.focus()),E.emit("userNotWriting"))}),$(".glyphicon.glyphicon-camera.mycam").click(function(){"disabled"!==M.attr("disabled")&&$("#imagefile").click()}),$("#imagefile").bind("change",function(a){var b=a.originalEvent.target.files[0],c=new FileReader;c.onload=function(a){loadImage(a.target.result,function(a){a.toBlob(function(a){var b=new window.FileReader;b.readAsDataURL(a),b.onload=function(){var a=b.result;E.emit("userImage",a)}},"image/jpeg")},{maxWidth:600,crop:!0})},c.readAsDataURL(b)}),L.on("click","#connectVideoChat",function(){connect()}),L.on("click","#newVideoChat",function(){E.emit("newVideoChat","text")}),L.on("click","#exitVideoChat",function(){E.emit("cancelVideoChat"),setTimeout(function(){E.emit("cancelPusblish")},300)}),$(document).on("click","#startVideoChat",function(){E.emit("succesNewVideoChat")}),$(document).on("click","#cancelVideoChat",function(){E.emit("failNewVideoChat")})},b.getLog=function(){$("#firstlight").modal("hide"),F=!0,$("#modMain").modal("show")},b.openTerms=function(){$("#firstlight").modal("hide"),$("#terms").modal("show")},b.chatNow=function(){$("#firstlight").modal("hide"),b.loadInfo(q)},b.goChat=function(){e.path("/chat")},b.addUserToChat=function(){var a=getBrowser();n&&a&&"safari"===a&&$("#safariModal").modal({keyboard:!1,backdrop:"static",show:!0}),g.myshow?b.loadInfo(q):(g.myshow="true",$("#firstlight").modal({keyboard:!1,backdrop:"static",show:!0}))},$("#terms").on("hide.bs.modal",function(){$("#firstlight").modal("show")}),$("#modMain").on("hidden.bs.modal",function(){F&&setTimeout(function(){b.loadInfo(q),F=!1},500)}),b.newRoom=function(){n?E.emit("disconnectPartners","video"):E.emit("disconnectPartners","text")},b.closeAlert=function(a){b.alerts.splice(a,1)},b.changeRoom=function(){n?e.path("/chat"):b.userHasCamera?e.path("/video-chat"):$("#cameraModal").modal("show")},b.$on("$routeChangeStart",function(){d.location.reload()}),b.today=function(){b.dt=new Date},b.today(),b.showWeeks=!0,b.toggleWeeks=function(){b.showWeeks=!b.showWeeks},b.toggleMin=function(){b.minDate=b.minDate?null:new Date},b.toggleMin(),b.open=function(a){a.preventDefault(),a.stopPropagation(),b.opened=!0},b.biped=function(){o.save({user:b.otherUserInfo},function(){o.get({id:b.otherUserInfo._id},function(a){b.likes=a.likes,b.readyLiked=!0})})},b.format="dd/MM/yyyy",b.newpermit={days:!1,email:!1},b.validations={anonymUserExist:!0,anonymUser:!0,anonymOtherUser:!0,anonymOtherUserValidationFields:{Name:!1,Birth:!1,Email:!1,Location:!1,Gender:!1,Description:!1}},b.userInformation=new j,b.otherUserInfo=new j;var N=!1;b.loadInfo=function(a){i.get(function(c){null!==(null!==c?c._id:void 0)&&m.save({username:c.username},function(d){if(b.avatar=d.image?d.image:"/images/uploads/images/avatars/default.jpg",null!==c._id&&void 0!==c._id){if(b.userInformation.birth=new Date,b.userInformation=c,a(b.userInformation.username),b.validations.anonymUser=!1,E.emit("getSocketID"),E.on("getSocketIDClient",function(a){b.userInformation.socketId=a}),"true"!==b.userInformation.confirmed){b.newpermit.days=!0;var e=new Date(b.userInformation.created),f=Math.floor((new Date-e)/864e5);f>=15||(b.days=15-f)}}else b.validations.anonymUser=!0,a("Anonym");$("body").addClass(b.validations.anonymUser===!0?"not-login":"login")}),(void 0===b.userInformation.email||""===b.userInformation.email)&&(b.userInformation.email=""),(void 0===b.userInformation.name||""===b.userInformation.name)&&(b.userInformation.name=b.userInformation.username),(void 0===b.userInformation.gender||""===b.userInformation.gender)&&(b.userInformation.gender=""),(void 0===b.userInformation.description||""===b.userInformation.description)&&(b.userInformation.description=""),(void 0===b.userInformation.location||""===b.userInformation.location)&&(b.userInformation.location=""),(void 0===b.userInformation.birth||""===b.userInformation.birth)&&(b.userInformation.birth="")},function(){})},b.deleteAccount=function(){k.delete({id:b.userInformation._id},function(){i.delete(function(){e.path("/"),d.location.reload()})},function(){})},b.resend=function(){var a=b.userInformation;k.update({user:a},function(){b.newpermit.email=!0})},b.updateUsers=function(){B()},b.locationBool=function(){N===!1?(N=!0,b.userInformation.location=document.getElementById("locationgeo").value):(b.userInformation.location="",N=!1)},b.otherUser=function(){void 0!==b.userInformation.username&&""!==b.userInformation.username?l.get({username:b.userInformation.socketId},function(a){o.get({id:a._id},function(a){b.likes=a.likes}),b.validations.anonymOtherUser=!1,b.otherUserInfo.birth=new Date,b.otherUserInfo=a,b.validations.anonymOtherUserValidationFields={},(void 0===b.otherUserInfo.email||""===b.otherUserInfo.email)&&(b.validations.anonymOtherUserValidationFields.Email=!0),(void 0===b.otherUserInfo.name||""===b.otherUserInfo.name)&&(b.validations.anonymOtherUserValidationFields.Name=!0),(void 0===b.otherUserInfo.gender||""===b.otherUserInfo.gender)&&(b.validations.anonymOtherUserValidationFields.Gender=!0),(void 0===b.otherUserInfo.description||""===b.otherUserInfo.description)&&(b.validations.anonymOtherUserValidationFields.Description=!0),(void 0===b.otherUserInfo.location||""===b.otherUserInfo.location)&&(b.validations.anonymOtherUserValidationFields.Location=!0),(void 0===b.otherUserInfo.birth||""===b.otherUserInfo.birth||null===b.otherUserInfo.birth)&&(b.validations.anonymOtherUserValidationFields.Birth=!0),b.otherUserInfo.username?m.save({username:b.otherUserInfo.username},function(a){b.otherUserInfo.avatar=a.image?a.image:"/images/uploads/images/avatars/default.jpg"},function(){b.otherUserInfo.avatar="/images/uploads/images/avatars/default.jpg"}):(b.otherUserInfo.avatar="/images/uploads/images/avatars/default.jpg",b.otherUserInfo.username="Anonym")},function(a){switch(a.status){case 404:b.otherUserInfo.avatar="/images/uploads/images/avatars/default.jpg",b.otherUserInfo.username="Anonym"}}):(b.validations.anonymOtherUserValidationFields={},(void 0===b.otherUserInfo.email||""===b.otherUserInfo.email)&&(b.validations.anonymOtherUserValidationFields.Email=!0),(void 0===b.otherUserInfo.name||""===b.otherUserInfo.name)&&(b.validations.anonymOtherUserValidationFields.Name=!0),(void 0===b.otherUserInfo.gender||""===b.otherUserInfo.gender)&&(b.validations.anonymOtherUserValidationFields.Gender=!0),(void 0===b.otherUserInfo.description||""===b.otherUserInfo.description)&&(b.validations.anonymOtherUserValidationFields.Description=!0),(void 0===b.otherUserInfo.location||""===b.otherUserInfo.location)&&(b.validations.anonymOtherUserValidationFields.Location=!0),(void 0===b.otherUserInfo.birth||""===b.otherUserInfo.birth||null===b.otherUserInfo.birth)&&(b.validations.anonymOtherUserValidationFields.Birth=!0),b.otherUserInfo.avatar="/images/uploads/images/avatars/default.jpg",b.otherUserInfo.username="Anonym")}}]),Modules.controllers.controller("UploadController",["$rootScope","$scope","upload",function(a,b,c){function d(a){a.toBlob(function(a){var d=new window.FileReader;d.readAsDataURL(a),d.onload=function(){var a=d.result;c.save({photo:a,username:b.userInformation.username},function(a){b.avatar=a.imagefull})}},"image/jpeg")}b.uploadClick=function(){$("input.upload-file").click()},b.deletePhoto=function(){c.save({photo:!1,username:b.userInformation.username},function(a){b.avatar=a.imagefull})},b.onFileSelect=function(a){for(var b=0;b<a.length;b++){var c=a[b];loadImage(c,d,{maxWidth:600,crop:!0})}}}]),Modules.controllers.controller("LoginController",["$rootScope","$scope","$http","$window","$location","$modal","Session","Mails","Remember","User","Valid",function(a,b,c,d,e,f,g,h,i,j,k){void 0!==e.search().idValid&&null!==e.search().idValid&&""!==e.search().idValid&&(b.Valid=new k,b.Valid.idValid=e.search().idValid,b.Valid.$save(function(c){a.user=c,b.permissions.invalidUserInfo=!1,new PNotify({title:"Nice!",text:'You are now verified, login in order to acces to your account <a href data-toggle="modal" data-target="#modMain" ><span>Sign in/up</span></a>',remove:!0})},function(){})),b.permissions={invalidUserInfo:!1},b.validations={duplicatedEmail:!1,duplicatedUser:!1,invalidEmailFormat:!1,invalidUsername:!1},b.loginValidations={userSessionExist:!1},b.password={remember:!1,remembererror:!1},b.session=new g,b.userObject=new j,b.Mails=new h,b.Remember=new i,b.forgotpass=function(){b.Remember.$save(function(){b.password.remember=!0,b.password.remembererror=!1},function(){b.password.remember=!1,b.password.remembererror=!0})},b.submitLogin=function(){b.session.$save(function(c){a.user=c.user,b.permissions.invalidUserInfo=!1,e.path("/"),d.location.reload()},function(a){switch(a.status){case 403:b.permissions.invalidUserInfo=!0}})},b.submitRegister=function(){var a=b.userObject.user.username,c=b.userObject.user.password;b.userObject.$save(function(d){b.Mails.user=d.user,b.Mails.$save(function(){},function(){}),b.permissions.invalidUserInfo=!1,b.validations.invalidEmailFormat=!1,b.validations.invalidUsername=!1,b.session.username=a,b.session.password=c,b.submitLogin()},function(a){switch(console.log(a),a.status){case 500:for(var c=a.data.errors.length,d=0;c>d;d++)switch(a.data.errors[d].path){case"username":b.validations.invalidUsername=!0,b.validations.invalidEmailFormat=!1;break;case"email":b.validations.invalidEmailFormat=!0,b.validations.invalidUsername=!1}}})}}]),Modules.controllers.controller("MenuController",["$rootScope","$scope","Session","$location","$window",function(a,b,c,d,e){b.LoginMenu={title:"Sign in / up"},b.LoginValidations={showLogin:!0},b.logout=function(){c.delete(function(){d.path("/"),e.location.reload()})},c.get(function(a){null!==(null!==a?a._id:void 0)?null!==a._id&&void 0!==a._id&&(b.LoginMenu.title="Sign out",b.LoginValidations.showLogin=!1):(b.LoginMenu.title="Sign in / up",b.LoginValidations.showLogin=!0)},function(){b.LoginMenu.title="Sign in / up",b.LoginValidations.showLogin=!0})}]);