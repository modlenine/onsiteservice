<template>
  <div id="home">

      <div class="main-container">
          <div class="pd-ltr-20">
          
              <div class="row">
                <div class="col-xl-12 mb-30">
                  <div class="card-box height-100-p pd-20">
                    <div class="mt-5"></div>
                      <h3 style="text-align:center;">หน้าแรก</h3>
                      <hr>
                      <div>
                        <h4 style="text-align:center;">อยู่ระหว่างปรับปรุงข้อมูล</h4>
                      </div>
                      <hr>

                    <Graph1/>
                    
                  </div>
                </div>
              </div>

          </div>
      </div>
  </div>
</template>

<script>
import Graph1 from '@/components/Graph1.vue';

export default {
  name:"Home",
  components:{
    Graph1
  },
  data() {
    return {
      
    }
  },
  mounted() {

  },

  }
</script>

<style scoped>
.highcharts-figure,
.highcharts-data-table table {
  min-width: 310px;
  max-width: 800px;
  margin: 1em auto;
}

#container {
  height: 400px;
}

.highcharts-data-table table {
  font-family: Verdana, sans-serif;
  border-collapse: collapse;
  border: 1px solid #ebebeb;
  margin: 10px auto;
  text-align: center;
  width: 100%;
  max-width: 500px;
}

.highcharts-data-table caption {
  padding: 1em 0;
  font-size: 1.2em;
  color: #555;
}

.highcharts-data-table th {
  font-weight: 600;
  padding: 0.5em;
}

.highcharts-data-table td,
.highcharts-data-table th,
.highcharts-data-table caption {
  padding: 0.5em;
}

.highcharts-data-table thead tr,
.highcharts-data-table tr:nth-child(even) {
  background: #f8f8f8;
}

.highcharts-data-table tr:hover {
  background: #f1f7ff;
}
</style>