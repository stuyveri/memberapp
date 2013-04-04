function SecurityService() {

	this.SetXss = function () {
        console.log("Handler for SecurityService.SetXss called.");
		//enable XSS
		jQuery.support.cors = true;
	};

	this.GetNews = function (successCallback) {
        console.log("Handler for NewsService.GetNews called.");

		$.ajax({
            url: properties.newsUrl,
            headers: { "Accept" : "application/json" },
            error: function ( xhr, status, error ) {
				console.log("error: " + error);
				console.log("status: " + status);
            }
        }).done( successCallback ); 
	};
}