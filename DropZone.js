
function drop(e){
    dragOver(e);

    // fetch FileList object
    var files = e.target.files || e.dataTransfer.files;

    // process all File objects
    for (var i = 0, f; f = files[i]; i++) {
       
        UploadFile(f);
    }
	
}

function dragOver(e){
	e.stopPropagation();
	e.preventDefault();
	e.target.className = (e.type == "dragover" ? "hover" : "");
}

function dragExit(e){
	e.stopPropagation();
	e.preventDefault();
	e.target.className = (e.type == "dragover" ? "hover" : "");
}

function dragEnter(e){
	e.stopPropagation();
	e.preventDefault();
	e.target.className = (e.type == "dragover" ? "hover" : "");
}

function UploadFile(file) {
    var data = $dropZone.data('options');

    var xhr = new XMLHttpRequest();

    if (xhr.upload && file.type == "image/jpeg" && file.size <= 1000000) {
        xhr.open("POST", data.options.url, true);
        xhr.setRequestHeader("X_FILENAME", file.name);
        xhr.send(file);
    }
}

function bindEvents(dropZone){
	dropZone.bind("dragenter", dragEnter);
	dropZone.bind("dragexit", dragExit);
	dropZone.bind("dragover", dragOver);
	dropZone.bind("drop", drop);
}
function unBindEvents(dropZone) {
    dropZone.unbind("dragenter", dragEnter);
    dropZone.unbind("dragexit", dragExit);
    dropZone.unbind("dragover", dragOver);
    dropZone.unbind("drop", drop);
}
(function( $ ) {

var methods ={
	//url to post data, override methods
   
	
    init: function (options) {

        if (options.url !== undefined) {
            var $this = $(this);
            $this.data('options', options);
            bindEvents($this);
        }
        else {
            $.error('The URL to upload was not defined');
        }
	},
	destroy : function (){
	    
	    var $this = $(this),
             data = $this.data('options');
	    unBindEvents($this);
	    // Namespacing FTW
	    $(window).unbind('.DropZone');
	    data.tooltip.remove();
	    $this.removeData('options');
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