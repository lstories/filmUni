<template>
	<view class="boxAll">
		<view class="black">
			<text>聚时光影咖</text>
			&nbsp;>&nbsp;{{FilmInfo.filmName}}
		</view>
		<view class="tickedBox">
			<view class="content">
				<view class="list">
					<ul>
						<li class="li1">
							<view class="left">
								<view class="image">
									<img class="img" :src="FilmInfo.pic" alt="图片" />
								</view>
							</view>
							<view class="right">
								<view class="title">
									<span class="span1">{{FilmInfo.filmName}}</span>
									<span class="span2">{{FilmInfo.score==''?'4':FilmInfo.score}}分</span>
								</view>
								<p class="p1">主演：{{FilmInfo.actor}}</p>
								<p class="p2">类型：{{FilmInfo.category}}</p>
								<p class="time">{{FilmInfo.time}}上映</p>
							</view>
						</li>
					</ul>
				</view>
			</view>
		</view>
		<!-- 简介 -->
		<view class="introduction">
			<view>
				<h4 class="h4">简介</h4>
			</view>

			<p class="p">
				{{ FilmInfo.profiles }}
			</p>
			<h5 class="h5">演职人员</h5>
			<view class="listbox">
				<view class="list">
					<ul class="ul2">
						<li class="li2" v-for="item in actorlist" :key="item.id">
							<view class="img1">
								<img :src="item.avatar" alt="电影图片" />
							</view>
							<view class="actor">{{ item.cnm }}</view>
							<view class="actor1">{{ item.desc }}</view>
						</li>
					</ul>
				</view>
			</view>
		</view>
		<!-- 拼团 -->
		<view style="margin-top: 20rpx;">
			<view class="pinText">
				<text class="pinTxt">这些人已拼，参与可立即拼成</text>
			</view>
			<view class="pinItems">
				<view class="pinInfo">
					<text>谁啊</text>、
					<text>谁啊</text>
				</view>
				<view class="pinBtn">
					<u-button text="去拼单" type="error" size=small @click="show = true"></u-button>
				</view>
			</view>
			<view class="pinItems">
				<view class="pinInfo">
					<text>谁啊</text>
					<text>谁啊</text>
				</view>
				<view class="pinBtn">
					<u-button text="去拼单" type="error" size=small @click="show = true"></u-button>
				</view>
			</view>
		</view>

		<!-- 评论 -->
		<view class="remark">
			<view class="reText">
				<text>电影评价</text>
			</view>
			<view class="moreRe">
				<text>查看全部</text>
				<u-icon name="arrow-right" color="#2979ff" size="14"></u-icon>
			</view>
		</view>
		<view class="someRemark">
			<view class="">
				<view class="userInfo">
					<u-avatar :src="src" size=24></u-avatar>
					<text style="margin-left: 20upx;">用户名</text>
				</view>
				<view class="remarkCom">
					<text>很好看，很喜欢</text>
				</view>
			</view>
			<view class="">
				<view class="userInfo">
					<u-avatar :src="src" size=24></u-avatar>
					<text style="margin-left: 20upx;">用户名</text>
				</view>
				<view class="remarkCom">
					<text>很好看，很喜欢</text>
				</view>
			</view>
		</view>

		<Card cardTitle='其他电影'></Card>
		<Takeout :filmData="filmData"></Takeout>

		<!-- 底部 -->
		<view class="details-foot">
			<view class="icon">
				<image class="iconImg" src="@/static/image/cart.png" mode=""></image>
			</view>
			<view class="icon">
				<image class="iconImg" src="@/static/image/cart.png" mode=""></image>
			</view>
			<view class="buyAlong" @tap="show=true">单独购买</view>
			<view class="togetherBuy" @tap="show=true">拼团购买</view>
		</view>

		<!-- 底部弹出层 -->
		<view class="pop" v-show="show" @touchmove.stop.prevent='preventTouch'>
			<!-- 试图层 -->
			<view class="pop-mask" @tap="show=false">

			</view>
			<!-- 内容块 -->
			<view class="pop-box" :animation="animationData">
				<view class="pop-image">
					<image class="pop-img" :src="FilmInfo.pic" mode=""></image>
				</view>


				<uni-section title="选择观影时间： " type="line"></uni-section>
				<view class="time">
					<view>时间显示：</view>
					<view>{{datetimerange[0]}}至{{datetimerange[1]}}</view>
				</view>
				<view class="example-body">
					<uni-datetime-picker v-model="datetimerange" type="datetimerange" rangeSeparator="至" />
				</view>


				<view class="pop-sub">
					<button>确定</button>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import $http from '@/api/reqApi.js'
	import Card from '@/components/Card.vue'
	import Takeout from '@/components/takeout.vue'
	import BotInfo from '@/components/botInfo.vue'

	export default {
		props: {},
		components: {
			Card,
			Takeout,
			BotInfo
		},
		data() {
			return {
				filmData: null,
				// 动画赋值
				animationData: null,
				filmId: null,
				FilmInfo: null,
				src: '',
				show: false,
				movieId: null,
				// 时间
				datetimerange: [],
				theTimeNow: null,
				movieinfo: {
					img: "",
					filmName: "红海行动",
					category: "热血",
					snum: 899,
					actor: "主演",
					pubDes: "2020-9-09",
					rt: "太帅了"
				},
				list: null,
				actorlist: [{
					"id": 1,
					"avatar": "https://cdn.uviewui.com/uview/goods/1.jpg",
					"cnm": "吵吵",
					"desc": "导演"
				}],

				show: false,
				value1: Number(new Date()),


			}
		},
		methods: {
			goBuy() {
				uni.navigateTo({
					//保留当前页面，跳转到应用内的某个页面
					url: '/pages/buy/buy'
				})
			},

			// 时间
			maskClick(e) {
				console.log('maskClick事件:', e);
			},


			getFilmList() {
				$http.request({
					url: "/film/height",
				}).then((res) => {
					console.log(res)
					this.filmData = res
				}).catch(() => {
					uni.showToast({
						title: "请求失败",
						icon: "none"
					})
				})
			},
			getTimeNow() {
				var date = new Date();
				var year = date.getFullYear(); //月份从0~11，所以加一
				var dateArr = [date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
				for (var i = 0; i < dateArr.length; i++) {
					if (dateArr[i] >= 1 && dateArr[i] <= 9) {
						dateArr[i] = "0" + dateArr[i];
					}
				}
				var strDate = year + '-' + dateArr[0] + '-' + dateArr[1] + ' ' + dateArr[2] + ':' + dateArr[3] + ':' +
					dateArr[4];
				this.theTimeNow = strDate;
				// console.log('strDate', strDate)

			}
		},
		watch: {
			datetimerange(newval) {
				// console.log('范围选:', this.datetimerange);
			}
		},
		onLoad(option) {
			const item = JSON.parse(decodeURIComponent(option.item));
			// console.log('item', item)
			this.FilmInfo = item
			this.getFilmList();

			wx.showShareImageMenu({
				withShareTicket: true,
				//设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
				menus: ["shareAppMessage", "shareTimeline"]
			})
		},
		mounted() {
			this.getTimeNow()
			setTimeout(() => {
				this.datetimerange = [this.theTimeNow, this.theTimeNow]
			}, 3000)
		},
		
		onShareAppMessage(res) {
		    if (res.from === 'button') {// 来自页面内分享按钮
		        console.log('res==',es.target)
		    }
		    return {
		        title: 'title', //分享的名称
		        path: `/pages/homeInfo/filmInfo/filmInfo?item=${encodeURIComponent(JSON.stringify(this.FilmInfo))}`,
		        mpId:'wx7c7fe83fef92cf33' //此处配置微信小程序的AppId
		    }
		},
		//分享到朋友圈
		onShareTimeline(res) {
		    return {
		        title: this.FilmInfo.filmName,
		        type: 0,
		        summary: "",
				success: function(res) {
					uni.showTabBar({
						title: "分析成功"
					})
				},
				fail: function(err) {
					console.log("fail：" + JSON.stringify(err));
				}
		    }
		},

		
		// 点击分享
		onNavigationBarButtonTap(e) {

			uni.share({
				"provider": "weixin",
				"type": 0,
				// 分析给微信好友
				"scene": "WXSceneSession",
				"title": this.FilmInfo.filmName,
				"href:": "http://127.0.0.1:8080/pages/homeInfo/filmInfo/filmInfo?item=" + this.FilmInfo + "",
				"imageUrl:": this.FilmInfo.pic,
				success: function(res) {
					uni.showTabBar({
						title: "分析成功"
					})
				},
				fail: function(err) {
					console.log("fail：" + JSON.stringify(err));
				}
			})


		}
	}
</script>

<style scoped>
	.boxAll {
		padding-bottom: 150rpx;
	}

	.black {
		font-size: 30upx;
	}

	.li1 {
		display: flex;
		align-items: center;
		border-bottom: 4upx solid #e6e6e6;
		padding: 20upx;
	}

	.image {
		width: 180upx;
		margin-right: 20upx;
	}

	.img {
		width: 100%;
		height: 210upx;
		display: block;
	}

	.title {
		display: flex;
		justify-content: space-between;
	}

	.right {
		flex: 1;
	}

	.span1 {
		color: #79b5b5;
		font-size: 14px;
	}

	.span2 {
		color: #ffaa84;
		font-size: 12px;
	}

	p {
		font-size: 12px;
		color: #939393;
		margin-top: 2px;
	}

	/* 简介 */
	.introduction {
		display: block;
	}

	.h4 {
		font-size: 16px;
		color: #757575;
		margin-top: 15px;
		margin-left: 10px;
	}

	.p {
		color: #757575;
		font-size: 12px;
		padding: 15px;
		overflow: hidden;
		text-overflow: ellipsis;
		line-clamp: 3;
		box-orient: vertical;
		word-wrap: break-word;
		word-break: break-all;
		border-bottom: 2rpx solid #c5c5c5;
	}

	.h5 {
		font-size: 16px;
		color: #757575;
		padding-bottom: 8px;
		margin-left: 10px;
	}

	.list {
		overflow: hidden;
	}

	.ul2 {
		display: flex;
		overflow: auto;
	}

	.li2 {
		margin-right: 12px;
	}

	.img1 {
		width: 180upx;
		height: 200upx;
		overflow: hidden;
		margin-left: 10upx;
	}

	.img1 img {
		display: block;
		width: 100%;
		height: 200upx;
	}

	.actor {
		font-size: 14px;
		color: white#757575;
		text-align: center;
	}

	.actor1 {
		font-size: 14px;
		color: rgb(175, 170, 170);
		text-align: center;
	}

	/* 拼单 */
	.pinText {
		margin-top: 10upx;
		margin-left: 10upx;
		border-top: 5upx solid #eaeaea;
	}

	.pinTxt {
		font-size: 28upx;
		font-family: "宋体";
	}

	.pinItems {
		width: 100%;
		height: 80upx;
		display: flex;
		border: 5upx solid #eaeaea;
	}

	.pinInfo {
		flex: 1;
		text-align: left;
		padding: 15upx;
	}

	.pinBtn {
		margin-right: 10upx;
		margin-top: 5upx;

	}

	/* 评价 */
	.remark {
		background-color: #eaeaea;
		display: flex;
		font-size: 30upx;
		margin-top: 10rpx;
	}

	.moreRe {
		display: flex;
		margin-left: auto;
		font-size: 30upx;
	}

	.someRemark {
		background-color: #fff;
		height: 250upx;
		margin-top: 5upx;
	}

	.userInfo {
		display: flex;
		padding: 10upx;
	}

	.remarkCom {
		font-size: 28upx;
		padding-left: 14upx;
		padding-bottom: 16upx;
		border-bottom: 2upx solid #eaeaea;
	}




	/* 底部样式 */
	.details-foot {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #fff;
	}

	.details-foot .icon {
		width: 60rpx;
		height: 60rpx;
		border-radius: 100%;
		background-color: #55ffff;
		text-align: center;
		margin: 0 10rpx;
	}

	.iconImg {
		width: 50rpx;
		height: 50rpx;
	}

	.buyAlong {
		margin: 0 40rpx;
		padding: 6rpx 30rpx;
		background-color: #000000;
		color: #ffffff;
		border-radius: 40rpx;

	}

	.togetherBuy {
		margin: 0 40rpx;
		padding: 6rpx 30rpx;
		background-color: #49f;
		color: #ffffff;
		border-radius: 40rpx;
	}

	/* 弹出层 */
	.pop {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 9999;
	}

	.pop-mask {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
	}

	.pop-box {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 400px;
		background-color: #ffff;
	}

	.pop-image {
		text-align: center;
		background-color: rgba(0, 0, 0, .2);
	}

	.pop-img {
		width: 250rpx;
		height: 350rpx;
	}


	.example-body {
		background-color: #fff;
		padding: 10px;
	}

	.pop-sub {
		line-height: 28rpx;
		background-color: #49bdfb;
		color: #ffffff;
		text-align: center;
		margin-top: 30rpx;
	}
</style>
