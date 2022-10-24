<template>
  <div id="add">

    <div class="main-container">
          <div class="pd-ltr-20">

            <form id="mainform" @submit.prevent="saveDataMain()" class="needs-validation" novalidate>
            <div class="row">
                <div class="col-xl-12 mb-30">
                    <div class="card-box height-100-p pd-20">
                        <div class="mt-5"></div>
                        <h3>เพิ่มรายการใหม่</h3>
                        <hr>

                        <div class="row form-group">
                            <div class="col-md-6 col-sm-12 form-group">
                                <label for=""><b>ชื่อผู้แจ้ง</b></label>
                                <!-- <select style="display:none;" name="ip-user_inform" id="ip-user_inform" class="form-control"
                                
                                >
                                    <option value="">กรุณาเลือกรายการ</option>
                                    <option v-for="(item , index) in userResult" 
                                        :key="index" 
                                        :value="item.Fname+' '+item.Lname" 
                                        :data_ecode="item.ecode"
                                        >{{item.Fname+' '+item.Lname}} : {{item.Dept}}</option>
                                </select> -->
                                <input type="text" name="ip-user_inform" id="ip-user_inform" class="form-control" v-model="searchInput" @keyup="getUser(searchInput)" required>
                                <ul style="display:none;" class="list-group mt-2 selectUserInform">
                                    <li class="list-group-item list-group-item list-group-item-action selectUserInformLi" 
                                        v-for="(item , index) in userResult" :key="index"
                                        :data_userinform="item.Fname+' '+item.Lname"
                                        :data_userecode='item.ecode'
                                        :data_deptcode='item.DeptCode'
                                        :data_dept='item.Dept'
                                    >
                                        <b>{{item.Fname+' '+item.Lname}}</b> : {{item.Dept}}
                                    </li>
                                </ul>

                            </div>
                            <div class="col-md-6 col-sm-12 form-group">
                                <label for=""><b>รหัสพนักงาน</b></label>
                                <input type="text" name="ip-user_ecode" id="ip-user_ecode" class="form-control" readonly>
                            </div>
                            <div class="col-md-6 col-sm-12 form-group">
                                <label for=""><b>แผนก</b></label>
                                <input type="text" name="ip-user_dept" id="ip-user_dept" class="form-control" readonly>
                                <input hidden type="text" name="ip-user_deptcode" id="ip-user_deptcode">
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <label for=""><b>วันที่แจ้ง</b></label>
                                <input type="text" name="ip-user_datetime" id="ip-user_datetime" class="form-control">
                            </div>
                            <div class="col-md-12 col-sm-12 form-group">
                                <label for=""><b>เลือกอุปกรณ์</b></label>
                                <select name="ip-user_device" id="ip-user_device" class="form-control">

                                </select>
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <label for=""><b>ประเภทของงาน</b></label>
                                <select name="ip-job_cat" id="ip-job_cat" class="form-control ip-job_cat" required>
                                    <option value="">กรุณาเลือกประเภทของงาน</option>
                                    <option v-for="(item,index) in workTypeResult" :key="index" 
                                        :value="item.onsite_cat_name"
                                        :data_onsite_cat_type="item.onsite_cat_type"
                                        :data_onsite_cat_id="item.onsite_cat_id"
                                    >
                                        {{item.onsite_cat_type}} : {{item.onsite_cat_name}}
                                    </option>
                                </select>
                                <input hidden type="text" name="ip-job_catid" id="ip-job_catid">
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <label for=""><b>หมวดหมู่</b></label>
                                <input type="text" name="ip-job_type" id="ip-job_type" class="form-control" readonly>
                            </div>
                        </div>

                        <div class="row form-group">
                            <div class="col-md-8">
                                <label for=""><b>รายละเอียดงาน</b></label>
                                <textarea name="ip-issue" id="ip-issue" cols="30" rows="10" class="form-control" required></textarea>
                                <button type="submit" id="btn-saveData1" class="btn btn-success btn-block mt-2"><i class="dw dw-checked mr-2"></i>บันทึก</button>
                            </div>
                            <div class="col-md-4">
                                <div class="row">
                                    <div class="col-md-12 form-group">
                                        <label for=""><b>ผู้รับเรื่อง</b></label>
                                        <input type="text" name="ip-namepost" id="ip-namepost" class="form-control" readonly>
                                    </div>
                                    <div class="col-md-12 form-group">
                                        <label for=""><b>รหัสพนักงาน</b></label>
                                        <input type="text" name="ip-ecodepost" id="ip-ecodepost" class="form-control" readonly>
                                    </div>
                                    <div class="col-md-12 form-group">
                                        <label for=""><b>วันที่</b></label>
                                        <input type="text" name="ip-datepost" id="ip-datepost" class="form-control" readonly>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            </form>

          </div>
    </div>

  </div>
</template>

<script>
import $ from 'jquery';
import axios from 'axios';
import Swal from 'sweetalert2'

export default {
    name:"Add",
    data() {
        return {
            url:this.getUrl(),
            userResult:[],
            searchInput:'',
            deviceResult:[],
            workTypeResult:[],
            userData:[],
            currentDateTime:null
        }
    },
    components:{
    },
    created() {
        this.getdatetimeNow();
    },
    mounted() {

        this.getDatetimePicker();
        this.getUser(this.searchInput);
        this.getWorkType();

        $('#ip-user_inform').on('focus' , function(){
            $('.selectUserInform').css('display' , '');
        });
        
        $('#ip-user_inform').on('keyup' , function(){
            if($('#ip-user_inform').val() == ""){
                $('.selectUserInform').css('display' , 'none');
            }else{
                $('.selectUserInform').css('display' , '');
            }
            
        });

        const proxy = this;

        $(document).on('click' , '.selectUserInformLi' , function(){
            $('.selectUserInform').css('display' , 'none');
            const data_userinform = $(this).attr("data_userinform");
            const data_userecode = $(this).attr("data_userecode");
            const data_dept = $(this).attr("data_dept");
            const data_deptcode = $(this).attr("data_deptcode");

            $('#ip-user_inform').val(data_userinform);
            $('#ip-user_ecode').val(data_userecode);
            $('#ip-user_dept').val(data_dept);
            $('#ip-user_deptcode').val(data_deptcode);

            proxy.getDevice(data_userinform);
  
            
        });

        $(document).on('change' , '.ip-job_cat' , function(){

            const data_onsite_cat_type = $("option:selected" , this).attr("data_onsite_cat_type");
            const data_onsite_cat_id = $("option:selected" , this).attr("data_onsite_cat_id");

            $('#ip-job_type').val(data_onsite_cat_type);
            $('#ip-job_catid').val(data_onsite_cat_id);
        });

        this.getUserData();


        // Example starter JavaScript for disabling form submissions if there are invalid fields
        (function() {
            'use strict';
            window.addEventListener('load', function() {
                // Fetch all the forms we want to apply custom Bootstrap validation styles to
                var forms = document.getElementsByClassName('needs-validation');
                // Loop over them and prevent submission
                 Array.prototype.filter.call(forms, function(form) {
                    form.addEventListener('submit', function(event) {
                        if (form.checkValidity() === false) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        form.classList.add('was-validated');
                    }, false);
                });
            }, false);
        })();

    },
    methods: {
        getDatetimePicker(){
            $('#ip-user_datetime').Zebra_DatePicker({
        	    format: 'Y-m-d H:i'
    	    });
        },
        getUser(searchInput){
            axios.post(this.url+'intsys/onsite_backend/api/api_getuser',{
                action:'getuser',
                searchInput:searchInput
            }).then(res=>{
                
                if(res.data.status == "Select Data Success"){
                    this.userResult = res.data.result;
                    // $("#ip-user_inform").select2({
                    //     selectOnClose: true
                    // });
                }
                console.log(this.userResult);
            });
        },
        getUrl(){
            if(typeof window !== "undefined"){
                return window.location.protocol+"//"+window.location.hostname+"/";
            }
        },
        getDevice(userinform){
            if(userinform != ""){
                axios.post(this.url+'intsys/onsite_backend/api/api_getDevice' , {
                    action:'getDevice',
                    userinform:userinform
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Select Data Success"){
                        // this.deviceResult = res.data.result;
                        const deviceResult = res.data.result;
                        let html = `
                        <option value="">กรุณาเลือกอุปกรณ์</option>
                        `;

                        for(let i = 0; i < deviceResult.length; i++){
                            html +=`
                            <option value="`+deviceResult[i].dv_dt_id+`">`+deviceResult[i].dv_dt_type+' : '+deviceResult[i].dv_dt_name+`</option>
                            `;
                        }

                        $('#ip-user_device').html(html);
                    }
                });
            }
        },
        getWorkType(){
            axios.post(this.url+'intsys/onsite_backend/api/api_getWorkType' ,{
                action:'getWorkType',
            }).then(res=>{
                console.log(res.data);
                if(res.data.status == "Select Data Success"){
                    this.workTypeResult = res.data.result;
                }
            });
        },
        getUserData(){
            this.userData = localStorage.getItem('userData');
            this.userData = JSON.parse(this.userData);

            $('#ip-namepost').val(this.userData.Fname+' '+this.userData.Lname);
            $('#ip-ecodepost').val(this.userData.ecode);
            $('#ip-datepost').val(this.currentDateTime);
            console.log(this.currentDateTime);
        },
        saveDataMain(){

            const proxy = this;

            if($('#ip-user_inform').val() == ""){
                Swal.fire({
                    title: 'กรุณาเลือกผู้แจ้ง',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
            }else if($('#ip-user_datetime').val() == ""){
                Swal.fire({
                    title: 'กรุณาเลือกวันที่แจ้ง',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
            }else if($('#ip-job_cat').val() == ""){
                Swal.fire({
                    title: 'กรุณาเลือกประเภทของงาน',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
            }else if($('#ip-issue').val() == ""){
                Swal.fire({
                    title: 'กรุณาระบุรายละเอียดงาน',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
            }else{

                $('#btn-saveData1').prop('disabled' , true);

                const form = $('#mainform')[0];
                const data = new FormData(form);

                axios.post(this.url+'intsys/onsite_backend/api/api_saveDataMain' , data).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Insert Data Success"){
                        Swal.fire({
                            title: 'บันทึกข้อมูลสำเร็จ',
                            icon: 'success',
                            showConfirmButton: false,
                            timer:1000
                        }).then(function(){
                            proxy.$router.push('/list');
                        });
                        
                    }else{
                        $('#btn-saveData1').prop('disabled' , false);
                    }
                });
            }



        },
        getdatetimeNow(){
            axios.get(this.url+'intsys/onsite_backend/api/getdatetimeNow').then(res=>{
                console.log(res.data);
                this.currentDateTime = res.data.result;
                $('#ip-datepost').val(this.currentDateTime);
            });
        },
        
    },
}
</script>

<style>

</style>