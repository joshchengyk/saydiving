<template>
    <div>
      <section class='loginform'>
        <div class=" container">      
          <div class="row">
            <div class="col-md-6 col-lg-6 col-xl-6 offset-md-3 offset-lg-3 offset-xl-3" >                   
              <h2 class='text-center bgtext'>重設密碼</h2>
              <p class="lead text-center bgtext">
                  請輸入新的密碼!
              </p>
              <div class="form-group">
                <label class='bgtext'>新密碼</label>
                <input type="password" class='form-control' v-model='password'>
                <label v-if='status=="emptyErr"' class='errMsg'>密碼不能為空白</label>
              </div>

              <div class="form-group">
                <label class='bgtext'>再次密碼</label>
                <input type="password" class='form-control' v-model='passwordConfirmation'>
                <label v-if='status=="confirmErr"' class='errMsg'>兩次密碼輸入不相符</label>
              </div>

              <button class='col-md-4 col-lg-4 col-xl-4 offset-md-4 offset-lg-4 offset-xl-4 btn2' @click='resetpwd'>送出</button>   
        
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
  data(){
    return{
      frontendurl: process.env.frontendurl,
      backendurl:process.env.backendurl,
      password: '',
      passwordConfirmation: '',
      status:'beforeCheck' 
      
    }
  },

  methods:{
    
    async resetpwd(){

      if(this.password == "")
        this.status = 'emptyErr'
      
      else if(this.password != "" && this.password != this.passwordConfirmation)
        this.status = 'confirmErr'

      else
        this.status = 'checked'

      if(this.status == 'checked'){
        const respons = await this.$axios.$post(this.backendurl+'/auth/reset-password',{  
          code: this.$route.query.code,
          password: this.password,
          passwordConfirmation: this.passwordConfirmation

        })
        .then(r => {
          console.log(r)
          alert('密碼設定成功!')
          window.location = "/users/login"
        })
        .catch(err =>{
          console.log(err)
          alert('err!')
        })
      }
    }
   
    
  }
}
</script>

