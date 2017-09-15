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
	
	function AriaHiddenObserver(){
		var target=$('#react-root')[0];
		var config={attributeFilter:['aria-hidden']};
		function callback(){
			//alert('works');
			alert(NewImgBaseFind());
		}
		var observer=new MutationObserver(callback);
		observer.observe(target,config);
	}
	
	function SourceImgFind(){
		var source=$('img').last().attr('src');
		return source;
	}
	
	function NewImgBaseFind(){
		var base=$('div[data-reactroot]').last();
		return base;
	}
	
	AriaHiddenObserver();
})();