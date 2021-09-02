<template>
  <div id="player">
    <div class="head">
      <span id="songname">{{ $store.state.url.name }}</span>
      <router-link
        id="singer"
        :to="'`/search/${ite.name}`'"
        v-for="item in $store.state.url.ar"
        :key="item.id"
      >
        {{ item.name }}
      </router-link>
			<!-- 取消按钮 -->
      <div @click="exit">
				<span class="iconfont icon-shanchuguanbiquxiaowubiankuang"></span>
			</div>
    </div>
    <div class="main clearfix">
      <!-- 左侧歌词区 -->
      <div class="left" ref="lyric"></div>
      <!-- 右侧评论区 -->
      <div class="right">
        <h2>热门评论</h2>
        <div
          class="audience clearfix"
          v-for="item in hotcomment"
          :key="item.commentId"
        >
          <img :src="item.user.avatarUrl" alt="" />
          <p>{{ item.user.nickname }}</p>
          <span>{{ item.content }}</span>
        </div>
        <h2>最新评论</h2>
        <div
          class="audience clearfix"
          v-for="item in comment"
          :key="item.commentId"
        >
          <img :src="item.user.avatarUrl" alt="" />
          <p>{{ item.user.nickname }}</p>
          <span>{{ item.content }}</span>
        </div>
        <div id="btn">
          <button @click="getcomment(--page)">上一页</button>
          <button @click="getcomment(++page)">下一页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "player",
  data() {
    return {
      lyr: "", //存储歌词中转变量
      lyric: {}, //存储歌词的对象
      lyrTime: [],
      lyrLine: 0,			//当前歌词行
      hotcomment: [],
      comment: [],
      page: 0,
      Interval: 0, //歌词滚动
    };
  },
  computed: {
    dtime() {
      return this.$store.state.dtime;
    },
  },
  methods: {
    num(a) {
      return parseInt(a.split(":")[0] * 60 + parseInt(a.split(":")[1]));
    },
    exit() {
      this.$router.back();
    },
    //歌词下一页/上一页
    getcomment(page) {
      if (page < 0) {
        this.page++;
        return 0;
      }
      axios({
        method: "GET",
        url: `http://localhost:3000/comment/music?id=${
          this.$store.state.url.id
        }&limit=20&offset=${page * 20}`,
      }).then((respon) => {
        this.comment = respon.data.comments;
      });
    },
    get() {
      //获取歌词
      axios({
        method: "GET",
        url: `http://localhost:3000/lyric?id=${this.$store.state.url.id}`,
      }).then((respon) => {
        this.lyr = respon.data.lrc.lyric.split("\n");
        this.lyr.pop();
        this.lyr.forEach((item) => {
          Object.defineProperty(this.lyric, item.split("]")[0].substr(1), {
            enumerable: true,
            value: item.split("]")[1],
          });
        });
        //输出歌词
        for (var ite in this.lyric) {
          this.lyrTime.push(ite);
          this.$refs.lyric.innerHTML += `<p class="gc">${this.lyric[ite]}&nbsp;</p>`;
        }
      });
      //评论
      axios({
        method: "GET",
        url: `http://localhost:3000/comment/music?id=${this.$store.state.url.id}&limit=20`,
      }).then((respon) => {
        this.hotcomment = respon.data.hotComments;
        this.comment = respon.data.comments;
      });
			if(this.Interval) clearInterval(this.Interval);
      this.Interval = setInterval(() => {
        //歌词滚动
        //判断时间是否在上一句歌词和下一句歌词的间隔之间
        for (var i = this.lyrLine; i < this.lyrTime.length; i++) {
          if (
            this.num(this.$store.state.dtime) >= this.num(this.lyrTime[i]) &&
            this.num(this.$store.state.dtime) < this.num(this.lyrTime[i + 1])
          ) {
            //清除其余的行的突出显示
            document.getElementsByClassName("gc").forEach((elem) => {
              elem.removeAttribute("style");
            });
            document
              .getElementsByClassName("gc")
              [i].setAttribute("style", "color:red;font-size:30px");
            this.lyrLine = i;
          }
        }
      }, 1000);
    },
  },
  mounted() {
		this.get()
  },
  beforeDestroy() {
    clearInterval(this.Interval);
  },
};
</script>

<style scoped>
#player {
  background-color: white;
  position: absolute;
  width: 100%;
  height: 88vh;
  z-index: 100;
}
.head {
  background-color: transparent;
  font-size: 40px;
  margin-left: 100px;
}
.head > div {
	cursor: pointer;
	display: inline;
  position: relative;
  left: 970px;
}
#visi {
  visibility: hidden;
}
#songname {
  margin-right: 20px;
}
#singer {
  margin-right: 7px;
  font-size: 20px;
}

.main {
  height: 95.4%;
}
.left {
  background-color: transparent;
  height: 95%;
  width: 68%;
  margin-left: 8%;
  margin-top: 40px;
  font-size: 20px;
  line-height: 35px;
  text-align: center;
  float: left;
  overflow: auto;
}

.right {
  background-color: transparent;
  height: 100%;
  margin-left: 75%;
  padding-left: 10px;
  overflow: auto;
}

h2 {
  font-size: 25px;
  margin-top: 0;
  padding: 10px;
}

#btn {
  text-align: center;
  margin: 30px 0;
}
.audience {
  width: 90%;
  height: auto;
  border-top: 1px solid #cfcfcf;
  padding-left: 20px;
  padding-top: 10px;
  margin-bottom: 20px;
  position: relative;
}

.audience img {
  border: 1px solid #000;
  height: 60px;
  width: 60px;
  margin-right: 10px;
  float: left;
}

.audience > p {
  margin: 0;
  margin-bottom: 10px;
  color: #0c73c2;
}

.control {
  background-color: turquoise;
  height: 125px;
  position: relative;
}
</style>