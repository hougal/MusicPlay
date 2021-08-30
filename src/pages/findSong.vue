<template>
  <div id="findsong">
    <div id="findsong-dh" >
			<ul class="clearfix">
				<li><router-link to="/findSong/recommend">个性推荐</router-link></li>
				<li><router-link to="/findSong/songList">歌单</router-link></li>
				<li><router-link to="/findSong/rank">排行榜</router-link></li>
				<li><router-link to="/findSong/singer">歌手</router-link></li>
				<li><router-link to="/findSong/newSong">最新音乐</router-link></li>
			</ul>
		</div>
		<router-view></router-view>
  </div>
</template>

<script>
export default {
	name:'findSong'
};
</script>

<style>
#findsong {
  width: auto;
  height: 88vh;
  padding: 0 150px;
  overflow-y: auto;
}
#findsong >div{
	margin-top: 30px;
	overflow: hidden;
}
#findsong-dh >ul,#findsong-dh li{
	float: left;
	margin-left: 10px;
	padding-bottom: 2px;
}
#findsong-dh >ul{
	margin-left: 40%;
}
#findsong-dh li:hover{
	border-bottom: 1px solid #000;
}
</style>