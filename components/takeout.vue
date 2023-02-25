<template>

	<view class="comment" style="height: 2000upx;">
		<view class="showMovie2">
			<view class="mob" v-for="item in filmData" :key="item.id" @click="goFilmInfo(item)">
				<view class="left">
					<img :src="item.pic" alt="电影图片" />
				</view>
				<view class="right">
					<view class="text">
						<!-- 电影名称 -->
						<h3>{{ item.filmName }}</h3>
						<p class="point">
							<span>{{ item.category }}</span>
						</p>
						<p>
							主演:<span>{{ item.actor }}</span>
						</p>
						<p></p>
					</view>
					<view class="buy">购票</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		props: {
			filmData: Array,
		},
		data() {
			return {
				hotMovieList: null,
				moreNiceMovie: {
					"coming": [{
						"id": 1,
						"img": "https://cdn.uviewui.com/uview/goods/1.jpg",
						"filmName": "红海行动",
						"score": "9.3",
						"actor": "吴京"
					}]
				}
			};
		},
		methods: {
			goFilmInfo(item) {
				uni.navigateTo({
					//保留当前页面，跳转到应用内的某个页面
					url: `/pages/homeInfo/filmInfo/filmInfo?item=${encodeURIComponent(JSON.stringify(item))}`
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.showMovie2 {
		padding-bottom: 10px;

		.mob {
			height: 114px;
			padding-left: 16upx;
			display: flex;
			align-items: center;
			margin-bottom: 10px;
			border-bottom: 2upx solid #d6d6d6;

			.left {
				width: 64px;
				height: 90px;
				margin-right: 40upx;

				img {
					width: 150upx;
					height: 190upx;
				}
			}

			.right {
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex: 1;
				border-bottom: 1px solid #f5f5f5;
				height: 100%;

				.buy {
					color: #fff;
					background: red;
					height: 28px;
					width: 54px;
					text-align: center;
					line-height: 28px;
					border-radius: 20px;
					font-size: 14px;
					margin: 14px;
				}

				.text {
					font-size: 14px;
					color: orange;

					p {
						margin-top: 2px;
						word-break: break-all;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1; // 数字代表文字需要显示几行
					}

					h3 {
						font-size: 17px;
						font-weight: bold;
						color: black;
					}

					.point {
						font-weight: bold;
						font-size: 16px;
						color: #36cdfa;
					}
				}
			}
		}
	}
</style>
