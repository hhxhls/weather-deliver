import {Request} from './request';
import {getUrl} from './url'


// 获得城市代码，并执行一个传入的回调函数
function getCityCode(fn,context=this,location,...args){
    if(location === null){
        const promise= getLocationInfo();
        promise.then((res)=>{
            const {
                latitude,
                longitude,
            }=res;
            const request = new Request({
                location:`${longitude},${latitude}`
            });
            return request.getRawData()
        }).then((res)=>{
            fn.call(context,res,...args);
        });
        return promise;
    }else{
        const request = new Request({
            location:location
        });
        return request.getRawData().then((res)=>{
            fn.call(context,res,...args);
        });
    }
}

// 用wx.getLocation获取当前位置 
function getLocationInfo(){
    return new Promise((resolved,rejected)=>{
        wx.getLocation({
            type : 'wgs84',
            success(res){
                resolved(res);
            },
            fail(res){
                rejected(res);
            }
        })
    })

}

export{
    getCityCode,
    getLocationInfo
}