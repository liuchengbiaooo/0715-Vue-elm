/*
包含n个接口函数的模块
*/
import ajax from "./ajax"


/*

6、用户名密码登陆<br/>

7、发送短信验证码<br/>

8、手机号验证码登陆<br/>

9、根据会话获取用户信息<br/>

10、用户登出
*/
const BASE = "/api"

// 1、根据经纬度获取位置详情
export const reqAddress = (latitude,longitude) => ajax(BASE + `/position/${latitude},${longitude}`)

//2、获取食品分类列表
export const reqCategorys = () => ajax(`/index_category`)

//3、根据经纬度获取商铺列表
export const reqShops = (latitude,longitude) => ajax(BASE +`/shops`,{latitude,longitude})

//4、根据经纬度和关键字搜索商铺列表
export const reqSearchShops = (geohash,keyword) => ajax(BASE +`/search_shops`,{geohash,keyword})

//5.获取一次性验证码
export const reqCaptchas = () => ajax(BASE +`captcha`)

//6.用户名密码登陆

