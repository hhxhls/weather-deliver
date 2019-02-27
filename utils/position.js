import {getLocationInfo} from './util';
const QQMapWX  = require('../libs/qqmap-wx-jssdk.min.js');
function getDetailLocation(searchWord=null){
    // 当页面的加载是有搜索词的情况时，返回一个district属性为'search'的promise对象
    // 便于后续做处理
    if(searchWord!==null){
        return Promise.resolve({
            district:'search'
        })
    }else{
        return new Promise((resolved,rejected)=>{
            const qqmapwx = new QQMapWX({key:'GONBZ-AHTCX-74Q4S-ZSUJW-HF72S-FZF56'}),
            promise = getLocationInfo();
            promise.then((res)=>{
                const {
                    latitude,
                    longitude,
                }=res;
                qqmapwx.reverseGeocoder({
                    latitude,
                    longitude,
                    success(res){
                        resolved(res.result.address_component)
                    },
                    fail(res){
                        rejected(res);
                    }
                })
        
            });
        })
    }



}

export{
    getDetailLocation
}
