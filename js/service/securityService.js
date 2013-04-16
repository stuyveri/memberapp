function SecurityService() {

	this.enableXSS = function () {
		//enable XSS
		jQuery.support.cors = true;
	};

	this.doLogin = function () {
        console.log("Handler for SecurityService.DoLogin called.");
		var securityLoginReturn;
		
		// Ajax call for login
		return $.ajax({
			type: "POST",
			headers: { "Origin" : "https://partners.logica.com" },
			url: props.loginUrl,
			data: props.loginData
		})
		.fail( function ( xhr, status, error ) {
			console.log("SecurityService error: " + error);
			console.log("SecurityService status: " + status);

			securityLoginReturn = new SecurityLoginReturn( "Login failed: " + error, AJAX_STATUS.ERROR );
			variables.LoginDone = false;
		})
		.done( function ( data, status, xhr ) {
			
			console.log("SecurityService.DoLogin success.");
			
			securityLoginReturn = new SecurityLoginReturn( "Login successfull! ", AJAX_STATUS.SUCCESS );
			variables.LoginDone = true;
		})
		.pipe( function ( ) {
			console.log("pipe called.");
			return securityLoginReturn;
		});
	};
}