<template>
  <div id="recommend">
    <keep-alive>
      <div class="banner">
        <ul class="clearfix" ref="banner1">
          <li v-for="item in banners1" :key="item.scm">
            <img :src="item.imageUrl" alt="" />
          </li>
        </ul>
        <button class="up" @click="up1">上</button>
        <button class="down" @click="down1">下</button>
      </div>
    </keep-alive>
    <div>
      <h3>主播电台</h3>
      <hr />
      <div class="banner">
        <ul class="clearfix" ref="banner2">
          <li v-for="ite in banners2" :key="ite.url">
            <img :src="ite.pic" />
          </li>
        </ul>
        <button class="up" @click="up2">上</button>
        <button class="down" @click="down2">下</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "recommend",
  data() {
    return {
      banners1: [],
      left: 0,
      banners2: [],
      left2: 0,
    };
  },
  methods: {
    up1() {
      this.left = parseInt(this.$refs.banner1.style.left) + 1271;
      if (this.left > 0) return;
      this.$refs.banner1.style.left = this.left + "px";
    },
    down1() {
      this.left = parseInt(this.$refs.banner1.style.left) - 1271;
      if (this.left < -1271 * (this.banners1.length - 1)) return;
      this.$refs.banner1.style.left = this.left + "px";
    },
    up2() {
      this.left2 = parseInt(this.$refs.banner2.style.left) + 1271;
      if (this.left2 > 0) return;
      this.$refs.banner2.style.left = this.left2 + "px";
    },
    down2() {
      this.left2 = parseInt(this.$refs.banner2.style.left) - 1271;
      if (this.left2 < -1271 * (this.banners2.length - 1)) return;
      this.$refs.banner2.style.left = this.left2 + "px";
    },
  },
  mounted() {
    //banners1
    axios({
      method: "GET",
      url: "http://localhost:3000/banner",
    }).then((respon) => {
      this.banners1 = respon.data.banners;
			console.log(this.banners1)
    });
    //banners2 dj
    axios({
      method: "GET",
      url: "http://localhost:3000/dj/banner",
    }).then((respon) => {
      this.banners2 = respon.data.data;
    });
    this.$refs.banner1.style.left = 0;
    this.$refs.banner2.style.left = 0;
  },
};
</script>

<style scoped>
#recommend > div {
  margin-bottom: 40px;
}
#recommend > div > div {
  height: 400px;
}
.banner {
  position: relative;
  margin-bottom: 60px;
}
.banner > ul {
  width: 20000px;
  position: relative;
  transition: left 1s;
}
.banner > ul > li {
  float: left;
}
.banner img {
  width: 1271px;
}
.up,
.down {
  width: 40px;
  height: 80px;
  position: absolute;
  left: 0;
  top: 210px;
}
.down {
  left: 96.8%;
}
</style>