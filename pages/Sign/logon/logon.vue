<template>
	<view class="page-inner">
		<view class="page-tip">Sign up</view>
		<view class="">
			<u--form labelPosition="left" :model="model1" :rules="rules" ref="form1">


			</u--form>
		</view>

		<u-button type="primary" shape="circle" text="按钮形状"></u-button>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				password: '',
				confirmPassword: '',
				userInfo: {
					name: 'uView UI',
					sex: '',
				},
			}
		},
		methods: {
			submitRegistration(mobile, password, confirmPassword) {
				// 首先判断手机号是否正确
				// 判断两次密码是否一致
				if (mobile.trim().length === 0) {
					uni.showToast({
						title: '手机号不能为空',
						icon: 'none'
					});
					return;
				}
				//......其他判断
				// 网络请求
				uni.request({
					url: 'xxx',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						mobile: mobile,
						password: password
					},
					success: (res) => {
						if (res && res.data && res.data.success) {
							uni.showToast({
								title: '注册成功',
								icon: 'success'
							})
							return
						}
					},
					fail: () => {
						uni.showToast({
							title: '注册失败',
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style>
	.page-inner {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		padding-top: 30px;
		padding-left: 15px;
		padding-right: 15px;
	}

	.page-tip {
		font-size: 15px;
		color: #999999;
		margin-bottom: 10px;
	}

	.page-input {
		width: 100%;
		height: 30px;
		margin-top: 5px;
		border-radius: 4px;
		border: 1px solid #e8e8e8;
		line-height: 23px;
		padding-left: 10px;
	}

	button {
		width: 80%;
		height: 30px;
		background-color: #4991fc;
		font-size: 14px;
		color: #fff;
		border-radius: 5px;
		margin-top: 10px;
		margin-bottom: 10px;
		border: none;
		outline: none;
	}
</style>
