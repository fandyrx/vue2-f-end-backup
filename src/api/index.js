//API统一管理
import requests from "./request";

import mockRequests from "@/api/mockAjax";

//三级联动接口
//api/product/getBaseVategoryList   get 无参数
//发请求
export const reqCategoryList = () => requests({ url: "/product/getBaseCategoryList", method: "get" });

//获取轮播图banner 接口
export const reqGetBannerList = () => mockRequests.get("/banner");

//floor数据
export const reqGetFloorList = () => mockRequests.get("/floor");

//search模块数据  地址/api/list   请求方式：post
// export const reqGetSearchInfo = (params) => {return requests({ url: "/list", method: "post", data: params })};
// 有大括号，需要return ....找了近一个小时，反复确认单词和路径，没想到这里
export const reqGetSearchInfo = (params) =>  requests({ url: "/list", method: "post", data: params });


//产品详情信息的接口
export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,method:'get'})


//添加到购物车
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:"post"})

//购物车获取

export const reqShopCartList = ()=>requests({url:'/cart/cartList',method:"get"});

//删除购物车商品
export const reqDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:"delete"})

//q切换选中/api/cart/checkCart/{skuID}/{isChecked}

export const reqUpdataCheckedById =(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'}) 

//验证
export const reqGetCode =(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:"get"})

//注册
export const reqUserRegister = (data)=>requests({url:`/user/passport/register`,data,method:"post"})

//登录
export const  reqUserLogin = (data)=>requests({url:"/user/passport/login",data,method:"post"})


// /user/passport/auth/getUserInfo 获取用户信息带token
export const reqUserInfo =()=>requests({url:'/user/passport/auth/getUserInfo',method:"get"})

//logout
export const reqLogout = ()=>requests({url:'/user/passport/logout',method:"get"})

//userAddress
export const reqUserAddress = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:"get"}) 

//tarde,info /api/order/auth/trade
export const reqTradeInfo  = ()=>requests({url:"/order/auth/trade",method:"get"})

//upload order  /api/order/auth/submitOrder?tradeNo={tradeNo}
//未定义可能形参都没写
export const   reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:"post"}) 

//支付页面
export const reqPayInfo =(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:"get"})