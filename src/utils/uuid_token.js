import {v4 as uuidv4} from 'uuid'
// 生成ID

export const getUUID = () => {
 let uuid_token =  localStorage.getItem("UUIDTOKEN") 
//  读取本地存储，如果没有，生成ID
if(!uuid_token){
    uuid_token=uuidv4();
    localStorage.setItem('UUIDTOKEN',uuid_token);
}

return uuid_token ;
}