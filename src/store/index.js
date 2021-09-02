import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const actions = {

}
const mutations = {
	ADDUSER(state, value){
		state.user = value
	},
	GETURL(state, [value, isfm]) {
		if(isfm === 'isfm'){
			value.al = {}
			value.ar = value.artists
			value.dt = value.duration
			value.al.picUrl =  value.album.picUrl
		}
		var place = state.urllist.lastIndexOf(value)
		//检测歌单中是否已有此歌曲
		if(place == -1){
			state.urllist.push(value)
			state.nextsong = state.urllist.length
			state.url = state.urllist[state.nextsong-1]
		}else{
			state.url = state.urllist[place]
			state.nextsong = place + 1
		}
	},
	//将某一首歌添加进歌单
	ADDURL(state,  [value, isfm]){
		if(isfm === 'isfm'){
			value.al = {}
			value.ar = value.artists
			value.dt = value.duration
			value.al.picUrl = value.album.blurPicUrl
		}
		//检测歌单中是否已有此歌曲
		if(state.urllist.lastIndexOf(value) == -1)
			state.urllist.push(value)
	},
	GETURLLIST(state, value) {
		//添加歌单
		state.urllist.concat(value)
	},
	LASTSONG(state){
		state.nextsong = (state.nextsong - 2 + state.urllist.length)%state.urllist.length
		state.url = state.urllist[state.nextsong]
		state.nextsong++
	},
	NEXTSONG(state){
		state.nextsong = (state.nextsong + state.urllist.length)%state.urllist.length
		state.url = state.urllist[state.nextsong]
		state.nextsong++
	},
	DELINURLLIST(state, value){
		state.urllist.splice(value, 1)
	},
}
const state = {
	iflogin: false,
	user:[],
	url: {
		"name": "吉祥話",
		"id": 1824454151,
		"ar": [
			{
				"id": 1049179,
				"name": "Hanser",
				"tns": [],
				"alias": []
			},
			{
				"id": 1047282,
				"name": "泠鸢yousa",
				"tns": [],
				"alias": []
			},
			{
				"id": 12279635,
				"name": "祖娅纳惜",
				"tns": [],
				"alias": []
			},
			{
				"id": 17014,
				"name": "鹿乃",
				"tns": [],
				"alias": [
					"かの"
				],
				"alia": [
					"かの"
				]
			}
		],
		"al": {
			"id": 123799547,
			"name": "2021哔哩哔哩拜年纪",
			"picUrl": "http://p4.music.126.net/h9fwhS2GHKKmhhu-08MU_w==/109951165774793134.jpg",
			"tns": [],
			"pic_str": "109951165774793134",
			"pic": 109951165774793140
		},
		"dt": 268800,
		"cp": 1418026,
		"mv": 0,
		"publishTime": 1615305600000,
	},
	nextsong:0,
	urllist: [],
	dtime: 0,
}
export default new Vuex.Store({
	actions,
	mutations,
	state,
})