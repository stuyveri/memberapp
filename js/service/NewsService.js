function NewsService() {

	this.DoNothing = function (callback) {
        console.log("Handler for NewsService.DoNothing called.");
		callback();
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
