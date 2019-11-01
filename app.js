//app.js
var QQMapWX = require('common/js/qqmap-wx-jssdk.min.js');
var qqmapsdk = new QQMapWX({
  key: 'INFBZ-FAZK3-S2W3B-3UOH3-NOGL2-XJBIS' // 必填
});
// AppID: wxda6886ea2aaddb03
// AppSecret: fec29e669ea032567b70878d0d696d0a

App({
  globalData: {
    Serverurl: "https://hx.pailetec.com",
    Name: '',
    openId: '',
    latitude: null,
    longitude: null,
    locationString: null,
    curaddr: null,
    address_component: null,
    mainslerid: '',
    devwidth: '',
    devheight: '',
  },
  wxapi: {
    api_getOpenId: '/ApiManage/Applet/getOpenId/', //登录授权
    api_BindingSalesman: '/ApiManage/Applet/BindingSalesman/', //绑定业务员
    api_getSalesman: '/ApiManage/Applet/getSalesmanByOpenId/', //据OpenId查询业务员
    api_getSaler: '/ApiManage/Applet/getSaler/', //获取送达方
    api_getTerminalCustomer: '/ApiManage/Applet/getTerminalCustomer/', //获取终端客户
    api_getDeliveryBill: '/ApiManage/Applet/getDeliveryBill/', //获取交货单
    api_getLocation: '/ApiManage/Applet/getLocation/', //运输轨迹
    api_GetAddressList: '/ApiManage/Applet/GetAddressList/', //交货地址坐标列表
    api_AdddTerminalCustomer: '/ApiManage/Applet/AdddTerminalCustomer/', //添加终端客户
    api_GetPresentation: '/MobileDevices/GetPresentation', //首页统计
	api_checkName: '/ApiManage/Applet/CheckTerminalCustomerName', //检查名字是否存在
  },
  onLaunch: function() {
    var app = this;
    wx.getSystemInfo({
      success: function(res) {
        app.globalData.devwidth = res.windowWidth;
        app.globalData.devheight = res.windowHeight;

      }
    })
    const updateManager = wx.getUpdateManager(); // 获取更新管理器对象
    updateManager.onCheckForUpdate(function(res) {
      // console.log(res)    检测更新结果
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function() {
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，点击确定重新启动',
            showCancel: false,
            success: res => {
              if (res.confirm) {
                updateManager.applyUpdate();
              }
            }
          })
        })
        updateManager.onUpdateFailed(function() {
          wx.showModal({
            title: '提示',
            content: '检查到有新版本，但是下载失败，请检查网络设置',
            showCancel: false
          })
        })
      }
    })
  },

  onLoad: function(options) {

  },
  getToken: function() {
    var app = this;
    var url = app.globalData.Serverurl + app.wxapi.api_getOpenId;
    wx.login({
      //获取code
      success: function(res) {
        var code = res.code; //返回code
        var queryJson = {
          code: code
        }
        // console.log(res);
        wx.request({
          url: url,
          method: 'POST',
          data: queryJson,
          success: function(res) {
            if (res.data.type == 1) {
              var resultdata = JSON.parse(res.data.resultdata);
              // console.log(resultdata)
              app.globalData.openId = resultdata.openid;
              console.log(resultdata.openid)
              app.getSales()
            } else {

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
  },
  getSales: function() {
    var app = this;
    var url = app.globalData.Serverurl + app.wxapi.api_getSalesman;
    var queryJson = {
      openId: app.globalData.openId
    }
    //console.log(JSON.stringify(queryJson));
    wx.request({
      url: url,
      method: 'POST',
      data: queryJson,
      success: function(res) {
        if (res.data.type == 1) {
          app.globalData.mainslerid = res.data.resultdata.Id;
          app.globalData.Name = res.data.resultdata.Name;
          wx.setStorageSync("Name", res.data.resultdata.Name);
        } else {

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
  getLoaction: function() {
    var app = this;
    // 获取定位，并把位置标示出来
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function(res) {
        console.log(res)
        app.globalData.longitude = res.longitude,
          app.globalData.latitude = res.latitude,
          app.globalData.locationString = res.latitude + "," + res.longitude
        app.geocoder(res.latitude + "," + res.longitude);
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  //逆地址解析
  geocoder: function(locationString) {
    var app = this;
    qqmapsdk.reverseGeocoder({
      location: locationString,
      success: function(res) { //成功后的回调
        console.log(res);
        app.globalData.curaddr = res.result.formatted_addresses.recommend
        app.globalData.address_component = res.result.address_component

      },
      fail: function(error) {
        // console.error(error);
      },
      complete: function(res) {
        // console.log(res);
      }
    })

  },
})