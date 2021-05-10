<template>
  <div>
    <div class='container'>
      <a href="top"></a>
      <h1 class= 'page-title col-md-12'>精彩回顧</h1>
      <p>
        我熱愛潛水 我想在有限的生命去完成我夢想的大海藍圖<br>
        發源地永遠都是我最愛的家 台灣~<br>
        上帝遺留的珍珠 馬爾地夫 彩虹的故鄉 帛琉<br>
        熱情自由的快樂國度 泰國pp島<br>
        三個國家 三種不同類型的潛水工作 三種挑戰<br>
      </p>
      <div v-for="(el,idx) in photos" :key='idx'>
        <h2 class='col-md-12 text-center gallery-location'>{{el.location_ch}}</h2>

        <vue-masonry-wall :items=el.photos :options="{width: 500, padding: 12}" @append="append">
          <template v-slot:default="{item}">
            <div class="item">
              <img :src='backendurl+item.url' alt="Image">
            </div>
          </template>
        </vue-masonry-wall>
      </div>   

      <a href="#top" class='floatbtn'>
          <h6 class="floatarrow text-center">^</h6>
          <h6 class="text-center">TOP</h6>
      </a>

    </div>
  </div>
</template>

<script>
  import VueMasonryWall from "vue-masonry-wall";

  export default {
    name: 'app',
    components: {VueMasonryWall},
    head() {
      return {
        title: "精彩回顧",
        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          {
            hid: 'Say衝潛水 專業潛水課程',
            name: 'gallery page',
            content: 'Say衝潛水專業潛水課程,教學經驗豐富 曾在世界各地知名潛點如帛琉、大堡礁、馬爾地夫等進行教學活動'
          }
        ]
      }
    },


    data() {
      return {
        backendurl: process.env.backendurl
      }
    },

    async asyncData({$axios}){
        const photos = await $axios.$get(process.env.backendurl+"/histories")
        return {photos}
    },

    methods: {
      /**
     * I am mocking a API call that load 20 objects at a time.
     */
      append() {
        for (let i = 0; i < 100; i++) {
          /*if(this.items.length<100)
            this.items.push({title: `Item ${this.items.length}`, image: '/pictures/paul/'+this.items.length+'.jpg'})
          */
        }
      }
    }
  }
</script>