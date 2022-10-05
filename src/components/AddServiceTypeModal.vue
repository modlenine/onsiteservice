<template>
  <div id="addServiceTypeModal">
    <div class="modal fade bs-example-modal-lg" id="addService_modal" tabindex="-1" role="dialog"
        aria-labelledby="myLargeModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-md modal-dialog-scrollable">

            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myLargeModalLabel">เพิ่มข้อมูลงาน Service</h4>
                    <button type="button" class="close closeClick" data-dismiss="modal" aria-hidden="true">×</button>
                </div>

                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12 form-group">
                            <label for=""><b>งานเซอร์วิส</b></label>
                            <input type="text" name="ser-name" id="ser-name" class="form-control">
                        </div>
                        <div class="col-md-12 form-group">
                            <label for=""><b>รายละเอียดงาน</b></label>
                            <textarea name="ser-description" id="ser-description" cols="30" rows="10" class="form-control" style="height:120px;"></textarea>
                        </div>
                        <div class="col-md-12 form-group">
                            <label for=""><b>ประเภทงาน</b></label>
                            <select name="ser-type" id="ser-type" class="form-control">
                                <option value="">กรุณาเลือกประเภทงาน</option>
                                <option value="Hardware">Hardware</option>
                                <option value="Software">Software</option>
                                <option value="Network">Network</option>
                                <option value="Email">Email</option>
                                <option value="Printer">Printer</option>
                            </select>
                        </div>
                        <div class="col-md-12 form-group">
                            <button type="button" name="btn-save-service" id="btn-save-service" class="btn btn-info btn-block">บันทึก</button>
                        </div>

                        <input hidden type="text" name="ser-username" id="ser-username" :value="userDataProps.Fname+' '+userDataProps.Lname">
                        <input hidden type="text" name="ser-ecode" id="ser-ecode" :value="userDataProps.ecode">
                        <input hidden type="text" name="ser-deptcode" id="ser-deptcode" :value="userDataProps.DeptCode">
                        <input hidden type="text" name="ser-catid" id="ser-catid">
                    </div>
                </div>
               
            </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
    name:'AddServiceTypeModal',
    props:[
        'userDataProps',
    ],
    data() {
        return {
         
        }
    },
    mounted() {
      
    },
    methods: {
     
    },
}
</script>

<style>

</style>