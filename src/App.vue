<template>
  <div id="app">
    <div v-if="userData !== null">
      <Header
        :userDataProps="this.userData"
      />
      <router-view></router-view>
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
      userData:null
    }
  },
  created() {
    this.getSessionStorage();
  },
  mounted() {
    
  },
  methods: {
    getSessionStorage(){
      this.userData = sessionStorage.getItem("userData");
      console.log(JSON.parse(this.userData));
    }
  },
}
</script>

<style>

</style>