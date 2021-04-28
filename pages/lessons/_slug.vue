<template>
    <div>
        <div class='container-fluid no-padding'>
            <div class='row'>
                <img src="/pictures/OpenWater.jpg" alt="Image" class='col-md-6'>

                <div class='col-md-6'>

                    <h1 class='pay-title'>Open Water Diver</h1>
                    <h1 class='pay-subtitle'>開放水域潛水員    <small>$16000 / 人</small></h1>
                    
                    <div class='row'>
                        <h2 class='col-md-12 text-center page-title'>費用包含</h2>
                    </div>

                    <div class='row'>
                        <div class='col-md-6'>
                            <h3 class='text-center'>課程內容</h3>
                            <p class='col-md-10 offset-md-1'>
                                <ol>
                                    <li class='lesson-item'>
                                        術科課程/泳池課程4小時<br>
                                        訓練場地：Bali-Hi潛水中心
                                    </li>

                                    <li class='lesson-item'>
                                        海洋實習/開放水域6小時<br>
                                        訓練場地：東北角海域
                                    </li>
                                </ol>
                            </p>
                            
                        </div>

                        <div class='col-md-6'>
                            <h3 class='text-center'>其他費用</h3>
                            <p class='col-md-10 offset-md-1'>
                                <ol>
                                    <li class='lesson-item'>
                                        套裝潛水教材
                                    </li>

                                    <li class='lesson-item'>
                                        開放水域潛水員證照申請
                                    </li>

                                    <li class='lesson-item'>
                                        課程訓練費用
                                    </li>

                                    <li class='lesson-item'>
                                        全套潛水裝備使用(不含電腦錶)
                                    </li>

                                    <li class='lesson-item'>
                                        氣瓶費
                                    </li>

                                    <li class='lesson-item'>
                                        上課期間平安保險
                                    </li>
                                                                                                
                                </ol>
                            </p>
                        </div>
                    </div>

                    <div class='item-box col-md-6 offset-md-3'>
                        <label for="example-datepicker">預約上課日期</label>
                        <b-form-datepicker id="example-datepicker" v-model="datevalue" class="mb-2"></b-form-datepicker>
                    </div>

                    <div class='item-box col-md-6 offset-md-3'>
                        <label for="demo-sb">課程參加人數</label>
                        <b-form-spinbutton id="demo-sb" v-model="numvalue" min="1" max="4"></b-form-spinbutton>
                    </div>

                    <div class='item-box col-md-6 offset-md-3 transfer-box'>
                        <h4 class='text-center'>交易明細</h4>
                        <h6 class='text-right transfer-item'>教學費用: 16000$</h6>
                        <h6 class='text-right transfer-item'>參加人數: {{numvalue}}</h6>
                        <h6 class='text-right transfer-summary'>總共:{{16000*numvalue+"$"}}</h6>
                    </div>   

                    <button class='btn1 col-md-4 offset-md-4 '>確認報名</button>                  
           
                </div>
                
            </div>

            
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        datevalue: '',
        numvalue:1
      }
    }
  }
</script>