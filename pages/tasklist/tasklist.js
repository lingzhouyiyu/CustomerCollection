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
		pageSize: 10,
		hasMoreData: true,
		contentlist: [],
		Keyword: '',

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
		
		var pagination = {
			rows: 10,
			page: page,
			sidx: 'CreateTime',
			sord: 'desc'
		}
		// console.log(app.globalData.mainslerid)
		var queryJson = {
			SalesmanId: app.globalData.mainslerid,
			BeginTimeStart: '',
			BeginTimeEnd: '',
			DeliveryTimeStart: '',
			DeliveryTimeEnd: '',
			DeliveryNo: that.data.Keyword,
			VehNo: ''
		}
		var url = app.globalData.Serverurl + app.wxapi.api_getDeliveryBill;
		var postdata = {
			pagination: pagination,
			queryJson: JSON.stringify(queryJson)
		}
		// console.log(JSON.stringify(postdata))
		wx.showLoading();
		wx.request({
			url: url,
			method: 'POST',
			data: postdata,
			success: function(res) {
				if (res.data.type == 1) {
					that.setData({
						contentlist: res.data.resultdata,
						hasMoreData: true,
						loaded: true,
					})
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
		console.log('下拉');
		wx.showNavigationBarLoading() //在标题栏中显示加载
		page = 1;
		this.setData({
			Keyword: '',
			contentlist: [],
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
		// 页数+1
		page = page + 1;
		this.gettask()

	},

	keywordSearch: function(e) {
		this.gettask()
	},
	lookmap: function(e) {
		pointsarry = [];
		var vehicleNo = e.currentTarget.dataset.carno;
		var startTime = e.currentTarget.dataset.starttime;
		var endTime = e.currentTarget.dataset.endtime;
		var salecode = e.currentTarget.dataset.salecode;
		var queryJson = {
			vehicleNo: vehicleNo,
			startTime: startTime,
			endTime: endTime,
		}
		var url = app.globalData.Serverurl + app.wxapi.api_getLocation;
		wx.setStorageSync("salecode", salecode);
		wx.request({
			url: url,
			method: 'POST',
			data: queryJson,
			success: function(res) {
				if (res.data.type == 1) {
					let length = res.data.resultdata.length;
					if (length > 0) {
						for (var i = 0; i < length; i++) {
							var obj = {};
							obj.longitude = res.data.resultdata[i].Lng;
							obj.latitude = res.data.resultdata[i].lat;
							pointsarry.push(obj);
						}
					}

					wx.setStorageSync("pointsarry", pointsarry);
					wx.navigateTo({
						url: '../../pages/lookmap/lookmap',
					})
				} else {
					wx.showToast({
						title: res.data.message,
						icon: 'none',
						duration: 2000
					})
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
	}
})
