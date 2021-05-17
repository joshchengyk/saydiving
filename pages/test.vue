<template>
    <section ref="box" class="welcome-animation">
      <div class="background-image-holder">
          <img class='Main-logo' alt="Image" src="/pictures/Main_Logo.png" />
          <div class="textwrapper2">
              <h2 class="text-center slogan">說衝就衝!Say衝潛水!</h2>
              <h1 class="text-center slogan">專業潛水課程</h1>
          </div>
      </div>
  </section>
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
        this.status = 'err'
      })
    }
   
    
  }
}
</script>

