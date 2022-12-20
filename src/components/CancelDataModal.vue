<template>
  <div id="canceldata">
    <div class="modal fade bs-example-modal-lg" id="cancel_modal" tabindex="-1" role="dialog"
        aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md modal-dialog-scrollable">

            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myLargeModalLabel">ระบุเหตุผลขอยกเลิกเอกสารเลขที่ {{onsite_no}}</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>

                <div class="modal-body">

                   <div class="row">
                    <div class="col-md-12 form-group">
                        <label for=""><b>เหตุผลในการขอยกเลิก</b></label>
                        <textarea name="cancel-reson" id="cancel-reson" cols="30" rows="10" class="form-control"></textarea>
                    </div>
                    <div class="col-md-12 form-group">
                        <button class="btn btn-danger btn-block" id="btn-cancelConfirm" name="btn-cancelConfirm" @click="confirmCancel"><i class="dw dw-delete-3 mr-2"></i>
                            ยืนยันข้อมูล
                        </button>
                    </div>
                   </div>

                   <input hidden type="text" name="cancel_user" id="cancel_user" :value="userdata.Fname+' '+userdata.Lname">
                   <input hidden type="text" name="cancel_ecode" id="cancel_ecode" :value="userdata.ecode">
                    
                </div>
               
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
    name:"Canceldata",
    props:[
        'onsite_no',
        'userdata'
    ],
    data() {
        return {
            url:this.getUrl()
        }
    },
    methods: {
        confirmCancel(){
            const proxy = this;
            if($('#cancel-reson').val() != ""){
                axios.post(this.url+'intsys/onsiteservice/onsite_backend/api/api_canceldata' , {
                    action:'confirmCancel',
                    onsite_no:proxy.onsite_no,
                    cancel_reason:$('#cancel-reson').val(),
                    user:$('#cancel_user').val(),
                    ecode:$('#cancel_ecode').val()
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Update Data Success"){
                        Swal.fire({
                            title: 'ยกเลิกเอกสารสำเร็จ',
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
            }else{
                Swal.fire({
                    title: 'กรุณาระบุสาเหตุของการยกเลิก',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:1000
                });
            }
        },
        getUrl(){
            if(typeof window !== "undefined"){
                return window.location.protocol+"//"+window.location.hostname+"/";
            }
        },
    },
}
</script>

<style>

</style>