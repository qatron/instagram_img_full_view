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
		//var base=$('div[data-reactroot]').last();
		var base=$('div[data-reactroot]:last').children(':eq(1)').children(':eq(0)');
		return base;
	}
	
	var CustomViewer = {
		imageSource: SourceImgFind().link,
		CreateArea: function(){
			var area=$('<div>',{
				id: 'custom_viewer',
				style: 'position: absolute; z-index:1001; width: 100vw; height: 100vh; background-color: black; opacity: 0.8;'
			});
			NewImgBaseFind().prepend(area);
			$('#custom_viewer').click(function(){CustomViewer.RemoveArea();});
		},
		RemoveArea: function(){
			$('#custom_viewer').remove();
		}
	};
	
	function ActiveArea(){
		function NewImgActiveBaseFind(){
			return SourceImgFind().element.parents('article:first-of-type').children('div:first-of-type');
		}
		function ActiveAreaCreate(){
			var area=$('<div>', {
				id: 'custom_viewer_active_area',
				style: 'position: absolute; width: 100%; height: 8%; top: 0; z-index: 1000; opacity: 0; box-shadow: 0px 35px 20px -25px rgb(164, 205, 255) inset;'
				});
			
			if($('#react-root').eq(0).attr('aria-hidden')==='true'){
				NewImgActiveBaseFind().prepend(area);
			}
			$('#custom_viewer_active_area').hover(function(){$(this).stop().fadeTo('fast', 0.8 );}, function(){$(this).stop().fadeTo('fast', 0 );});
			$('#custom_viewer_active_area').click(function(){CustomViewer.CreateArea();});
		}
		ActiveAreaCreate();
	}
	
	AriaHiddenObserver(function(){
		ActiveArea();
	});
	
})();