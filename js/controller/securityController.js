
//$("#filesLoadedDone").on('filesLoadedDoneEvent', function() {
$("#iframeMe").load(function() {
    console.log("On filesLoadedDoneEvent in SecurityController called.");
	
	(new SecurityService()).enableXSS();

	//check connection
	console.log("Connection: " + navigator.connection.type);
    if( navigator.connection.type != Connection.NONE ) {
    	//frame loaded but no user/pwd.
    	//if frame reloads or automatic forward then the event is called again...check loginDone to prevent
    	if( variables.Settings != null && !variables.LoginDone ) {
			$('#btnDoLogin').click();
		}
	}
});

function SecurityController($scope) {

	var securityService = new SecurityService();
	$scope.model = {
		message : "Login in progress",
		class : "loginlistening"
	}
	
	$scope.doLogin = function () {
        console.log("Handler for DoLogin called.");

		securityService.doLogin()
		.done( function ( securityLoginReturn ) {
			console.log("Handler for DoLogin.done called: " + securityLoginReturn.status);
			
			if( securityLoginReturn.status == AJAX_STATUS.SUCCESS ) {		
				//launch login done event
				$scope.$broadcast("LOGIN_DONE", "LOGIN_DONE");
			}

			navigator.notification.alert(
				securityLoginReturn.message,  // message
				function (buttonIndex) { },              // callback to invoke with index of button pressed
				'Connection',            // title
				'OK'          // buttonLabels
			);
		});
	}
}

