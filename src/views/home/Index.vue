<template>
    <div class="main">
        <div class="container">
            <transition-group v-on:leave="sentleave" name="fade" appear>
                <div class="sentence center" v-if="showSentence" key="sen">
                  <p>自从遇见了你，</p>
                  <div>世界所有没有终成具象。</div>
                </div>
                <div class="buttons center" v-if="showBtns" key="btn">
                  <z-button>我的博客</z-button>
                  <z-button>xxxx</z-button>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      showSentence: true,
      showBtns: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.showSentence = false
    }, 2000)
  },
  methods: {
    sentleave (el, done) {
      setTimeout(() => {
        this.showBtns = true
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.main{
    width: 100vw;
    height: 100vh;
    background: url("../../assets/bg.jpeg");
    background-size: cover;
    color: #fff;
    position: relative;
}
.container{
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.8);
}
.sentence {
  font-size: 21px;
  @media screen and (max-width: 792px){
    font-size: 15px;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
