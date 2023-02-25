<template>
	<view class="film-cart">
		<view class="cartTop">
			<text class="cartTextList">列表</text>
			<text class="cartEdit" @tap="changeText">{{textInfo}}</text>
		</view>
		<Lines></Lines>
		<view class="film-list">
			<view class="film-item">
				<label class="radio">
					<radio value="" color="#ff3333" /><text></text>
				</label>
				<image src="../../static/uni.png" mode=""></image>
				<view class="">
					<view class="filmText">电影名字</view>
					<view class="theTime">
						<view class="">时间如下</view>
						<view class="">
							2022-12-12&nbsp;12:23 至
							2022-12-12&nbsp;12:23
						</view>
					</view>
					<view class="price">
						<view class="">价钱</view>
					</view>
				</view>
			</view>
			<Lines></Lines>
		</view>
		
	</view>
</template>

<script>
	import Lines from '@/components/Line.vue';
	export default {
		components: {
			Lines,
		},
		data() {
			return {
				isEdit: false,
				textInfo: "编辑",
			}
		},
		methods: {
			// 更改文字
			changeText() {
				this.isEdit = !this.isEdit;
				this.isEdit === true ? this.textInfo = "完成" : this.textInfo = "编辑"
			}
		}
	}
</script>

<style scoped>
	.cartTop {
		display: flex;
		font-size: 28rpx;
		text-align: center;
	}

	.cartTextList {
		flex: 4;
		border-right: 2rpx solid #d9d9d9;

	}

	.cartEdit {
		flex: 1;
	}

	.film-item {
		display: flex;
		padding: 20rpx;
		align-items: center;
		background-color: #eeeeee;

	}

	.film-item image {
		width: 180rpx;
		height: 220rpx;
		margin-right: 15rpx;

	}

	.filmText {
		flex: 1;
	}

	.theTime {
		font-size: 24rpx;
	}
</style>
