function NewsController($scope) {
	$scope.newsItems = [];
	var newsService = new NewsService();
	
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

		newsService.GetNews($scope.ProcessNews);
	}
	
	$scope.ProcessNews = function ( data ) {
        console.log("Handler for ProcessNews called.");
		
		console.log("data.d: " + data.d.results.length);

        $(data.d.results).each(function (index, news) {
            var news = new News(news.Title, news.Col1);
            $scope.newsItems.push(news);
        });

		$('#btnDoNothing').click();
	}
}