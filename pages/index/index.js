//index.js
//获取应用实例
var app = getApp()

Page({
	data: {
		userInfo: '',
		hasUserInfo: false,
		mobileNo: ''
	},
	onLoad: function() {
		var Name = wx.getStorageSync('Name');
		var that = this
		
		app.getToken();
		app.getLoaction();
		var that = this
		that.setData({
			userInfo: Name ,
		})
		
	},
	gobind: function() {
		wx.navigateTo({
			url: '../../pages/bindtel/bindtel',
		})

	},
	goadd: function() {
		wx.navigateTo({
			url: '../../pages/form/form',
		})
	
	},
	gotask: function() {
		wx.navigateTo({
			url: '../../pages/tasklist/tasklist',
		})
	
	},
	goprovider: function() {
		wx.navigateTo({
			url: '../../pages/provider/provider',
		})
	
	},
})
