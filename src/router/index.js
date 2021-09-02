import VueRouter from 'vue-router'

// 引入commponent
import login from '../pages/login'
import register from '../pages/login-register'
import forget from '../pages/login-forget'
import findSong from '../pages/findSong'
import selfFm from '../pages/selfFm'
import search from '../pages/search'
import recommend from '../pages/recommend'
import songList from '../pages/songList'
import songListDetail from '../pages/songListDetail'
import rank from '../pages/rank'
import singer from '../pages/singer'
import newSong from '../pages/newSong'
import player from '../pages/player'

export default new VueRouter({
	routes:[
		{
			path:'/',
			// redirect 重定向
			redirect:'/findSong/recommend'
		},
		{
			path:'/login',
			component: login,
		},
		{
			path:'/login-register',
			component: register,
		},
		{
			path:'/login-forget',
			component: forget,
		},
		{
			path:'/findSong',
			component: findSong,
			children:[
				{
					path:'recommend',
					component: recommend
				},
				{
					path:'songList',
					component: songList,
				},
				{
					path:'songListDetail/:id/:name',
						component:songListDetail,
						props:true
				},
				{
					path:'rank',
					component: rank
				},
				{
					path:'singer',
					component: singer
				},
				{
					path:'newSong',
					component: newSong
				},
			]
		},
		{
			path:'/selfFm',
			component: selfFm
		},
		{
			path:'/search/:searchkey',
			component: search,
			props:true,
		},
		{
			path:'/player',
			component: player,
		},
	]
})