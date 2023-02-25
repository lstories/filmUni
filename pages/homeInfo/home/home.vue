<template>
	<view class="content">
		<view style="text-align: center;"><span>欢迎来到聚时光影咖</span></view>
		<Search></Search>
		<Preference :heightTenFilm="heightTenFilm"></Preference>
		<Card cardTitle='猜你喜欢'></Card>
		<Takeout :filmData="filmData"></Takeout>
	</view>
</template>

<script>
	// 引进组件
	import Search from '@/components/search.vue'
	import Preference from '@/components/preference.vue'
	import Card from '@/components/Card.vue'
	import Takeout from '@/components/takeout.vue'

	// 引入封装接口
	import {
		listing
	} from '@/api/api.js';
	import {
		getPreferurl,
		getHeightTen,
	} from '@/api/request.js';
	export default {
		components: {
			Search,
			Preference,
			Card,
			Takeout
		},
		data() {
			return {
				filmData: null,
				heightTenFilm: null,
			}
		},
		methods: {
			changeTab(index) {
				// console.log(index)
				if (this.topBarIndex === index) {
					return;
				}
				this.topBarIndex = index;
				this.scrollIntoIndex = 'top' + index
			},
			onChangeTab(e) {
				this.changeTab(e.detail.current);
			},
			preference() {
				listing(getPreferurl).then((res) => {
					// console.log(res[1].data.data)
					this.filmData = res[1].data.data
				}).catch((err) => {
					console.log(err)
				})
			},
			getHeightTenFun() {
				listing(getHeightTen).then((res) => {
					// console.log(res[1].data.data)
					this.heightTenFilm = res[1].data.data
				}).catch((err) => {
					console.log(err)
				})
			},
		},

		onLoad() {
			this.preference();
			this.getHeightTenFun();

		},
		onReady() {

		},


	}
</script>

<style lang="scss" scoped>
	.content {
		margin: 5upx 10upx;


	}

	.scroll-content {
		width: 100%;
		height: 80upx;
		white-space: nowrap;
	}

	.scroll-item {
		display: inline-block;
		padding: 10upx 30upx;
		font-size: 32rpx;
	}

	.f-active-color {
		color: #49BDFB;
		padding: 10upx 0;
		border-bottom: 3rpx solid #49BDFB;
	}

	.f-color {
		color: #000000;
		padding: 10upx 0;
	}
</style>
