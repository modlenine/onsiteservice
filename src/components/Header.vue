<template>
    <div>
        <div>
            <div class="header">
                <div class="header-left">
                    <div class="menu-icon dw dw-menu"></div>
                </div>
                <div class="header-right">
                    <div class="user-notification">
                        <div class="dropdown">
                            <a class="dropdown-toggle no-arrow" href="#" role="button" data-toggle="dropdown">
                                <i class="icon-copy dw dw-notification"></i>
                                <div id="notify-section" style="display:none;">
                                    <span class="badge notification-active"></span>
                                    <div class="d-flex align-items-center justify-content-center countNotify">
                                        <span class="countNotifyText">0</span>
                                    </div>
                                </div>
                            </a>

                            <div class="dropdown-menu dropdown-menu-right">
                                <div class="notification-list mx-h-350 customscroll">
                                    <div id="show_notifyData"></div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="user-info-dropdown">
                        <div class="dropdown">
                            <a class="dropdown-toggle" href="#" role="button" data-toggle="dropdown">
                                <span class="user-icon">
                                    <img :src="userImage" alt="">
                                </span>
                                <span class="user-name">{{userFullname}}</span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
                                <a class="dropdown-item" id="logoutBtn" href="#"><i class="dw dw-logout"></i> Log Out</a>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div class="left-side-bar">
                <div class="brand-logo">
                    <a href="#">
                        <!-- <img src="#" alt="" class="dark-logo">
                        <img src="#" alt="" class="light-logo"> -->
                        <span style="font-size:28px;color:#ef476f;"><b>Onsite Service</b></span>
                    </a>
                    <div class="close-sidebar" data-toggle="left-sidebar-close">
                        <i class="ion-close-round"></i>
                    </div>
                </div>
                <div class="menu-block customscroll">
                    <div class="sidebar-menu">
                        <ul id="accordion-menu">
                            <li class="dropdown">
                                <!-- <a href="#" class="dropdown-toggle no-arrow">
                                    <span class="micon dw dw-city-hall hicon"></span><span class="mtext">หน้าหลัก</span>
                                </a> -->
                                <router-link to='/' class="dropdown-toggle no-arrow menu">
                                    <span class="micon dw dw-analytics-3 wdfI1"></span><span class="mtext">หน้าหลัก</span>
                                </router-link>
                            </li>
                    
                    
                            <li>
                                <router-link to='/list' class="dropdown-toggle no-arrow menu">
                                    <span class="micon dw dw-invoice-1 wdfI1"></span><span class="mtext">รายการแจ้งซ่อม</span>
                                </router-link>
                            </li>

                            <li>
                                <router-link to='/report' class="dropdown-toggle no-arrow menu">
                                    <span class="micon dw dw-outbox wdfI1"></span><span class="mtext">รายงาน</span>
                                </router-link>
                            </li>


                            <li>
                                <div class="dropdown-divider"></div>
                            </li>
                            <li>
                                <div class="sidebar-small-cap mtext">ตั้งค่า</div>
                            </li>
                            <li v-if="userDataProps.ecode == 'M1809' ">
                                <router-link to='/serviceType' class="dropdown-toggle no-arrow">
                                    <span class="micon dw dw-add-file1 wdfI1"></span><span class="mtext">เพิ่มหัวข้อการบริการ</span>
                                </router-link>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
            <div class="mobile-menu-overlay"></div>
        </div>
    </div>

</template>

<script>
import $ from 'jquery';
export default {
    name:'Header',
    props:[
        'userDataProps'
    ],
    data() {
        return {
            url:this.getUrl(),
            baseurl:this.baseUrl(),
            userImage:'',
            userFullname:'',
            resultUserData:[]
        }
    },
    created() {
        this.resultUserData = this.userDataProps;
    },
    mounted() {
        const proxy = this;
        this.getUserData();
        console.log(this.resultUserData);
        console.log('Public path'+process.env.NODE_ENV);
        $('#logoutBtn').click(function(){
            localStorage.removeItem('userData');
            location.href = proxy.baseurl;
        });

        $(document).on('click' , '.header-left' , function(){
            $('.left-side-bar').addClass('open');
            $('.mobile-menu-overlay').addClass('show');
        });

        $(document).on('click' , '.close-sidebar' , function(){
            $('.left-side-bar').removeClass('open');
            $('.mobile-menu-overlay').removeClass('show');
        });

        $(document).on('click' , '.menu' , function(){
            $('.left-side-bar').removeClass('open');
            $('.mobile-menu-overlay').removeClass('show');
        });
    },
    methods: {
        getUrl(){
            if(typeof window !== "undefined"){
                return window.location.protocol+"//"+window.location.hostname+"/";
            }
        },
        getUserData(){
            if(this.userDataProps != null){
                this.userImage = 'https://intranet.saleecolour.com/intsys/usermanagement/uploads/'+this.resultUserData.file_img;
                this.userFullname = this.resultUserData.Fname+' '+this.resultUserData.Lname;
            }

        },
        baseUrl(){
            switch (process.env.NODE_ENV) {
                case 'production': return '/intsys/onsiteservice/'
                case 'development': return '/'
                default: return ''
            }
        }

    },
}
</script>

<style>

</style>