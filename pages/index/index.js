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
    wx.pageScrollTo({
      scrollTop: 0
    });
    let app = getApp();
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
        const [ 
          airQuality,
          lifeStyle,
          sunInfo,
          weatherCurrent,
          weatherForecast,
          weatherHourly,
          lunaInfo,
          detailLocation,
        ] = res;
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
      },(res)=>{
        wx.showModal({
          title: '遇到麻烦了',
          content: '无法找到该地点的天气状况',
          showCancel: false,
          confirmText:"好的",
          success(res) {
              wx.switchTab({
                  url:'/pages/search/search',
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


