<template>
  <div id="report1">

          <div class="main-container">
          <div class="pd-ltr-20">
          
              <div class="row">
                <div class="col-xl-12 mb-30">
                  <div class="card-box height-100-p pd-20">
                    <div class="mt-5"></div>
                      <h3 style="text-align:center;">หน้ารายงาน</h3>
                      <hr>

                      <div class="row mt-2">
                        <div class="col-lg-4"></div>
                        <div class="col-lg-4 form-group">
                          <label for=""><b>วันที่เริ่ม</b></label>
                          <input type="text" name="report-startDate" id="report-startDate" class="form-control">
                        </div>
                        <div class="col-lg-4"></div>
                      </div>

                      <div class="row mt-2">
                        <div class="col-lg-4"></div>
                        <div class="col-lg-4 form-group">
                          <label for=""><b>วันที่สิ้นสุด</b></label>
                          <input type="text" name="report-endDate" id="report-endDate" class="form-control">
                        </div>
                        <div class="col-lg-4"></div>
                      </div>

                      <div class="row mt-2">
                        <div class="col-lg-4"></div>
                        <div class="col-lg-4 form-group">
                          <button class="btn btn-block btn-success" id="btn-downloadReport">ดาวน์โหลดรายงาน</button>
                        </div>
                        <div class="col-lg-4"></div>
                      </div>
                    
                  </div>
                </div>
              </div>

          </div>
      </div>

  </div>
</template>

<script>
import $ from 'jquery';

export default {
    name:"Report1",
    data() {
        return {
          url:this.getUrl(),
        }
    },
    created() {
        
    },
    mounted() {
      const proxy = this;
        $('#report-startDate').Zebra_DatePicker({
            pair: $('#report-endDate')
        });
        $('#report-endDate').Zebra_DatePicker({
            direction: true
        });

        $('#btn-downloadReport').click(function(){
          let dateStart = $('#report-startDate').val();
          let dateEnd = $('#report-endDate').val();
          proxy.downloadReport(dateStart , dateEnd);
        });
    },
    methods: {
        downloadReport(dateStart , dateEnd)
        {
          if(dateStart != "" && dateEnd != ""){
            location.href = this.url+'intsys/onsiteservice/onsite_backend/exportdata/downloadReport/'+dateStart+'/'+dateEnd
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