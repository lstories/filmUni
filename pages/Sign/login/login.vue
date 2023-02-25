<template>
	<view class="page-inner">
		<view class="page-tip">Sign in</view>

		<u--form labelPosition="top" :model="userFormData" :rules="rules" ref="form1">
			<u-form-item label="用户名" label-width="100px" prop="userFormData.username" borderBottom ref="item1">
				<u--input v-model="userFormData.username" border="none"></u--input>
			</u-form-item>
			<u-form-item label="密码" prop="userFormData.username" borderBottom ref="item1">
				<u--input v-model="userFormData.username" border="none"></u--input>
			</u-form-item>			
		</u--form>
		<u-button class="custom-style" type="primary" shape="circle" text="登录"></u-button>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginAccount: "",
				password: "",
				userFormData: {
					username: "",
					password: "",
				}
			}
		},
		methods: {
			submitLogin: function(loginAccount, password) {
				//此处发送loginAccount，password给后端
			},
		},

		beforeCreate() {
			//路由拦截，如果已经登录，则跳转到首页
		},
		onShareAppMessage() {
			//设置小程序对应路径
		},
	}
</script>

<style lang="scss">
	
	.page-inner {
		text-align: center;
	}

	.page-tip {
		font-size: 36px;
		color: #999;
		background-color: pink;
		width: 200px;
		height: 44px;
		line-height: 36px;
		margin: auto;
	}
	
	.custom-style {
		width: 400rpx;
		margin-top: 20rpx;
	}

</style>
