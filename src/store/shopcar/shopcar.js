import { reqShopCartList,reqDeleteCartById,reqUpdataCheckedById } from "@/api";

export default {
  state: {
    cartList: [],
  },
  actions: {
    async getCarList({ commit }) {
      let result = await reqShopCartList();
      
      if (result.code == 200) {
        commit("GETCARLIST", result.data);
      }
    },

   async  deleteCartListBySkuId({commit},skuId){
        let  result =   await  reqDeleteCartById(skuId); 
        if(result.code ==200){
          return "ok"
        }else{
          return Promise.reject(new Error('faile'));
           
        }
    },
//修改某一选中
   async updataCheckedById({commit},{skuId,isChecked}){
      let result =  await reqUpdataCheckedById(skuId,isChecked);
      if(result.code == 200){
        return 'ok'
      }else{
        return Promise.reject(new Error ('勾选失败'));
      }
   } ,

//删除全勾选
deleteAllCheckedCart({dispatch,getters}){
  let PromiseAll = [];
  getters.cartList.cartInfoList.forEach(item=>{
    //遍历元素，已勾选派发，否则不操作。返回时promise对象
    let promise = item.isChecked==1?dispatch("deleteCartListBySkuId",item.skuId):'';
    //返回promise推入数组
    PromiseAll.push(promise)
  })
  //Promise方法all 判断（）内Promise 状态。全为对，返回TRUE 
    return Promise.all(PromiseAll);
},

//全选
updataAllCartIsChecked({dispatch,state},isChecked){
      let promiseAll = [];
      state.cartList[0].cartInfoList.forEach(item=>{
                let promise = dispatch('updataCheckedById',{skuId:item.skuId,isChecked})
                promiseAll.push(promise);
      })
      

      return Promise.all(promiseAll)
      
}
    
  },
  mutations: {
    GETCARLIST(state, cartList) {
   
      state.cartList = cartList;
      
    }
  },
  getters: {
    cartList(state){
        return state.cartList[0] ||{}
    },
    
  },
};
