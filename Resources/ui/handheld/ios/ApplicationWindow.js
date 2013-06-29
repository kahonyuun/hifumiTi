//Application Window Component Constructor
function ApplicationWindow() {
	//declare module dependencies
	var rss = require('services/rss'),
		MasterView = require('ui/common/MasterView'),
		DetailView = require('ui/common/DetailView');

	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});

	//construct UI
	//TODO masterView = 
	//TODO detailView = 
	var masterView = new MasterView(),
		detailView = new DetailView();

	//ヘッダーcreate master view container＊＊＊＊＊＊＊＊＊＊＊
	var masterContainerWindow = Ti.UI.createWindow({
		title:'一記事×2ch×三行〜ひふみ〜'
	});
	var Rbutton = Ti.UI.createButton({
		systemButton: Ti.UI.iPhone.SystemButton.REFRESH
	});
	Rbutton.addEventListener('click', function(e) {
		refresh-hifumi();
	});		
	masterContainerWindow.rightNavButton = Rbutton;
	masterContainerWindow.add(masterView);
	//＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊


	//create detail view container
	var detailContainerWindow = Ti.UI.createWindow();
	detailContainerWindow.add(detailView);

	//create iOS specific NavGroup UI
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:masterContainerWindow
	});
	self.add(navGroup);

	//add behavior for master view
	masterView.addEventListener('itemSelected', function(e) {
		detailView.showArticle(e.link);
		navGroup.open(detailContainerWindow);
	});
	
	function refresh_hifumi() {
		rss.loadRssFeed({
			success: function(data) {
	    		masterView.refreshRssTable(data);
	    	}
		});
	}
	
	// load initial rss feed
	refresh_hifumi();
	
	return self;
};
module.exports = ApplicationWindow;