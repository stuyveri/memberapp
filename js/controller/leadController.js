
function LeadController($scope) {

	var leadService = new LeadService();
	$scope.lead = {
		items : [],
		selectedItem : null
	}

	$("#filesLoadedDone").on('filesLoadedDoneEvent', function() {
		console.log("On LeadController.filesLoadedDoneEventNews called.");
	
		$scope.$apply( function( scope ) {
			scope.lead.items = variables.MyLeads;
		});
	});
	
	$scope.addLead = function () {
        console.log("Handler for LeadController.addLead called.");
        
        var newId = 0;
        if( $scope.lead.items != null && $scope.lead.items.length > 0 ) {
	        newId = $scope.lead.items[$scope.lead.items.length-1].Id;
	        if( newId != null ) {
	        	newId = newId + 10;
	        } else {
	        	newId = 0;
	        }
        }
        newId = newId + 10;
        
		var title = $scope.lead_client + " | " + variables.Settings.userName
		var lead = new Lead(null, title, $scope.lead_client, $scope.lead_industry, $scope.lead_contact, $scope.lead_description, $scope.lead_type, variables.Settings.userName);

		leadService.addLead(lead)
		.done( function ( addLeadReturn ) {
			console.log("Handler for addLead.done called: " + addLeadReturn.status);
		
			$scope.$apply( function( scope ) {
				if( addLeadReturn.status == AJAX_STATUS.SUCCESS ) {
					lead.Id = newId;
					if ( variables.MyLeads == null ) {
						variables.MyLeads = [lead];
					} else {
						variables.MyLeads.push(lead);
					}
					scope.lead.items = variables.MyLeads;
					
					leadService.writeSettings();
				}
			});
			
			navigator.notification.alert(
				addLeadReturn.message,  // message
				function (buttonIndex) { },              // callback to invoke with index of button pressed
				'Leads',            // title
				'OK'          // buttonLabels
			);
		});
	}
	
	$scope.getMyLeads = function () {
        console.log("Handler for getMyLeads called.");

		leadService.getMyLeads()
		.done( function ( getMyLeadsReturn ) {
			console.log("Handler for getMyLeads.done called.");
			
			$scope.$apply( function( scope ) {
				if( getMyLeadsReturn.status == AJAX_STATUS.SUCCESS ) {
					scope.lead.items = getMyLeadsReturn.leads;
					variables.MyLeads = getMyLeadsReturn.leads;

					leadService.writeSettings();
				}
			});
			
			navigator.notification.alert(
				getMyLeadsReturn.message,  // message
				function (buttonIndex) { },              // callback to invoke with index of button pressed
				'Leads',            // title
				'OK'          // buttonLabels
			);
		});
	}
	
	$scope.getLeadDetail = function (id) {
        console.log("getLeadDetail selected item: " + id);
		var leadItem = null;
		$($scope.lead.items).each(function (index, lead) {
			if( lead.Id == id ) {
				leadItem = lead;
			}
		});
        console.log("getLeadDetail selected item: " + leadItem.Id + leadItem.Client + leadItem.Industry);
		
		$("#leadClientDetail").text(leadItem.Client);
		$("#leadIndustryDetail").html(leadItem.Industry);
		$("#leadContactDetail").html(leadItem.Contact);
		$("#leadDescriptionDetail").html(leadItem.Description);
		$("#leadLeadTypeDetail").html(leadItem.LeadType);
		
		$.mobile.changePage( $("#leadItem"), {transition: 'none', role: 'dialog'} );
	}
}
