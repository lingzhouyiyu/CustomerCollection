// pages/salerlist/salerlist.js
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		salerlist: [],
		Keyword:'',
		hasorder: 0
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var that = this;
		that.getSaler();
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	},
	bindKeywordInput: function(e) {
		var that = this
		that.setData({
			Keyword: e.detail.value
		})
	},
	//获取送达方
	getSaler: function() {
		var that = this;
		that.setData({
			salerlist: [],
		})
		var url = app.globalData.Serverurl + app.wxapi.api_getSaler;
		var queryJson = {
			salesmanId:  app.globalData.mainslerid,
			keyword: that.data.Keyword
		}
		//console.log(JSON.stringify(queryJson));
		wx.showLoading();
		wx.request({
			url: url,
			method: 'POST',
			data: queryJson,
			success: function(res) {
				if (res.data.type == 1 && res.data.resultdata.length > 0) {
					that.setData({
						salerlist: res.data.resultdata,
						loaded: true,
						hasorder: 1
					});
					
					wx.hideLoading();

				} else {
					that.setData({
						salerlist: [],
						loaded: true,
						hasorder: 0
					});
					wx.hideLoading();
				}
			},
			fail: function(res) {
				//console.log(res);
				wx.hideToast();
				wx.showToast({
					title: '调用接口失败',
					icon: 'none',
					duration: 2000
				})
			}
		})
	},
	//列表点击
	checksaler: function(e){
		wx.setStorageSync("providId", e.currentTarget.dataset.salerid);
		wx.navigateTo({
			url: '../../pages/custom/custom',
		})
	},
	
	keywordSearch: function(e) {
		this.getSaler()
	},
	onPullDownRefresh: function() {
		console.log('下拉');
		wx.showNavigationBarLoading() //在标题栏中显示加载
		
		this.setData({
			Keyword: ''
		})
		this.getSaler()
		setTimeout(() => {
			wx.hideNavigationBarLoading()
			wx.stopPullDownRefresh()
		}, 2000);
	
	},
})
