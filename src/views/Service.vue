<template>
  <div id="service">
    <AddServiceTypeModal/>

      <div class="main-container">
          <div class="pd-ltr-20">
          
              <div class="row">
                <div class="col-xl-12 mb-30">
                  <div class="card-box height-100-p pd-20">
                    <div class="mt-5"></div>
                    <div class="row mb-3">
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
import AddServiceTypeModal from '@/components/AddServiceTypeModal.vue';

export default {
    name:"Service",
    components:{
        AddServiceTypeModal
    },
    data() {
        return {
            url:this.getUrl()
        }
    },
    created() {
        
    },
    mounted() {
        this.loadServiceList();
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
                                "url":this.url+'intsys/onsite_backend/api/loadServiceList/',
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

                

                // $('#normal_list6 , #normal_list2').prop('readonly' , true).css({
                //     'background-color':'#F5F5F5',
                //     'cursor':'no-drop'
                // });
        },
    },
}
</script>

<style scpted>
    .th_service1{
        width:80px;
    }
    .th_service2{
        width:600px;
    }
    /* .th_service3{
    } */
    .th_service4{
        width:180px;
    }
    .th_service5{
        width:120px;
    }
</style>