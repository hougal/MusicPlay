<template>
  <div class="footer">
    <audio
      :src="url"
      :a="curl"
      ref="bf"
      @timeupdate="onTimeUpdate"
      @canplay="getDuration"
    ></audio>
    <div id="footer-control">
			<!-- 上一首, 下一首, 播放按钮 -->
      <button @click="lastSong">
				<span class="iconfont icon-shangyishoushangyige"></span>
			</button>
      <button @click="play">
				<span class="iconfont icon-bofangsanjiaoxing" v-if="!playing"></span>
				<span class="iconfont icon-zanting1" v-if="playing"></span>
			</button>
      <button @click="nextSong">
				<span class="iconfont icon-xiayigexiayishou"></span>
			</button>
    </div>
    <div id="footer-detail">
      <div>
        <router-link to="/player"
          ><img :src="$store.state.url.al.picUrl"
        /></router-link>
      </div>
      <!-- 歌名, 作者, 进度条显示 -->
      <div id="songname">{{ $store.state.url.name }}&nbsp;</div>
      <div id="artists">{{ $store.state.url.ar[0].name }}</div>
      <el-slider
        v-model="value1"
        ref="progess"
				@mousedown.native="isdrag = true"
				@mouseup.native="isdrag = false"
        @change="changeCurrentTime"
				:format-tooltip='tooltip'
      ></el-slider>
      <span>{{ dtime }}/{{ ztime }}</span>
    </div>
    <div id="footer-sound">
      <span id="sound">
				<!-- 音量设置 -->
        <span class="iconfont icon-laba1"></span>
				<el-slider
          id="soundc"
          v-model="value2"
          :vertical="true"
          height="80px"
          :show-tooltip="false"
          :max="1"
          :step="0.01"
          @input="changeVolume"
        ></el-slider></span
      >&nbsp;&nbsp; <span>playMode</span>&nbsp;&nbsp;
      <span id="bflist">
				<span class="iconfont icon-biaodan"></span>
        <div id="bfsonglist">
          <table class="clearfix">
            <tr v-for="item in $store.state.urllist" :key="item.id">
              <td class="songName">{{ item.name }}</td>
              <td class="con">
                <a href="javascript:;" @click="getUrl(item)">
									<span class="iconfont icon-bofangsanjiaoxing"></span>
								</a>
                <a href="javascript:;" @click="delinlist(item)">
									<span class="iconfont icon-shanchuguanbiquxiaowubiankuang"></span>
								</a>
              </td>
              <td class="author">{{ item.ar[0].name }}</td>
              <td class="Duration">{{ (item.dt / 1000).toFixed(0) }}秒</td>
            </tr>
          </table>
        </div>
      </span>
    </div>
    &nbsp;
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "foote",
  data() {
    return {
      url: "",
      value1: 0, //音频进度
      value2: 0.5, //音量
      dtime: "00:00", //当前播放时间
      ztime: "00:00", //总播放时间
			isdrag:false,
			playing:0,			//是否播放
    };
  },
  computed: {
    picUrl() {
      return (
        this.$store.state.url.al.picUrl ||
        this.$store.state.url.album.blurPicUrl
      );
    },
    curl() {
      axios({
        method: "GET",
        url: `http://localhost:3000/song/url?id=${this.$store.state.url.id}`,
      }).then((respon) => {
        this.url = respon.data.data[0].url;
      });
    },
  },
  methods: {
    onTimeUpdate() {
			if(this.isdrag == true) return
      this.value1 = this.$refs.bf.currentTime;
      this.dtime = `${parseInt(this.value1 / 60)}:${
        parseInt(this.value1) - parseInt(this.value1 / 60) * 60
      }`;
      this.$store.state.dtime = this.dtime;
    },
    getDuration() {
      this.ztime = `${parseInt(this.$refs.bf.duration / 60)}:${
        this.$refs.bf.duration.toFixed(0) -
        parseInt(this.$refs.bf.duration / 60) * 60
      }`;
      //修改播放进度条
      this.$refs.progess.max = this.$refs.bf.duration;
    },
		//同步播放进度和进度条
    changeCurrentTime(a) {
      this.$refs.bf.currentTime = this.value1;
			
    },
    changeVolume() {
			//音量
      this.$refs.bf.volume = this.value2;
    },
    lastSong() {
			//上一首
      this.playing = 0;
      this.$refs.bf.pause();
      this.$store.commit("LASTSONG");
    },
    play() {
      //播放/暂停
      if (this.playing) {
        this.playing = 0;
        this.$refs.bf.pause();
      } else {
        this.playing = 1;
        this.$refs.bf.play();
      }
      console.log(this.playing);
    },
    nextSong() {
			//下一首
      this.playing = 0;
      this.$refs.bf.pause();
      this.$store.commit("NEXTSONG");
    },
    getUrl(item) {
      this.$store.commit("GETURL", [item]);
    },
    delinlist(item) {
			//从歌单中删除
      this.$store.commit(
        "DELINURLLIST",
        this.$store.state.urllist.lastIndexOf(item)
      );
    },
		tooltip(value){
			//进度条tip
			return `${parseInt(value / 60)}:${
        parseInt(value) - parseInt(value / 60) * 60
      }`;
		}
  },
};
</script>

<style scoped>
.footer {
  height: 6.1vh;
  width: 100%;
  line-height: 6vh;
  border-top: 1px solid rgb(201, 201, 201);
  position: absolute;
  bottom: 1px;
}
button {
  border: 0;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  color: white;
  background-color: #f35b5b;
  margin-right: 5px;
}
#footer-control,
#footer-detail {
  margin-left: 50px;
  float: left;
}
#footer-detail > div {
  float: left;
  margin: 0;
  height: 4vh;
}
#footer-detail img {
  width: 4vh;
  height: 100%;
  margin-top: 10px;
}
#footer-detail > .el-slider {
  width: 700px;
  float: left;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 12px;
}
#songname {
  font-size: 23px;
}
#artists {
  font-size: 12px;
}
#footer-sound {
  float: right;
  position: relative;
  right: 100px;
}
#soundc {
  position: absolute;
  top: -100px;
  left: -10px;
  padding: 15px 0;
  border: 1px solid #000;
  background-color: white;
  z-index: 10;
  visibility: hidden;
}
#sound:hover > #soundc {
  visibility: unset;
}
#sound,
#bflist {
  cursor: pointer;
}
#bfsonglist {
  width: 560px;
  height: 280px;
  padding: 10px 20px;
  background-color: rgba(255, 60, 60, 0.8);
  overflow: auto;
  position: absolute;
  left: -340px;
  top: -280px;
  z-index: 10;
  visibility: hidden;
}
#bflist:hover > #bfsonglist {
  visibility: unset;
}
#bfsonglist table {
  table-layout: fixed;
}
#bfsonglist tr {
  line-height: 20px;
  border-bottom: 1px #000 solid;
}
#bfsonglist .songName {
  display: inline-block;
  width: 320px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
#bfsonglist .author {
  display: inline-block;
  width: 120px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
#bfsonglist .con {
  width: 60px;
  text-align: center;
}
</style>