<template>
    <div>
      <section class='loginform'>
        <div class=" container">      
          <div class="row">
            <div class="col-md-6 offset-md-3" >                   
              <h2 class='text-center bgtext'>忘記密碼</h2>
              <p class="lead text-center bgtext">
                  請輸入Email讓我們把認證信寄給您!
              </p>
              <div class="form-group">
                <label class='bgtext'>電子郵件</label>
                <input type="email" class='form-control' placeholder='example@gmail.com' v-model='email'>
              </div>

              <div class="form-group col-md-3 col-3 offset-md-5 offset-5"  >
                <button @click='forgetpwd'>送出</button>             
              </div>
              <span>還不是會員?</span><nuxt-link to='/users/signup' class='bgtext'>按此註冊</nuxt-link>
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
      email:'',
    }
  },

  methods:{
    
    async forgetpwd(){
      const respons = await this.$axios.$post(this.backendurl+'/auth/forgot-password',{  
         
         email: this.email  

      })
      .then(r => {
        console.log(r)
        alert("申請成功!請到信箱接收認證信件!")
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

