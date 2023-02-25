<template>
	<view>
		<view>
			<view class="smvideo" v-for="(item, index) in filmVideo" :key="item.id"
				:style="{ 'background-image': 'url(' + item.pic + ')' }" @click="goVideo(item.id, item.video)">
				<p>{{ item.filmName }}</p>
			</view>
		</view>
	</view>
</template>

<script>
	import reqApi, { listing } from '@/api/api.js';
	import {getPreferurl} from '@/api/request.js';
	export default {
		data() {
			return {
				filmVideo: null,
				videoList: [{
						"id": 1,
						"images": "https://cdn.uviewui.com/uview/goods/1.jpg",
						"title": "真好用不错不错",
						"videourl": "https://vod.pipi.cn/fec9203cvodtransbj1251246104/a52e1531243791576840607142/v.f42905.mp4",
					},
					{
						"id": 2,
						"images": "https://cdn.uviewui.com/uview/goods/1.jpg",
						"title": "真好用不错不错",
						"videourl": "https://vod.pipi.cn/fec9203cvodtransbj1251246104/a52e1531243791576840607142/v.f42905.mp4",
					},
					{
						"id": 3,
						"images": "https://cdn.uviewui.com/uview/goods/1.jpg",
						"title": "真好用不错不错",
						"videourl": "https://vod.pipi.cn/fec9203cvodtransbj1251246104/a52e1531243791576840607142/v.f42905.mp4",
					},
					{
						"id": 4,
						"images": "https://cdn.uviewui.com/uview/goods/1.jpg",
						"title": "真好用不错不错",
						"videourl": "https://vod.pipi.cn/fec9203cvodtransbj1251246104/a52e1531243791576840607142/v.f42905.mp4",
					},
				]
			}
		},
		methods: {
			//goVideo()为点击响应事件，可在HTML部分设置 @tap="goVideo()"
			goVideo(id, video) {
				uni.navigateTo({
					//保留当前页面，跳转到应用内的某个页面
					url: '/pages/video/videoItem/videoItem?id='+id+'&video='+video
				})
			},
			getFilmDataFun() {
				listing(getPreferurl).then((res) => {
					console.log(res[1].data.data)
					this.filmVideo = res[1].data.data
				}).catch((err)=>{
					console.log(err)
				})
			}
		},
		mounted() {
			this.getFilmDataFun();
		}
	}
</script>

<style lang="less" scoped>
	.smvideo {
		display: inline-block;
		width: 48.5%;
		height: 560upx;
		margin: 0.5% 0.6% 0;
		background-position: 50%;
		background-size: cover;
		position: relative;

		p {
			width: 170px;
			margin: 0 8px;
			position: absolute;
			color: #fff;
			font-weight: bold;
			font-size: 34upx;
			bottom: 20px;
		}
	}
</style>
