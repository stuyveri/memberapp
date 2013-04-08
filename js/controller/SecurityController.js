document.addEventListener("deviceready", onDeviceReadyForSecurity, false);

function onDeviceReadyForSecurity() {
    console.log("onDeviceReadyForSecurity called.");
	
	(new SecurityService()).EnableXSS();

	//check connection
	console.log("Connection: " + navigator.connection.type);
    if( navigator.connection.type != Connection.NONE ) {
		$('#btnDoLogin').click();
	}
}

function SecurityController($scope) {

	var securityService = new SecurityService();
	$scope.model = {
		message : "Login in progress",
		class : "loginlistening"
	}
	
	$scope.DoNothing = function () {
        console.log("Handler for SecurityController.DoNothing called.");
		// just refresh page
	}
	
	$scope.DoLogin = function () {
        console.log("Handler for DoLogin called.");

		securityService.DoLogin()
		.done( function ( securityLoginReturn ) {
			console.log("Handler for DoLogin.done called: " + securityLoginReturn.status);
		
			$scope.model.message = securityLoginReturn.message;
			
			if( securityLoginReturn.status == AJAX_STATUS.SUCCESS ) {			
				$scope.model.class = "loginreceivedsuccess";
			} else {
				$scope.model.class = "loginreceivederror";
			}

			navigator.notification.alert(
				securityLoginReturn.message,  // message
				function (buttonIndex) { },              // callback to invoke with index of button pressed
				'Connection',            // title
				'OK'          // buttonLabels
			);

			$('#btnDoNothing').click();
		});
	}
}

