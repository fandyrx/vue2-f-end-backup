//user login
import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from "@/api"

export default{
    state:{
        code:'',
        token:localStorage.getItem('token'),
        userInfo:{},
    },
    actions:{
    async   getCode({commit},phone){
         let result = await reqGetCode(phone)
         if(result.code == 200){
             commit("GETCODE",result.data)
             return "ok"
              }else{
          return Promise.reject(new Error("faile"))
         }
     },
     
     //用户注册
     async userRegister({commit},user){
      let result =  await reqUserRegister(user)
      if(result.code ==200){
        return "ok"
      }else{
        return Promise.reject(new Error('faile'))
      }
     },
     
     //用户登录token
     async userLogin({commit},data){
        let result = await reqUserLogin(data)
           
        if(result.code==200){
            commit("USERLOGIN",result.data.token)
         
            localStorage.setItem('token',result.data.token)
            return "ok"
        }else{
            return Promise.reject(new Error ('faile'))
        }
     },

     //退出
    async userLogout({commit}){
            let result = await reqLogout()
            if(result.code ==200){
                commit("CLEAR")
            }
     },

     //获取用户信息getUserInfo
     async getUserInfo({commit}){
        let result = await reqUserInfo()
        console.log(result);
            console.log(result.data,"getuserinfo");
        if(result.code ==200){
            commit('GETUSERINFO',result.data)
            
            return "ok"
        }else{
            return Promise.reject(new Error('faile'));
        }
      }
    

    },
    mutations:{
        GETCODE(state,code){
            state.code = code
        },
        USERLOGIN(state,token){
            state.token=token
            
        },

        GETUSERINFO(state,userInfo){
            state.userInfo = userInfo;
        },

        CLEAR(state){
            state.token='',
            state.userInfo = {};
            localStorage.removeItem("token")
        }
    },
    getters:{}
}

