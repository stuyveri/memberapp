function settingsService() {

	this.writeSettings = function () {
        console.log("Handler for settingsService.getSettings called.");
		
		doWrite();
	};

	this.clearData = function () {
        console.log("Handler for settingsService.clearSettings called.");
		
		clearFile();
	};
}