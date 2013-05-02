function LeadService() {

	this.addLead = function (lead) {
        console.log("Handler for LeadService.addLead called.");
		var addLeadReturn;
		var body = angular.toJson(lead);
		
		console.log("LeadService body: " + body);
		
		if( variables.LoginDone ) {
			// Ajax call
			return $.ajax({
				type: props.ajaxPost,
				contentType: props.jsonContentType,
				url: props.leadUrl,
				data: body
			})
			.fail( function ( xhr, status, error ) {
				console.log("LeadService error: " + error);
				console.log("LeadService status: " + status);

				addLeadReturn = new AddLeadReturn( "Lead creation failed: " + error, AJAX_STATUS.ERROR );
			})
			.done( function ( data, status, xhr ) {
			
				console.log("LeadService.addLead success.");
			
				addLeadReturn = new AddLeadReturn( "Lead creation successfull! ", AJAX_STATUS.SUCCESS );
			})
			.pipe( function ( ) {
				console.log("LeadService.addLead pipe called.");
				return addLeadReturn;
			});
		} else {
			var deferred = $.Deferred();
			return deferred.resolve( new AddLeadReturn( "Login not done", null, AJAX_STATUS.ERROR ) );
		}
	};

	this.getMyLeads = function () {
        console.log("Handler for LeadService.getMyLeads called.");
        var getMyLeadsReturn;
        
        var url = props.leadFilter1 + variables.Settings.userName + props.leadFilter2;
		console.log("LeadService.getMyLeads url: " + url);
		
		if( variables.LoginDone ) {
			// Ajax call
			return $.ajax({
				url: url,
				headers: { "Accept" : "application/json" }
			})
			.fail( function ( xhr, status, error ) {
				console.log("LeadService.getMyLeads error: " + error);
				console.log("LeadService.getMyLeads status: " + status);

				getMyLeadsReturn = new GetMyLeadsReturn( "Leads retrieving failed: " + error, null, AJAX_STATUS.ERROR );
			})
			.done( function ( data, status, xhr ) {
				console.log("LeadService.getMyLeads success. data.d: " + data.d.length );
				var leads = [];

				$(data.d).each(function (index, lead) {
					var lead = new Lead(lead.Id, lead.Title, lead.Client, lead.Industry, lead.Contact, lead.Description, lead.LeadType, lead.CreatorUserName);
					leads.push(lead);
				});
			
				getMyLeadsReturn = new GetMyLeadsReturn( "Leads retrieved successfully! ", leads, AJAX_STATUS.SUCCESS );
			})
			.pipe( function ( ) {
				console.log("LeadService.getMyLeads pipe called.");
				return getMyLeadsReturn;
			});
		} else {
			var deferred = $.Deferred();
			return deferred.resolve( new GetMyLeadsReturn( "Login not done", null, AJAX_STATUS.ERROR ) );
		}
	};

	this.writeSettings = function () {
        console.log("Handler for LeadService.writeSettings called.");
		
		doWrite();
	};
}