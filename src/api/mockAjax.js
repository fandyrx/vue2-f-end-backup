//axios 二次封装
import axios from 'axios';

// const request = axios.create({ })
//1.axios对象的方法 create 创建一个 axios实例
//2.requests 就是axios,只不过稍微配置一下
const requests = axios.create({
    //配置对象
    //基础路径，发请求中，路径会出现api
    baseURL:"/mock",
    //请求超时事件5s
    timeout:5000, 
 });

//  请求拦截器：发请求前，拦截器可以检测到，在请求发出去前做一些事
requests.interceptors.request.use((config)=>{
    //config:配置对象，对象里面有一个重要属性，headers请求头    
    return config;
})

//响应拦截器
requests.interceptors.response.use((res)=>{
    //成功的回调，在这设置东西
    return res.data;
},(error)=>{
    //中止promise链
    return Promise.reject(new Error('faile'));
});



//对外暴露
export default requests;