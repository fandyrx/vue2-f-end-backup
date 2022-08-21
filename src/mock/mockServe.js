//mockjs
import Mock from 'mockjs';
//json,图片webpack 默认对外暴露
import banner from './banner';
import floor from './floor';

//mock数据，第一个请求地址，第二个请求数据
Mock.mock("/mock/banner",{code:200,data:banner});
Mock.mock("/mock/floor",{code:200,data:floor});



// Mock.mock("./mock/floor",{code:200,data:floor});

// 卧槽，路径写成了./一直404 找半天
