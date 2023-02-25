<template>
	<view class="u-scroll-list">
		<view style="display: flex;">
			<span class="textNice">精选推荐</span>
			<view style="flex: 1;">
				<span style="margin-left: 500upx; color: red;margin-top: 5upx;" @click="goMoreFilm()">更多</span>
			</view>
		</view>
		<u-scroll-list style="margin-top: -5upx;">
			<view class="" v-for="(item,index) in heightTenFilm" :key="item.id" @click="goFilmItem(item.id, item)">
				<view style="height: 250upx;width: 220upx;">
					<image :src="item.pic" style="height: 250upx;width: 200upx;"></image>
				</view>
				<span class="filmNameText">{{item.filmName}}</span>
			</view>
		</u-scroll-list>
	</view>

</template>

<script>
	export default {
		props: {
			heightTenFilm: Array,
		},
		data() {
			return {
				
			}
		},
		methods: {
			goMoreFilm() {
				uni.navigateTo({
					//保留当前页面，跳转到应用内的某个页面
					url: '/pages/homeInfo/moreFilm/moreFilm'
				})
			},
			goFilmItem(id, item) {
				uni.navigateTo({
					//保留当前页面，跳转到应用内的某个页面
					url: `/pages/homeInfo/filmInfo/filmInfo?id=${id}&item=${encodeURIComponent(JSON.stringify(item))}`
				})
			},
		},
	}
</script>

<style scoped>
	.u-scroll-list {
		margin-top: 30upx;
	}

	.textNice {
		font-size: 35upx;
		height: 50upx;
		line-height: 50upx;
		margin-bottom: 20upx;

	}

	.filmNameText {
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1; // 数字代表文字需要显示几行
	}
</style>
