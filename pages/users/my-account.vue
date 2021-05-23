<template>
  <div>
    <jaside></jaside>     
      <div class='setting-container col-md-10 col-12'>
          <section v-if='status !="sending"'>
            <div class='setting-title col-md-11 col-11'>
              會員資料
            </div>
            <form onsubmit='return false'>
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
                  <input id='myPhone' class='form-control col-md-5 col-8' type="tel" pattern="09[0-9]{8}" required v-model='phone' ref='phone'>                      
                </div>          
              </div>

              <div class='form-group'>
                <div class='row setting-row'>             
                  <label for='pwd' class='col-md-1 col-2 text-right' >修改密碼</label>
                  <input id='pwd' class='form-control col-md-5 col-8' type="password" v-model='pwd' ref='pwd'>                      
                </div>          
              </div>

              <div class='form-group'>
                <div class='row setting-row'>             
                  <label for='repwd' class='col-md-1 col-2 text-right' >確認密碼</label>
                  <input id='repwd' class='form-control col-md-5 col-8' type="password" v-model='repwd'>              
                </div>
                <small v-if='status=="pwdErr"' class='errMsg2 col-md-2 offset-md-1'>兩次輸入的密碼不相同</small>                
              </div>
        
              <button v-if='this.phone != this.user.phone || pwd && repwd' class='btn1 col-md-2 offset-md-2' @click='updateUser'>變更設定</button>
            </form>
          </section>

          <section v-if='status=="sending"'>
            <div class=" container">      
              <div class="row col-md-3 col-8 offset-md-5 offset-3 loadingMsg ">
                    <b-spinner variant="primary" label="Text Centered"></b-spinner>
                    <h2 class='text-center'>資料傳送中...</h2>          
              </div>
              <!--end of row-->
            </div>
            <!--end of container-->
          </section>
      </div>           
  </div> 
</template>

<script>
import jaside from '~/components/jaside'

export default {

  middleware:'authenticated',
  components: { jaside },
  
  data(){
    return{
      phone:'',
      pwd:'',
      repwd:'',
      status:'waiting'
    }
  },

  created(){
    this.phone = this.user.phone
  },

  async asyncData({$axios,store}){
    const user = await $axios.$get(process.env.backendurl+"/users/me",{
      headers:{
        Authorization: store.getters['auth/getuserjwt']
      }
    })
    return{user}
  },

  methods:{
    async updateUser(){
      
      this.status='sending'
      let phonePattern= /09[0-9]{8}/

      if(!phonePattern.test(this.phone)) {
        this.status='phoneErr'
        this.$refs.phone.focus()
      }
      else if(this.pwd != this.repwd){
        this.status='pwdErr',
        this.$refs.pwd.focus()
      }
      else {
        if(this.phone != this.user.phone || this.pwd){
          let settings ={phone:this.phone}
          if(this.pwd)
            settings.password = this.pwd

          const reponse = await this.$axios.$put(process.env.backendurl+'/users/'+this.user.id,
            settings
          ,{
              headers:{ Authorization: this.$store.getters['auth/getuserjwt']}
          })
          .then(r=>{
            alert('資料更新成功')
            this.status='waiting'         
          })
          .catch(err=>{
            alert('資料更新失敗...請稍後嘗試')
            console.log(err)
          })  
        }   
      }     
    }
  }



}
</script>