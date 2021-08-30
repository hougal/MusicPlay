<template>
  <div class="loginbox">
    <div class="login">
      <div>
        <a href="javascript:;" @click="cphone">手机号登录</a>
        <a href="javascript:;" @click="cemail">邮箱登录</a>
        <a href="javascript:;" @click="cqrcode">二维码登录</a>
      </div>
      <phone v-if="ifphone" />
      <email v-if="ifemail" />
      <qrcode v-if="ifqrcode" />
      <a href="javascript:;">注册</a>
      <a href="javascript:;">忘记密码</a>
    </div>
  </div>
</template>

<script>
import phone from "./login-phone.vue";
import email from "./login-email.vue";
import qrcode from "./login-QRcode.vue";
export default {
  name: "login",
  components: { phone, email, qrcode },
  data() {
    return {
      ifphone: true,
      ifemail: false,
      ifqrcode: false,
    };
  },
  methods: {
    cphone() {
      this.ifphone = true;
      this.ifemail = false;
      this.ifqrcode = false;
    },
    cemail() {
      this.ifphone = false;
      this.ifemail = true;
      this.ifqrcode = false;
    },
    cqrcode() {
      this.ifphone = false;
      this.ifemail = false;
      this.ifqrcode = true;
    },
  },
};
</script>

<style>
a:hover {
  text-decoration: underline;
}
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
}
.login > div {
  border-bottom: 1px #000 solid;
  margin-bottom: 10px;
}
.login a {
  margin-right: 10px;
  line-height: 25px;
}
</style>