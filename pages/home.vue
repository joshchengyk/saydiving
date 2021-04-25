<template>
    <div>
        <section>
            <div class=textimg>
            <div class='jumbotron'>
                <b-carousel
                id="carousel-1"
                v-model="slide"
                :interval="4000"
                controls
                indicators
                no-hover-pause
                background="#ababab"
                img-width="1024"
                img-height="860"
                style="text-shadow: 1px 1px 2px #333;"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
                >

                <!-- Slides with custom text -->
                <b-carousel-slide img-src="/pictures/slideshow/payment-cover.jpg">
                    <h1 class='slidetext'>Say衝潛水</h1>
                </b-carousel-slide>

                <b-carousel-slide img-src="/pictures/slideshow/1270047_10202273225261176_8668008268791935587_o.jpg">
                    <h1 class='slidetext'>世昌潛水</h1>
                </b-carousel-slide>

                <b-carousel-slide img-src="/pictures/slideshow/10431163_10202938215525517_5499078545918765353_o.jpg">
                    <h1 class='slidetext'>Hello world!</h1>
                </b-carousel-slide>

                </b-carousel>
            </div>
            </div>
        </section>

        <section class="">
            <div class="container">
                <h1>推薦課程</h1>
                <br>
                <div class="row">
                    <div class="col-md-4">
                        <div class="feature feature-1">
                            <img alt="Image" src="/pictures/level1.jpg" />
                            <div class="feature__body boxed boxed--border">                     
                                <div class = "course-cover-intro">
                                    開放水域初級潛水員（OPEN WATER DIVER）開放水域初級潛水員是入門的基本潛水課程，可以學習到潛水安全知識、與基本潛水技巧。
                                </div>                                           
                                <a href="">
                                    了解詳情
                                </a>
                            </div>
                        </div>
                        <!--end feature-->                
                    </div>         

                    <div class="col-md-4">
                        <div class="feature feature-1">
                            <img alt="Image" src="/pictures/level2.jpg" />
                            <div class="feature__body boxed boxed--border">                                         
                            <div class = "course-cover-intro">
                                這就是進階開放水域潛水員課程。報名該課程，您不需要一定是“進階的”水準-這門課是用來改善您的潛水技能，所以您可以在獲得開放水域潛水員證書之後開始學習。課程幫您建立自信，完善您在不同探險中的水肺潛水技巧
                            </div>                                           
                            <a href="">
                                了解詳情
                            </a>
                            </div>
                        </div>
                        <!--end feature-->                
                    </div>         

                    <div class="col-md-4">
                        <div class="feature feature-1">
                            <img alt="Image" src="/pictures/level3.jpg" />
                            <div class="feature__body boxed boxed--border">                     
                            <div class = "course-cover-intro">
                                水肺潛水員們普遍認為PADI救援潛水員課程是自己參加過的最具挑戰性但也是最有收穫的課程。為什麼？因為您會學習避免和處理水下事故的技巧，您就會對自己的潛水技巧更加有信心，並且知道在別人需要的時候您可以提供幫助。
                            </div>                                           
                            <a href="">
                                了解詳情
                            </a>
                            </div>
                        </div>
                        <!--end feature-->                
                    </div>         
                </div>
                <!--end of row-->
            </div>
            <!--end of container-->
        </section>
    </div>
</template>

<script>
export default {
    
    data() {
      return {
        title: 'Say衝潛水',
        slide: 0,
        sliding: null
      }
    },

    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
}
</script>