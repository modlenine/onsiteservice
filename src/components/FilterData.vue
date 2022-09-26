<template>
  <div id="filterdata">
    <div class="row mt-2">
        <div class="col-md-4 col-lg-3 form-group">
            <select name="filterBy-worktype" id="filterBy-worktype" class="form-control"></select>
        </div>
        <div class="col-md-4 col-lg-3 form-group">
            <select name="filterBy-dept" id="filterBy-dept" class="form-control"></select>
        </div>
        <div class="col-md-4 col-lg-3 form-group">
            <select name="filterBy-userProgress" id="filterBy-userProgress" class="form-control"></select>
        </div>
        <div class="col-md-4 col-lg-3 form-group">
            <select name="filterBy-status" id="filterBy-status" class="form-control">
                <option value="">กรองด้วยสถานะ</option>
                <option value="New Service">New Service</option>
                <option value="In process">In process</option>
                <option value="Successfully">Successfully</option>
            </select>
        </div>
    </div>

    <div class="row form-group">
        <div class="col-md-6 col-lg-4 form-group">
            <input type="text" name="startDate" id="startDate" class="form-control">
        </div>
        <div class="col-md-6 col-lg-4 form-group">
            <input type="text" name="endDate" id="endDate" class="form-control">
        </div>
        <div class="col-md-3 col-lg-2 form-group">
            <button type="button" id="btn-dateSearch" name="btn-dateSearch" class="btn btn-success btn-block"><i class="dw dw-loupe"></i>&nbsp;ค้นหา</button>
        </div>
        <div class="col-md-3 col-lg-2 form-group">
            <button type="button" id="btn-dateClear" name="btn-dateClear" class="btn btn-warning btn-block"><i class="dw dw-refresh1"></i>&nbsp;ล้าง</button>
        </div>
    </div>
    <hr>
  </div>
</template>

<script>

import $ from 'jquery';
import axios from 'axios';



export default {
    name:'FilterData',
    data() {
        return {
            url:this.getUrl()
        }
    },
    created() {
        
    },
    mounted() {
        const proxy = this;
        proxy.getFilterWorkType();
        proxy.getFilterDept();
        proxy.getFilterUserProgress();

        $('#startDate').Zebra_DatePicker({
            pair: $('#endDate')
        });
        $('#endDate').Zebra_DatePicker({
            direction: true
        });

    },
    methods: {
        getFilterWorkType()
        {
            axios.post(this.url+'intsys/onsite_backend/api/api_getWorkType',{
                action:'getWorkType'
            }).then(res=>{
                console.log(res.data);

                let result = res.data.result;
                let html ='<option value="">กรองด้วยประเภทงาน</option>';
                for(let i = 0; i < result.length; i++){
                    html +=`
                    <option value="`+result[i].onsite_cat_id+`">`+result[i].onsite_cat_type+` : `+result[i].onsite_cat_name+`</option>
                    `;
                }

                $('#filterBy-worktype').html(html);
            });
        },
        getUrl(){
            if(typeof window !== "undefined"){
                return window.location.protocol+"//"+window.location.hostname+"/";
            }
        },
        getFilterDept(){
            axios.get(this.url+'intsys/onsite_backend/api/api_getFilterDept').then(res=>{
                console.log(res.data);
                if(res.data.status == "Select Data Success"){
                    let result = res.data.result;
                    let html = `
                        <option value="">กรองด้วยแผนก</option>
                    `;
                    for(let i = 0; i < result.length; i++){
                        html +=`
                        <option value="`+result[i].onsite_deptcode_inform+`">`+result[i].onsite_dept_inform+`</option>
                        `;
                        $('#filterBy-dept').html(html);
                    }
                }
            });
        },
        getFilterUserProgress(){
            axios.get(this.url+'intsys/onsite_backend/api/api_getFilterUserProgress').then(res=>{
                console.log(res.data);
                if(res.data.status == "Select Data Success"){
                    let result = res.data.result;
                    let html = `
                    <option value="">กรองโดยผู้ดำเนินการ</option>
                    `;
                    for(let i = 0; i < result.length; i++){
                        html +=`
                        <option value="`+result[i].onsite_ownerecode+`">`+result[i].onsite_owner+`</option>
                        `;
                    }

                    $('#filterBy-userProgress').html(html);
                }

            });
        },
    },
}
</script>

<style>

</style>