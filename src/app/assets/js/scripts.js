
/**
   * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
   *
   * @codingstandard ftlabs-jsv2
   * @copyright The Financial Times Limited [All Rights Reserved]
   * @license MIT License (see LICENSE.txt)
   */

!function(){"use strict";function t(e,o){function i(t,e){return function(){return t.apply(e,arguments)}}var r;if(o=o||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=o.touchBoundary||10,this.layer=e,this.tapDelay=o.tapDelay||200,this.tapTimeout=o.tapTimeout||700,!t.notNeeded(e)){for(var a=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],c=this,s=0,u=a.length;u>s;s++)c[a[s]]=i(c[a[s]],c);n&&(e.addEventListener("mouseover",this.onMouse,!0),e.addEventListener("mousedown",this.onMouse,!0),e.addEventListener("mouseup",this.onMouse,!0)),e.addEventListener("click",this.onClick,!0),e.addEventListener("touchstart",this.onTouchStart,!1),e.addEventListener("touchmove",this.onTouchMove,!1),e.addEventListener("touchend",this.onTouchEnd,!1),e.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(e.removeEventListener=function(t,n,o){var i=Node.prototype.removeEventListener;"click"===t?i.call(e,t,n.hijacked||n,o):i.call(e,t,n,o)},e.addEventListener=function(t,n,o){var i=Node.prototype.addEventListener;"click"===t?i.call(e,t,n.hijacked||(n.hijacked=function(t){t.propagationStopped||n(t)}),o):i.call(e,t,n,o)}),"function"==typeof e.onclick&&(r=e.onclick,e.addEventListener("click",function(t){r(t)},!1),e.onclick=null)}}var e=navigator.userAgent.indexOf("Windows Phone")>=0,n=navigator.userAgent.indexOf("Android")>0&&!e,o=/iP(ad|hone|od)/.test(navigator.userAgent)&&!e,i=o&&/OS 4_\d(_\d)?/.test(navigator.userAgent),r=o&&/OS [6-7]_\d/.test(navigator.userAgent),a=navigator.userAgent.indexOf("BB10")>0;t.prototype.needsClick=function(t){switch(t.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(t.disabled)return!0;break;case"input":if(o&&"file"===t.type||t.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(t.className)},t.prototype.needsFocus=function(t){switch(t.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!n;case"input":switch(t.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!t.disabled&&!t.readOnly;default:return/\bneedsfocus\b/.test(t.className)}},t.prototype.sendClick=function(t,e){var n,o;document.activeElement&&document.activeElement!==t&&document.activeElement.blur(),o=e.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(t),!0,!0,window,1,o.screenX,o.screenY,o.clientX,o.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,t.dispatchEvent(n)},t.prototype.determineEventType=function(t){return n&&"select"===t.tagName.toLowerCase()?"mousedown":"click"},t.prototype.focus=function(t){var e;o&&t.setSelectionRange&&0!==t.type.indexOf("date")&&"time"!==t.type&&"month"!==t.type?(e=t.value.length,t.setSelectionRange(e,e)):t.focus()},t.prototype.updateScrollParent=function(t){var e,n;if(e=t.fastClickScrollParent,!e||!e.contains(t)){n=t;do{if(n.scrollHeight>n.offsetHeight){e=n,t.fastClickScrollParent=n;break}n=n.parentElement}while(n)}e&&(e.fastClickLastScrollTop=e.scrollTop)},t.prototype.getTargetElementFromEventTarget=function(t){return t.nodeType===Node.TEXT_NODE?t.parentNode:t},t.prototype.onTouchStart=function(t){var e,n,r;if(t.targetTouches.length>1)return!0;if(e=this.getTargetElementFromEventTarget(t.target),n=t.targetTouches[0],o){if(r=window.getSelection(),r.rangeCount&&!r.isCollapsed)return!0;if(!i){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return t.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(e)}}return this.trackingClick=!0,this.trackingClickStart=t.timeStamp,this.targetElement=e,this.touchStartX=n.pageX,this.touchStartY=n.pageY,t.timeStamp-this.lastClickTime<this.tapDelay&&t.preventDefault(),!0},t.prototype.touchHasMoved=function(t){var e=t.changedTouches[0],n=this.touchBoundary;return Math.abs(e.pageX-this.touchStartX)>n||Math.abs(e.pageY-this.touchStartY)>n?!0:!1},t.prototype.onTouchMove=function(t){return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(t.target)||this.touchHasMoved(t))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},t.prototype.findControl=function(t){return void 0!==t.control?t.control:t.htmlFor?document.getElementById(t.htmlFor):t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},t.prototype.onTouchEnd=function(t){var e,a,c,s,u,l=this.targetElement;if(!this.trackingClick)return!0;if(t.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(t.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=t.timeStamp,a=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,r&&(u=t.changedTouches[0],l=document.elementFromPoint(u.pageX-window.pageXOffset,u.pageY-window.pageYOffset)||l,l.fastClickScrollParent=this.targetElement.fastClickScrollParent),c=l.tagName.toLowerCase(),"label"===c){if(e=this.findControl(l)){if(this.focus(l),n)return!1;l=e}}else if(this.needsFocus(l))return t.timeStamp-a>100||o&&window.top!==window&&"input"===c?(this.targetElement=null,!1):(this.focus(l),this.sendClick(l,t),o&&"select"===c||(this.targetElement=null,t.preventDefault()),!1);return o&&!i&&(s=l.fastClickScrollParent,s&&s.fastClickLastScrollTop!==s.scrollTop)?!0:(this.needsClick(l)||(t.preventDefault(),this.sendClick(l,t)),!1)},t.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},t.prototype.onMouse=function(t){return this.targetElement?t.forwardedTouchEvent?!0:t.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(t.stopImmediatePropagation?t.stopImmediatePropagation():t.propagationStopped=!0,t.stopPropagation(),t.preventDefault(),!1):!0:!0},t.prototype.onClick=function(t){var e;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===t.target.type&&0===t.detail?!0:(e=this.onMouse(t),e||(this.targetElement=null),e)},t.prototype.destroy=function(){var t=this.layer;n&&(t.removeEventListener("mouseover",this.onMouse,!0),t.removeEventListener("mousedown",this.onMouse,!0),t.removeEventListener("mouseup",this.onMouse,!0)),t.removeEventListener("click",this.onClick,!0),t.removeEventListener("touchstart",this.onTouchStart,!1),t.removeEventListener("touchmove",this.onTouchMove,!1),t.removeEventListener("touchend",this.onTouchEnd,!1),t.removeEventListener("touchcancel",this.onTouchCancel,!1)},t.notNeeded=function(t){var e,o,i,r;if("undefined"==typeof window.ontouchstart)return!0;if(o=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!n)return!0;if(e=document.querySelector("meta[name=viewport]")){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(o>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(a&&(i=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),i[1]>=10&&i[2]>=3&&(e=document.querySelector("meta[name=viewport]")))){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===t.style.msTouchAction||"manipulation"===t.style.touchAction?!0:(r=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1],r>=27&&(e=document.querySelector("meta[name=viewport]"),e&&(-1!==e.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth))?!0:"none"===t.style.touchAction||"manipulation"===t.style.touchAction?!0:!1)},t.attach=function(e,n){return new t(e,n)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return t}):"undefined"!=typeof module&&module.exports?(module.exports=t.attach,module.exports.FastClick=t):window.FastClick=t}();


/**
 * StyleFix 1.0.3 & PrefixFree 1.0.7
 * @author Lea Verou
 * MIT license
 */
(function(){function k(a,b){return[].slice.call((b||document).querySelectorAll(a))}if(window.addEventListener){var e=window.StyleFix={link:function(a){try{if("stylesheet"!==a.rel||a.hasAttribute("data-noprefix"))return}catch(b){return}var c=a.href||a.getAttribute("data-href"),d=c.replace(/[^\/]+$/,""),h=(/^[a-z]{3,10}:/.exec(d)||[""])[0],l=(/^[a-z]{3,10}:\/\/[^\/]+/.exec(d)||[""])[0],g=/^([^?]*)\??/.exec(c)[1],m=a.parentNode,f=new XMLHttpRequest,n;f.onreadystatechange=function(){4===f.readyState&&
n()};n=function(){var b=f.responseText;if(b&&a.parentNode&&(!f.status||400>f.status||600<f.status)){b=e.fix(b,!0,a);if(d)var b=b.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi,function(b,a,c){return/^([a-z]{3,10}:|#)/i.test(c)?b:/^\/\//.test(c)?'url("'+h+c+'")':/^\//.test(c)?'url("'+l+c+'")':/^\?/.test(c)?'url("'+g+c+'")':'url("'+d+c+'")'}),c=d.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g,"\\$1"),b=b.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)"+c,"gi"),"$1");c=document.createElement("style");c.textContent=
b;c.media=a.media;c.disabled=a.disabled;c.setAttribute("data-href",a.getAttribute("href"));m.insertBefore(c,a);m.removeChild(a);c.media=a.media}};try{f.open("GET",c),f.send(null)}catch(p){"undefined"!=typeof XDomainRequest&&(f=new XDomainRequest,f.onerror=f.onprogress=function(){},f.onload=n,f.open("GET",c),f.send(null))}a.setAttribute("data-inprogress","")},styleElement:function(a){if(!a.hasAttribute("data-noprefix")){var b=a.disabled;a.textContent=e.fix(a.textContent,!0,a);a.disabled=b}},styleAttribute:function(a){var b=
a.getAttribute("style"),b=e.fix(b,!1,a);a.setAttribute("style",b)},process:function(){k('link[rel="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link);k("style").forEach(StyleFix.styleElement);k("[style]").forEach(StyleFix.styleAttribute)},register:function(a,b){(e.fixers=e.fixers||[]).splice(void 0===b?e.fixers.length:b,0,a)},fix:function(a,b,c){for(var d=0;d<e.fixers.length;d++)a=e.fixers[d](a,b,c)||a;return a},camelCase:function(a){return a.replace(/-([a-z])/g,function(b,a){return a.toUpperCase()}).replace("-",
"")},deCamelCase:function(a){return a.replace(/[A-Z]/g,function(b){return"-"+b.toLowerCase()})}};(function(){setTimeout(function(){k('link[rel="stylesheet"]').forEach(StyleFix.link)},10);document.addEventListener("DOMContentLoaded",StyleFix.process,!1)})()}})();
(function(k){function e(b,c,d,h,l){b=a[b];b.length&&(b=RegExp(c+"("+b.join("|")+")"+d,"gi"),l=l.replace(b,h));return l}if(window.StyleFix&&window.getComputedStyle){var a=window.PrefixFree={prefixCSS:function(b,c,d){var h=a.prefix;-1<a.functions.indexOf("linear-gradient")&&(b=b.replace(/(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/ig,function(b,a,c,d){return a+(c||"")+"linear-gradient("+(90-d)+"deg"}));b=e("functions","(\\s|:|,)","\\s*\\(","$1"+h+"$2(",b);b=e("keywords","(\\s|:)","(\\s|;|\\}|$)",
"$1"+h+"$2$3",b);b=e("properties","(^|\\{|\\s|;)","\\s*:","$1"+h+"$2:",b);if(a.properties.length){var l=RegExp("\\b("+a.properties.join("|")+")(?!:)","gi");b=e("valueProperties","\\b",":(.+?);",function(a){return a.replace(l,h+"$1")},b)}c&&(b=e("selectors","","\\b",a.prefixSelector,b),b=e("atrules","@","\\b","@"+h+"$1",b));b=b.replace(RegExp("-"+h,"g"),"-");return b=b.replace(/-\*-(?=[a-z]+)/gi,a.prefix)},property:function(b){return(0<=a.properties.indexOf(b)?a.prefix:"")+b},value:function(b,c){b=
e("functions","(^|\\s|,)","\\s*\\(","$1"+a.prefix+"$2(",b);b=e("keywords","(^|\\s)","(\\s|$)","$1"+a.prefix+"$2$3",b);0<=a.valueProperties.indexOf(c)&&(b=e("properties","(^|\\s|,)","($|\\s|,)","$1"+a.prefix+"$2$3",b));return b},prefixSelector:function(b){return b.replace(/^:{1,2}/,function(b){return b+a.prefix})},prefixProperty:function(b,c){var d=a.prefix+b;return c?StyleFix.camelCase(d):d}};(function(){var b={},c=[],d=getComputedStyle(document.documentElement,null),h=document.createElement("div").style,
l=function(a){if("-"===a.charAt(0)){c.push(a);a=a.split("-");var d=a[1];for(b[d]=++b[d]||1;3<a.length;)a.pop(),d=a.join("-"),StyleFix.camelCase(d)in h&&-1===c.indexOf(d)&&c.push(d)}};if(0<d.length)for(var g=0;g<d.length;g++)l(d[g]);else for(var e in d)l(StyleFix.deCamelCase(e));var g=0,f,k;for(k in b)d=b[k],g<d&&(f=k,g=d);a.prefix="-"+f+"-";a.Prefix=StyleFix.camelCase(a.prefix);a.properties=[];for(g=0;g<c.length;g++)e=c[g],0===e.indexOf(a.prefix)&&(f=e.slice(a.prefix.length),StyleFix.camelCase(f)in
h||a.properties.push(f));!("Ms"!=a.Prefix||"transform"in h||"MsTransform"in h)&&"msTransform"in h&&a.properties.push("transform","transform-origin");a.properties.sort()})();(function(){function b(a,b){h[b]="";h[b]=a;return!!h[b]}var c={"linear-gradient":{property:"backgroundImage",params:"red, teal"},calc:{property:"width",params:"1px + 5%"},element:{property:"backgroundImage",params:"#foo"},"cross-fade":{property:"backgroundImage",params:"url(a.png), url(b.png), 50%"}};c["repeating-linear-gradient"]=
c["repeating-radial-gradient"]=c["radial-gradient"]=c["linear-gradient"];var d={initial:"color","zoom-in":"cursor","zoom-out":"cursor",box:"display",flexbox:"display","inline-flexbox":"display",flex:"display","inline-flex":"display",grid:"display","inline-grid":"display","max-content":"width","min-content":"width","fit-content":"width","fill-available":"width"};a.functions=[];a.keywords=[];var h=document.createElement("div").style,e;for(e in c){var g=c[e],k=g.property,g=e+"("+g.params+")";!b(g,k)&&
b(a.prefix+g,k)&&a.functions.push(e)}for(var f in d)k=d[f],!b(f,k)&&b(a.prefix+f,k)&&a.keywords.push(f)})();(function(){function b(a){e.textContent=a+"{}";return!!e.sheet.cssRules.length}var c={":read-only":null,":read-write":null,":any-link":null,"::selection":null},d={keyframes:"name",viewport:null,document:'regexp(".")'};a.selectors=[];a.atrules=[];var e=k.appendChild(document.createElement("style")),l;for(l in c){var g=l+(c[l]?"("+c[l]+")":"");!b(g)&&b(a.prefixSelector(g))&&a.selectors.push(l)}for(var m in d)g=
m+" "+(d[m]||""),!b("@"+g)&&b("@"+a.prefix+g)&&a.atrules.push(m);k.removeChild(e)})();a.valueProperties=["transition","transition-property"];k.className+=" "+a.prefix;StyleFix.register(a.prefixCSS)}})(document.documentElement);

