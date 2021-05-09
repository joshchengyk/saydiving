<template>
    <div>
        <div class="container">
            <section class='QAsection'>
                <h1 class='page-title col-md-10 offset-md-1 text-center'>潛水常見問題</h1>
                
                <div v-for="(qa,idx) in qas" :key='idx' class='QAbox col-md-10 offset-md-1'>			
                    <div class='question-row'>
                        <p class='question'><span class='Que'>Q:</span> {{qa.question}}</p>
                    </div>
                    <div class='answer-row'>
                        <p><span class='Ans'>A:</span> {{qa.answer}}</p>
                    </div>
                    <a v-if="qa.photo" target='blank' :href="backendurl + qa.photo.url"><img class='col-md-6 offset-md-3' :src="backendurl + qa.photo.url" alt="Image"></a>						
                </div>
            
            </section>
            
            <section class='askquestion'>
                <h2 class='page-title col-md-8 offset-md-2 text-center underline-aqua'>還有問題? 我們解答!</h2>
                <form role='form' class='col-md-6 offset-md-3' style='background-color:'>
                    <div class="form-group">
                        <label class="form-label">電子郵件</label>
                        <input type='email' class='form-control' placeholder='example@gmail.com' v-model="email">
                    </div>
                    <div class='form-group'>
                        <label class="form-label">問題</label> 
                        <textarea class='form-control col-md-12' rows=5 v-model="question"></textarea>
                    </div>
                    <button type="button" class="btn btn-primary col-md-2 offset-md-5" @click='askquestion'>送出</button>
                </form>
            </section>
        </div>

    </div>
</template>

<script>
export default {
    data(){
        return{
            backendurl: process.env.backendurl,
            email:"",
            question:""
        }
    },

    async asyncData({$axios}){
        const qas = await $axios.$get(process.env.backendurl+"/qas")
        return {qas}
    },

    methods:{
        async askquestion(){
            const respone = await this.$axios.$post(this.backendurl+"/questions",{
                email:this.email,
                question:this.question,
                status:"uncheck"
            })

            .then(r=>{
                window.location="/qas/confirm"
            })
            .catch(err=>{
                console.log(err)
                alert('err!')
            })
        }
        
    }
}
</script>