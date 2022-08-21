//search

import {reqGetSearchInfo} from "@/api/index"



export default ({
    state:{
        searchList:{}
    },
   
    actions:{
     async getSearchList({commit},params={}){
    //    params形参：当用户派发  action 的时候，第二个参数会传进来，至少是个空对象，才能成功获取信息
       let result =  await reqGetSearchInfo(params)
      //  console.log(result,'store,search,返回数据');
      if(result.code === 200){
        
        commit('GETSEARCHLIST',result.data)
      }
      
      }
    },
    mutations:{
        GETSEARCHLIST(state,searchList){
         state.searchList = searchList
            // console.log(searchList,'getsl');
            // console.log(state);
         
        }
    },
    //项目中getters主要用于简化仓库的数据
    getters:{
      //state是当前仓库  的 数据，不是大仓库的
      goodsList(state){
        return  state.searchList.goodsList || [];
      },
      trademarkList(state){
        return state.searchList.trademarkList
      },
      attrsList(state){
        return  state.searchList.attrsList
      },
    }
})