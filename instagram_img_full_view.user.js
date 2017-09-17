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
	
	function AriaHiddenObserver(callback){
		var target=$('#react-root')[0];
		var config={attributeFilter:['aria-hidden']};
		var observer=new MutationObserver(callback);
		observer.observe(target,config);
	}
	
	function SourceImgFind(){
		var sourceElement=$('img').last();
		var sourceLink=sourceElement.attr('src');
		return {
			element: sourceElement,
			link: sourceLink
		};
	}
	
	function NewImgBaseFind(){
		var base=$('div[data-reactroot]').last();
		return base;
	}
	
	function ActiveArea(){
		function NewImgActiveBaseFind(){
			return SourceImgFind().element.parents('article:first-of-type').children('div:first-of-type');
		}
		function ActiveAreaCreate(){
			var area=$('<div>', {
				id: 'custom_viewer_active_area',
				style: 'position: absolute; width: 100%; height: 8%; top: 0; z-index: 999; opacity: 0;background-image: linear-gradient(to bottom, rgba(112,193,255,0.65) 0%,rgba(0,0,0,0) 100%);'
				});
			
			if($('#react-root').eq(0).attr('aria-hidden')==='true'){
				NewImgActiveBaseFind().prepend(area);
			}
			$('#custom_viewer_active_area').hover(function(){$(this).stop().fadeTo('fast', 0.5 );}, function(){$(this).stop().fadeTo('fast', 0 );});
		}
		ActiveAreaCreate();
	}
	
	AriaHiddenObserver(function(){
		ActiveArea();
	});
	
})();