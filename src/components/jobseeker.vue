<template>
  <div>
    <div id="home-jobseeker" class="mt-5">
      <div>
        <div class="row">
          <div class="col-sm-6 mt-3" v-for="job in jobs">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">{{ job.title }}</h4>
                <h6 class="card-text">
                  {{ job.companyname }}
                </h6>
                <p class="mb-0">City : {{ job.city }}</p>
                <p class="mb-0">Expected Salary : {{ job.expectedsalary }}</p>
                <p>Vacancy : {{ job.vacancy }}</p>
                <router-link
                  :to="{ path: '/job/' + job.id }"
                  class="btn btn-primary"
                  >See details</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import header from "./header";
export default {
  props: ["selected"],
  components: { "app-header": header },
  data() {
    return {
      jobs: []
    };
  },
  created() {
    this.getAllJobs();
  },
  methods: {
    selection: function(selected) {
      this.selected = selected;
    },
    getAllJobs: function() {
      fetch("http://localhost:3000/api/getalljobs", {
        method: "get",
        headers: {
          Accept: "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          this.jobs = data.data;
        });
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap");

#home-jobseeker {
  margin: 0 auto;
  max-width: 1200px;
}
</style>
