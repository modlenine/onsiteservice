<template>
  <div id="list">

    <div class="main-container">
      <div class="pd-ltr-20">
      
          <div class="row">
            <div class="col-xl-12 mb-30">
              <div class="card-box height-100-p pd-20">
                <div class="mt-5"></div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <router-link to="/addData" type="button" id="btn-addMachineData" class="btn btn-primary btnIndex">
                      <i class="fi-plus mr-2"></i>เพิ่มข้อมูล</router-link>
                  </div>
                </div>
                <hr>
                  <FilterData/>
                <div class="mt-4"></div>
                <h3 style="text-align:center;" class="mb-3">รายการแจ้งซ่อม</h3>
               
                  <table id="dataMainList" class="table table-striped table-bordered" cellspacing="0">
                    <thead>
                      <tr>
                        <th class="td1">เลขที่รายการ</th>
                        <th class="td2">ประเภทงาน</th>
                        <th class="td3">อุปกรณ์</th>
                        <th class="td4">ผู้แจ้ง</th>
                        <th class="td5">แผนก</th>
                        <th class="td6">วันที่แจ้ง</th>
                        <th class="td7">ผู้ดำเนินการ</th>
                        <th class="td8">วันที่เสร็จ</th>
                        <th class="td9">ระยะเวลาแก้ไข</th>
                        <th class="td10">สถานะ</th>
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
import FilterData from '@/components/FilterData.vue';




export default {
  name:'List',
  components:{
    FilterData
  },
  data(){
    return{
      url:this.getUrl(),
    }
  },

  created() {
    
  },
  mounted() {
    this.loadonsiteList();
    this.loadFilterOnSessionStorage();

    const proxy = this;

    $(document).on('click' , '.onsite_formno' , function(){
      const onsite_formno = $(this).attr("data_formno");

      // proxy.$router.push('/viewdata/'+onsite_formno);

       const path = `/viewdata/${onsite_formno}`;
        if (proxy.$route.path !== path) proxy.$router.push(path)
    });



    $(document).on('click' , '#btn-dateSearch' , function(){

      let startDate_filter = $('#startDate').val();
			let endDate_filter = $('#endDate').val();
			let workType_filter = $('#filterBy-worktype').val();
			let dept_filter = $('#filterBy-dept').val();
			let userProgress_filter = $('#filterBy-userProgress').val();
			let status_filter = $('#filterBy-status').val();

			let filterObject = {
				"startDate_filter":startDate_filter,
				"endDate_filter":endDate_filter,
				"workType_filter":workType_filter,
				"dept_filter":dept_filter,
				"userProgress_filter":userProgress_filter,
				"status_filter":status_filter
			};

			//create session storage
			localStorage.setItem('filterObject' , JSON.stringify(filterObject));

			let table = $('#dataMainList').DataTable();
			table.state.clear();

			proxy.loadonsiteList();
		});

    $('#btn-dateClear').click(function(){
			localStorage.removeItem("filterObject");
			// let table = $('#dataMainList').DataTable();
			// table.state.clear();

      	$('#startDate').val('');
				$('#endDate').val('');
				$('#filterBy-worktype').val('');
				$('#filterBy-dept').val('');
				$('#filterBy-userProgress').val('');
				$('#filterBy-status').val('');

			proxy.loadonsiteList();
		});

  },
  methods: {
    loadonsiteList()
    {

      let startDate_filter = $('#startDate').val();
			let endDate_filter = $('#endDate').val();
			let workType_filter = $('#filterBy-worktype').val();
			let dept_filter = $('#filterBy-dept').val();
			let userProgress_filter = $('#filterBy-userProgress').val();
			let status_filter = $('#filterBy-status').val();


			if(startDate_filter == "" || startDate_filter == null){
				startDate_filter = "0";
			}

			if(endDate_filter == "" || endDate_filter == null){
				endDate_filter = "0";
			}

			if(workType_filter == "" || workType_filter == null){
				workType_filter = "0";
			}

			if(userProgress_filter == "" || userProgress_filter == null){
				userProgress_filter = "0";
			}

			if(dept_filter == "" || dept_filter == null){
				dept_filter = "0";
			}

			if(status_filter == "" || status_filter == null){
				status_filter = "0";
			}else{
				status_filter = status_filter.replace(/\s+/g,"-");
			}

			console.log(startDate_filter+"/"+endDate_filter+"/"+workType_filter+"/"+userProgress_filter+"/"+dept_filter+"/"+status_filter);

        let thid = 1;
        $('#dataMainList thead th').each(function() {
          var title = $(this).text();
          $(this).html(title + ' <input type="text" id="dataMainList'+thid+'" class="col-search-input" placeholder="Search ' + title + '" />');
          thid++;
        });

        	$('#dataMainList').DataTable().destroy();
            var table = $('#dataMainList').DataTable({
                        "scrollX": true,
                        "processing": true,
                        "serverSide": true,
                        "stateSave": true,
                        stateLoadParams: function(settings, data) {
                            for (let i = 0; i < data.columns["length"]; i++) {
                                let col_search_val = data.columns[i].search.search;
                                if (col_search_val !== "") {
                                    $("input", $("#dataMainList thead th")[i]).val(col_search_val);
                                }
                            }
                        },
                        "ajax": {
                            "url":this.url+'intsys/onsiteservice/onsite_backend/api/api_loadOnsiteList/'+startDate_filter+'/'+endDate_filter+'/'+workType_filter+'/'+dept_filter+'/'+userProgress_filter+'/'+status_filter,
                        },
                        dom: 'Bfrtip',
                          "buttons": [{
                            extend: 'copyHtml5',
                            title: 'รายงานการ Service'
                          },
                          {
                            extend: 'excelHtml5',
                            autoFilter: true,
                            title: 'รายงานการ Service'
                          }
                          ],
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
    loadFilterOnSessionStorage()
		{
			let getfilterObject = localStorage.getItem("filterObject");
			console.log(JSON.parse(getfilterObject));

			if(getfilterObject != null){
				let startDate_filter = JSON.parse(getfilterObject).startDate_filter;
				let endDate_filter = JSON.parse(getfilterObject).endDate_filter;
				let workType_filter = JSON.parse(getfilterObject).workType_filter;
				let dept_filter = JSON.parse(getfilterObject).dept_filter;
				let userProgress_filter = JSON.parse(getfilterObject).userProgress_filter;
				let status_filter = JSON.parse(getfilterObject).status_filter;

				$('#startDate').val(startDate_filter);
				$('#endDate').val(endDate_filter);
				$('#filterBy-worktype').val(workType_filter);
				$('#filterBy-dept').val(dept_filter);
				$('#filterBy-userProgress').val(userProgress_filter);
				$('#filterBy-status').val(status_filter);
			}

			// this.loadonsiteList();
		},
    getUrl(){
        if(typeof window !== "undefined"){
            return window.location.protocol+"//"+window.location.hostname+"/";
        }
    },
    

  },
  
}
</script>

<style scoped>

  #dataMainList{
    width:1500px !important;
  }

  .td1{
    width:100px !important;
  }

  .td2{
    width:250px !important;
  }


@media (min-width:1024px) and (max-width:1439px){
	#dataMainList{
    width:1500px !important;
  }

  .td1{
    width:100px !important;
  }

  .td2{
    width:250px !important;
  }

}

@media (min-width:768px) and (max-width:1023px){
	#dataMainList{
    width:1500px !important;
  }

  .td1{
    width:100px !important;
  }

  .td2{
    width:250px !important;
  }

}

@media (min-width:320px) and (max-width:767px) {
	#dataMainList{
    width:1500px !important;
  }

}
</style>