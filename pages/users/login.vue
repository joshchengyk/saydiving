<template>
    <div>
      <section v-if='status!="sending"' class='defaultform'>
        <div class=" container">      
          <div class="row">
            <form class="col-md-6 col-lg-6 col-xl-6 offset-md-3 offset-lg-3 offset-xl-3" onsubmit='return false;' >                   
              <h2 class='text-center bgtext text-light'>帳號登入</h2>
              <p class="lead text-center bgtext text-light">
                  歡迎回來!
                  請先先登入帳號進行操作!
              </p>
              <div class="form-group">
                <label class='bgtext text-light'>電子郵件</label>
                <input type="email" class='form-control' placeholder='example@gmail.com' v-model='email' ref='email'>
                <div v-if='status=="err"' class='errMsg'>電子郵件或密碼錯誤!</div>
              </div>

              <div class="form-group text-light">
                <label class='bgtext'>密碼</label>
                <input type="password" class='form-control' v-model='pwd'>
              </div>
              <nuxt-link to='/users/forgetpassword' class='bgtext'><small class='bgtext text-orange'>忘記密碼?</small></nuxt-link>

              <div class="form-group col-4 col-md-4 col-lg-4 col-xl-4 offset-4 offset-md-4 offset-lg-4 offset-xl-4 "  >
                <input type='submit' class= 'btn2' @click='login' value = '送出'>             
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
          <div class="row col-8 col-md-3 col-lg-3 col-xl-3 offset-3 offset-md-5 offset-lg-5 offset-xl-5 loadingMsg ">
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
import { mapMutations } from 'vuex'


export default {
  data(){
    return{
      frontendurl: process.env.frontendurl,
      backendurl:process.env.backendurl,
      email:'',
      pwd:'',
      status:'noncheck'
    }
  },

  mounted(){
    this.$refs.email.focus()
  },

  methods:{
    ...mapMutations({
      setUser: 'auth/setUser',
      setFirstname: 'auth/setFirstname',
      setUsermail: 'auth/setUsermail'
    }),
    async login(){

      if(this.email && this.pwd){
        
        this.status='sending'

        const respons = await this.$axios.$post(this.backendurl+'/auth/local',{
          identifier: this.email,
          password: this.pwd,
        })
        .then(r => {
          this.setUser(r.jwt)
          this.setFirstname(r.user.firstname)
          this.setUsermail(r.user.email)
          window.location = '/lessons'
        })
        .catch(err =>{
          console.log(err)
          this.status='err'
          
        })
      }
    }
   
    
  }
}
</script>

