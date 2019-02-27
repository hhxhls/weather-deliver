// component/calendar/cmp.js
import {characterToNumber} from '../../utils/character-to-number'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    luna:{
      type:Object,
      value:null,
      observer(newValue){
        if(Number(newValue.month) <10){
          this.setData({
            ['luna.month']: '0' + newValue.month,
          });
        }

        if(Number(newValue.month) <10){
          this.setData({
            ['luna.cnday']: characterToNumber[newValue.cnday],
          });
        }
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

  }
})
