<template>
    <div>
        <div class='container-fluid no-padding'>
            <div class='row'>
                <div class='col-md-7 col-lg-7 col-xl-7  animate-show'>
                    <img src="/pictures/profile.jpg" alt="Image" >
                </div>

                <div class='col-md-5 col-lg-5 col-xl-5 container-info'>
                    
                    <h1 class='col-md-10 col-lg-10 col-xl-10  offset-md-1 col-lg-1 col-xl-1  page-title animate-show'>關於Say衝</h1>
                   
                    <p class= 'col-md-10 col-lg-10 col-xl-10  offset-md-1 col-lg-1 col-xl-1 paget-intro animate-show'>
                        如果你的職業是攝影師 你應該去拍別人拍不到的世界<br>
                        如果你愛抓寶可夢 你應該要抓到全世界的寶可夢<br>
                        如果你真的愛健身 你應該要有6塊肌與馬甲線<br>
                        陳彥博熱愛超馬 所以他用生命完成了七大洲八大站的馬拉松<br>
                        我熱愛潛水 我想在有限的生命去完成我夢想的大海藍圖<br>
                    </p>

                    <div class='row'>
                        <div class='profile-card col-md-10 col-lg-10 col-xl-10  offset-md-1 col-lg-1 col-xl-1 animate-show'>
                            <h5>2014年</h5>
                            <p>
                                追夢之旅開始 在印度洋中的珍珠馬爾地夫centara集團下潛店工作/潛水課程/浮潛/水上活動
                            </p>
                        </div>                        
                    </div>

                    <div class='row'>
                        <div class='profile-card col-md-10 col-lg-10 col-xl-10  offset-md-1 col-lg-1 col-xl-1 animate-show' >
                            <h5>2015年</h5>
                            <p>
                                彩虹的故鄉帛琉 帶國潛導內外客人潛水/潛導/潛水行程安排
                            </p>
                        </div>                        
                    </div>

                    <div class='row'>
                        <div class='profile-card col-md-10 col-lg-10 col-xl-10  offset-md-1 col-lg-1 col-xl-1 animate-show' >
                            <h5>2016年</h5>
                            <p>
                                泰國pp島 主要是銷售潛水課程/帶體驗潛水/推銷潛水裝備
                            </p>
                        </div>                        
                    </div>

                    <div class='row'>
                        <div class='profile-card col-md-10 col-lg-10 col-xl-10  offset-md-1 col-lg-1 col-xl-1 animate-show' >
                            <h5>2017年</h5>
                            <p>
                                南半球陸海空都值得遊玩的凱恩斯 主要在大堡礁上面的潛水平台工作/海底攝影師/海底影像錄製/銷售照片/海底摩托車教練/推銷海底行程
                            </p>
                        </div>                        
                    </div>

                    <div class='row'>
                        <div class='profile-card col-md-10 col-lg-10 col-xl-10  offset-md-1 col-lg-1 col-xl-1 animate-show' >
                            <h5>2018年</h5>
                            <p>
                                圓夢計劃已經達成 又再度回到半導體業工作 夏天偶爾會在東北角教授潛水課程 藉由豐富的旅外潛水教學經驗與潛水趣事 帶給學員在學習潛水時 有不一樣的想法與視野 希望讓每個人都漸漸的親近海 喜歡海 最後愛上海洋
                            </p>
                        </div>                        
                    </div>        
                </div>
            </div><!--end of row-->
        </div><!--end of container-->
    </div>
</template>
<script>
import gsap from 'gsap'

export default {
    
    data(){
        return{}
    },

    mounted(){
        document.getElementsByClassName('animate-show').forEach((item,i) => {
            gsap.to(item,{
                autoAlpha:1,
                duration:1,
                delay:0.3*(i+1)
            })
        });
        
    },
   
    
}
</script>