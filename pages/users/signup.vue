<template>
    <div>
        <section class='defaultform' v-if='this.status==""'>
        <div class="container">      
          <div class="row">
            <form class="col-md-6 col-lg-6 col-xl-6 offset-md-3 offset-lg-3 offset-xl-3 signup-area" onsubmit='return false;' >                   
              <h2 class='text-center'>註冊會員</h2>
              <p class="lead text-center">
                  歡迎加入我們!
                  請先填寫資訊讓我們更了解你!
              </p>

              <div class="form-group">
                <div>
                  <label class=''>姓氏</label><label v-if='!this.lastname && this.check' class='errMsg'>請填寫姓氏!</label>
                </div>
                <input type="text" class='form-control' v-model='lastname' >                 
              </div>

              <div class="form-group">
                <div>
                  <label class=''>名字</label><label v-if='!this.firstname && this.check' class='errMsg'>請填寫名字!</label>
                </div>
                <input type="text" class='form-control' v-model='firstname' >                 
              </div>

              <div class="form-group">
                <div>
                  <label class=''>電子郵件</label><label v-if='!this.email && this.check'  class='errMsg'>請填寫電子郵件!</label>
                </div>
                <input type="email" class='form-control' placeholder='example@gmail.com' v-model='email'>
              </div>

              <div class="form-group">
                <div>
                  <label class=''>密碼</label><label v-if='!this.password && this.check'  class='errMsg'>請填寫密碼!</label>
                </div>
                <input type="password" class='form-control' v-model='password'>
              </div>

              <div class="form-group">
                <div>
                  <label class=''>手機號碼</label><label v-if='!this.phone && this.check'  class='errMsg'>請填寫手機號碼!</label>
                </div>
                <input type="text" class='form-control' v-model='phone'>
              </div>

              <div class="form-group">
                <div>
                  <label class=''>生日</label><label  v-if='(!this.year || !this.month || !this.day) && this.check'  class='errMsg'>請填寫生日!</label>
                </div>
                <div class=''>
                  <input type="year" class=' col-2 col-md-3 col-lg-3 col-xl-3 ' placeholder="年" v-model='year'>
                  <input type="day" class=' col-2 col-md-3 col-lg-3 col-xl-3 ' placeholder="月" v-model='month'>
                  <input type="day" class=' col-2 col-md-3 col-lg-3 col-xl-3 ' placeholder="日" v-model='day'>           
                </div>
              </div>

              <div class="form-group text-center">
                <label class=''>按下送出後表示您同意遵守本站相關規定及隱私權保護政策</label>
              </div>
           

              <div class="form-group col-3 col-md-2 col-lg-2 col-xl-2 offset-5 offset-md-5 offset-lg-5 offset-xl-5 "  >
                <button @click='checkinfo'>送出</button>             
              </div>
              

            </form>
          </div>
          <!--end of row-->
        </div>
        <!--end of container-->
      </section>

      <section v-if='status=="sending"' class='defaultform'>
        <div class=" container">      
          <div class="row col-8 col-md-3 col-lg-3 col-xl-3 offset-3 offset-md-5 offset-lg-5 offset-xl-5  loadingMsg ">
                <b-spinner variant="light" label="Text Centered"></b-spinner>
                <h2 class='text-center text-light'>資料傳送中...</h2>          
          </div>
          <!--end of row-->
        </div>
        <!--end of container-->
      </section>

      <section class='signupform' v-if='this.status=="finish"'>
        <div class="container">      
            <div class="row">
                <div class="col-md-6 col-lg-6 col-xl-6 offset-md-3 offset-lg-3 offset-xl-3 welcomeMsg" >
                    <h1 class='text-center'>歡迎加入!</h1>
                    <p class='text-center'>我們已經把驗證信件寄送到:{{this.email}}</p>
                    <p class='text-center'>請點擊mail內的連結完成註冊</p>
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
  data() {
    return{
      firstname:'',
      lastname:'',
      email:'',
      password:'',
      phone:'',
      year:'',
      month: '',
      day:'',
      check:false,
      pass:true,
      status:''
    }

  },

  methods:{
    checkinfo(){
      this.pass=true
      this.check=true
      if(!this.lastname || !this.firstname || !this.email || !this.password || !this.phone || !this.year || !this.month || !this.day)
        this.pass=false
      
      if(this.pass)
        this.register()
      
    },

    async register(){
      this.status='sending'
      const response = await this.$axios.$post(process.env.backendurl+'/auth/local/register',{
        username:this.email,     
        email:this.email,
        password:this.password,
        firstname:this.firstname,
        lastname:this.lastname,
        phone:this.phone,
      })
      .then(r =>{
        console.log(r.jwt)
        this.status='finish'
        
      })
      .catch(err =>{
        console.log(err)
        alert('err!')
      })
    }

  }
}
</script>