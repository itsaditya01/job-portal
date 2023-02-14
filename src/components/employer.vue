<template>
  <div>
    <!-- <app-header></app-header> -->
    <div id="home-employer" class="">
      <div v-if="selected === 'addjob'">
        <form>
          <div
            class="divider d-flex align-items-center justify-content-center my-4"
          >
            <h1 class="text-center fw-bold mx-3 mb-0">Post job</h1>
          </div>

          <!-- Title input -->
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="floatingInput1"
              placeholder="name"
              v-model="job.title"
              required
            />
            <label for="floatingInput">Title</label>
          </div>

          <!-- Description input -->
          <div class="form-floating mb-3">
            <textarea
              type="text"
              class="form-control"
              id="floatingInput2"
              placeholder="name@example.com"
              v-model="job.description"
              required
            ></textarea>
            <label for="floatingInput">Job Description</label>
          </div>

          <!-- Responsibility input -->
          <div class="form-floating mb-3">
            <textarea
              type="text"
              class="form-control"
              id="floatingInput4"
              placeholder="name@example.com"
              v-model="job.responsibility"
              required
            ></textarea>
            <label for="floatingInput">Responsibility</label>
          </div>

          <!-- Vacancy input -->
          <div class="form-floating mb-3">
            <input
              type="number"
              class="form-control"
              id="floatingInput3"
              placeholder="name@example.com"
              v-model="job.vacancy"
              required
            />
            <label for="floatingInput">Vacancy</label>
          </div>

          <!-- Location input -->
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="floatingInput5"
              placeholder="name"
              v-model="job.city"
              required
            />
            <label for="floatingInput5">Location</label>
          </div>

          <!-- Salary input -->
          <div class="form-floating mb-3">
            <input
              type="number"
              class="form-control"
              id="floatingInput5"
              placeholder="name"
              v-model="job.expectedsalary"
              required
            />
            <label for="floatingInput5">Expected Salary in thousand</label>
          </div>

          <!-- lastdatetoapply input -->
          <div class="form-floating mb-3">
            <input
              type="date"
              class="form-control"
              id="floatingInput5"
              placeholder="name"
              v-model="job.lastdatetoapply"
              required
            />
            <label for="floatingInput5">Last Date to Apply</label>
          </div>

          <div class="d-flex justify-content-between align-items-center"></div>

          <div class="text-center text-lg-start mt-2 pt-1">
            <button
              type="submit"
              class="btn btn-primary btn-lg mb-1"
              style="padding-left: 2.5rem; padding-right: 2.5rem;"
            >
              Post
            </button>
          </div>
        </form>
      </div>
      <div v-else-if="selected === 'joblist'">
        <div class="row mt-5">
          <div class="col-sm-6 mt-3" v-for="job in jobs">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">{{ job.title }}</h4>
                <p class="mb-0">City : {{ job.city }}</p>
                <p class="mb-0">Expected Salary : {{ job.expectedsalary }}</p>
                <p>Vacancy : {{ job.vacancy }}</p>
                <router-link
                  :to="{ path: '/application/' + job.id }"
                  class="btn btn-primary"
                  >View Applications</router-link
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
      jobs: [],
      job: {
        title: "",
        description: "",
        vacancy: null,
        responsibility: "",
        city: "",
        expectedsalary: null,
        jobpostdate: "",
        lastdatetoapply: ""
      },
      applicationView: false
    };
  },
  created() {
    this.getJobs();
    console.log(this.selected);
  },
  methods: {
    selection: function(selected) {
      this.selected = selected;
    },
    getJobs: function() {
      fetch("http://localhost:3000/api/getjobs", {
        method: "get",
        headers: {
          Accept: "application/json",
          token: localStorage.getItem("token")
        }
      })
        .then(response => response.json())
        .then(data => {
          this.jobs = data.data;
        });
    },
    postJob: function() {
      this.job.jobpostdate = Date.now();
      this.$http
        .post("http://localhost:3000/api/postjob", job, {
          headers: {
            token: localStorage.getItem("token")
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

#home-employer {
  margin: 0 auto;
  max-width: 1200px;
}
</style>
