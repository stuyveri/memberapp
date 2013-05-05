//All in capital as the object is used to synch with SharePoint
function Lead(idIn, titleIn, clientIn, industryIn, contactIn, descriptionIn, leadTypeIn, creatorUserNameIn) {
	this.Id = idIn;
	this.Title = titleIn;
	this.Client = clientIn;
	this.Industry = industryIn;
	this.Contact = contactIn;
	this.Description = descriptionIn;
	this.LeadType = leadTypeIn;
	this.CreatorUserName = creatorUserNameIn;
}

function AddLeadReturn(messageIn, statusIn) {
	this.message = messageIn;
	this.status = statusIn;
}

function GetMyLeadsReturn(messageIn, leadsIn, statusIn) {
	this.message = messageIn;
	this.leads = leadsIn;
	this.status = statusIn;
}