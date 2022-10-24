<template>

    <div id="loginpage">

		<div class="login-header box-shadow">
			<div class="container-fluid d-flex justify-content-between align-items-center">
				<div class="brand-logo">
					<a href="#">
						<!-- <img src="<?=base_url('assets/')?>vendors/images/deskapp-logo.svg" alt=""> -->
						<span style="color:gray;">Onsite Service Login</span>
					</a>
				</div>
				<div class="login-menu">
					
				</div>
			</div>
		</div>
		<div class="login-wrap d-flex align-items-center flex-wrap justify-content-center">
			<div class="container">
				<div class="row align-items-center">
					<!-- <div class="col-md-6 col-lg-7">
						<img src="<?=base_url('assets/')?>vendors/images/login-page-img.png" alt="">
					</div> -->
					<div class="col-md-12 col-lg-12">
						<div class="login-box bg-white box-shadow border-radius-10">
							<div class="login-title">
								<h2 class="text-center">ล็อกอินเข้าสู่ระบบ</h2>
							</div>
							<form id="frm_login" name="frm_login" @submit.prevent="submitLogin">
								
								<div class="input-group custom">
									<input type="text" id="username" name="username" class="form-control form-control-lg" placeholder="Username">
									<div class="input-group-append custom">
										<span class="input-group-text"><i class="icon-copy dw dw-user1"></i></span>
									</div>
								</div>
								<div class="input-group custom">
									<input type="password" id="password" name="password" class="form-control form-control-lg" placeholder="**********">
									<div class="input-group-append custom">
										<span class="input-group-text"><i class="dw dw-padlock1"></i></span>
									</div>
								</div>
								<div class="row pb-30">
									<div class="col-6">
										<div class="custom-control custom-checkbox">
											
										</div>
									</div>
									<div class="col-6">
										<div class="forgot-password"><a href="forgot-password.html">ลืมรหัสผ่าน</a></div>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-12">
										<div class="input-group mb-0">
											<button class="btn btn-primary btn-lg btn-block">เข้าสู่ระบบ</button>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- js -->

	</div>

</template>

<script>
import axios from "axios";
import $ from 'jquery';
import Swal from 'sweetalert2'

export default {
    name:'Loginpage',
	props:[
		'userDataProps',
		'accessData'
	],
	data() {
		return {
			url:this.getUrl(),
			baseurl:this.baseUrl()
		}
	},
	created() {
		
	},
	mounted() {
		// if(this.accessData == false){
		// 	Swal.fire({
		// 		title: 'ท่านไม่สามารถใช้งานโปรแกรมของแผนกไอทีได้',
		// 		icon: 'error',
		// 		showConfirmButton: false,
		// 		timer:1000
		// 	});
		// }
	},
    methods: {
        submitLogin(){
            const form = $('#frm_login')[0];
			const data = new FormData(form);
			const proxy = this;

			axios.post(this.url+'intsys/onsite_backend/api/checklogin' , data,{

			}).then(res=>{
				console.log(res.data);
				if(res.data.status == "Login Successfully"){

					let sessionData = res.data.session_data;


					let userData = {
						'Dept':sessionData.Dept,
						'DeptCode':sessionData.DeptCode,
						'Fname':sessionData.Fname,
						'Lname':sessionData.Lname,
						'ecode':sessionData.ecode,
						'file_img':sessionData.file_img,
						'memberemail':sessionData.memberemail,
						'posi':sessionData.posi,
						'username':sessionData.username,
						'datenow':res.data.datenow
					}

					localStorage.setItem('userData' , JSON.stringify(userData));

					Swal.fire({
						title: 'ลงชื่อเข้าใช้สำเร็จ',
						icon: 'success',
						showConfirmButton: false,
						timer:1000
					}).then(function(){
						location.href = proxy.baseurl;
					});
				}else if(res.data.status == "Login failed"){
					Swal.fire({
						title: 'ลงชื่อเข้าใช้ไม่สำเร็จ',
						icon: 'error',
						showConfirmButton: false,
						timer:1000
					}).then(function(){
						location.href = proxy.baseurl;
					});
				}else if(res.data.status == "Login failed please fill username and password"){
					Swal.fire({
						title: 'กรุณากรอก Username & Password',
						icon: 'error',
						showConfirmButton: false,
						timer:1000
					}).then(function(){
						location.href = proxy.baseurl;
					});
				}else if(res.data.status == "You can not access this program"){
					Swal.fire({
						title: 'คุณไม่สามารถเข้าใช้งานโปรแกรมนี้ได้',
						icon: 'error',
						showConfirmButton: false,
						timer:1000
					}).then(function(){
						location.href = proxy.baseurl;
					});
				}
			});
        },
		getUrl(){
            if(typeof window !== "undefined"){
                return window.location.protocol+"//"+window.location.hostname+"/";
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