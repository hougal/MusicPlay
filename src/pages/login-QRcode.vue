<template>
  <div>
    <img :src="url" alt="" />
    <button @click="refresh" v-if="re">刷新二维码</button>
    <p v-if="ok">请在手机上确认登录</p>
    <p v-if="ok2">登录成功!</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "qrcode",
  data() {
    return {
      url: "",
      key: 0,
      interval: 0,
      re: false,
      ok: false,
      ok2: false,
    };
  },
  methods: {
    refresh() {
      axios.get(`http://localhost:3000/login/qr/key`).then((respon) => {
        this.key = respon.data.data.unikey;
        axios
          .get(
            `http://localhost:3000/login/qr/create?key=${
              this.key
            }&qrimg=true&timerstamp=${Date.now()}`
          )
          .then((respon) => {
            this.url = respon.data.data.qrimg;
          });
      });
      this.interval = setInterval(() => {
        axios
          .get(
            `http://localhost:3000/login/qr/check?key=${
              this.key
            }&timerstamp=${Date.now()}`
          )
          .then((respon) => {
            if (respon.data.code == 801) return;
            else if (respon.data.code == 800) this.re = true;
            else if (respon.data.code == 802) this.ok = true;
            else if (respon.data.code == 803) {
              this.ok = false;
              this.ok2 = true;
              localStorage.setItem("cookie", respon.data.cookie);
            }
          });
      }, 2000);
    },
  },
  mounted() {
    axios.get(`http://localhost:3000/login/qr/key`).then((respon) => {
      this.key = respon.data.data.unikey;
      axios
        .get(
          `http://localhost:3000/login/qr/create?key=${
            this.key
          }&qrimg=true&timerstamp=${Date.now()}`
        )
        .then((respon) => {
          this.url = respon.data.data.qrimg;
        });
    });
    this.interval = setInterval(() => {
      axios
        .get(
          `http://localhost:3000/login/qr/check?key=${
            this.key
          }&timerstamp=${Date.now()}`
        )
        .then((respon) => {
          if (respon.data.code == 801) return;
          else if (respon.data.code == 800) this.re = true;
          else if (respon.data.code == 802) this.ok = true;
          else if (respon.data.code == 803) {
            this.ok = false;
            this.ok2 = true;
            sessionStorage.setItem("cookie", respon.data.cookie);
            this.$store.state.iflogin = true;
            axios.get(`http://localhost:3000/login/status?timerstamp=${Date.now()}`)
              .then((res) => {
                this.$store.commit("ADDUSER", respon.data.profile);
              });
            this.$router.push({
              path: "/",
            });
          }
        });
    }, 2000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped>
img {
  margin-left: 20%;
}
button {
  margin-left: 35%;
}
</style>