<template>
  <div>
    <app-header
      :role="role"
      v-on:selection="changeSelected($event)"
    ></app-header>
    <div id="home" class="">
      <jobseeker v-if="role === 'jobseeker'" :selected="selected"></jobseeker>
      <employer v-else-if="role === 'employer'" :selected="selected"></employer>
    </div>
  </div>
</template>

<script>
import jobseeker from "./jobseeker.vue";
import employer from "./employer.vue";
import header from "./header.vue";
export default {
  components: {
    jobseeker: jobseeker,
    employer: employer,
    "app-header": header
  },
  data() {
    return {
      role: "",
      selected: "joblist"
    };
  },
  methods: {
    changeSelected: function(select) {
      this.selected = select;
    }
  },
  created() {
    this.role = this.$route.params.role;
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap");
</style>
