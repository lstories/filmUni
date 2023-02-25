<template>
	<view>
		<Lines />
		<view class="list">
			<!-- 左侧滑动 -->
			<scroll-view scroll-y="true" class="list-left" :style="'height:'+clentHeight+'px;'">
				<view v-for="(item,index) in categoryList" :key="index" class="list-item" @tap="changeLeftTab(index)">
					<view class="list-name" :class="activeIndex === index?'list-name-active':''">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
			
			<!-- 右侧滑动 -->
			<scroll-view scroll-y="true" class="list-right" :style="'height:'+clentHeight+'px;'">
				<view  class="rightList">
					<view class="list-title">{{keyCategory}}-电影列表</view>
					<view class="right-content">
						<view class="right-item" v-for="(item, index) in filmList" :key="index" @tap="toFilmInfo(item)">
							<image class="right-img" :src="item.pic" mode=""></image>
							<view class="right-name">{{item.filmName}}</view>
						</view>
						
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	// 引入封装接口
	import $http from '@/api/reqApi.js';
	import Lines from '@/components/Line.vue';
	export default {
		components: {
			Lines,
		},
		data() {
			return {
				indexList: [],
				clentHeight: 0,
				activeIndex: 0,
				categoryList: null,
				keyCategory: "科幻",
				filmList: null,
			}
		},
		methods: {
			// 获取高度
			getClientHeight() {
				const res = uni.getSystemInfoSync();
				const system = res.platform;
				if(system === 'ios') {
					return 44+res.statusBarHeight;
				} else if(system === 'android') {
					return 48+res.statusBarHeight;
				} else {
					return 0;
				}
			},
			// 左侧点击事件
			changeLeftTab(index) {
				this.activeIndex = index;
				this.keyCategory = this.categoryList[index].name
				// console.log(this.keyCategory);
				this.getFilmList()
			},
			toFilmInfo(item) {
				uni.navigateTo({
					//保留当前页面，跳转到应用内的某个页面
					url: `/pages/homeInfo/filmInfo/filmInfo?item=${encodeURIComponent(JSON.stringify(item))}`
				})
			},
			// 请求数据
			getCategoryList() {
				$http.request({
					url: "/category/list",
				}).then((res) => {
					// console.log(res)
					this.categoryList = res
				}).catch(() => {
					uni.showToast({
						title: "请求失败",
						icon: "none"
					})
				})
			},
			getFilmList() {
				$http.request({
					url: "/film/category",
					data: {
						category: this.keyCategory,
					}
				}).then((res) => {
					// console.log(res)
					this.filmList = res.list
				}).catch(() => {
					uni.showToast({
						title: "请求失败",
						icon: "none"
					})
				})
			},
		},

		// input输入框点击事件
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '/pages/homeInfo/search/search'
			})
		},
		onReady() {
			uni.getSystemInfo({
				success: (res) => {
					this.clentHeight = res.windowHeight - this.getClientHeight();
				}
			})
		},
		onLoad() {
			this.getCategoryList();
			this.getFilmList();
		}



	}
</script>

<style scoped>
.list {
	display: flex;
}
.list-left {
	width: 220rpx;
}
.left-right {
	flex: 1;
	padding-left: 30rpx;
}
.list-item {
	border-bottom: 2rpx solid #ffffff;
	font-size: 28rpx;
	background-color: #f7f7f7;
}
.list-name {
	padding: 30rpx 6rpx;
	text-align: center;
	word-break: break-all;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1; // 数字代表文字需要显示几行
}
.list-name-active {
	border-left: 8rpx solid #49BDF8;
	background-color: #ffffff;
}
.list-title {
	font-weight: bold;
	margin: 30rpx 0;
}
.right-item{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-left: 10rpx;
}
.right-content {
	display: flex;
	flex-wrap: wrap;
}
.right-img {
	width: 160rpx;
	height: 200rpx;
}
.right-name{
	padding: 16rpx 0;
}
</style>
