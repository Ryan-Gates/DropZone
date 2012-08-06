var $dropZone
function drop(e){
	e.stopPropagation();
	e.preventDefault();
	alert("hello");
}

function dragOver(e){
	e.stopPropagation();
	e.preventDefault();
}

function dragExit(e){
	e.stopPropagation();
	e.preventDefault();
}

function dragEnter(e){
	e.stopPropagation();
	e.preventDefault();
}
function bindEvents(){
	$dropZone.addEventListener("dragenter", dragEnter, false);
	$dropZone.addEventListener("dragexit", dragExit, false);
	$dropZone.addEventListener("dragover", dragOver, false);
	$dropZone.addEventListener("drop", drop, false);
}
(function( $ ) {

var methods ={
	//url to post data, override methods
	$dropZone =$(this);
	$dropZone.data('options',options);
	init : function( options){
		
	},
	destroy : function (){
	
	}
};

jQuery.fn.DropZone = function(method) {

	if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.DropZone' );
    }  
};
})( jQuery );