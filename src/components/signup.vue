<template>
  <div id="login-main">
    <section class="vh-100 d-flex">
      <div class="container-fluid h-custom">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md-8 col-lg-6 col-xl-4">
            <form
              v-on:submit.prevent="JobseekerSignup"
              v-if="role === 'jobseeker'"
            >
              <div
                class="divider d-flex align-items-center justify-content-center my-4"
              >
                <h1 class="text-center fw-bold mx-3 mb-0">Sign up</h1>
              </div>

              <!-- Name input -->
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput1"
                  placeholder="name"
                  v-model="jbs.name"
                  required
                />
                <label for="floatingInput">Name</label>
              </div>

              <!-- Email input -->
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput2"
                  placeholder="name@example.com"
                  v-model="jbs.email"
                  required
                />
                <label for="floatingInput">Email Address</label>
              </div>

              <!-- Password input -->
              <div class="form-floating mb-3">
                <input
                  type="password"
                  class="form-control"
                  id="floatingInput3"
                  placeholder="name@example.com"
                  v-model="jbs.password"
                  required
                />
                <label for="floatingInput">Password</label>
              </div>

              <!-- Mobile no. input -->
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput4"
                  placeholder="name@example.com"
                  v-model="jbs.mobileno"
                  required
                />
                <label for="floatingInput">Mobile No.</label>
              </div>

              <!-- Resume input -->
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput5"
                  placeholder="name"
                  v-model="jbs.resume"
                  required
                />
                <label for="floatingInput5">Resume link</label>
              </div>

              <!-- Work Status input -->
              <div
                class="d-flex align-items-center mb-3 mt-2"
                style="border: 1px solid #ced4da; border-radius: 5px; padding: 16px 13px;"
              >
                <div class="mb-2"></div>
                <div for="is_teacher" style="fontSize: 1rem">Work Status :</div>
                <div class="form-check form-check-inline ms-3 mb-0">
                  <input
                    class="form-check-input "
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="fresher"
                    style="transform: translateY(1px)"
                    v-model="jbs.workstatus"
                  />
                  <label class="form-check-label" for="inlineRadio1"
                    >Fresher</label
                  >
                </div>
                <div class="form-check form-check-inline mb-0">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="experienced"
                    style="transform: translateY(1px)"
                    v-model="jbs.workstatus"
                  />
                  <label class="form-check-label" for="inlineRadio2"
                    >Experienced</label
                  >
                </div>
              </div>

              <div
                class="d-flex justify-content-between align-items-center"
              ></div>

              <div class="text-center text-lg-start mt-2 pt-1">
                <button
                  type="submit"
                  class="btn btn-primary btn-lg mb-1"
                  style="padding-left: 2.5rem; padding-right: 2.5rem;"
                >
                  Sign Up
                </button>
                <p class="small fw-bold mt-2 pt-1 mb-0">
                  Already have an account?
                  <router-link
                    :to="{ path: '/login/' + role }"
                    class="link-success"
                    exact
                    >Login</router-link
                  >
                </p>
              </div>
            </form>
            <form
              v-on:submit.prevent="EmployerSignup"
              v-else-if="role === 'employer'"
            >
              <div
                class="divider d-flex align-items-center justify-content-center my-4"
              >
                <h1 class="text-center fw-bold mx-3 mb-0">Sign up</h1>
              </div>

              <!-- Name input -->
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput1"
                  placeholder="name"
                  v-model="emp.name"
                  required
                />
                <label for="floatingInput">Name</label>
              </div>

              <!-- Email input -->
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput2"
                  placeholder="name@example.com"
                  v-model="emp.email"
                  required
                />
                <label for="floatingInput">Email Address</label>
              </div>

              <!-- Password input -->
              <div class="form-floating mb-3">
                <input
                  type="password"
                  class="form-control"
                  id="floatingInput3"
                  placeholder="name@example.com"
                  v-model="emp.password"
                  required
                />
                <label for="floatingInput">Password</label>
              </div>

              <!-- Company name input -->
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput4"
                  placeholder="name@example.com"
                  v-model="emp.companyname"
                  required
                />
                <label for="floatingInput">Company Name</label>
              </div>

              <!-- DEsignation input -->
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput5"
                  placeholder="name"
                  v-model="emp.designation"
                  required
                />
                <label for="floatingInput">Designation</label>
              </div>

              <!-- City input -->
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput6"
                  placeholder="name"
                  v-model="emp.city"
                  required
                />
                <label for="floatingInput">City</label>
              </div>

              <div
                class="d-flex justify-content-between align-items-center"
              ></div>

              <div class="text-center text-lg-start mt-2 pt-1">
                <button
                  type="submit"
                  class="btn btn-primary btn-lg mb-1"
                  style="padding-left: 2.5rem; padding-right: 2.5rem;"
                >
                  Sign Up
                </button>
                <p class="small fw-bold mt-2 pt-1 mb-0">
                  Already have an account?
                  <router-link
                    :to="{ path: '/login/' + role }"
                    class="link-success"
                    exact
                    >Login</router-link
                  >
                </p>
              </div>
            </form>
          </div>
          <div class="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              class="img-fluid"
              alt="Sample image"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      emp: {
        name: "",
        password: "",
        email: "",
        companyname: "",
        designation: "",
        city: ""
      },
      jbs: {
        name: "",
        email: "",
        password: "",
        resume: "",
        mobileno: "",
        workstatus: ""
      },
      message: "",
      role: ""
    };
  },
  created() {
    this.role = this.$route.params.role;
  },
  methods: {
    JobseekerSignup: function() {
      this.$http
        .post("http://localhost:3000/auth/signup/jobseeker", this.jbs)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            localStorage.setItem("token", data.token);
            this.$router.push({ path: "/home/jobseeker" });
          } else {
            this.modal = true;
            this.message = data.message;
          }
        });
    },
    EmployerSignup: function() {
      this.$http
        .post("http://localhost:3000/auth/signup/employer", this.emp)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            localStorage.setItem("token", data.token);
            this.$router.push({ path: "/home/employer" });
          } else {
            this.modal = true;
            this.message = data.message;
          }
        });
    }
  }
};
</script>

<style scoped>
#login {
  width: 1000px;
  height: 100vh;
  margin: 0 auto;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
