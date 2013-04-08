function NewsController($scope) {
	var newsService = new NewsService();
	$scope.model = {
		newsItems : []
	}
	
	$scope.AddNewsItem = function (title, col1) {
		$scope.newsItems.push(new News(title, col1));
	}
	
	$scope.DoNothing = function () {
        console.log("Handler for NewsController.DoNothing called.");
		// just refresh page

		newsService.DoNothing($scope.DoSomething);
	}
	
	$scope.DoSomething = function () {
        console.log("Handler for NewsController.DoSomething called.");
	}
	
	$scope.GetNews = function () {
        console.log("Handler for GetNews called.");

		newsService.GetNews()
		.done( function ( newsReturn ) {
			console.log("Handler for ProcessNews called.");

			if( newsReturn.status == AJAX_STATUS.SUCCESS ) {
				$scope.model.newsItems = newsReturn.newsItems;
			}

			navigator.notification.alert(
				newsReturn.message,
				function (buttonIndex) { },              // callback to invoke with index of button pressed
				'Get news',            // title
				'OK'          // buttonLabels
			);

			$('#btnDoNothing').click();
		});
	}
}