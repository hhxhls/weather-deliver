// component/like/cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    liked: Boolean,    
    location:{
      type:String,
      observer(newvalue){
        const favorate = wx.getStorageSync('favorate') || [];
        const key = favorate.some((ele)=>{
          return ele === newvalue
        });
        this.setData({
          liked:key
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLikeTap(){
      const favorate = wx.getStorageSync('favorate') || [];
      if(this.data.liked === true){
        favorate.some((ele,index,self)=>{
          if(ele === this.data.location){
            self.splice(index,1);
          }
          return true
        });
        this.setData({
          liked:false
        })
        wx.setStorageSync('favorate',favorate);
      }else{

        if(favorate.length >= 6){
            favorate.shift();
        }
        favorate.push(
          this.data.location
        );
        this.setData({
          liked:true
        });
        wx.setStorageSync('favorate',favorate);
      }
    }
  }
})
