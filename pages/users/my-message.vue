<template>
  <div>
    <jaside></jaside>     
      <div class='setting-container col-12 col-md-10 col-lg-10 col-xl-10 '>
          <div class='setting-title col-11 col-md-11 col-lg-11 col-xl-11 '>
            我的課程
          </div>  

          <section>
            <a href="https://zh.lovepik.com/images/png-25d.html"><img src="/pictures/Lovepik_com-828870141-2Dmail flat commercial elements.png" alt="Image" class='col-12 col-md-4 offset-md-4'></a>
            <h4 class='col-12 col-md-4 col-lg-4 col-xl-4 offset-md-4 offset-lg-4 offset-xl-4  text-center'>沒有通知的訊息歐~</h4>
          </section> 
      </div>           
  </div> 
</template>

<script>
import jaside from '~/components/jaside'

export default {
  components: { jaside },
  
  data(){
    return{
      phone:''
    }
  },

  async asyncData({$axios,store}){
    const user = await $axios.$get(process.env.backendurl+"/users/me",{
      headers:{
        Authorization: store.getters['auth/getuserjwt']
      }
    })
    return{user}
  }



}
</script>