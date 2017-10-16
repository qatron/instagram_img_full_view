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
	
	function ArrowObserver(callback){
		//var target=$('._23gmb')[0];
		var target=$('._sxolz')[0];
		var config={attributes: true, subtree: true};
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
		//var base=$('div[data-reactroot]:last').children(':eq(1)').children(':eq(0)');
		var base=$('div[role="dialog"]:last');
		return base;
	}
	
	var CustomViewer = {
		CreateArea: function(){
			var area=$('<div>',{
				id: 'custom_viewer',
				style: 'position: absolute; z-index:1001; width: 100%; height: 100%; background-color: black; opacity: 1;'
			});
			NewImgBaseFind().prepend(area);
			$('#custom_viewer').prepend(CustomViewer.img);
			$('#custom_viewer').click(function(event){
				if(event.target===this){
					return CustomViewer.RemoveArea();
				}
			});
			$('#custom_image').click(function(event){
				window.open(event.target.src, '_blank');
			});
		},
		RemoveArea: function(){
			$('#custom_viewer').remove();
		},
		img: $('<img>',{
			id: 'custom_image',
			src: '',
			style: 'all: initial; position: relative; width: auto; max-height:95vh; display: block; margin: auto; padding: 20px 20px 20px 20px;'
			 }),
		imgSrcSet: function(){
			CustomViewer.img.attr('src', SourceImgFind().link);
		}
	};
	
	function ActiveArea(){
		function NewImgActiveBaseFind(){
			return SourceImgFind().element.parents('article:first-of-type').children('div:first-of-type');
		}
		function ActiveAreaCreate(){
			if(!$('#custom_viewer_active_area').length){
				var area=$('<div>', {
					id: 'custom_viewer_active_area',
					style: 'position: absolute; width: 100%; height: 8%; top: 0; z-index: 1000; opacity: 0; box-shadow: 0px 35px 20px -25px rgb(164, 205, 255) inset;'
					});

				if($('#react-root').eq(0).attr('aria-hidden')==='true'){
					NewImgActiveBaseFind().prepend(area);
				}
				$('#custom_viewer_active_area').hover(function(){$(this).stop().fadeTo('fast', 0.8 );}, function(){$(this).stop().fadeTo('fast', 0 );});
				$('#custom_viewer_active_area').click(function(){CustomViewer.CreateArea();});
				$('._23gmb').keydown(function(e){
					if(e.keyCode===38&&!$('#custom_viewer').length){
						CustomViewer.CreateArea();
					}
					else if(e.keyCode===40&&$('#custom_viewer').length){
						CustomViewer.RemoveArea();
					}
				});
				}
		}
		ActiveAreaCreate();
		
	}
	
	AriaHiddenObserver(function(){
		ActiveArea();
		CustomViewer.imgSrcSet();
		ArrowObserver(function(){ActiveArea(); CustomViewer.imgSrcSet();});
	});
	
})();