// 封装请求 get post
// 面向对象es6 promise 等

// 引入提示
import errdata from '@/api/errdata.js';


// get请求

let listing = function(urling) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: urling,
			method: 'GET',
		}).then((res) => {
			resolve(res)
		}).catch((err) => {
			let errs = '服务器错误, 请稍后再试'
			errdata.errlist(err)
			reject(err)
		})
	})
}

export {listing}


