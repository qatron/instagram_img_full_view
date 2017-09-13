// ==UserScript==
// @name        instagram img full view
// @namespace   ps
// @description Instagram full size gallery image viewer.
// @include     */www.instagram.com/*
// @version     1
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// ==/UserScript==

(function(){
	"use strict";
	//alert('It works!');
	//var obj=$('#react-root').attr('aria-hidden');
	
	
	$("._mck9w._gvoze._f2mse").click(function(){
		var obj=$('#react-root').attr('aria-hidden');
		
		
		function AriaCheck(){
			obj=$('#react-root').attr('aria-hidden');
			if(obj!=='true'){
				return setTimeout(AriaCheck,1000);
			}
			console.log("aria hidden");
			return true;
		}
		AriaCheck();
	});
	
	
	
})();