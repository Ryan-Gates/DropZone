This is a simple plug-in for create simple file drag and drop functionality in a web page

default functionality post the file with a XMLHttpRequest request

init options:
	1. url to post data
	2. 	override methods [dragEnter,dragExit,dragOver,drop]
	3.	regex to filter file type
	4.	Size of file to upload
	
How to set up:
Drop in refrence :
<script type="text/javascript" src="../../Scripts/DropZone.js"></script>
then call the plug-in, with options that you want added
$('#dropbox').DropZone({ url: "/home/UploadFiles" });

How to remove:
 $('#dropbox').DropZone("destroy");