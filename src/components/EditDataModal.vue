<template>
  <div id="editdatamodal">
    <div class="modal fade bs-example-modal-lg" id="edit_modal" tabindex="-1" role="dialog"
        aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">

            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myLargeModalLabel">แก้ไขข้อมูลเอกสารเลขที่ {{onsite_no}}</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>

                <!-- <div class="modal-header">
                    
                    <div>
                        <button type="submit" class="btn btn-success" id="btn-saveMain">
                            <i class="fi-save mr-2"></i>บันทึก
                        </button>
                    </div>
                    <div></div>
                </div> -->

                <div class="modal-body">

                    <form id="mainformEdit" @submit.prevent="saveEditDataMain()" class="needs-validation" novalidate>
                    <div class="row">
                        <div class="col-xl-12 mb-30">
                            <div class="card-box height-100-p pd-20">
                                <div class="mt-5"></div>
                                <h3>แก้ไขข้อมูล</h3>
                                <hr>

                                <div class="row form-group">
                                    <div class="col-md-6 col-sm-12 form-group">
                                        <label for=""><b>ชื่อผู้แจ้ง {{userinform}}</b></label>
                                        <input type="text" name="ipe-user_inform" id="ipe-user_inform" class="form-control" v-model="searchInput" @keyup="getUser(searchInput)" required>
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
                                        <input type="text" name="ipe-user_ecode" id="ipe-user_ecode" class="form-control" readonly>
                                    </div>
                                    <div class="col-md-6 col-sm-12 form-group">
                                        <label for=""><b>แผนก</b></label>
                                        <input type="text" name="ipe-user_dept" id="ipe-user_dept" class="form-control" readonly>
                                        <input hidden type="text" name="ipe-user_deptcode" id="ipe-user_deptcode">
                                    </div>
                                    <div class="col-md-6 col-sm-12">
                                        <label for=""><b>วันที่แจ้ง</b></label>
                                        <input type="text" name="ipe-user_datetime" id="ipe-user_datetime" class="form-control">
                                    </div>
                                    <div class="col-md-12 col-sm-12 form-group">
                                        <label for=""><b>เลือกอุปกรณ์</b></label>
                                        <select name="ipe-user_device" id="ipe-user_device" class="form-control">

                                        </select>
                                    </div>
                                    <div class="col-md-6 col-sm-12">
                                        <label for=""><b>ประเภทของงาน</b></label>
                                        <select name="ipe-job_cat" id="ipe-job_cat" class="form-control ipe-job_cat" required>
                                        </select>
                                        <input hidden type="text" name="ipe-job_catid" id="ipe-job_catid">
                                    </div>
                                    <div class="col-md-6 col-sm-12">
                                        <label for=""><b>หมวดหมู่</b></label>
                                        <input type="text" name="ipe-job_type" id="ipe-job_type" class="form-control" readonly>
                                    </div>
                                </div>

                                <div class="row form-group">
                                    <div class="col-md-8">
                                        <label for=""><b>รายละเอียดงาน</b></label>
                                        <textarea name="ipe-issue" id="ipe-issue" cols="30" rows="10" class="form-control" required></textarea>
                                        <button type="submit" class="btn btn-warning btn-block mt-2">บันทึก</button>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="row">
                                            <div class="col-md-12 form-group">
                                                <label for=""><b>ผู้รับเรื่อง</b></label>
                                                <input type="text" name="ipe-namepost" id="ipe-namepost" class="form-control" readonly>
                                            </div>
                                            <div class="col-md-12 form-group">
                                                <label for=""><b>รหัสพนักงาน</b></label>
                                                <input type="text" name="ipe-ecodepost" id="ipe-ecodepost" class="form-control" readonly>
                                            </div>
                                            <div class="col-md-12 form-group">
                                                <label for=""><b>วันที่</b></label>
                                                <input type="text" name="ipe-datepost" id="ipe-datepost" class="form-control" readonly :value="currentDateTime">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <input hidden type="text" name="ipe-check-onsiteno" id="ipe-check-onsiteno" :value="onsite_no">
                                <input hidden type="text" name="ipe-check-onsitestatus" id="ipe-check-onsitestatus">

                            </div>
                        </div>
                    </div>
                    </form>
                    
                </div>
               
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name:'Editdatamodal',
    props:[
        'onsite_no',
        'currentDateTime',
        'userinform'
    ],
    data() {
        return {
            url:this.getUrl(),
            userResult:[],
            searchInput:this.userinform,
            deviceResult:[],
            workTypeResult:[],
            userData:[],
        }
    },
    created() {

    },
    fetch(){
        
    },
    mounted() {

        const proxy = this;
        
        // this.getViewDataEdit();

        // if(this.editModal == true){
        //     $('#edit_modal').modal('open');
        // }
                
        this.getDatetimePicker();
        this.getUser(this.searchInput);

        $('#ipe-user_inform').on('focus' , function(){
            $('.selectUserInform').css('display' , '');
        });
        $('#ipe-user_inform').on('keyup' , function(){
            $('.selectUserInform').css('display' , '');
        });



        $(document).on('click' , '.selectUserInformLi' , function(){
            $('.selectUserInform').css('display' , 'none');
            const data_userinform = $(this).attr("data_userinform");
            const data_userecode = $(this).attr("data_userecode");
            const data_dept = $(this).attr("data_dept");
            const data_deptcode = $(this).attr("data_deptcode");

            $('#ipe-user_inform').val(data_userinform);
            $('#ipe-user_ecode').val(data_userecode);
            $('#ipe-user_dept').val(data_dept);
            $('#ipe-user_deptcode').val(data_deptcode);

            proxy.getDevice(data_userinform);
  
            
        });

        $(document).on('change' , '.ipe-job_cat' , function(){

            const data_onsite_cat_type = $("option:selected" , this).attr("data_onsite_cat_type");
            const data_onsite_cat_id = $("option:selected" , this).attr("data_onsite_cat_id");

            $('#ipe-job_type').val(data_onsite_cat_type);
            $('#ipe-job_catid').val(data_onsite_cat_id);
        });

        this.getUserData();

        // Edit Main Data
        $(document).on('click' , '.editBtn' , function(){
            proxy.getViewDataEdit();
        });


        // Example starter JavaScript for disabling form submissions if there are invalid fields
       
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
  
    },
    methods: {

        saveEditDataMain(){

            const proxy = this;

            if($('#ipe-user_inform').val() == ""){
                Swal.fire({
                    title: 'กรุณาเลือกผู้แจ้ง',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
            }else if($('#ipe-user_datetime').val() == ""){
                Swal.fire({
                    title: 'กรุณาเลือกวันที่แจ้ง',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
            }else if($('#ipe-job_cat').val() == ""){
                Swal.fire({
                    title: 'กรุณาเลือกประเภทของงาน',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
            }else if($('#ipe-issue').val() == ""){
                Swal.fire({
                    title: 'กรุณาระบุรายละเอียดงาน',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
            }else{
                const form = $('#mainformEdit')[0];
                const data = new FormData(form);

                axios.post(this.url+'intsys/onsiteservice/onsite_backend/api/api_saveEditDataMain' , data).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Update Data Success"){
                        Swal.fire({
                            title: 'บันทึกข้อมูลสำเร็จ',
                            icon: 'success',
                            showConfirmButton: false,
                            timer:1000
                        }).then(function(){
                            $(document.body).removeClass("modal-open");
                            $('.modal-backdrop').remove();
                            proxy.$router.push('/list');
                        });
                        
                    }
                });
            }



        },
        getUrl(){
            if(typeof window !== "undefined"){
                return window.location.protocol+"//"+window.location.hostname+"/";
            }
        },
        getDevice(userinform , dv_dt_id){
            if(userinform != ""){
                axios.post(this.url+'intsys/onsiteservice/onsite_backend/api/api_getDevice' , {
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

                        $('#ipe-user_device').html(html);

                        $('#ipe-user_device option[value="'+dv_dt_id+'"]').prop("selected" , true);
                    }
                });
            }
        },
        getWorkType(onsite_cat_name){
            axios.post(this.url+'intsys/onsiteservice/onsite_backend/api/api_getWorkType' ,{
                action:'getWorkType',
            }).then(res=>{
                console.log(res.data);
                if(res.data.status == "Select Data Success"){
                    // this.workTypeResult = res.data.result;
                    let worktyperesult = res.data.result;
                    let html = `<option value="">กรุณาเลือกประเภทของงาน</option>`;
                    for(let i = 0; i < worktyperesult.length; i++){
                        html +=`
                        <option value="`+worktyperesult[i].onsite_cat_name+`"
                            data_onsite_cat_type="`+worktyperesult[i].onsite_cat_type+`"
                            data_onsite_cat_id="`+worktyperesult[i].onsite_cat_id+`"
                        >`+worktyperesult[i].onsite_cat_type+` : `+worktyperesult[i].onsite_cat_name+` :</option>
                        `;
                    }

                    $('#ipe-job_cat').html(html);

                    $('#ipe-job_cat option[value="'+onsite_cat_name+'"]').prop("selected" , true);
                }
            });
        },
        getUserData(){
            this.userData = localStorage.getItem('userData');
            this.userData = JSON.parse(this.userData);

            $('#ipe-namepost').val(this.userData.Fname+' '+this.userData.Lname);
            $('#ipe-ecodepost').val(this.userData.ecode);
            $('#ipe-datepost').val(this.currentDateTime);
            console.log(this.userData.datenow);
        },
        getDatetimePicker(){
            $('#ipe-user_datetime').Zebra_DatePicker({
        	    format: 'Y-m-d H:i'
    	    });
        },
        getUser(searchInput){
            axios.post(this.url+'intsys/onsiteservice/onsite_backend/api/api_getuser',{
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
        getViewDataEdit(){
            const proxy = this;

            axios.post(this.url+'intsys/onsiteservice/onsite_backend/api/api_getViewData/',{
                action:'getViewData',
                formno:this.$route.params.id
            }).then(res=>{
                console.log(res.data);
                if(res.data.status == "Select Data Success"){
                    const onsite_data = res.data.result;
                    const device_data = res.data.resultDevice;

                    // let condate = moment(onsite_data.onsite_date_inform).format('DD/MM/Y HH:mm:ss');


                    // let deviceTypedeviceName = "";
                    let deviceId = "";
                    if(device_data != null){
                        // deviceTypedeviceName = device_data.dv_dt_type+' : '+device_data.dv_dt_name;
                        deviceId = device_data.dv_dt_id;
                    }

                    // $('#ipe-user_inform').val(onsite_data.onsite_user_inform);
                    proxy.searchInput = onsite_data.onsite_user_inform;

                    $('#ipe-user_ecode').val(onsite_data.onsite_user_ecode);
                    $('#ipe-user_dept').val(onsite_data.onsite_dept_inform);
                    $('#ipe-user_deptcode').val(onsite_data.onsite_deptcode_inform);
                    $('#ipe-user_datetime').val(onsite_data.onsite_date_inform);
                    $('#ipe-check-onsitestatus').val(onsite_data.onsite_status);

                    // $('#ipe-user_device option[value="'+device_data.dv_dt_type+' : '+device_data.dv_dt_name+'"]').prop("selected" , true);

                    proxy.getDevice(onsite_data.onsite_user_inform , deviceId);


                    // $('#ipe-job_cat').val(onsite_data.onsite_job_cat);
                    $('#ipe-job_type').val(onsite_data.onsite_job_type);
                    $('#ipe-issue').val(onsite_data.onsite_issue);
                    $('#ipe-job_catid').val(onsite_data.onsite_job_catid);


                    proxy.getWorkType(onsite_data.onsite_job_cat);

                }
            });
        },
    },
}
</script>

<style>

</style>