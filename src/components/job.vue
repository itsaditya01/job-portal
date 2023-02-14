<template>
  <div>
    <app-header></app-header>
    <div id="home-job" class="mt-5">
      <div>
        <div v-if="err !== ''">{{ this.err }}</div>
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2>{{ this.data.title }} at {{ this.data.companyname }}</h2>
          <div class="d-flex align-items-center">
            <button @click="applyJob" class="btn btn-warning">
              {{ this.text }}
            </button>
          </div>
        </div>
        <div v-if="status !== ''">
          <h5 class="mb-2" style="color: red">Status : {{ this.status }}</h5>
        </div>
        <p>{{ this.data.description }}</p>
        <p>vacancy : {{ this.data.vacancy }}</p>
        <p>location : {{ this.data.location }}</p>
        <p>Expected Salary : {{ this.data.expectedsalary }}k</p>
        <p>Last date to apply : {{ this.data.lastdatetoapply.slice(0, 10) }}</p>
        <p>Responsibility : {{ this.data.responsibility }}</p>
        <p>Job post date : {{ this.data.jobpostdate.slice(0, 10) }}</p>
        <br />
        <h5>Company details :</h5>
        <p>{{ this.data.companyname }} is located at {{ this.data.city }}.</p>
        <p>
          Contact us through our {{ this.data.designation }}
          {{ this.data.name }}.
        </p>
        <p>Name : {{ this.data.name }}</p>
        <p>Designtion : {{ this.data.designation }}</p>
        <p>Email : {{ this.data.email }}</p>
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
      data: {},
      text: "Apply",
      err: "",
      status: "",
      applied: false
    };
  },
  created() {
    this.getJob();
    this.getApplication();
  },
  beforeUpdate() {
    this.getJob();
    this.getApplication();
  },
  methods: {
    getJob: function() {
      this.$http
        .post("http://localhost:3000/api/getjob", { id: this.$route.params.id })
        .then(response => response.json())
        .then(data => {
          this.data = data.data;
        });
    },
    getApplication: function() {
      this.$http
        .post(
          "http://localhost:3000/api/getapplication",
          { jobid: this.$route.params.id },
          {
            headers: { token: localStorage.getItem("token") }
          }
        )
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            this.text = "Applied";
            this.applied = true;
            this.status = data.data;
          } else {
            this.err = data.message;
          }
        });
    },
    applyJob: function() {
      if (this.text === "Apply") {
        this.$http
          .post(
            "http://localhost:3000/api/applyjob",
            { jobid: this.$route.params.id },
            {
              headers: { token: localStorage.getItem("token") }
            }
          )
          .then(response => response.json())
          .then(data => {
            console.log(data);
            if (data.success) {
              this.text = "Applied";
              this.applied = true;
            } else {
              this.err = data.message;
            }
          });
      }
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap");

#home-job {
  margin: 0 auto;
  max-width: 1200px;
}
.btn {
  padding: 8px 18px;
}
.btn:hover {
  background-color: black;
  color: yellow;
  border: none;
}
.applied {
  background-color: grey;
  color: black;
}
</style>
