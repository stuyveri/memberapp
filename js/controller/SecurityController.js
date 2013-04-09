document.addEventListener("deviceready", onDeviceReadyForSecurity, false);

function onDeviceReadyForSecurity() {
    console.log("onDeviceReadyForSecurity called.");
	
	(new SecurityService()).enableXSS();

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
	
	$scope.doLogin = function () {
        console.log("Handler for DoLogin called.");

		securityService.doLogin()
		.done( function ( securityLoginReturn ) {
			console.log("Handler for DoLogin.done called: " + securityLoginReturn.status);
		
			$scope.$apply( function( scope ) {
				scope.model.message = securityLoginReturn.message;
			
				if( securityLoginReturn.status == AJAX_STATUS.SUCCESS ) {			
					scope.model.class = "loginreceivedsuccess";
				} else {
					scope.model.class = "loginreceivederror";
				}
			});

			navigator.notification.alert(
				securityLoginReturn.message,  // message
				function (buttonIndex) { },              // callback to invoke with index of button pressed
				'Connection',            // title
				'OK'          // buttonLabels
			);
		});
	}
}

