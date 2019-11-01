// pages/about/about.js
const app = getApp()
var circlesarry = [];
Page({

	/**
	 * 页面的初始数据
	 * 
	 */
	data: {
		polyline: [{
			points: [],
			color: "#3777FF",
			width: 6,
			dottedLine: false,
			arrowLine: true,
			borderColor: "#fff",
			borderWidth: 5
		}],
		markers: [],
		salecode: '',
		circles: [],
		 devwidth: app.globalData.devwidth,
		 devheight: app.globalData.devheight,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var pointsarry = wx.getStorageSync('pointsarry');
		// console.log(pointsarry);
		var that = this
		that.setData({
			polyline: [{
				points: pointsarry,
				color: "#3777FF",
				width: 6,
				dottedLine: false,
				arrowLine: true,
				borderColor: "#fff",
				borderWidth: 5
			}],
		})
		that.getcircle()
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
		wx.removeStorageSync('pointsarry');
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
	getcircle: function() {
		var that = this
		
		var salerCode = wx.getStorageSync('salecode');
		var queryJson = {
			salerCode: salerCode,
		}
		var url = app.globalData.Serverurl + app.wxapi.api_GetAddressList;
		wx.request({
			url: url,
			method: 'POST',
			data: queryJson,
			success: function(res) {
				if (res.data.type == 1) {
					let length = res.data.resultdata.length;
					let startlng,startlat,endlng,endlat;
					if (length > 0) {
						for (var i = 0; i < length; i++) {
							var obj = {};
							obj.longitude = res.data.resultdata[i].Longitude;
							obj.latitude = res.data.resultdata[i].Latitude;
							obj.radius = res.data.resultdata[i].Distance;
							obj.color = '#FF0000DD';
							obj.fillColor = '#7cb5ec88';
							obj.strokeWidth = 1;
							circlesarry.push(obj);
						}
						startlng = res.data.resultdata[0].Longitude;
						startlat =  res.data.resultdata[0].Latitude;
						endlng = res.data.resultdata[length-1].Longitude;
						endlat =  res.data.resultdata[length-1].Latitude;
						that.setData({
							circles: circlesarry,
							markers: [{
									iconPath: "../../common/images/center.png",
									id: 0,
									latitude: startlat,
									longitude: startlng,
									width: 50,
									height: 50,
									alpha: 0.8,
									callout: {
										content: " 起点 ",
										color: "#ffffff",
										fontSize: 10,
										borderRadius: 10,
										bgColor: "#6e707c",
										padding: 5,
										display: "ALWAYS"
									}
								},
								{
									iconPath: "../../common/images/user.png",
									id: 1,
									latitude: endlat,
									longitude: endlng,
									width: 50,
									height: 50,
									alpha: 0.8,
									callout: {
										content: " 终点 ",
										color: "#ffffff",
										fontSize: 10,
										borderRadius: 10,
										bgColor: "#6e707c",
										padding: 5,
										display: "ALWAYS"
									}
								}
							],
						})
					}
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
