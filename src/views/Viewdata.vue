<template>

  <div id="viewdata">
    <div>
        <EditDataModal
            :onsite_no="this.onsite_no"
            :currentDateTime="this.currentDateTime"
            :userinform="this.userinform"
        />
        <CancelDataModal
            :onsite_no="this.onsite_no"
            :userdata="this.userData"
        />
    </div>
        <div class="main-container">
          <div class="pd-ltr-20">

            <div class="row">
                <div class="col-xl-8 col-lg-12 col-md-12 mb-30">
                    <div class="card-box height-100-p pd-20">
                        <div class="mt-5"></div>
                        <div class="text-center">
                            <h3>หน้ารายละเอียดการแจ้งซ่อม</h3><br>
                            <h5>เอกสารเลขที่ : {{$route.params.id}}</h5>
                        </div>

                        <hr>

                        <div class="row mt-4 mainDataDiv">
                            <button style="display:none;" type="button" class="btn btn-warning editBtn" data-toggle="modal" data-target="#edit_modal"><i class="dw dw-edit-file editIcon"></i>แก้ไข</button>
                            
                            <div class="col-md-6 col-sm-12 form-group">
                                <label for=""><b>ชื่อผู้แจ้ง</b></label>
                                <input type="text" name="ipv-user_inform" id="ipv-user_inform" class="form-control" readonly>

                            </div>
                            <div class="col-md-6 col-sm-12 form-group">
                                <label for=""><b>รหัสพนักงาน</b></label>
                                <input type="text" name="ipv-user_ecode" id="ipv-user_ecode" class="form-control" readonly>
                            </div>
                            <div class="col-md-6 col-sm-12 form-group">
                                <label for=""><b>แผนก</b></label>
                                <input type="text" name="ipv-user_dept" id="ipv-user_dept" class="form-control" readonly>
                            </div>
                            <div class="col-md-6 col-sm-12 form-group">
                                <label for=""><b>วันที่แจ้ง</b></label>
                                <input type="text" name="ipv-user_datetime" id="ipv-user_datetime" class="form-control" readonly>
                            </div>
                            <div class="col-md-12 col-sm-12 form-group">
                                <label for=""><b>เลือกอุปกรณ์</b></label>
                                <input type="text" name="ipv-user_device" id="ipv-user_device" class="form-control" readonly>
                            </div>
                            <div class="col-md-6 col-sm-12 form-group">
                                <label for=""><b>ประเภทของงาน</b></label>
                                <input type="text" name="ipv-job_cat" id="ipv-job_cat" class="form-control ipv-job_cat" readonly>
                            </div>
                            <div class="col-md-6 col-sm-12 form-group">
                                <label for=""><b>หมวดหมู่</b></label>
                                <input type="text" name="ipv-job_type" id="ipv-job_type" class="form-control" readonly>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-8 form-group">
                                <label for=""><b>รายละเอียดงาน</b></label>
                                <textarea name="ipv-issue" id="ipv-issue" cols="30" rows="10" class="form-control" readonly></textarea>
                            </div>
                            <div class="col-md-4">
                                <div class="row">
                                    <div class="col-md-12 form-group">
                                        <label for=""><b>ผู้รับเรื่อง</b></label>
                                        <input type="text" name="ipv-namepost" id="ipv-namepost" class="form-control form-control-sm" readonly>
                                    </div>
                                    <div class="col-md-12 form-group">
                                        <label for=""><b>รหัสพนักงาน</b></label>
                                        <input type="text" name="ipv-ecodepost" id="ipv-ecodepost" class="form-control form-control-sm" readonly>
                                    </div>
                                    <div class="col-md-12 form-group">
                                        <label for=""><b>วันที่</b></label>
                                        <input type="text" name="ipv-datepost" id="ipv-datepost" class="form-control form-control-sm" readonly>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr id="hr_onsite_inprocess" style="display:none;">
                        <div id="onsite_inprocess" class="row" style="display:none;">
                            <div class="col-md-8">
                                <div class="row text-center">
                                    <div class="col-md-12">
                                        <span id="inProcessTxt" style="display:none;font-size:20px;color:green;"></span>
                                    </div>
                                </div>
                                <label for=""><b>หมายเหตุ</b></label>
                                <textarea name="ipv-inpromemo" id="ipv-inpromemo" cols="30" rows="10" class="form-control"></textarea>
                                <div class="row">
                                    <div class="col-md-6">
                                        <button type="button" id="btn-submitInpro" name="btn-submitInpro" class="btn btn-info btn-block mt-2"><i class="dw dw-checked mr-2"></i>รับงาน</button>
                                    </div>
                                    <div class="col-md-6">
                                        <button type="button" id="btn-cancelInpro" name="btn-cancelInpro" class="btn btn-danger btn-block mt-2" data-toggle="modal" data-target="#cancel_modal"><i class="dw dw-delete-3 mr-2"></i>ยกเลิก</button>
                                    </div>
                                </div>
                                <br>
                            </div>
                            <div class="col-md-4">
                                <div class="row">
                                    <div class="col-md-12 form-group">
                                        <label for=""><b>ผู้รับงาน</b></label>
                                        <input type="text" name="ipv-inproname" id="ipv-inproname" class="form-control form-control-sm" readonly>
                                    </div>
                                    <div class="col-md-12 form-group">
                                        <label for=""><b>รหัสพนักงงาน</b></label>
                                        <input type="text" name="ipv-inproecode" id="ipv-inproecode" class="form-control form-control-sm" readonly>
                                    </div>
                                    <div class="col-md-12 form-group">
                                        <label for=""><b>วันที่</b></label>
                                        <input type="text" name="ipv-inprodatetime" id="ipv-inprodatetime" class="form-control form-control-sm" readonly>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr id="hr_onsite_solve" style="display:none;">
                        <section id="onsite_solve" style="display:none;">
                        <form id="actionForm" @submit.prevent="saveAction()" class="needs-validation" novalidate>
                        <div class="row">
                            <div class="col-md-6 form-group">
                                <label for=""><b>การดำเนินงาน</b></label>
                                <textarea name="ipv-fixed" id="ipv-fixed" cols="30" rows="10" class="form-control" required></textarea>
                            </div>
                            <div class="col-md-6 form-group">
                                <label for=""><b>สาเหตุ</b></label>
                                <textarea name="ipv-cause" id="ipv-cause" cols="30" rows="10" class="form-control" required></textarea>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-8 form-group">
                                <label for=""><b>ผลสรุป</b></label>
                                <textarea name="ipv-conclude" id="ipv-conclude" cols="30" rows="10" class="form-control"></textarea>
                                <button type="submit" id="btn-saveAction" class="btn btn-success btn-block mt-2"><i class="dw dw-checked mr-2"></i>บันทึก</button>
                            </div>
                            <div class="col-md-4">
                                <div class="row">
                                    <div class="col-md-12 form-group">
                                        <label for=""><b>ผู้ดำเนินงาน</b></label>
                                        <input type="text" name="ipv-owner" id="ipv-owner" class="form-control form-control-sm" readonly>
                                    </div>
                                    <div class="col-md-12 form-group">
                                        <label for=""><b>รหัสพนักงงาน</b></label>
                                        <input type="text" name="ipv-ownerecode" id="ipv-ownerecode" class="form-control form-control-sm" readonly>
                                    </div>
                                    <div class="col-md-12 form-group">
                                        <label for=""><b>วันที่ดำเนินการเสร็จ</b></label>
                                        <input type="text" name="ipv-ownerdate" id="ipv-ownerdate" class="form-control form-control-sm" required>
                                    </div>
                                </div>
                            </div>
                        </div>
                            <input hidden type="text" name="ipv-check-onsiteid" id="ipv-check-onsiteid">
                        </form>
                        </section>

                    </div>
                </div>

                <div class="col-xl-4 col-lg-12 col-md-12 mb-30">
                    <History
                        :userinform="this.userinform"
                        :ecodeinform="this.ecodeinform"
                        :dateinform="this.dateinform"
                    />
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
import moment from 'moment';
import EditDataModal from '@/components/EditDataModal.vue';
import CancelDataModal from '@/components/CancelDataModal.vue';
import History from '@/components/History.vue';

export default {
    name:'Viewdata',
    data() {
        return {
            url:this.getUrl(),
            userData:[],
            currentDateTime:'',
            onsite_no:this.$route.params.id,
            userinform:'null',
            ecodeinform:'',
            dateinform:''
        }
    },
    components:{
        EditDataModal,
        CancelDataModal,
        History
    },
    created() {
        this.getdatetimeNow();
    },
    mounted() {
        const proxy = this;
        
        proxy.getViewData();
        console.log(proxy.onsitestatus);
        proxy.getUserData();
        

        $('#btn-submitInpro').on('click' , function(){
            proxy.saveInprocess();
        });

        proxy.getDatePicker();

        // Edit Main Data
        // $(document).on('click' , '.editBtn' , function(){
        //     $('#edit_modal').modal({
        //         show:true,
        //         keyboard:false,
        //         backdrop:'static'
        //     });
        // });



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
        getDatePicker(){
            $('#ipv-ownerdate').Zebra_DatePicker({
        	    format: 'Y-m-d H:i',
    	    });
        },
        getViewData(){
            const proxy = this;

            axios.post(this.url+'intsys/onsite_backend/api/api_getViewData/',{
                action:'getViewData',
                formno:this.$route.params.id
            }).then(res=>{
                console.log(res.data);
                if(res.data.status == "Select Data Success"){
                    const onsite_data = res.data.result;
                    const device_data = res.data.resultDevice;

                    const onsitestatus = onsite_data.onsite_status;

                    

                    let condate = moment(onsite_data.onsite_date_inform).format('DD/MM/Y HH:mm:ss');
                    let condate2 = moment(onsite_data.onsite_datepost).format('DD/MM/Y HH:mm:ss');
                    let deviceTypedeviceName = "";

                    if(device_data != null){
                        deviceTypedeviceName = device_data.dv_dt_type+' : '+device_data.dv_dt_name;
                    }

                    proxy.userinform = onsite_data.onsite_user_inform;
                    proxy.ecodeinform = onsite_data.onsite_user_ecode;
                    proxy.dateinform = condate2;

                    $('#ipv-user_inform').val(onsite_data.onsite_user_inform);
                    $('#ipv-user_ecode').val(onsite_data.onsite_user_ecode);
                    $('#ipv-user_dept').val(onsite_data.onsite_dept_inform);
                    $('#ipv-user_datetime').val(condate);
                    $('#ipv-user_device').val(deviceTypedeviceName);
                    $('#ipv-job_cat').val(onsite_data.onsite_job_cat);
                    $('#ipv-job_type').val(onsite_data.onsite_job_type);
                    $('#ipv-issue').val(onsite_data.onsite_issue);
                    $('#ipv-namepost').val(onsite_data.onsite_namepost);
                    $('#ipv-ecodepost').val(onsite_data.onsite_ecodepost);
                    $('#ipv-datepost').val(condate2);


                    if(onsitestatus == "New Service"){
                        $('#hr_onsite_inprocess , #onsite_inprocess').css('display' , '');

                        $('#ipv-inproname').val(proxy.userData.Fname+' '+proxy.userData.Lname);
                        $('#ipv-inproecode').val(proxy.userData.ecode);
                        $('#ipv-inprodatetime').val(proxy.currentDateTime);
                        $('.editBtn').css('display','');

                    }else if(onsitestatus == "In process"){
                        let conInproDate = moment(onsite_data.onsite_inprodatetime).format('D/M/Y HH:mm:ss');
                        $('#hr_onsite_inprocess , #onsite_inprocess').css('display' , '');
                        $('#btn-submitInpro').css('display','none');
                        $('#btn-cancelInpro').css('display','none');
                        $('#inProcessTxt').css('display' , '').html('<b>คุณ '+onsite_data.onsite_inproname+' กำลังดำเนินการ</b>');
                        $('#ipv-inpromemo').val(onsite_data.onsite_inpromemo).prop('readonly' , true);

                        $('#ipv-inproname').val(onsite_data.onsite_inproname);
                        $('#ipv-inproecode').val(onsite_data.onsite_inproecode);
                        $('#ipv-inprodatetime').val(conInproDate);


                        $('#hr_onsite_solve , #onsite_solve').css('display' , '');
                        $('#ipv-owner').val(proxy.userData.Fname+' '+proxy.userData.Lname);
                        $('#ipv-ownerecode').val(proxy.userData.ecode);
                        $('#ipv-check-onsiteid').val(proxy.$route.params.id);
                        $('.editBtn').css('display','');
                    }else if(onsitestatus == "Successfully"){

                        let conInproDate = moment(onsite_data.onsite_inprodatetime).format('D/M/Y HH:mm:ss');
                        let conActionDate = moment(onsite_data.onsite_owner_date).format('D/M/Y HH:mm:ss');
                        $('#hr_onsite_inprocess , #onsite_inprocess').css('display' , '');
                        $('#btn-submitInpro').css('display','none');
                        $('#btn-cancelInpro').css('display','none');
                        $('#inProcessTxt').css('display' , '').html('<b>คุณ '+onsite_data.onsite_inproname+' ดำเนินการเสร็จสินแล้ว</b>');
                        $('#ipv-inpromemo').val(onsite_data.onsite_inpromemo).prop('readonly' , true);

                        $('#ipv-inproname').val(onsite_data.onsite_inproname);
                        $('#ipv-inproecode').val(onsite_data.onsite_inproecode);
                        $('#ipv-inprodatetime').val(conInproDate);

                        $('#hr_onsite_solve , #onsite_solve').css('display' , '');
                        $('#ipv-fixed').val(onsite_data.onsite_fixed).prop('readonly',true);
                        $('#ipv-cause').val(onsite_data.onsite_cause).prop('readonly',true);
                        $('#ipv-conclude').val(onsite_data.onsite_conclude).prop('readonly',true);
                        $('#ipv-owner').val(onsite_data.onsite_owner).prop('readonly',true);
                        $('#ipv-ownerecode').val(onsite_data.onsite_ownerecode).prop('readonly',true);
                        $('#ipv-ownerdate').val(conActionDate).prop('disabled' , true);
                        $('#btn-saveAction').css('display','none');


                    }
                }
            });
        },
        getUrl(){
            if(typeof window !== "undefined"){
                return window.location.protocol+"//"+window.location.hostname+"/";
            }
        },
        getUserData(){
            this.userData = localStorage.getItem('userData');
            this.userData = JSON.parse(this.userData);

            console.log(this.currentDateTime);
        },
        saveInprocess()
        {

            $('#btn-submitInpro').prop('disabled' , true);

            const proxy = this;
            axios.post(proxy.url+'intsys/onsite_backend/api/api_saveInprocess' , {
                action:'saveInprocess',
                inproMemo:$('#ipv-inpromemo').val(),
                inproName:$('#ipv-inproname').val(),
                inproEcode:$('#ipv-inproecode').val(),
                inproDate:$('#ipv-inprodatetime').val(),
                formno:proxy.$route.params.id
            }).then(res=>{
                console.log(res.data);
                if(res.data.status == "Update Data Success"){
                    Swal.fire({
						title: 'บันทึกข้อมูลสำเร็จ',
						icon: 'success',
						showConfirmButton: false,
						timer:1000
					}).then(function(){
						// proxy.$router.push('/viewdata/'+proxy.$route.params.id);
                        const path = `/viewdata/${proxy.$route.params.id}`;
                        if (proxy.$route.path !== path) proxy.$router.push(path)
                        proxy.getViewData();
					});
                }else{
                    $('#btn-submitInpro').prop('disabled' , false);
                }
            });
        },
        getdatetimeNow(){
            axios.get(this.url+'intsys/onsite_backend/api/getdatetimeNow').then(res=>{
                console.log(res.data);
                this.currentDateTime = res.data.result;
            });
        },
        saveAction(){
            const proxy = this;
            if($('#ipv-fixed').val() == ""){
                Swal.fire({
                    title: 'กรุณาระบุขั้นตอนการดำเนินงาน',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
            }else if($('#ipv-cause').val() == ""){
                Swal.fire({
                    title: 'กรุณาระบุสาเหตุของปัญหา',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
            }else if($('#ipv-ownerdate').val() == ""){
                Swal.fire({
                    title: 'กรุณาระบุวันเวลาที่ดำเนินงานเสร็จสิ้น',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
            }else{

                $('#btn-saveAction').prop('disabled' , true);

                const form = $('#actionForm')[0];
                const data = new FormData(form);
                
                axios.post(this.url+'intsys/onsite_backend/api/api_saveAction' , data , {}).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Update Data Success"){
                        Swal.fire({
                            title: 'บันทึกข้อมูลสำเร็จ',
                            icon: 'success',
                            showConfirmButton: false,
                            timer:1000
                        }).then(function(){
                            proxy.$router.push('/list');
                        });
                    }else if(res.data.status == "Error Abount Time Finish"){
                        $('#btn-saveAction').prop('disabled' , false);

                        Swal.fire({
                            title: 'เวลาจบงานไม่สัมพันธ์กันกับเวลาเริ่มงาน',
                            icon: 'error',
                            showConfirmButton: false,
                            timer:1000
                        });
                    }else if(res.data.status == "Error Abount Time Start and Finish"){
                        $('#btn-saveAction').prop('disabled' , false);

                        Swal.fire({
                            title: 'เวลาจบงานเท่ากับเวลาเริ่มงาน',
                            icon: 'error',
                            showConfirmButton: false,
                            timer:1000
                        });
                    }
                });
            }
        }

    },
}
</script>

<style>
    .Zebra_DatePicker_Icon_Wrapper{
        width:100% !important;
    }
</style>