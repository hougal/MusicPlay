<template>
  <div class="loginbox">
    <div class="login">
      <div @click="exit">
        <span class="iconfont icon-shanchuguanbiquxiaowubiankuang"></span>
      </div>
      <span>昵&emsp;称:</span>
      <input type="text" placeholder="输入昵称" v-model="nickname" /><br />
      <span>密&emsp;码:</span>
      <input type="password" placeholder="输入密码" v-model="pwd" /><br />
      <span>手机号:</span>
      <input
        type="text"
        placeholder="输入手机号"
        v-model="phone"
        @change="isregister"
      /><br />
      <button @click="sentcap">发送验证码</button><br />
      <span>验证码:</span>
      <input
        type="text"
        placeholder="输入验证码"
        v-model="captcha"
        @change="iscap"
      /><br />
      <button @click="register">注册</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "register",
  data() {
    return {
      phone: "",
      pwd: "",
      nickname: "",
      captcha: "",
      exist: 1, //手机是否已经注册
      istrue: false,
    };
  },
  methods: {
    exit() {
      this.$router.back();
    },
    isregister() {
      axios
        .get(
          `http://localhost:3000/cellphone/existence/check?phone=${this.phone}`
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.exist == -1) {
            console.log("手机未被注册, 可以使用");
            this.exist = res.data.exist;
          } else console.log("手机号已被使用,请更换手机");
        });
    },
    iscap() {
      axios
        .get(
          `http://localhost:3000/captcha/verify?phone=${this.phone}&captcha=${this.captcha}`
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.data == true) this.istrue = true;
          else console.log("验证码错误");
        });
    },
    sentcap() {
      axios
        .get(`http://localhost:3000/captcha/sent?phone=${this.phone}`)
        .then((res) => {
          console.log(res.data);
          if (res.data.data != true) console.log("请求验证码错误");
        });
    },
    register() {
      if (this.exist == -1 && this.istrue == true) {
        axios
          .get(
            `http://localhost:3000/register/cellphone?phone=${this.phone}&password=${this.pwd}
				&captcha=${this.captcha}&nickname=${this.nickname}`
          )
          .then((res) => {
            console.log(res.data);
            alert("注册成功");
            this.$router.push({
              path: "/login",
            });
          });
      } else {
        alert("手机已注册或验证码错误");
      }
    },
  },
};
</script>

<style scoped>
.loginbox {
  height: 88vh;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
}
.login {
  border: 1px solid #000;
  width: 300px;
  margin: 200px auto;
  padding: 40px;
}
.login > div > span {
  cursor: pointer;
  font-size: 25px;
}
</style>