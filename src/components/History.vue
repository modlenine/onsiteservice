<template>
  <div id="history">
    <div class="card-box height-100-p pd-20">
        <div class="text-center">
            <h3>ประวัติการแจ้งซ่อม</h3><br>
            <h5>คุณ {{userinform}}</h5>
        </div>
        <hr>
        <div class="mainHistoryDiv">
            <div id="showUserHistory" class="row"></div>
        </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
import moment from 'moment';

export default {
    name:"History",
    props:[
        'userinform',
        'ecodeinform',
        'dateinform'
    ],
    data() {
        return {
            url:this.getUrl(),
            baseurl:this.baseUrl(),
        }
    },
    created() {
        
    },
    beforeMount() {
        
    },
    mounted() {
        
    },
    beforeUpdate() {
        this.getUserHistory()
    },
    methods: {
        getUserHistory()
        {
            const proxy = this;
            if(proxy.ecodeinform != ''){
                axios.post(proxy.url+'intsys/onsite_backend/api/api_getUserHistory',{
                    action:"getUserHistory",
                    ecode:proxy.ecodeinform
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Select Data Success"){
                        let userHistory = res.data.result;
                        let urluse = proxy.baseurl;

                        let output = '';
                        for(let i = 0; i < userHistory.length; i++){

                            let condateinform = moment(userHistory[i].onsite_date_inform).format('DD/MM/Y HH:mm:ss');
                            output +=`

                            <div class="col-md-12 form-group">
                                <div class="card card-box">
                                    <div class="card-header bg-info"><a href="`+urluse+userHistory[i].onsite_no+`" class="text-white">วันที่แจ้ง `+condateinform+`</a></div>
                                    <div class="card-body">
                                        <p class="card-text"><b>ประเภทงาน : </b>`+userHistory[i].onsite_job_cat+`</p>
                                        <p class="card-text"><b>หมวดหมู่ : </b>`+userHistory[i].onsite_job_type+`</p>
                                        <p class="card-text"><b>รายละเอียด : </b>`+userHistory[i].onsite_issue+`</p>
                                        <p class="card-text"><b>ผู้ดำเนินการ : </b>`+userHistory[i].onsite_owner+`</p>
                                    </div>
                                </div>
                            </div>
   
                            `;
                        }
                        $('#showUserHistory').html(output);
                    }
                });
            }
        },
        getUrl(){
            if(typeof window !== "undefined"){
                return window.location.protocol+"//"+window.location.hostname+"/";
            }
        },
        baseUrl(){
            switch (process.env.NODE_ENV) {
                case 'production': return '/intsys/onsiteservice/viewdata/'
                case 'development': return '/viewdata/'
                default: return ''
            }
        }
    },
}
</script>

<style scoped>
.mainHistoryDiv{
    min-height: 1000px;
    max-height: 1000px;
    margin-bottom: 10px;
    overflow:scroll;
    -webkit-overflow-scrolling: touch;
}
.timeline-date{
    font-size:12px;
    width:80px;
}
</style>