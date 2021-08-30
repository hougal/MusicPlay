<template>
  <div>
    邮&emsp;箱:<input
      type="text"
      placeholder="输入163邮箱"
      v-model="user"
    /><br />
    密&emsp;码:<input
      type="password"
      placeholder="输入密码"
      v-model="pwd"
    /><br />
    <button @click="login">登录</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "email",
  data() {
    return {
      user: "",
      pwd: "",
    };
  },
  methods: {
    login() {
      axios
        .post(
          `http://localhost:3000/login?email=${this.user}&password=${this.pwd}`
        )
        .then((respon) => {
          console.log(respon);
          if (respon.data.code == 502) alert(respon.data.message);
					if(respon.data.code == 250) alert(respon.data.message);
        });
    },
  },
};
</script>

<style scoped>
button {
  margin-left: 40%;
  margin-top: 10px;
}
</style>