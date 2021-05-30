<template>
    <div>
        <section>
            <div class='slide-bar slide_animate' ref='slide_animate'>
            <fa :icon='["fas" , "cog"]' style="font-size: 30px" v-if='status=="close"' class='slide-btn' @click='slideClick'/>
            <fa :icon='["fas" , "chevron-circle-left"]' style="font-size: 30px" v-if='status=="open"' class='slide-btn' @click='slideClick' />       
            <div class='slide-content'>
                <h5 class='text-center'>{{getEmail}}</h5>          
                <ul class='no-dot'>
                  <a href="/users/my-lessons" class='jaside-nav'><li class='text-center'><fa :icon='["fas" , "swimmer"]' style="font-size: 20px"/>我的課程</li></a>
                  <a href="/users/my-account" class='jaside-nav'><li class='text-center'><fa :icon='["fas" , "user-circle"]' style="font-size: 20px"/>聯絡資訊</li></a>
                  <a href="/users/my-message" class='jaside-nav'><li class='text-center' ><fa :icon='["fas" , "user-circle"]' style="font-size: 20px"/>訊息通知</li></a>
                </ul>   
            </div>
            </div> 
        </section>
    </div>
</template>

<script>
import { gsap } from 'gsap';

export default {
  data(){
    return{
      status:'close',
    }
  },

  computed:{
    getEmail(){
      return this.$store.getters['auth/getusermail']
    }
  },

  methods:{
    slideClick(){
      const{ slide_animate } = this.$refs

      if(this.status == 'open'){  
        this.status = 'close'       
        gsap.to(slide_animate,{
          duration:0.3,
          translateX:-250
        })
      }
        
      else {
        this.status = 'open'
        gsap.to(slide_animate,{
          duration:0.3,
          translateX:0
        })
      }
        
    }
  }
}
</script>

