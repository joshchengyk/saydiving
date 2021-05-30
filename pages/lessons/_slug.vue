<template>
    <div>
        <div class='container-fluid no-padding'>
            <div class='row'>
                <img :src='backendurl+lesson.main_img.url' alt="Image" class='col-md-6'>

                <div class='col-md-6 col-lg-6 col-xl-6'>

                    <h1 class='pay-title'>{{lesson.title}}</h1>
                    <h1 class='pay-subtitle'>{{lesson.title_ch}}    <small>${{lesson.price}} / 人</small></h1>
                                   
                    <h2 class='col-md-12 col-lg-12 col-xl-12 text-center page-title'>費用包含</h2>                

                    <div class='row'>
                        <div class='col-md-6 col-lg-6 col-xl-6'>
                            <h3 class='text-center'>課程內容</h3>
                            <p class='col-md-10 col-lg-10 col-xl-10 offset-md-2 offset-lg-2 offset-xl-2' v-for="(item,idx) in lesson.chapter.split('\n')" :key="idx">
                                {{item}}
                            </p>
                            
                        </div>

                        <div class='col-md-6 col-lg-6 col-xl-6'>
                            <h3 class='text-center'>其他費用</h3>
                            <p class='col-md-10 col-lg-10 col-xl-10 offset-md-2 offset-lg-2 offset-xl-2' v-for="(item,idx) in lesson.equipment.split('\n')" :key="idx">
                                {{item}}
                            </p>
                        </div>
                    </div>

                    <div class='item-box col-md-6 col-lg-6 col-xl-6  offset-md-3 offset-lg-3 offset-xl-3 '>
                        <label for="example-datepicker">預約上課日期</label>
                        <b-form-datepicker id="example-datepicker" v-model="datevalue" class="mb-2"></b-form-datepicker>
                    </div>

                    <div class='item-box col-md-6 col-lg-6 col-xl-6  offset-md-3 offset-lg-3 offset-xl-3'>
                        <label for="demo-sb">課程參加人數</label>
                        <b-form-spinbutton id="demo-sb" v-model="numvalue" min="1" max="4"></b-form-spinbutton>
                    </div>

                    <div class='item-box col-md-6 col-lg-6 col-xl-6  offset-md-3 offset-lg-3 offset-xl-3 transfer-box'>
                        <h4 class='text-center'>交易明細</h4>
                        <h6 class='text-right transfer-item'>教學費用: {{lesson.price}}$</h6>
                        <h6 class='text-right transfer-item'>參加人數: {{numvalue}}</h6>
                        <h6 class='text-right transfer-summary'>總共:{{lesson.price*numvalue+"$"}}</h6>
                    </div>   

                    <button class='btn1 col-md-4 col-lg-4 col-xl-4  offset-md-4 offset-lg-4 offset-xl-4' @click='transfer'>確認報名</button>                  
           
                </div>
                
            </div>

            
        </div>
    </div>
</template>

<script>
  export default {

    data(){
        return{
            backendurl: process.env.backendurl,
            title:'潛水課程',
            datevalue: '',
            numvalue:1,
            
        }
    },

    async asyncData({$axios,params,store}){

        const lessons = await $axios.$get(process.env.backendurl+"/lessons?slug=" + params.slug)
           
        const lesson = lessons[0]
        return {lesson}
    },

    methods:{

        async transfer(){

            const response = await this.$axios.$post(process.env.backendurl+"/orders",{
                status:"non_paid",
                members:this.numvalue,
                tuition:this.lesson.price * this.numvalue,
                schoolday:this.datevalue,
                lesson:this.lesson.id
            },{
                headers:{
                    Authorization:this.$store.getters['auth/getuserjwt']
                }
            })
            .then(r=>{
                window.location='/lessons/confirm'
            })
            .catch(err=>{
                alert('err')
                console.log(err)
            })
            
            
            
            
        }
    }
  }
</script>