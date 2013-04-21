
function SettingsController($scope) {
	var localSettingsService = new settingsService();

	
	$("#filesLoadedDone").on('filesLoadedDoneEvent', function() {
		console.log("On filesLoadedDoneEvent called in SettingsController.");
	
	
		//$scope.$apply( function( scope ) {
			if( variables.Settings != null ) {
				//scope.setting.user = variables.Settings.userName;
				//scope.setting.password = variables.Settings.password;

				$("#setting_user").val(variables.Settings.userName);
				$("#setting_password").val(variables.Settings.password);
			}
		//}
	});
	
	$scope.updateSettings = function () {
        console.log("Handler for settingsController.updateSettings called.");
		
		var settings = new Settings($scope.setting.user, $scope.setting.password);
		variables.Settings = settings;
		localSettingsService.writeSettings();
	}
}
