<template>
  <div id="service">
    <div>
        <AddServiceTypeModal
            :userDataProps="userData"
        />
    </div>


      <div class="main-container">
          <div class="pd-ltr-20">
          
              <div class="row">
                <div class="col-xl-12 mb-30">
                  <div class="card-box height-100-p pd-20">
                    <div class="mt-5"></div>
                    <div v-if="userData.ecode == 'M1809'" class="row mb-3">
                        <div class="col-md-6">
                            <button type="button" id="btn-addMachineData" class="btn btn-primary btnIndex" data-toggle="modal" data-target="#addService_modal">
                            <i class="fi-plus mr-2"></i>เพิ่มข้อมูล</button>
                        </div>
                    </div>
                      <hr>

                        <div class="mt-4"></div>
                        <h3 style="text-align:center;" class="mb-3">รายการงาน Service</h3>
                
                        <table id="tbl_servicetype" class="table table-striped table-bordered" cellspacing="0">
                            <thead>
                            <tr>
                                <th class="th_service1">เลขที่</th>
                                <th class="th_service2">งาน</th>
                                <th class="th_service3">รายละเอียดเนื้องาน</th>
                                <th class="th_service4">ประเภท</th>
                                <th class="th_service5">#</th>
                            </tr>
                            </thead>
                        </table>

                    
                  </div>
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

import AddServiceTypeModal from '@/components/AddServiceTypeModal.vue';

export default {
    name:"Service",
    components:{
        AddServiceTypeModal
    },
    data() {
        return {
            url:this.getUrl(),
            userData:this.getSessionStorage(),
            serviceTypeModal:false
        }
    },
    created() {
        
    },
    mounted() {
        const proxy = this;
        this.loadServiceList();

        $('#btn-save-service').on('click' , function(){
            proxy.saveServiceType();
        });

        $(document).on('click' , '.serIconEdit' , function(){
            const data_cat_id = $(this).attr("data_cat_id");
            proxy.getDataCat(data_cat_id);
            $('#btn-addMachineData').click();
        });

        $(document).on('click' , '.serIconDel' , function(){
            const data_cat_id = $(this).attr("data_cat_id");
            Swal.fire({
                title: 'ท่านต้องการลบรายการนี้ ใช่หรือไม่',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                confirmButtonText: 'ยืนยัน',
                cancelButtonText:'ยกเลิก'
            }).then((result)=> {
                if(result.value == true){
                    proxy.delDataCat(data_cat_id);
                }
            });

        });

        $(document).on('click' , '.closeClick' , function(){
            $('#btn-save-service').text('บันทึก').removeClass('btn-warning').addClass('btn-info');
            $('#ser-name').val('');
            $('#ser-type').val('');
            $('#ser-description').val('');
            $('#ser-catid').val('');
        });
    },
    methods: {
        getUrl(){
            if(typeof window !== "undefined"){
                return window.location.protocol+"//"+window.location.hostname+"/";
            }
        },
        loadServiceList()
        {

            let thid = 1;
            $('#tbl_servicetype thead th').each(function() {
            var title = $(this).text();
            $(this).html(title + ' <input type="text" id="tbl_servicetype'+thid+'" class="col-search-input" placeholder="Search ' + title + '" />');
            thid++;
            });

                $('#tbl_servicetype').DataTable().destroy();
                var table = $('#tbl_servicetype').DataTable({
                            "scrollX": true,
                            "processing": true,
                            "serverSide": true,
                            "stateSave": true,
                            stateLoadParams: function(settings, data) {
                                for (let i = 0; i < data.columns["length"]; i++) {
                                    let col_search_val = data.columns[i].search.search;
                                    if (col_search_val !== "") {
                                        $("input", $("#tbl_servicetype thead th")[i]).val(col_search_val);
                                    }
                                }
                            },
                            "ajax": {
                                "url":this.url+'intsys/onsiteservice/onsite_backend/api/loadServiceList/',
                            },
                            order: [
                                [0, 'desc']
                            ],
                            columnDefs: [{
                                    targets: "_all",
                                    orderable: false
                                },
                            ],
                    });

                table.columns().every(function() {
                    var table = this;
                    $('input', this.header()).on('keyup change', function() {
                        if (table.search() !== this.value) {
                            table.search(this.value).draw();
                        }
                    });
                });

                table.on('order.dt search.dt', function () {
                    let i = 1;
            
                    table.cells(null, 0, { search: 'applied', order: 'applied' }).every(function () {
                        this.data(i++);
                    });
                }).draw();

                

                // $('#normal_list6 , #normal_list2').prop('readonly' , true).css({
                //     'background-color':'#F5F5F5',
                //     'cursor':'no-drop'
                // });
        },
        getSessionStorage(){
            const getUserData = localStorage.getItem("userData");
            console.log(JSON.parse(getUserData).DeptCode);
            return JSON.parse(getUserData);
        },
        saveServiceType()
        {
           const proxy = this;
            if($('#ser-name').val() != "" && $('#ser-type').val() != ""){
                axios.post(this.url+'intsys/onsiteservice/onsite_backend/api/api_saveServiceType' , {
                    action:"saveServiceType",
                    service_name:$('#ser-name').val(),
                    service_type:$('#ser-type').val(),
                    service_des:$('#ser-description').val(),
                    service_username:$('#ser-username').val(),
                    service_ecode:$('#ser-ecode').val(),
                    service_deptcode:$('#ser-deptcode').val(),
                    service_catid:$('#ser-catid').val()
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Insert Data Not Success"){
                        Swal.fire({
                            title: 'บันทึกข้อมูลไม่สำเร็จกรุณาติดต่อผู้ดูแล',
                            icon: 'error',
                            showConfirmButton: false,
                            timer:1000
                        });
                    }else if(res.data.status == "Found Duplicate Data"){
                        Swal.fire({
                            title: 'พบข้อมูลซ้ำในระบบกรุณาลองใหม่',
                            icon: 'error',
                            showConfirmButton: false,
                            timer:1000
                        });
                    }else if(res.data.status == "Insert Data Success" || res.data.status == "Update Data Success"){
                        Swal.fire({
                            title: 'บันทึกข้อมูลสำเร็จ',
                            icon: 'success',
                            showConfirmButton: false,
                            timer:1000
                        }).then(function(){
                            $('#ser-name').val('');
                            $('#ser-type').val('');
                            $('#ser-description').val('');
                            $('.closeClick').click();
                            $('#ser-catid').val('');
                            proxy.loadServiceList();
                        });
                    }
                });
            }
        },
        getDataCat(catid)
        {
            const proxy = this;
            if(catid != ''){
                axios.post(proxy.url+'intsys/onsiteservice/onsite_backend/api/api_getDataCat' , {
                    action:"getDataCat",
                    catid:catid
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Select Data Success"){
                        let serdata = res.data.result;
                        $('#ser-name').val(serdata.onsite_cat_name);
                        $('#ser-description').val(serdata.onsite_cat_description);
                        $('#ser-type option[value="'+serdata.onsite_cat_type+'"]').prop("selected" , true);
                        $('#ser-catid').val(serdata.onsite_cat_id);
                        $('#btn-save-service').text('แก้ไข').removeClass('btn-info').addClass('btn-warning');
                    }
                });
            }
        },
        delDataCat(catid)
        {
            const proxy = this;
            if(catid != ""){
                axios.post(proxy.url+'intsys/onsiteservice/onsite_backend/api/api_delDataCat',{
                    action:"delDataCat",
                    catid:catid
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status == "Delete Data Success"){
                        Swal.fire({
                            title: 'ลบข้อมูลสำเร็จ',
                            icon: 'success',
                            showConfirmButton: false,
                            timer:1000
                        }).then(function(){
                            $('#ser-name').val('');
                            $('#ser-type').val('');
                            $('#ser-description').val('');
                            $('.closeClick').click();
                            $('#ser-catid').val('');
                            proxy.loadServiceList();
                        });
                    }
                });
            }
        }
    },
}
</script>

<style scpted>
  #tbl_servicetype{
    width:100% !important;
  }
    .th_service1{
        width:80px;
    }
    .th_service2{
        width:300px;
    }
    /* .th_service3{
    } */
    .th_service4{
        width:180px;
    }
    .th_service5{
        width:120px;
    }

    .serIconEdit{
        font-size:22px;
        color:#e6ba0c;
        transition:transform .2s;
    }
    .serIconEdit:hover{
        transform:scale(1.2);
        cursor:pointer;
    }
    .serIconDel{
        font-size:22px;
        color:#FF0000;
        transition:transform .2s;
    }
    .serIconDel:hover{
        transform:scale(1.2);
        cursor: pointer;
    }
</style>