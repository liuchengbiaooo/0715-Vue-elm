/*
包含n个接口函数的模块
*/
import ajax from "./ajax"


/*

9、根据会话获取用户信息<br/>

10、用户登出
*/
const BASE = "/api"

// 1、根据经纬度获取位置详情
export const reqAddress = (longitude, latitude) => ajax(BASE + `/position/${latitude},${longitude}`)

//2、获取食品分类列表
export const reqCategorys = () => ajax(BASE + `/index_category`)

//3、根据经纬度获取商铺列表
export const reqShops = (longitude,latitude) => ajax(BASE +`/shops`,{latitude,longitude})

//4、根据经纬度和关键字搜索商铺列表
export const reqSearchShops = (geohash,keyword) => ajax(BASE +`/search_shops`,{geohash,keyword})

//5.获取一次性验证码
export const reqCaptchas = () => ajax(BASE +`/captcha`)

//6.用户名密码登陆
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(BASE+'/login_pwd', {name, pwd, captcha}, 'POST')

//8、手机号验证码登陆
export const reqSmsLogin = (phone, code) => ajax(BASE + '/login_sms', {phone, code}, 'POST')

//7.发送短信验证码
export const reqSendCode =(phone) => ajax(BASE + `/sendcode`, {phone})

//用户退出登录
export const reqLogout = () => ajax(BASE + `/logout`)


//通过Mock获取商家信息
export const reqInfo = () => ajax('/info')

//通过Mock获取评价数组
export const reqRatings = () => ajax('/ratings')

//通过Mock获取商家商品数组
export const reqGoods = () => ajax('/goods')
