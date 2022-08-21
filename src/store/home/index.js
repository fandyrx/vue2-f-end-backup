import {reqCategoryList, reqGetBannerList,reqGetFloorList} from '@/api/index'
//home

export default ({
    state:{
        categoryList:[],
        bannerList:[],
        floorList:[]
    },
   
    actions:{
    //通过API里面，接口函数调用，发送请求，获取数据
    async categoryList({commit}){
      let result = await reqCategoryList();
      if(result.code ===200){
        commit('CATEGORYLIST',result.data)
      }
      },
      //获取首页轮播图
     async getBannerList({commit}){
        let result =  await  reqGetBannerList();
        
        if(result.code == 200){
          commit("GETBANNRLIST",result.data);
        }
      },
      //floor数据
      async getFloorList ({commit}){
       let result =  await reqGetFloorList();
       
       if(result.code == 200){
          //提交mutation
          commit("GETFLOORLIST",result.data)
       }
      },
    },
    mutations:{
        CATEGORYLIST(state,categoryList){
            state.categoryList = categoryList;
        },
        GETBANNRLIST(state,bannerList){
          state.bannerList = bannerList;
        },
        GETFLOORLIST(state,floorList){
            state.floorList = floorList;
        }
    },
    getters:{}
})