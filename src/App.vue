<template>
  <div id="app">
    <!-- แสดงข้อความกำลังตรวจสอบ -->
    <div v-if="isChecking" style="display: flex; justify-content: center; align-items: center; height: 100vh;">
      <div style="text-align: center;">
        <h3>กำลังตรวจสอบข้อมูลผู้ใช้...</h3>
        <p>โปรดรอสักครู่</p>
      </div>
    </div>

    <!-- แสดงเมื่อตรวจสอบเสร็จแล้ว -->
    <div v-else>
      <div v-if="userData !== null">
        <div v-if="userData.DeptCode == 1002">
          <Header
            :userDataProps="this.userData"
          />
            <router-view></router-view>
        </div>
        <div v-else>
          <Loginpage
            :accessData="false"
            :userDataProps="this.userData"
          />
        </div>
      </div>

      <div v-else>
        <Loginpage/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Loginpage from '@/views/Loginpage.vue';

export default {
  name:"App",
  components:{
    Header,
    Loginpage
  },
  data() {
    return {
      userData: null,
      isChecking: true
    }
  },
  async created() {
    await this.checkSessionOnStartup();
  },
  mounted() {
    
  },
  methods: {
    async checkSessionOnStartup() {
      try {
        // ตรวจสอบ session จาก backend ก่อน
        if (this.$store) {
          const result = await this.$store.dispatch('checkSessionFromBackend');
          
          if (result.success) {
            // มี session จาก backend
            this.userData = result.userData;
            console.log('Session found from backend:', this.userData);
          } else {
            // ไม่มี session จาก backend, ลองอ่านจาก localStorage
            const localData = this.getSessionStorage();
            
            if (localData) {
              // ตรวจสอบว่า session หมดอายุหรือยัง
              const now = Math.floor(Date.now() / 1000);
              if (localData.loginexpire && now < localData.loginexpire) {
                this.userData = localData;
                console.log('Using localStorage session');
              } else {
                // Session หมดอายุ
                localStorage.removeItem('userData');
                this.userData = null;
                console.log('Session expired');
                
                // Redirect to intranet ใน production พร้อม return_url
                if (process.env.NODE_ENV === 'production') {
                  const returnUrl = encodeURIComponent('/intsys/onsiteservice/');
                  window.location.href = `/intranet/login?return_url=${returnUrl}`;
                  return;
                }
              }
            } else {
              this.userData = null;
            }
          }
        } else {
          // ถ้าไม่มี store ให้ใช้แบบเดิม
          this.userData = this.getSessionStorage();
        }
      } catch (error) {
        console.error('Error checking session:', error);
        this.userData = this.getSessionStorage();
      } finally {
        this.isChecking = false;
      }
    },
    getSessionStorage(){
      const getUserData = localStorage.getItem("userData");
      return getUserData ? JSON.parse(getUserData) : null;
    }
  },
}
</script>

<style>

</style>