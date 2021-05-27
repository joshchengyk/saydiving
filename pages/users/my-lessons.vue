<template>
  <div>
    <jaside></jaside>     
      <div class='setting-container col-md-10 col-12'>
        <div class='setting-title col-md-11 col-11'>
          我的課程
        </div>

        <section v-if='orders.length ==0'>
          <a href="https://zh.lovepik.com/images/png-1276067.html"><img src="/pictures/Lovepik_com-401043090-queuing-crowd-element.png" alt="Image" class='col-12 col-md-5'></a>
          <h4 class='col-md-5 col-12 text-center'>您還沒有報名任何課程歐~<nuxt-link to='/lessons' class='text-link'>點我報名!</nuxt-link></h4>
        </section>

        <section v-if='orders'>    
          <div class='container lesson_container'>

            <div class='row'>
              <button v-if='sortby != "sortup"' class='sort_btn' @click='SortBtnClick'>日期<fa :icon='["fas" , "sort-up"]' style="font-size: 20px"/></button>
              <button v-if='sortby == "sortup"' class='sort_btn' @click='SortBtnClick'>日期<fa :icon='["fas" , "sort-down"]' style="font-size: 20px"/></button>
            
            </div>
            <div class='mylesson' v-for='(item,idx) in orders' :key='idx'>
              <div class='row lesson_pay_row' >
                <div class='lesson_table'>
                  <tr>
                    <th class='text-center'>上課日期</th>
                    <th class='text-center lesson_header'>課程</th>
                    <th class='text-center'>人數</th>
                    <th class='text-center'>費用</th>
                    <th class='text-center'>狀態</th>
                  </tr>                  
              
                  <tr>
                    <td class='text-center'>{{item.schoolday.substring(0,10)}}</td>
                    <td class='text-center'>{{item.lesson.title}}</td>
                    <td class='text-center'>{{item.members}}</td>
                    <td class='text-center'>{{item.tuition}}</td>
                    <td class='text-center' v-if='item.status=="non_paid"'>待付款</td>  
                    <td class='text-center' v-if='item.status=="paid"'>已付款</td>                          
                  </tr>                   
                </div>
                <button class='lesson_table_btn'>取消</button>               
              </div>
            </div>
          </div>  
        </section>             
      </div>           
  </div> 
</template>

<script>
import jaside from '~/components/jaside'

export default {
  components: { jaside },
  middleware:'authenticated',
  
  data(){
    return{
      phone:'',
      sortby:''
    }
  },

  async asyncData({$axios,store}){ 
    const user = await $axios.$get(process.env.backendurl+"/users/me",{
      headers:{
        Authorization:store.getters['auth/getuserjwt']
      }
      
    })

    const orders = await $axios.$get(process.env.backendurl+"/orders?users_permissions_user.username=" +user.username,{
      headers:{
        Authorization:store.getters['auth/getuserjwt']
      }
    })

    console.log(orders)
    return{user,orders}
  },

  methods:{
    SortUpBySDay(){
      this.orders.sort((a,b) => Date.parse(a.schoolday) - Date.parse(b.schoolday))
    },

    SortDownBySDay(){
      this.orders.sort((a,b) => Date.parse(b.schoolday) - Date.parse(a.schoolday))
    },

    SortBtnClick(){
      if(this.sortby == 'sortdown'){
        this.sortby = 'sortup'
        this.SortUpBySDay()
      }       
      else{
        this.sortby = 'sortdown'
        this.SortDownBySDay()
      }
        
    }


  }
}
</script>
