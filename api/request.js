// 公用地址

let url = 'http://localhost:8085/api/'

// 电影列表
let getPreferurl = `${url}film/list`
// 精选推荐
let getHeightTen = `${url}film/height`
// 查找分类
let getCategory = `${url}category/list`
let getCateFilm = `${url}category/page`



export {getPreferurl, getHeightTen, getCategory, getCateFilm}