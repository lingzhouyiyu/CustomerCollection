//index.js
//获取应用实例
const app = getApp()
var pointsarry = [];
var page = 1;
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		pageSize: 30,
		hasMoreData: true,
		contentlist: [],
		Keyword: '',
		isup: 0	//是否上拉

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var that = this;
		that.gettask()
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

	gettask: function() {
		var that = this;
		var providId = wx.getStorageSync('providId');
		var pagination = {
			rows: 10,
			page: page,
			sidx: 'CreateDate',
			sord: 'desc'
		}
		var url = app.globalData.Serverurl + app.wxapi.api_getTerminalCustomer;
		var postdata = {
			pagination: pagination,
			salesmanId: app.globalData.mainslerid,
			salerId: providId,
			keyword:that.data.Keyword,
		}
		// console.log(JSON.stringify(postdata))
		wx.showLoading();
		wx.request({
			url: url,
			method: 'POST',
			data: postdata,
			success: function(res) {
				if (res.data.type == 1) {
					if(that.data.isup == 1){
						if(res.data.resultdata.length > 0){
							pointsarry.push(res.data.resultdata);
						}
						that.setData({
							contentlist: pointsarry,
							hasMoreData: true,
							loaded: true,
						})
						// console.log(pointsarry);
					}else{
						pointsarry = [];
						that.setData({
							contentlist: res.data.resultdata,
							hasMoreData: true,
							loaded: true,
						})
						pointsarry = res.data.resultdata;
					}
					wx.hideLoading();

				} else {
					that.setData({
						contentlist: [],
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
	onPullDownRefresh: function() {
		wx.showNavigationBarLoading() //在标题栏中显示加载
		page = 1;
		this.setData({
			Keyword: '',
			contentlist: [],
			isup: 0,
		})
		this.gettask()
		
		setTimeout(() => {
			wx.hideNavigationBarLoading()
			wx.stopPullDownRefresh()
		}, 2000);

	},
	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {
		var that = this;
		// 显示加载图标
		wx.showLoading({
			title: '玩命加载中',
		})
		that.setData({
			isup: 1,
		})
		// 页数+1
		page = page + 1;
		this.gettask()

	},

	keywordSearch: function(e) {
		this.gettask()
	}
})
