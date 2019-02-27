// pages/favor/favor.js
import {
  Request,
} from '../../utils/request';
import {
  getCityCode
} from '../../utils/util';
let request;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    favorList:null,
    show: false,
    color: ['#F8C3CD','#ECB88A','#A5DEE4','#D9CD90','#B28FCE','#C1328E'],
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getFavorStorage();
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

  getFavorStorage(){
    this.setData({
      loading:true
    })
    const favorate = wx.getStorageSync('favorate') || [],
          favorList = new Array(favorate.length);
    let favor;
    if(favorate.length > 0){
      favorate.forEach((ele,index)=>{
        getCityCode(function (res) {
          request = new Request({
            cid: res.basic[0].cid,
            location: res.basic[0].location,
            parentCity: res.basic[0].parent_city
          });

          let temp = {
            location:res.basic[0].location,
            parentCity: res.basic[0].parent_city
          }

          Promise.all([
            request.getWeatherCurrent(),
            request.getWeatherForecast(),
          ]).then((res)=>{
            const [ 
              weatherCurrent,
              weatherForecast,
            ] = res;
            favor = {
              location:temp.location,
              parentCity: temp.parentCity,
              currentTmp:weatherCurrent.tmp,
              dailyTmpMax:weatherForecast[0].tmp_max,
              dailyTmpMin:weatherForecast[0].tmp_min,
              pop: weatherForecast[0].pop,
              weatherCode: weatherForecast[0].cond_code_d,
              weatherDesD: weatherForecast[0].cond_txt_d,
              weatherDesN: weatherForecast[0].cond_txt_n,
            }
            favorList[index] = favor;
            if(!favorList.includes(undefined)){
              this.setData({
                favorList,
                loading:false,
                show: true
              })
            }
          })
        }, this,ele)
      })
    }else{
      this.setData({
        loading:false,
      })
    }
  },

  onItemDeleted(key){
    console.log(key)
    const favorList = this.data.favorList;
    favorList.splice(key.index,1);
    this.setData({
      favorList,
    })
  }
})