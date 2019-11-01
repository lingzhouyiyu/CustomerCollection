// pages/form/form.js
var app = getApp()
var imgs; // 图片
var PhysicalPhoto = []; // 
var param = {};
var b = [];
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		items: [{
				name: '1',
				value: '是',
				checked: 'true'
			},
			{
				name: '0',
				value: '否'
			},
		],
		ClientType: ['一般工程', '中小型预制厂', '中小预制厂', '区域经销商', '华新商混站', '华新集团内客户(非商混站)', '司机', '商混站', '大型预制厂', '物流运输商', '码头中转库',
			'砂浆站', '竞争对手', '终端门店', '经销商-一般工程', '经销商-工业', '经销商-重点工程', '综合集团客'
		],
		BusinessArea: ['楚雄片区', '迪庆片区', '东川片区', '富民片区', '个旧片区', '工业-昆明片区', '剑川片区', '景洪片区', '开远片区', '丽攀片区', '临沧片区', '民用-昆明片区',
			'云龙片区', '昭通片区', '重点-昆明片区'
		],
		BusinessScope: ['水泥店', '建材店', '五金店', '农资店', '砖瓦预制厂', '管制厂', '重点', '一般工程', '商混站'],
		ClientStatus: ['潜在', '在供', '流失', '转行或完工'],
		ConsortStatus: ['专营或专供', '主营或主供', '兼营或辅供', '未合作'],
		DepartmentName: ['楚雄片区', '迪庆片区', '东川片区', '富民片区', '个旧片区', '工业-昆明片区', '剑川片区', '景洪片区', '开远片区', '丽攀片区', '临沧片区',
			'民用-昆明片区', '云龙片区', '昭通片区', '重点-昆明片区'
		],
		SalesChannel: ['直销', '分销'],
		TakeGoodsType: ['公司配送', '经销商配送', '自有车辆自提', '委托固定车辆自提', '委托非固定车辆自提', '船运自提'],
		ShopSign: ['自有', '竞争对手投入', '华新投入', '无'],
		BusinessName: [],
		Clienttxt: '',
		BusinessScopetxt: '',
		BusinessScopecheck: '',
		ClientStatustxt: '',
		ClientStatuscheck: '',
		ClientTypetxt: '',
		ClientTypecheck: '',
		ConsortStatustxt: '',
		ConsortStatuscheck: '',
		DepartmentNametxt: '',
		DepartmentNamecheck: '',
		BusinessAreatxt: '',
		BusinessAreacheck: '',
		SalesChanneltxt: '',
		SalesChannelcheck: '',
		ShopSigntxt: '',
		ShopSigncheck: '',
		TakeGoodsTypetxt: '',
		TakeGoodsTypecheck: '',
		DealerName: '',
		Linkman: '',
		LinkTel: '',
		YearDemand: '',
		StorageCapatcity: '',
		Commenttxt: '',
		IsMain: 1,
		imgs: [],
		SalerId: '',
		SalerName: '请选择',

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		// app.getLoaction();
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
	// 客户类型
	bindClientType: function(e) {
		var that = this
		that.setData({
			Clienttxt: e.detail.value,
			ClientTypecheck: that.data.ClientType[e.detail.value]
		})
	},
	bindBusinessScope: function(e) {
		var that = this
		that.setData({
			BusinessScopetxt: e.detail.value,
			BusinessScopecheck: that.data.BusinessScope[e.detail.value]
		})

	},
	bindClientStatus: function(e) {
		var that = this
		that.setData({
			ClientStatustxt: e.detail.value,
			ClientStatuscheck: that.data.ClientStatus[e.detail.value]
		})

	},
	bindConsortStatus: function(e) {
		var that = this
		that.setData({
			ConsortStatustxt: e.detail.value,
			ConsortStatuscheck: that.data.ConsortStatus[e.detail.value]
		})
	},
	bindDepartment: function(e) {
		var that = this
		that.setData({
			DepartmentNametxt: e.detail.value,
			DepartmentNamecheck: that.data.DepartmentName[e.detail.value]
		})
	},
	bindBusinessArea: function(e) {
		var that = this
		that.setData({
			BusinessAreatxt: e.detail.value,
			BusinessAreacheck: that.data.BusinessArea[e.detail.value]
		})
	},
	bindSalesChannel: function(e) {
		var that = this
		that.setData({
			SalesChanneltxt: e.detail.value,
			SalesChannelcheck: that.data.SalesChannel[e.detail.value]
		})
	},
	bindShopSign: function(e) {
		var that = this
		that.setData({
			ShopSigntxt: e.detail.value,
			ShopSigncheck: that.data.ShopSign[e.detail.value]
		})
	},
	bindTakeGoodsType: function(e) {
		var that = this
		that.setData({
			TakeGoodsTypetxt: e.detail.value,
			TakeGoodsTypecheck: that.data.TakeGoodsType[e.detail.value]
		})
	},
	Comment: function(e) {
		var that = this
		that.setData({
			Commenttxt: e.detail.value
		})
	},
	StorageCapatcity: function(e) {
		var that = this
		that.setData({
			StorageCapatcity: e.detail.value
		})
	},
	YearDemand: function(e) {
		var that = this
		that.setData({
			YearDemand: e.detail.value
		})
	},
	DealerName: function(e) {
		var that = this
		that.setData({
			DealerName: e.detail.value
		})
	},
	Linkman: function(e) {
		var that = this
		that.setData({
			Linkman: e.detail.value
		})
	},
	LinkTel: function(e) {
		var that = this
		that.setData({
			LinkTel: e.detail.value
		})
	},
	//获取收货方
	getSaler: function() {
		app.getLoaction();
		var that = this;
		var url = app.globalData.Serverurl + app.wxapi.api_getSaler;
	},
	radioChange: function(e) {
		var that = this;
		var setmain = JSON.parse(e.detail.value);
		console.log(setmain.name);
		that.setData({
			IsMain: setmain.name
		})

	},
	//添加
	AdddTerminalCustomer: function() {
		var that = this;
		app.getLoaction();
		var url = app.globalData.Serverurl + app.wxapi.api_checkName;
		var queryJson = {
			name: that.data.DealerName
		}
		wx.request({
			url: url,
			method: 'POST',
			data: queryJson,
			success: function(res) {
				if (res.data.type == 1) {
					if (res.data.resultdata == true) {
						that.checkName();
					} else {
						wx.showModal({
							title: '系统提示',
							content: '该客户已存在，是否确认更新信息？',
							success: function(res) {
								if (res.confirm) {
									that.checkName();
								} else {
									return;
								}
							}
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
	},
	checkName: function() {
		var that = this;
		var url = app.globalData.Serverurl + app.wxapi.api_AdddTerminalCustomer;
		var entity = {
			SalerId: that.data.SalerId,
			SalerName: that.data.SalerName,
			Name: that.data.DealerName,
			AreaName: that.data.BusinessAreacheck,
			NationCode: '',
			NationName: app.globalData.address_component.nation,
			ProvinceCode: '',
			ProvinceName: app.globalData.address_component.province,
			CityCode: '',
			CityName: app.globalData.address_component.city,
			CountyCode: '',
			CountyName: app.globalData.address_component.district,
			TownName: app.globalData.address_component.street,
			Address: app.globalData.curaddr,
			Longitude: app.globalData.longitude,
			Latitude: app.globalData.latitude,
			LinkMan: that.data.Linkman,
			Mobile: that.data.LinkTel,
			IsMain: that.data.IsMain,
			Email: '',
			CoordinateType: '腾讯地图',
			ClientType: that.data.ClientTypecheck,
			BusinessScope: that.data.BusinessScopecheck,
			ConsortStatus: that.data.ConsortStatuscheck,
			ClientStatus: that.data.ClientStatuscheck,
			DepartmentName: that.data.DepartmentNamecheck,
			SalesChannel: that.data.SalesChannelcheck,
			TakeGoodsType: that.data.TakeGoodsTypecheck,
			ShopSign: that.data.ShopSigncheck,
			YearDemand: that.data.YearDemand,
			StorageCapatcity: that.data.StorageCapatcity,
			Comment: that.data.Commenttxt,
		}
		var queryJson = {
			entity: entity,
			Imgs: that.data.PhysicalPhoto,
		}
		// console.log(entity);
		wx.showLoading();
		wx.request({
			url: url,
			method: 'POST',
			data: queryJson,
			success: function(res) {

				if (res.data.type == 1) {
					wx.hideLoading()
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


	},
	// 上传图片
	chooseImg: function(e) {
		var that = this;
		imgs = this.data.imgs;
		if (imgs.length >= 9) {
			this.setData({
				lenMore: 1
			});
			setTimeout(function() {
				that.setData({
					lenMore: 0
				});
			}, 2500);
			return false;
		}
		wx.chooseImage({
			// count: 1, // 默认9
			sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有 'original', 
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: function(res) {
				// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
				var tempFilePaths = res.tempFilePaths;
				imgs = that.data.imgs;
				for (var i = 0; i < tempFilePaths.length; i++) {
					wx.getFileSystemManager().readFile({
						filePath: res.tempFilePaths[i], //选择图片返回的相对路径
						encoding: 'base64', //编码格式
						success: res => { //成功的回调
							param = 'data:image/jpg;base64,' + res.data;
							that.setData(param);
							if (PhysicalPhoto != null) {
								b = PhysicalPhoto;
							}
							b.push(param);
							console.log(b);
							let Length = b.length;
							that.setData({
								// ['PhysicalPhoto[' + Length + ']']: b,
								PhysicalPhoto: b
							});
							PhysicalPhoto = that.data.PhysicalPhoto;

							console.log('64图：', PhysicalPhoto);

						}
					})

					if (imgs.length >= 9) {
						that.setData({
							imgs: imgs
						});
						return false;
					} else {
						imgs.push(tempFilePaths[i]);
					}
				}
				console.log("图片：", imgs);
				that.setData({
					imgs: imgs
				});
			}
		});
	},
	// 删除图片
	deleteImg: function(e) {
		var that = this;
		var imgs = that.data.imgs;
		var index = e.currentTarget.dataset.index;
		imgs.splice(index, 1);

		var imtPhysicalPhoto = that.data.PhysicalPhoto;
		var index = e.currentTarget.dataset.index;
		imtPhysicalPhoto.splice(index, 1);

		that.setData({
			imgs: imgs,
			PhysicalPhoto: imtPhysicalPhoto
		});
	},
	// 预览图片
	previewImg: function(e) {
		//获取当前图片的下标
		var index = e.currentTarget.dataset.index;
		//所有图片
		var imgs = this.data.imgs;
		wx.previewImage({
			//当前显示图片
			current: imgs[index],
			//所有图片
			urls: imgs
		})
	},
	gogetSaler: function() {
		app.getLoaction();
		wx.navigateTo({
			url: '../../pages/salerlist/salerlist',
		})
	},
})
