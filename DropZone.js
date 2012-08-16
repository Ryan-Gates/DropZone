
function drop(e){
    dragOver(e);
    $this = $(this);
    var options = $this.data('options', options);
    // fetch FileList object
   var files = e.dataTransfer.files;

    // process all File objects
    for (var i = 0, f; f = files[i]; i++) {
        UploadFile(f,options.url, options.regex, options.size);
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

function UploadFile(file, url, pattern, size) {
    
    if (size === undefined) {
        //create a default max size
        var size = 1000000;
    }
    if (pattern === undefined) {
        //create a dauft pattern to match to
        var pattern = /image/;
    }

    var xhr = new XMLHttpRequest();
    
    if (xhr.upload && file.type.match(pattern) && file.size <= size) {
        xhr.open("POST", url, true);
        xhr.setRequestHeader("X-File-Name", file.name);
        xhr.setRequestHeader("X-File-Size", file.size);
        xhr.setRequestHeader("X-File-Type", file.type);
        xhr.send(file);
    }
}

function bindEvents(dropZone) {
    data = dropZone.data('options');
    if (data.methods !== undefined) {
        methods = data.methods;
        if (methods.dragEnter !== undefined) {
            dropZone.get(0).addEventListener("dragenter", methods.dragEnter, false);
        }
            else {
                dropZone.get(0).addEventListener("dragenter", dragEnter, false);
            }

        if (methods.dragExit !== undefined) {
            dropZone.get(0).addEventListener("dragexit", methods.dragExit, false);
        }
            else {
                dropZone.get(0).addEventListener("dragenter", dragExit, false);
            }

        if (methods.dragnOver !== undefined) {
            dropZone.get(0).addEventListener("dragenter", methods.dragOver, false);
        }
            else {
                dropZone.get(0).addEventListener("dragenter", dragOver, false);
            }

        if (methods.drop !== undefined) {
            dropZone.get(0).addEventListener("dragenter", methods.drop, false);
        }
            else {
                dropZone.get(0).addEventListener("dragenter", drop, false);
            }
    }
    else {
        dropZone.get(0).addEventListener("dragenter", dragEnter, false);
        dropZone.get(0).addEventListener("dragexit", dragExit, false);
        dropZone.get(0).addEventListener("dragover", dragOver, false);
        dropZone.get(0).addEventListener("drop", drop, false);
    }
}
function unBindEvents(dropZone) {
    data = dropZone.data('options');
    if (data.methods !== undefined) {
        methods = data.methods;
        if (methods.dragEnter !== undefined) {
            dropZone.get(0).removeEventListener("dragenter", methods.dragEnter, false);
        }
        else {
            dropZone.get(0).removeEventListener("dragenter", dragEnter, false);
        }

        if (methods.dragExit !== undefined) {
            dropZone.get(0).removeEventListener("dragexit", methods.dragExit, false);
        }
        else {
            dropZone.get(0).removeEventListener("dragenter", dragExit, false);
        }

        if (methods.dragnOver !== undefined) {
            dropZone.get(0).removeEventListener("dragenter", methods.dragOver, false);
        }
        else {
            dropZone.get(0).removeEventListener("dragenter", dragOver, false);
        }

        if (methods.drop !== undefined) {
            dropZone.get(0).removeEventListener("dragenter", methods.drop, false);
        }
        else {
            dropZone.get(0).removeEventListener("dragenter", drop, false);
        }
    }
    else {
        dropZone.get(0).removeEventListener("dragenter", dragEnter, false);
        dropZone.get(0).removeEventListener("dragexit", dragExit, false);
        dropZone.get(0).removeEventListener("dragover", dragOver, false);
        dropZone.get(0).removeEventListener("drop", drop, false);
    }
}
(function( $ ) {

var methods ={
	//url to post data, override methods [dragEnter,dragExit,dragOver,drop], regex to filter file type, Size of file to upload
   
	
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