<template>
  <div>
    <jaside></jaside>     
      <div class='setting-container col-md-10 col-12'>
          <div class='setting-title col-md-11 col-11'>
            會員資料
          </div>

          <div class='form-group'>
            <div class='row setting-row'>             
              <label for='lastName' class='col-md-1 col-2 text-right' >姓氏</label>
              <input id='lastName' class='form-control col-md-1 col-2' type="text" :value='this.user.lastname' disabled='disabled'>
              <label for='firstName' class='col-md-1 col-2 text-right'>名字</label>
              <input id='firstName' class='form-control col-md-1 col-2' type="text" :value='this.user.firstname' disabled='disabled'>             
            </div>          
          </div>

          <div class='form-group'>
            <div class='row setting-row'>             
              <label for='myEmail' class='col-md-1 col-2 text-right' >Email</label>
              <input id='myEmail' class='form-control col-md-5 col-8 ' type="email" :value='this.user.email' disabled='disabled'>                      
            </div>          
          </div>

          <div class='form-group'>
            <div class='row setting-row'>             
              <label for='myPhone' class='col-md-1 col-2 text-right' >phone</label>
              <input id='myPhone' class='form-control col-md-5 col-8' type="phone" :value='this.user.phone'>                      
            </div>          
          </div>

          <div class='form-group'>
            <div class='row setting-row'>             
              <label for='pwd' class='col-md-1 col-2 text-right' >修改密碼</label>
              <input id='pwd' class='form-control col-md-5 col-8' type="password">                      
            </div>          
          </div>

          <div class='form-group'>
            <div class='row setting-row'>             
              <label for='repwd' class='col-md-1 col-2 text-right' >確認密碼</label>
              <input id='repwd' class='form-control col-md-5 col-8' type="password">                      
            </div>          
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