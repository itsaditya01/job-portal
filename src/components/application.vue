<template>
  <div>
    <app-header></app-header>
    <div id="home-jobseeker" class="mt-5">
      <div>
        <h3>{{ job.title }}</h3>
        <h6>Vacancy : {{ job.vacancy }}</h6>
        <div class="row">
          <div v-if="len === 0" class="center-div">
            No applications found
          </div>
          <div
            class="col-sm-6 mt-3"
            v-for="js in jobseekers"
            v-else-if="len > 0"
          >
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <h4 class="card-title">{{ js.name }}</h4>
                  <div v-if="js.status === 'pending'">
                    <button
                      @click="changestatus(js.id, 'hired')"
                      class="btn btn-primary"
                    >
                      Hire
                    </button>
                    <button
                      @click="changestatus(js.id, 'rejected')"
                      class="btn btn-danger"
                    >
                      Reject
                    </button>
                  </div>
                  <div v-else-if="js.status === 'hired'">
                    <h6 class="bg-green">Hired</h6>
                  </div>
                  <div v-else-if="js.status === 'rejected'">
                    <h6 class="bg-red">Rejected</h6>
                  </div>
                </div>
                <h6 class="card-text">
                  {{ js.workstatus }}
                </h6>
                <p class="mb-0">Email : {{ js.email }}</p>
                <p class="mb-0">Mobile No. : {{ js.mobileno }}</p>
                <p>Resume link : {{ js.resume }}</p>
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
  components: { "app-header": header },
  data() {
    return {
      jobTitle: "Job Title",
      jobseekers: [],
      err: "",
      job: {},
      len: 0
    };
  },
  created() {
    this.getJob();
    this.getApplications();
  },
  beforeUpdate() {
    this.getJob();
    this.getApplications();
  },
  methods: {
    getApplications: function() {
      this.$http
        .post(
          "http://localhost:3000/api/getapplications/employer",
          { jobid: this.$route.params.id },
          {
            headers: { token: localStorage.getItem("token") }
          }
        )
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            this.jobseekers = data.data;
            this.len = data.data.length;
          } else {
            this.err = data.message;
          }
        });
    },
    getJob: function() {
      this.$http
        .post("http://localhost:3000/api/getjob", { id: this.$route.params.id })
        .then(response => response.json())
        .then(data => {
          this.job = data.data;
        });
    },
    changestatus: function(id, status) {
      this.$http
        .post("http://localhost:3000/api/changestatus", {
          jobid: this.$route.params.id,
          id,
          status
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.job = data.data;
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

.center-div {
  height: 60vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bg-green {
  background-color: green;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
}

.bg-red {
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
}
</style>
