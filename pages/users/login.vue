<template>
    <div>
      <section class='loginform'>
        <div class=" container">      
          <div class="row">
            <div class="col-md-6 offset-md-3" >                   
              <h2 class='text-center bgtext'>帳號登入</h2>
              <p class="lead text-center bgtext">
                  歡迎回來!
                  請先先登入帳號進行操作!
              </p>
              <div class="form-group">
                <label class='bgtext'>電子郵件</label>
                <input type="email" class='form-control' placeholder='example@gmail.com' v-model='email'>
              </div>

              <div class="form-group">
                <label class='bgtext'>密碼</label>
                <input type="password" class='form-control' v-model='pwd'>
              </div>
              <nuxt-link to='/users/forgetpassword' class='bgtext'><small class='bgtext'>忘記密碼?</small></nuxt-link>

              <div class="form-group col-md-3 col-3 offset-md-5 offset-5"  >
                <button @click='login'>送出</button>             
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
import { mapMutations } from 'vuex'


export default {
  data(){
    return{
      frontendurl: process.env.frontendurl,
      backendurl:process.env.backendurl,
      email:'',
      pwd:''
    }
  },

  methods:{
    ...mapMutations({
      setUser: 'auth/setUser',
      setFirstname: 'auth/setFirstname'
    }),
    async login(){
      const respons = await this.$axios.$post(this.backendurl+'/auth/local',{
        identifier: this.email,
        password: this.pwd,
      })
      .then(r => {
        console.log(r)
        this.setUser(r.jwt)
        this.setFirstname(r.user.firstname)
        window.location = '/lessons'
      })
      .catch(err =>{
        console.log(err)
        alert('err!')
      })
    }
   
    
  }
}
</script>

