<template>
  <div id="graph1">
    <div id="menu_graph1" class="row mb-2">
        <div class="col-lg-6">
            <select name="ip-selectYear" id="ip-selectYear" class="form-control"></select>
        </div>
    </div>
    <div id="menu_graph2" class="row mb-2" style="display:none;">
        <div class="col-lg-12">
            <button class="btn btn-primary" id="btn-graph2Back">ย้อนกลับ</button>
        </div>
    </div>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <div id="container2"></div>
        <p class="highcharts-description">
            ทดสอบแสดงข้อมูล การแจ้งซ่อม
        </p>
    </figure>

  </div>
</template>

<script>
import Highcharts from 'highcharts';
import axios from 'axios';
import $ from 'jquery';

export default {
    name:"Graph1",
    data() {
        return {
            url:this.getUrl(),
        }
    },
    created() {

    },
    beforeMount() {
        this.getYearList();
        
    },
    mounted() {
        const proxy = this;

        
        $('#btn-graph2Back').click(function(){
            proxy.getDataForGraph1($('#ip-selectYear').val());
            $('#container2').html('');
            $('#menu_graph2').css('display' , 'none');
        });

        $('#ip-selectYear').on('change' , function(){
            console.log($(this).val());
            proxy.getDataForGraph1($(this).val());
        })
    },
    methods: {
        getDataForGraph1(selectYear)
        {
            const proxy = this;
            axios.post(this.url+'intsys/onsite_backend/api/api_getGraph1/',{
                action:"getDataForGraph1",
                selectYear:selectYear
            }).then(res=>{
                // console.log(res.data);

                if(res.data.status == "Select Data Success"){
                    let yearResult = res.data.result;
                    let monthNumber = 13;
                    let countOnsite_array = [];
                    // console.log(yearResult);
                    let dataCount = 0;
                    for(let i = 1; i < monthNumber; i++){
                        
                        for(let ii = 0; ii < yearResult.length; ii++){
                            
                            // if(yearResult[ii].onsite_conmonth == i){
                            //     dataCount = yearResult[ii].count_by_month;
                            // }else{
                            //     dataCount = 0;
                            // }
                            if(i == yearResult[ii].onsite_conmonth){
                                dataCount = yearResult[ii].count_by_month;
                            }else if(i > yearResult[ii].onsite_conmonth){
                                dataCount = 0;
                            }

                        }



                        countOnsite_array.push(parseFloat(dataCount));
                    }

                    console.log(countOnsite_array);
                    console.log(yearResult);

                    proxy.getGraph1(countOnsite_array , selectYear);
                }
            });
            
        },
        getDataForGraph2ByCat(selectMonth , selectYear , month)
        {
            const proxy = this;
            axios.post(this.url+'intsys/onsite_backend/api/api_getGraph2_bycat/',{
                action:"getDataForGraph2bycat",
                selectMonth:selectMonth,
                selectYear:selectYear
            }).then(res=>{
                // console.log(res.data);

                if(res.data.status == "Select Data Success"){

                    let monthByCatResult = res.data.result;
                    let monthByUserResult = res.data.result2;

                    let onsiteJobCat_bymonth = [];
                    let onsiteJobCatCount_bymonth = [];

                    let onsiteUser_bymonth = [];
                    let onsiteUserCount_bymonth = [];

                    for(let i = 0; i < monthByCatResult.length; i++){
                        onsiteJobCat_bymonth.push(monthByCatResult[i].onsite_job_cat);
                        onsiteJobCatCount_bymonth.push(parseFloat(monthByCatResult[i].count));
                    }

                    for(let i = 0; i < monthByUserResult.length; i++){
                        onsiteUser_bymonth.push(monthByUserResult[i].onsite_user_inform);
                        onsiteUserCount_bymonth.push(parseFloat(monthByUserResult[i].count));
                    }
                    console.log(onsiteJobCat_bymonth);
                    console.log(onsiteJobCatCount_bymonth);
                    proxy.getGraph2MonthByCat(onsiteJobCat_bymonth , onsiteJobCatCount_bymonth , month);
                    proxy.getGraph2MonthByUser(onsiteUser_bymonth , onsiteUserCount_bymonth , month);
                }
            });
            
        },
        getGraph1(countOnsite_array , selectYear)
        {
            const proxy = this;
            Highcharts.setOptions({
                lang: {
                    thousandsSep: ','
                }
            });

            Highcharts.chart('container', 
            {

                chart: {
                    type: 'column'
                },
                title: {
                    text: 'กราฟแสดงจำนวนงาน Service ในแต่ละเดือน'
                },

                subtitle: {
                    text: 'ข้อมูลงานประจำเดือน'
                },

                yAxis: {
                    title: {
                        text: 'จำนวน (งาน)'
                    }
                },

                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },

                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

                plotOptions: {
                    series: {
                        point: {
                            events: {
                                click: function() {
                                    let month = proxy.conMonthName(this.category);
                                    // var linkchart = '#';
                                    // let datestarts = $('#datestart').val();
                                    // let dateends = $('#dateend').val();

                                    $('#menu_graph2').css('display' , '');
                                    

                                    console.log(month);
                                    proxy.getDataForGraph2ByCat(month , selectYear , this.category);

                                }
                            }
                        },
                        dataLabels: {
                            align: 'left',
                            enabled: true,
                            format: '<span style="font-size:9px;">{point.y:,.0f}</span>',
                            rotation: 330,
                        },
                        pointStart: 0
                    }
                },

                tooltip: {
                    headerFormat: '<span style="font-size:10px">{series.name}</span><br>',
                    pointFormat: '<span style="font-size:10px;color:{point.color}">{point.category}</span>: <b>{point.y:,.0f}</b> งาน.<br/>'
                },

                series: [{
                    name: 'Service ประจำเดือน',
                    data: countOnsite_array
                }],

                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                                // horizontal
                            }
                        }
                    }]
                }

            });
        },
        getGraph2MonthByCat(onsiteJobCat_bymonth , onsiteJobCatCount_bymonth , selectMonth)
        {
            Highcharts.setOptions({
                lang: {
                    thousandsSep: ','
                }
            });

            Highcharts.chart('container', 
            {

                chart: {
                    type: 'column'
                },
                title: {
                    text: 'กราฟแสดงจำนวนงาน Service ของเดือน '+selectMonth
                },

                subtitle: {
                    text: 'ข้อมูลงานประจำเดือน'
                },

                yAxis: {
                    title: {
                        text: 'จำนวน (งาน)'
                    }
                },

                xAxis: {
                    categories: onsiteJobCat_bymonth
                },

                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

                plotOptions: {
                    series: {
                        point: {
                            events: {
                                click: function() {
                                    var linkchart = '#';
                                    // let datestarts = $('#datestart').val();
                                    // let dateends = $('#dateend').val();
                                    console.log(linkchart);
                                }
                            }
                        },
                        dataLabels: {
                            align: 'left',
                            enabled: true,
                            format: '<span style="font-size:9px;">{point.y:,.0f}</span>',
                            rotation: 330,
                        },
                        pointStart: 0
                    }
                },

                tooltip: {
                    headerFormat: '<span style="font-size:10px">{series.name}</span><br>',
                    pointFormat: '<span style="font-size:10px;color:{point.color}">{point.category}</span>: <b>{point.y:,.0f}</b> งาน.<br/>'
                },

                series: [{
                    name: 'Service ประจำเดือน',
                    data: onsiteJobCatCount_bymonth
                }],

                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                                // horizontal
                            }
                        }
                    }]
                }

            });
        },
        getGraph2MonthByUser(onsiteUser_bymonth , onsiteUserCount_bymonth , selectMonth)
        {
            Highcharts.setOptions({
                lang: {
                    thousandsSep: ','
                }
            });

            Highcharts.chart('container2', 
            {

                chart: {
                    type: 'column'
                },
                title: {
                    text: 'กราฟแสดงจำนวนงาน Service ของเดือน '+selectMonth
                },

                subtitle: {
                    text: 'ข้อมูลงานประจำเดือน'
                },

                yAxis: {
                    title: {
                        text: 'จำนวน (งาน)'
                    }
                },

                xAxis: {
                    categories: onsiteUser_bymonth
                },

                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

                plotOptions: {
                    series: {
                        point: {
                            events: {
                                click: function() {
                                    var linkchart = '#';
                                    // let datestarts = $('#datestart').val();
                                    // let dateends = $('#dateend').val();
                                    console.log(linkchart);
                                }
                            }
                        },
                        dataLabels: {
                            align: 'left',
                            enabled: true,
                            format: '<span style="font-size:9px;">{point.y:,.0f}</span>',
                            rotation: 330,
                        },
                        pointStart: 0
                    }
                },

                tooltip: {
                    headerFormat: '<span style="font-size:10px">{series.name}</span><br>',
                    pointFormat: '<span style="font-size:10px;color:{point.color}">{point.category}</span>: <b>{point.y:,.0f}</b> งาน.<br/>'
                },

                series: [{
                    name: 'Service ประจำเดือน',
                    data: onsiteUserCount_bymonth
                }],

                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                                // horizontal
                            }
                        }
                    }]
                }

            });
        },
        getGraph3()
        {
            Highcharts.chart('container', {
                chart: {
                    type: 'column',
                    events: {
                        drilldown: function (e) {
                            if (!e.seriesOptions) {

                                var chart = this,
                                    drilldowns = {
                                        Animals: {
                                            name: 'Animals',
                                            data: [
                                                ['Cows', 2],
                                                ['Sheep', 3]
                                            ]
                                        },
                                        Fruits: {
                                            name: 'Fruits',
                                            data: [
                                                ['Apples', 5],
                                                ['Oranges', 7],
                                                ['Bananas', 2]
                                            ]
                                        },
                                        Cars: {
                                            name: 'Cars',
                                            data: [
                                                ['Toyota', 1],
                                                ['Volkswagen', 2],
                                                ['Opel', 5]
                                            ]
                                        }
                                    },
                                    series = drilldowns[e.point.name];

                                // Show the loading label
                                chart.showLoading('Simulating Ajax ...');

                                setTimeout(function () {
                                    chart.hideLoading();
                                    chart.addSeriesAsDrilldown(e.point, series);
                                }, 1000);
                            }

                        }
                    }
                },
                title: {
                    text: 'Async drilldown'
                },
                xAxis: {
                    type: 'category'
                },

                legend: {
                    enabled: false
                },

                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true
                        }
                    }
                },

                series: [{
                    name: 'Things',
                    colorByPoint: true,
                    data: [{
                        name: 'Animals',
                        y: 5,
                        drilldown: true
                    }, {
                        name: 'Fruits',
                        y: 2,
                        drilldown: true
                    }, {
                        name: 'Cars',
                        y: 4,
                        drilldown: true
                    }]
                }],

                drilldown: {
                    series: []
                }
            });
        },
        getUrl(){
            if(typeof window !== "undefined"){
                return window.location.protocol+"//"+window.location.hostname+"/";
            }
        },
        conMonthName(monthName)
        {
            if(monthName != ""){
                let month = 0;
                switch(monthName){
                    case "Jan":
                        month = 1
                        break;
                    case "Feb":
                        month = 2
                        break;
                    case "Mar":
                        month = 3
                        break;
                    case "Apr":
                        month = 4
                        break;
                    case "May":
                        month = 5
                        break;
                    case "Jun":
                        month = 6
                        break;
                    case "Jul":
                        month = 7
                        break;
                    case "Aug":
                        month = 8
                        break;
                    case "Sep":
                        month = 9
                        break;
                    case "Oct":
                        month = 10
                        break;
                    case "Nov":
                        month = 11
                        break;
                    case "Dec":
                        month = 12
                        break;
                }

                return month;
            }
        },
        getYearList()
        {
            const proxy = this;
            axios.post(this.url+'intsys/onsite_backend/api/api_getYearList' , {
                action:"getYearList"
            }).then(res=>{
                console.log(res.data);
                if(res.data.status == "Select Data Success"){
                    let html = '<option value="">กรุณาเลือกปี</option>';
                    let resultYear = res.data.result;
                    let yearNow = res.data.yearNow;
                    for(let i = 0; i < resultYear.length; i++){
                        html += `
                        <option value="`+resultYear[i].onsite_y+`">`+resultYear[i].onsite_y+`</option>
                        `;
                    }

                    $('#ip-selectYear').html(html);

                    $('#ip-selectYear option[value="'+yearNow+'"]').prop('selected' , true);
                    proxy.getDataForGraph1(yearNow);
                }
            });
        }
    },
}
</script>

<style>

</style>