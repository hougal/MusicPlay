<template>
	<div id="middle" class="clearfix">
		<div id="middle-left">
			<h3>推荐</h3>
			<div><router-link to="/findSong/recommend">发现音乐</router-link></div>
			<div><router-link to="/selfFm">私人FM</router-link></div>
		</div>
		<div id="middle-right">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
export default {
	name:'home',
}
</script>

<style>
#middle{
	height: 88vh;
}
#middle-left{
	float: left;
	width: 15vw;
	height: 100%;
	background-color: rgb(218, 219, 226);
}
#middle-left >div ,h3{
	height: 50px;
	line-height: 50px;
	padding-left: 25px;
	color: #777;
}
#middle-left >div >a{
	border-left: 20px solid transparent;
	width: 100%;
	display: inline-table;
}
#middle-left >div:hover{
	background-color: rgb(193, 193, 197);
}
#middle-right{
	width: auto;
	height: 88vh;
}
</style>