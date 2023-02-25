<template>
	<view>
		<Lines></Lines>
		<FilmList :keyword="keyword"></FilmList>
	</view>
</template>

<script>
	import Lines from '@/components/Line.vue';
	import FilmList from '@/components/FilmList.vue';
	export default {
		components: {
			Lines,
			FilmList
		},
		data() {
			return {
				keyword: "",
			}
		},
		methods: {

		},

		onLoad(e) {
			// 接收传值
			console.log(e.keyword)
			this.keyword = e.keyword
			// bug1
			// #ifdef APP-PLUS
			var webView = this.$mp.page.$getAppWebview();
			// 设置 searchInput的 text
			webView.setTitleNViewSearchInputText(text)
			// #endif
		}
	}
</script>

<style scoped>

</style>
