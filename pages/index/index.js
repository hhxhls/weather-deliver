// pages/index/index.js

import {
  Request,
} from '../../utils/request';
import {
  getCityCode
} from '../../utils/util';

import {
  getDetailLocation
} from '../../utils/position';

// 未获得和风天气API权限的天气用TEST的实例模拟请求数据
import {
  Test 
}from '../../utils/test'

let request,
    test;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityId: null,
    airQuality: null,
    lifeStyle:null,
    sunInfo:null,
    weatherCurrent:null,
    weatherForecast:null,
    weatherHourly:null,
    lunaInfo: null,
    detailLocation:null,
    location: '',
    loading: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    let app = getApp();
    if(this.data.location === app.searchWord){
      return;
    }
    wx.pageScrollTo({
      scrollTop: 0
    });

    let searchWord = app.searchWord;
    if(!searchWord){
      searchWord = null;
    }
    this.setPageData(searchWord);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  setPageData(searchWord = null) {
    const that = this;
    this.setData({
      loading:true
    })
    getCityCode(function (res) {
      this.setData({
        cityId: res.basic[0].cid,
        location: res.basic[0].location,
        parentCity: res.basic[0].parent_city,
      });

      request = new Request({
        cid: this.data.cityId,
        location: this.data.location,
        parentCity: this.data.parentCity
      });
      test = new Test();
      Promise.all([
        request.getAirQuality(),
        request.getLifeStyle(),
        request.getSunInfo(),
        request.getWeatherCurrent(),
        request.getWeatherForecast(),
        test.getWeatherHourly(),
        request.getLunaInfo(),
        getDetailLocation(searchWord),
      ]).then((res)=>{
        let [ 
          airQuality,
          lifeStyle,
          sunInfo,
          weatherCurrent,
          weatherForecast,
          weatherHourly,
          lunaInfo,
          detailLocation,
        ] = res;

        // 解决安卓对协议的不兼容问题
        if(lunaInfo === undefined){
          lunaInfo = {error:true};
          console.log(lunaInfo);
        }
        // 如果是搜索关键词的情况下，采用location作为地址
        if(detailLocation.district === 'search'){
            detailLocation.district = this.data.parentCity;
            if(this.data.parentCity !== this.data.location){
              detailLocation.street_number = this.data.location;
            };
            this.setHistory(this.data.location);
        }
          this.setData({
            airQuality,
            lifeStyle,
            sunInfo,
            weatherCurrent,
            weatherForecast,
            weatherHourly,
            lunaInfo,
            detailLocation,
            loading:false,
          });
          let app = getApp();
          app.searchWord =this.data.location;

          // 在缓存中存取本次请求结果，搜索失败时会取出作为页面缓存。
          const lastTimeIndexData = this.data;
          wx.setStorageSync('lastTimeIndexData',lastTimeIndexData);
      },(res)=>{
        wx.showModal({
          title: '遇到麻烦了',
          content: '无法找到该地点的天气状况',
          showCancel: false,
          confirmText:"好的",
          success(res) {
            const lastTimeIndexData = wx.getStorageSync('lastTimeIndexData');
            that.setData({
              airQuality:lastTimeIndexData.airQuality,
              lifeStyle:lastTimeIndexData.lifeStyle,
              sunInfo:lastTimeIndexData.sunInfo,
              weatherCurrent:lastTimeIndexData.weatherCurrent,
              weatherForecast:lastTimeIndexData.weatherForecast,
              weatherHourly:lastTimeIndexData.weatherHourly,
              lunaInfo:lastTimeIndexData.lunaInfo,
              detailLocation:lastTimeIndexData.detailLocation,
              loading:false,
            })
          }
        })
        throw new Error(res);
      })
    }, this,searchWord)

  },

  setHistory(location){
    let arr = wx.getStorageSync('searchHistory') || [];
    if(arr.length >= 8){
      arr.pop();
    }
    arr.unshift(location);
    arr = Array.from(new Set(arr));
    wx.setStorageSync('searchHistory',arr);
  }
})


