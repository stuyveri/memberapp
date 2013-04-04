document.addEventListener("deviceready", onDeviceReadyForSecurity, false);

function onDeviceReadyForSecurity() {
    console.log("onDeviceReady called.");
		
    //enable XSS
    jQuery.support.cors = true;
      
	$('#btnDoLogin').click();
}

function SecurityController($scope) {

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

		// Ajax call for login
		$.ajax({
			type: "POST",
			headers: { "Origin" : "https://partners.logica.com" },
			url: "https://partners.logica.com/uniquesig1a2534a1eb56796c8204da5e414295d6/uniquesig0/InternalSite/Validate.asp",
			data: "user_name=GROUPINFRA%5Cstuyveri&password=Thursday%3F2&repository=EXTERNALINFRA&site_name=partnersportal&secure=1&resource_id=7E229277F6B94B65B4CC3E596074362D&login_type=2",
			success: function ( data, status, xhr ) {
				console.log("DoLogin success.");

				$scope.model.message = "Login done";
				$scope.model.class = "loginreceivedsuccess";

				//$('#btnDoNothing').click();
			},
            error: function ( xhr, status, error ) {
				console.log("error: " + error);
				console.log("status: " + status);

				$scope.model.message = "Login failed";
				$scope.model.class = "loginreceivederror";

				//$('#btnDoNothing').click();
            }
		});
	}
}