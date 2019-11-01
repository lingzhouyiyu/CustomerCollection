//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    mobileNo: ''
  },
  onLoad: function () {

  },
  telput: function (e) {
    var that = this
    that.setData({
      mobileNo: e.detail.value
    })
  },
  bindAccount: function () {
    var that = this;
    var url = app.globalData.Serverurl + app.wxapi.api_BindingSalesman;
    var queryJson = {
      openId: app.globalData.openId,
      mobileNo: that.data.mobileNo
    }
    console.log(queryJson)
    if (that.data.mobileNo == '' || that.data.mobileNo == null) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    wx.request({
      url: url,
      method: 'POST',
      data: queryJson,
      success: function (res) {
        console.log(res);
        if (res.data.type == 1) {
			wx.showModal({
				title: '系统提示', //标题(可为空或者省略)
				content: res.data.message,
				confirmText: '确定',
				confirmColor: '#333ccc',
				showCancel: false, //设置cancel是否展示
				success: function(res) {
					if (res.confirm) {
						wx.navigateBack({
						  delta: 1
						})
					}
				}
			})
		  app.getSales();
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }

      },
      fail: function (res) {
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
