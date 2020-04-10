<template>
    <div class="main">
        <div class="container" v-show="showGreet" >
          <div class="mask" :style="{background: `rgba(0,0,0,${curStamp.opacity})`}"></div>
          <transition name="pull-left" appear>
            <div class="greeting" v-show="showGreet" >
                <p class="sent">{{curStamp.sent}}</p>
                <z-button class="btn" @click="showBlog">我的博客</z-button>
            </div>
          </transition>
        </div>
    </div>
</template>

<script>
export default {
	name: 'home',
	data () {
		return {
			showGreet: true,
			curStamp: null,
			timeStamp: [
				{
					time: [5, 12],
					sent: '早安， 早安',
					opacity: 0.2
				},
				{
					time: [12, 19],
					sent: '午安， 午安',
					opacity: 0.4
				},
				{
					time: [19, 4],
					sent: '晚安， 晚安啊',
					opacity: 0.6
				}
			]
		};
	},
	mounted () {
		
	},
	created () {
		let hour = new Date().getHours();
		let curStamp = this.timeStamp.find(item => hour >= item.time[0] && hour < item.time[1]);
		this.curStamp = curStamp ? curStamp : this.timeStamp[2]; 
	},
	methods: {
		showBlog () {
			this.$router.push({ path: '/articleList' });
		}
	}
};
</script>

<style lang="scss" scoped>
.main{
    width: 100vw;
    height: 100vh;
    background: url("../../assets/bg.jpeg");
    background-size: cover;
    background-position: bottom;
    color: #fff;
    position: relative;
    font-size: 16px;
}
.mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0
}

.greeting {
  position: absolute;
  z-index: 1;
  top: 20%;
  left: 20%;
  transition: all ease .3s;
  .sent {
    font-size: 30px;
	margin-bottom: 20px;
	
	@media screen and (max-width: 586px){
		font-size: 16px
	}
  }
  .btn {

  }
}

.pull-left-enter, 
.pull-left-leave-active {
    opacity: 0;
    left: 0;
}

</style>
