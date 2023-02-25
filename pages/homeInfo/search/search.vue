<template>
	<view class="search">
		<view class="">
			<uni-search-bar @confirm="search" :focus="true" v-model="keyword" @blur="blur" @focus="focus"
				@input="input" @cancel="cancel" @clear="clear">
			</uni-search-bar>

		</view>
		<Lines></Lines>

		<view class="search-item">
			<view class="search-title">
				<view>最近搜索</view>
				<view class="deleteIcon" @tap="deleteHistory()">
					<img src="@/static/image/delete.png" alt="">
				</view>
			</view>
			<view v-if="searchData.length > 0">
				<view class="search-name" v-for="(item,index) in searchData" :key="index" @tap="toSearchList(item)">
					{{item}}
				</view>
			</view>
			<view v-else class="search-none">
				暂无搜索记录
			</view>
		</view>
		<view class="search-item">
			<view class="search-title">
				<view>热门搜索</view>
				<view class=""></view>
			</view>
			<view class="">
				<view class="search-name" @tap="">寒战</view>
				<view class="search-name" @tap="">哪吒</view>
			</view>
		</view>

	</view>
</template>

<script>
	import Lines from '@/components/Line.vue';
	import {
		onLoad
	} from 'uview-ui/libs/mixin/mixin';
	export default {
		components: {
			Lines
		},
		data() {
			return {
				// 输入的关键词
				keyword: '',
				// 存储的关键词
				searchData: [],
			}
		},
		methods: {
			// 搜索判断
			search() {
				if (this.keyword === "") {
					return uni.showToast({
						title: "搜索框不能为空",
						icon: "none"
					})
				} else {
					this.toSearchList(this.keyword)
				}
				// 隐藏软键盘的函数
				uni.hideKeyboard();
				this.addSearch();
			},
			// 点击最近搜索的跳转
			toSearchList(item) {
				uni.navigateTo({
					url: "/pages/searchList/searchList?keyword=" + item + ""
				})
			},
			// 新增搜索词
			addSearch() {
				let idx = this.searchData.indexOf(this.keyword);
				if (idx < 0) {
					this.searchData.unshift(this.keyword);
				} else {
					this.searchData.unshift(this.searchData.splice(idx, 1)[0]);
				}
				// 存在本地存储
				uni.setStorage({
					key: "searchData",
					data: JSON.stringify(this.searchData)
				})
			},
			// 清除搜索记录
			deleteHistory() {
				uni.showModal({
					title: "重要提示",
					content: '是否清除搜索记录',
					cancelText: '取消',
					confirmText: '确定',
					success: (res) => {
						if (res.confirm) {
							uni.removeStorage({
								key: "searchData"
							})
							this.searchData = [];
						}
						// console.log(res);
					}

				})
			},

			input(res) {
				console.log('----input:', res)
			},
			clear(res) {
				uni.showToast({
					title: 'clear事件，清除值为：' + res.value,
					icon: 'none'
				})
			},
			blur(res) {
				uni.showToast({
					title: 'blur事件，输入值为：' + res.value,
					icon: 'none'
				})
			},
			focus(e) {
				uni.showToast({
					title: 'focus事件，输出值为：' + e.value,
					icon: 'none'
				})
			},
			cancel(res) {
				uni.showToast({
					title: '点击取消，输入值为：' + res.value,
					icon: 'none'
				})
			},

		},
		onLoad() {
			uni.getStorage({
				key: "searchData",
				success: (res) => {
					// console.log(res);
					this.searchData = JSON.parse(res.data);
				}
			})
		},
		// 监听软键盘的搜索按钮点击的生命周期
		onNavigationBarSearchInputConfirmed() {
			this.search();
		},
		// 监听input输入内容的生命周期
		onNavigationBarSearchInputChanged(e) {
			this.keyword = e.text;
		},
		// 点击丁兰的搜索按钮的生命周期
		onNavigationBarButtonTap(e) {
			this.search();
		},
	}
</script>

<style scoped>
	/* 搜索兰 */
	.uni-mt-10 {
		margin-top: 10px;
	}

	.search-item {
		padding: 20rpx;
	}

	.search-title {
		display: flex;
		justify-content: space-between;
	}

	.deleteIcon img {
		height: 40upx;
		width: 40rpx;
		margin-right: 30upx;
	}


	.search-name {
		padding: 4rpx 24rpx;
		background-color: #E1E1E1;
		display: inline-block;
		border-radius: 26rpx;
		margin: 10rpx;
	}

	.search-none {
		text-align: center;
	}
</style>
