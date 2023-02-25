<template>
	<view class="main">
		<!-- 搜索 -->
		<view class="select-cont">
			<view class="select">
				<u-search disabled placeholder="搜索电影" borderColor="#ff557f" v-model="keyword" :showAction="false"
					@click="goSearch()"></u-search>
			</view>
		</view>
		<!-- 轮播 -->
		<u-swiper :list="list" previousMargin="30" nextMargin="30" circular :autoplay="false" radius="5"
			bgColor="#ffffff">
		</u-swiper>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				keyword: null,
				list: [
					'https://lstories.oss-cn-guangzhou.aliyuncs.com/%E8%BD%AE%E6%92%AD%E5%9B%BE2.jpg',
					'https://lstories.oss-cn-guangzhou.aliyuncs.com/%E8%BD%AE%E6%92%AD%E5%9B%BE1.jpg',
					'https://lstories.oss-cn-guangzhou.aliyuncs.com/%E8%BD%AE%E6%92%AD%E5%9B%BE3.jpg',
				]
			}
		},
		methods: {
			goSearch() {
				uni.navigateTo({
					//保留当前页面，跳转到应用内的某个页面
					url: '/pages/homeInfo/search/search'
				})
			},
		},
	}
</script>

<style scoped>
	.select {
		height: 70upx;
		line-height: 70upx;
		width: 100%;
		margin-bottom: 10upx;
	}
</style>
