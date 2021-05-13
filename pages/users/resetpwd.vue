<template>
    <div>
      <section class='loginform'>
        <div class=" container">      
          <div class="row">
            <div class="col-md-6 offset-md-3" >                   
              <h2 class='text-center bgtext'>重設密碼</h2>
              <p class="lead text-center bgtext">
                  請輸入新的密碼!
              </p>
              <div class="form-group">
                <label class='bgtext'>新密碼</label>
                <input type="password" class='form-control' v-model='password'>
              </div>

              <div class="form-group">
                <label class='bgtext'>再次密碼</label>
                <input type="password" class='form-control' v-model='passwordConfirmation'>
              </div>

              <div class="form-group col-md-3 col-3 offset-md-5 offset-5"  >
                <button @click='resetpwd'>送出</button>             
              </div>
        
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
      passwordConfirmation: ''
    }
  },

  methods:{
    
    async resetpwd(){
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
</script>

