<template>
  <div id="app">
    <Head />
    <Home />
    <Footer />
  </div>
</template>

<script>
import "./assets/reset.css";
import "./assets/iconfont.css";
import axios from "axios";

import Head from "./components/head.vue";
import Home from "./components/home";
import Footer from "./components/foote.vue";

export default {
  name: "App",
  components: { Head, Footer, Home, axios },
};
</script>

<style>
body{
	overflow: hidden;
}
.iconfont {
  font-size: 20px;
  margin-right: 5px;
  text-decoration: none;
}
.icon-zuo,.icon-you{
	font-size: 10px;
}
.icon-biaodan{
	font-size: 25px;
	margin-top: 10px;
}
.icon-tianjia1 .text {
  visibility: hidden;
  width: 60px;
	height: 20px;
	line-height: 20px;
  background-color: black;
  color: #fff;
	font-size: 4px;
  text-align: center;
  border-radius: 6px;

  /* 定位 */
  position: absolute;
  z-index: 1;
}
.icon-tianjia1:hover .text {
  visibility: visible;
}
a {
  color: black;
  text-decoration: none;
}
button:hover {
  cursor: pointer;
}
.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
  clear: both;
}
</style>
