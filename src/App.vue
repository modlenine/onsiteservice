<template>
  <div id="app">
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
      userData:this.getSessionStorage(),
    }
  },
  created() {
    this.getSessionStorage();
  },
  mounted() {
    
  },
  methods: {
    getSessionStorage(){
      const getUserData = localStorage.getItem("userData");
      return JSON.parse(getUserData);
    }
  },
}
</script>

<style>

</style>