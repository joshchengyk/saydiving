<template>
  <div>
    <jaside></jaside>     
      <div class='setting-container col-md-10 col-12'>
        <div class='setting-title col-md-11 col-11'>
          我的課程
        </div>

        <div class='lesson_container'>
          <div class='row'>
            <button v-if='sortby != "sortup"' class='sort_btn' @click='SortBtnClick'>日期<fa :icon='["fas" , "sort-up"]' style="font-size: 20px"/></button>
            <button v-if='sortby == "sortup"' class='sort_btn' @click='SortBtnClick'>日期<fa :icon='["fas" , "sort-down"]' style="font-size: 20px"/></button>
            <input class='col-md-2 offset-md-1 col-5 offset-1 search_box' type="text" v-model='searchTarget'>
            <button v-if='iconBtn == "search"' class='icon_btn' @click='SearchOrder'><fa :icon='["fas" , "search"]' style="font-size: 20px"/></button>
            <button v-if='iconBtn == "refresh"' class='icon_btn' @click='refreshOrder'><fa :icon='["fas" , "sync-alt"]' style="font-size: 20px"/></button>
          </div>

          <section v-if='orders.length ==0'>
            <a href="https://zh.lovepik.com/images/png-1276067.html"><img src="/pictures/Lovepik_com-401043090-queuing-crowd-element.png" alt="Image" class='col-12 col-md-5'></a>
            <h4 class='col-md-5 col-12 text-center'>您還沒有報名相關課程歐~<nuxt-link to='/lessons' class='text-link'>點我報名!</nuxt-link></h4>
          </section>

          <section v-if='orders'>    
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
                    <td class='text-center' v-if='item.status=="paid"'>已付款</td>
                    <td class='text-center' v-if='item.status=="non_paid"'>待付款</td>
                    <td class='text-center' v-if='item.status=="pending"'>確認中</td>
                    <td class='text-center' v-if='item.status=="cancel"'>已取消</td>                          
                  </tr>                   
                </div>
                <button v-if='item.status=="non_paid"' class='lesson_table_btn' @click='ShowMsgBox(item.id)'>取消預約</button>               
              </div>
            </div>
          </section>  
        </div>              
      </div>  

      <section v-if='showMsg==true'>
        <div class='Msg-Container'>
          <div class='Msg-box'>
            <div class='Msg-bar'>提問</div>
            <h5 class='Msg-text text-center'>確認要取消課程嗎?</h5>
            <div class='Msg-btns-row'>
              <button @click='MsgBoxClick("Yes")'>Yes</button>
              <button @click='MsgBoxClick("No")'>No</button>
            </div>
          </div>
        </div>
      </section>         
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
      sortby:'',
      searchTarget:'',
      iconBtn:'search',
      backupOrders:'',
      showMsg:false,
      cancelID:'',
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
        
    },

    SearchOrder(){

      if (this.searchTarget != ''){

        this.backupOrders = this.orders
        this.iconBtn = 'refresh'

        if(/[0-9]+/.test(this.searchTarget))
          this.orders = this.orders.filter( order => order.schoolday.includes(this.searchTarget))
        
        else if (this.searchTarget == '已付款' || this.searchTarget == '待付款' || this.searchTarget == '確認中' || this.searchTarget == '已取消'){
          
          let translate = ''    

          if(this.searchTarget == "已付款")
            translate = 'paid'
          
          else if(this.searchTarget == '待付款')
            translate = 'non_paid'

          else if(this.searchTarget == '確認中')
            translate = 'pending'

          else if(this.searchTarget == '已取消')
            translate = 'cancel'

          this.orders = this.orders.filter(order=>order.status == translate)
        }

        else if(/\[A-Za-z]+/)
          this.orders = this.orders.filter(order=> order.lesson.title.toLowerCase().includes(this.searchTarget.toLowerCase()))
        }    
    },

    refreshOrder(){

      this.iconBtn = 'search'
      this.orders = this.backupOrders
      this.backupOrders = {}
      this.searchTarget=""

    },

    async cancelOrder(id){
      const respone = await this.$axios.$put(process.env.backendurl+"/orders/"+id,{
        status:'cancel'
      },{
        headers:{
          Authorization: this.$store.getters['auth/getuserjwt']
        }
      })
      .then(r=>{
        this.orders.forEach((order,index)=>{
          if(order.id == id)
            order.status = 'cancel'
        })
      })
      .catch(err=>{
        alert('err')
        console.log(err)
      })
    },

    ShowMsgBox(id){
      this.showMsg = true
      this.cancelID = id
    },

    MsgBoxClick(option){

      if(option == 'Yes')
        this.cancelOrder(this.cancelID)
      
      this.showMsg = false
      this.cancelID = ''
        
    }

  }
}
</script>
