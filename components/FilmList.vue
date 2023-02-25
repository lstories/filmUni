<template>
	<view class="filmList">
		<view class="title">
			下列是关于{ {{keyword}} }的电影列表
		</view>

		<Lines></Lines>
		<TakeOut :filmData="filmData"></TakeOut>
	</view>
</template>

<script>
	// 引入封装接口
	import $http from '@/api/reqApi.js';
	import Lines from '@/components/Line.vue';
	import TakeOut from '@/components/takeout.vue';
	export default {
		name: "FilmList",
		props: {
			keyword: String
		},
		components: {
			TakeOut,
			Lines,
		},
		data() {
			return {
				filmData: null,
				filmList: {
					currentIndex: 0,
					data: [{
					// 		name: "价格",
					// 		status: 1,
					// 		key: "price"
					// 	},
					// 	{
					// 		name: "评分",
					// 		status: 0,
					// 		key: "score"
						},
					]
				}
			}
		},
		methods: {
			/*
				changTap(index) {
				// console.log(index)
				// 索引值
				let idx = this.filmList.currentIndex;
				// console.log(idx)
				// 具体哪一个对象
				let item = this.filmList.data[idx];
				if (idx == index) {
					return item.status = item.status === 1 ? 2 : 1;
					console.log(item.status)
				}
				// 新的值
				let newItem = this.filmList.data[index]
				item.status = 0;
				this.filmList.currentIndex = index
				newItem.status = 1;
			},
			*/

			// 请求数据
			getData() {
				$http.request({
					url: "/film/category",
					data: {
						filmName: this.keyword,
						price: "desc"
					}
				}).then((res) => {
					console.log(res)
					this.filmData = res.list
				}).catch(() => {
					uni.showToast({
						title: "请求失败",
						icon: "none"
					})
				})
			}
		},
		mounted() {
			this.getData()
		}
	}
</script>

<style scoped>
	.title {
		text-align: center;
	}

	.film-item {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80upx;
	}

	.text-active {
		color: #49dede;
	}

	.dow-fan {
		transform: rotate(180deg);
		color: #49dede;
	}
</style>
