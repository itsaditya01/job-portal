<template>
  <div id="login-main">
    <section class="vh-100 d-flex">
      <div class="container-fluid h-custom">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              class="img-fluid"
              alt="Sample image"
            />
          </div>
          <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form v-on:submit.prevent="Login">
              <div
                class="divider d-flex align-items-center justify-content-center my-4"
              >
                <h1 class="text-center fw-bold mx-3 mb-0">Login</h1>
              </div>

              <!-- Email input -->
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput1"
                  placeholder="name@example.com"
                  v-model="email"
                  required
                />
                <label for="floatingInput">Email address</label>
              </div>

              <!-- Password input -->
              <div class="form-floating mb-3">
                <input
                  type="password"
                  class="form-control"
                  id="floatingInput2"
                  placeholder="name@example.com"
                  v-model="password"
                  required
                />
                <label for="floatingInput">Password</label>
              </div>

              <div
                class="d-flex justify-content-between align-items-center"
                v-if="message === ''"
              >
                {{ this.message }}
              </div>

              <div class="text-center text-lg-start mt-2 pt-1">
                <button
                  type="submit"
                  class="btn btn-primary btn-lg mb-1"
                  style="padding-left: 2.5rem; padding-right: 2.5rem"
                >
                  Login
                </button>
                <p class="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?
                  <router-link
                    :to="{ path: '/signup/' + role }"
                    class="link-danger"
                    exact
                    >Register</router-link
                  >
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    <!-- Modal HTML -->
    <div id="myModal" class="" v-if="modal">
      <div id="inner-modal">
        <div class="modal-confirm">
          <div class="modal-content">
            <div class="modal-header justify-content-center">
              <div class="icon-box">
                <font-awesome-icon icon="fa-solid fa-xmark"></font-awesome-icon>
              </div>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
                @click="modal = false"
              >
                &times;
              </button>
            </div>
            <div class="modal-body text-center">
              <h4>Ooops!</h4>
              <p>{{ this.message }}</p>
              <button class="btn btn-success" @click="modal = false">
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      message: "",
      modal: false,
      role: ""
    };
  },
  created() {
    this.role = this.$route.params.role;
  },
  methods: {
    Login: function() {
      this.$http
        .post("http://localhost:3000/auth/login/" + this.role, {
          email: this.email,
          password: this.password
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            localStorage.setItem("token", data.token);
            if (this.role === "jobseeker") {
              this.$router.push({ path: "/home/jobseeker" });
            } else {
              this.$router.push({ path: "/home/employer" });
            }
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
#myModal {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  -webkit-backdrop-filter: blur(3px);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
}
#inner-modal {
  background: rgb(233 233 233 / 65%);
  backdrop-filter: saturate(180%) blur(10px);
}
body {
  font-family: "Varela Round", sans-serif;
}
.modal-confirm {
  color: #434e65;
  width: 525px;
}
.modal-confirm .modal-content {
  padding: 20px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
}
.modal-confirm .modal-header {
  background: #e85e6c;
  border-bottom: none;
  position: relative;
  text-align: center;
  margin: -20px -20px 0;
  border-radius: 5px 5px 0 0;
  padding: 35px;
}
.modal-confirm h4 {
  text-align: center;
  font-size: 36px;
  margin: 10px 0;
}
.modal-confirm .form-control,
.modal-confirm .btn {
  min-height: 40px;
  border-radius: 3px;
}
.modal-confirm .close {
  position: absolute;
  top: 4px;
  right: 12px;
  border: none;
  background: transparent;
  font-size: 30px;
  color: #fff;
  text-shadow: none;
  opacity: 0.5;
}
.modal-confirm .close:hover {
  opacity: 0.8;
}
.icon-box svg {
  font-size: 56px;
}
.modal-confirm .icon-box {
  color: #fff;
  width: 95px;
  height: 95px;
  display: inline-block;
  border-radius: 50%;
  z-index: 9;
  border: 5px solid #fff;
  padding: 15px;
  text-align: center;
}
.modal-confirm .icon-box i {
  font-size: 58px;
  margin: -2px 0 0 -2px;
}
.modal-confirm.modal-dialog {
  margin-top: 80px;
}
.modal-confirm .btn,
.modal-confirm .btn:active {
  color: #fff;
  border-radius: 4px;
  background: #eeb711 !important;
  text-decoration: none;
  transition: all 0.4s;
  line-height: normal;
  border-radius: 30px;
  margin-top: 10px;
  padding: 6px 20px;
  min-width: 150px;
  border: none;
}
.modal-confirm .btn:hover,
.modal-confirm .btn:focus {
  background: #eda645 !important;
  outline: none;
}
.trigger-btn {
  display: inline-block;
  margin: 100px auto;
}
</style>
