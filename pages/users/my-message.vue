<template>
  <div>
    <jaside></jaside>     
      <div class='setting-container col-md-10 col-12'>
          <div class='setting-title col-md-11 col-11'>
            我的課程
          </div>   
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