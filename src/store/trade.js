//trade
import { reqUserAddress,reqTradeInfo } from "@/api";

export default {
    state:{
        address:[],
        orderInfo:{}
    },
    actions:{
     async   getUserAddress({commit}){
         let result =   await reqUserAddress();
         console.log(result,'address');
            if(result.code ==200){
                commit("GETUSERADDRESS",result.data)
            }
        },
        //订单信息
     async getTradeInfo({commit}){
            let result =await reqTradeInfo();
            if(result.code ==200){
                commit("GETTRADEINFO",result.data)
            }
        }
    
    },
    mutations:{
        //yonghu
        GETUSERADDRESS(state,address){
            state.address = address
        },
        //shangpin
        GETTRADEINFO(state,orderInfo){
            state.orderInfo = orderInfo
        }
    },
    getters:{}
}