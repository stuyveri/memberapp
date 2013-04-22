document.addEventListener("deviceready", onDeviceReadyForInit, false);

function onDeviceReadyForInit() {
	console.log("onDeviceReadyForInit called.");
	
	
	$("#one").bind("swipeleft", function(){
		$.mobile.changePage($("#two"));
	});
	$("#one").bind("swiperight", function(){
		$.mobile.changePage($("#three"));
	});
	$("#two").bind("swipeleft", function(){
		$.mobile.changePage($("#three"));
	});
	$("#two").bind("swiperight", function(){
		$.mobile.changePage($("#one"));
	});
	$("#three").bind("swipeleft", function(){
		$.mobile.changePage($("#one"));
	});
	$("#three").bind("swiperight", function(){
		$.mobile.changePage($("#two"));
	});
	$("#four").bind("swiperight", function(){
		$.mobile.changePage($("#one"));
	});
	console.log("onDeviceReadyForInit Done.");
}	