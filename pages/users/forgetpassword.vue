<template>
    <div>
      <section v-if='status!="sending"' class='defaultform'>
        <div class=" container">      
          <div class="row">
            <form class="col-md-6 col-lg-6 col-xl-6 offset-md-3 offset-lg-3 offset-xl-3" onsubmit='return false;' >                   
              <h2 class='text-center bgtext text-light'>忘記密碼</h2>
              <p class="lead text-center bgtext text-light">
                  請輸入Email讓我們把認證信寄給您!
              </p>
              <div class="form-group">
                <label class='bgtext text-light'>電子郵件</label>
                <input type="email" class='form-control' placeholder='example@gmail.com' v-model='email' ref='email'>
              </div>

              <div v-if='status=="err"' class='errMsg'>此email尚未註冊或錯誤</div>

              <div class="form-group col-4 col-md-4 col-lg-4 col-xl-4 offset-4 offset-md-4 offset-lg-4 offset-xl-4 "  >
                <input type='submit' class= 'btn2' @click='forgetpwd' value = '送出'>             
              </div>
              <span class='text-light'>還不是會員?</span><nuxt-link to='/users/signup' class='bgtext text-orange'>按此註冊</nuxt-link>
            </form>
          </div>
          <!--end of row-->
        </div>
        <!--end of container-->
      </section>

      <section v-if='status=="sending"' class='defaultform'>
        <div class=" container">      
          <div class="row col-8 col-md-3 col-lg-3 col-xl-3  offset-3 offset-md-5 offset-lg-5 offset-xl-5  loadingMsg ">
                <b-spinner variant="light" label="Text Centered"></b-spinner>
                <h2 class='text-center text-light'>資料傳送中...</h2>          
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
      status:'noncheck'
    }
  },

  mounted(){
    this.$refs.email.focus()
  },

  methods:{
    
    async forgetpwd(){
      this.status = 'sending'
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
        this.status = 'err'
      })
    }
   
    
  }
}
</script>

