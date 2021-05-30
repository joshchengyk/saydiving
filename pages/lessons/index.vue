<template>
    <div>
        <h1 class='col-md-12 col-lg-12 col-xl-12 text-center page-title'>潛水課程</h1>
        <div class='container' v-for='(lesson,idx) in lessons' :key='idx' >      
            <nuxt-link :to='"/lessons/"+lesson.slug' >
                <div class='row lesson-row animate-show lessonCard' v-if='idx % 2 ==0 || window.width < 765 ' >
                    <div class='col-md-7 col-lg-7 col-xl-7'>                   
                        <h1 class='lesson-title'>{{lesson.title}}</h1>
                        <h3>{{lesson.title_ch}}</h3>
                        <p>
                            {{lesson.home_info}}
                        </p>

                    
                    </div>
                    <div class='col-md-5 col-lg-5 col-xl-5'>
                        <img :src= 'backendurl + lesson.thumbnail.url'>
                    </div>
                </div>
        
                <div class='row lesson-row animate-show lessonCard' v-if =' idx % 2 != 0 && window.width >= 765'>
                    <div class='col-md-5 col-lg-5 col-xl-5 '>
                        <img :src= 'backendurl + lesson.thumbnail.url'>
                    </div>
                    <div class='col-md-7 col-lg-7 col-xl-7 '>
                        <h1 class='lesson-title'>{{lesson.title}}</h1>
                        <h3>{{lesson.title_ch}}</h3>
                        <p>
                            {{lesson.home_info}}
                        </p>
                    
                    </div>
                </div>
            </nuxt-link>  
                                
        </div><!--End of container-->
    </div>
</template>

<script>
import { gsap } from 'gsap';

export default {
    data(){
        return{
            frontendurl: process.env.frontendurl,
            backendurl: process.env.backendurl,
            title:'潛水課程',
            window: {
                width: 0,
                height: 0
            }
        }
    },

    async asyncData({$axios}){
        const lessons = await $axios.$get(process.env.backendurl+"/lessons")
        return {lessons}
    },

    head() {
      return {
        title: this.title,
        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          {
            hid: 'Say衝潛水 專業潛水課程',
            name: 'lesson page',
            content: 'Say衝潛水專業潛水課程,教學經驗豐富 曾在世界各地知名潛點如帛琉、PP島、馬爾地夫等進行教學活動'
          }
        ]
      }
    },

    mounted() {
            
        window.addEventListener('resize', this.handleResize);
        this.handleResize();

        if(this.window.width >=765 ){

            document.getElementsByClassName('animate-show').forEach((item,i) => {
                
                let positionX = 0;
                if(i % 2 ==0) positionX=38;
                else positionX = -38;

                gsap.fromTo(item, {
                xPercent:positionX,
                autoAlpha:0
                },{       
                    xPercent:0,
                    autoAlpha:1,
                    delay:i*0.8,
                    duration:1.2
                })
                
            });

        }

        
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },

    methods:{
        handleResize() {
            this.window.width = window.innerWidth;
            this.window.height = window.innerHeight;
        }
    }
}
</script>
