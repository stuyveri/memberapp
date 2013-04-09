function NewsController($scope) {
	var newsService = new NewsService();
	$scope.news = {
		items : []
	}
	
	$scope.getNews = function () {
        console.log("Handler for GetNews called.");

		newsService.getNews()
		.done( function ( newsReturn ) {
			console.log("Handler for ProcessNews called.");
			
			$scope.$apply( function( scope ) {
				if( newsReturn.status == AJAX_STATUS.SUCCESS ) {
					scope.news.items = newsReturn.newsItems;
				}
			});

			navigator.notification.alert(
				newsReturn.message,
				function (buttonIndex) { },              // callback to invoke with index of button pressed
				'Get news',            // title
				'OK'          // buttonLabels
			);
		});
	}
}
