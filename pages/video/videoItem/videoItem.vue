<template>

	<view class="uni-padding-wrap uni-common-mt">
		<view>
			<video id="myVideo" style="height: 1040upx; width: 100%;" :src="src" autoplay=true
				@error="videoErrorCallback" :danmu-list="danmuList" enable-danmu danmu-btn controls></video>
		</view>
		<view class="uni-list uni-common-mt">
			<view class="uni-list-cell">
				<view>
					<view class="uni-label">弹幕内容</view>
				</view>
				<view class="uni-list-cell-db">
					<input v-model="danmuValue" class="uni-input" type="text" placeholder="在此处输入弹幕内容" />
				</view>
			</view>
		</view>
		<view class="uni-btn-v">
			<button @click="sendDanmu" class="page-body-button">发送弹幕</button>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				videoid: null,
				play: null,
				src: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4',
				danmuList: [{
						text: '第 1s 出现的弹幕',
						color: '#ff0000',
						time: 1
					},
					{
						text: '第 3s 出现的弹幕',
						color: '#ff00ff',
						time: 3
					}
				],
				danmuValue: '',
			}
		},
		methods: {
			bobo() {
				this.play = !this.play;
				if (this.$refs.vivi.paused) {
					this.$refs.vivi.play();
				} else {
					this.$refs.vivi.pause();
				}
			},
			sendDanmu: function() {
				this.videoContext.sendDanmu({
					text: this.danmuValue,
					color: this.getRandomColor()
				});
				this.danmuValue = '';
			},
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			getRandomColor: function() {
				const rgb = []
				for (let i = 0; i < 3; ++i) {
					let color = Math.floor(Math.random() * 256).toString(16)
					color = color.length == 1 ? '0' + color : color
					rgb.push(color)
				}
				return '#' + rgb.join('')
			}
		},
		onLoad(option) {
			this.videoid = option.id;
			this.src = option.video;
		},
		onReady: function(res) {
			// #ifndef MP-ALIPAY
			this.videoContext = uni.createVideoContext('myVideo')
			// #endif
		},
	}
</script>

<style scoped>
	.video {
		position: absolute;
		width: 100%;
		height: 100%;
		background: #ffff;
		overflow: hidden;
	}

	.myvideo {
		width: 100%;
		height: 100%;
		position: absolute;
		background: transparent;
		left: 0;
		top: 0;
		z-index: 1;
	}

	.videoTop {
		position: absolute;
		z-index: 3;
		font-size: 24px;
		font-weight: bold;
		left: 0;
		top: 0;
		padding: 10px;
		width: 100%;
		background: rgba(0, 0, 0, 0.3);
		color: #ffff;
	}


	.videoimg {
		background: #000;
		display: flex;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
	}

	video {
		width: 100%;
	}


	.bofang {
		position: absolute;
		z-index: 2;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 60px;
		height: 60px;
	}
</style>
