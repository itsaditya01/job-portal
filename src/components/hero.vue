<template>
  <div id="home-main">
    <div class="home-inner">
      <nav class="navbar navbar-expand-lg pt-3">
        <a class="navbar-brand text-bold" href="#"
          ><strong style="font-size: 25px; color: #538ee9">JobPortal</strong></a
        >
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active me-2">
              <a class="nav-link" href="#">Home </a>
            </li>
            <li class="nav-item me-2">
              <a class="nav-link" href="#">About</a>
            </li>
            <li class="nav-item me-2">
              <a class="nav-link" href="#">Contact</a>
            </li>
          </ul>
          <div class="ms-2">
            <router-link to="/login/employer" class="btn btn-primary me-2"
              >Post a Job</router-link
            >
            <router-link to="/login/jobseeker" class="btn btn-success"
              >Want a Job</router-link
            >
          </div>
        </div>
      </nav>
      <div
        class="d-flex justify-content-center align-items-center"
        style="height: 90vh;"
      >
        <div class="d-flex flex-column">
          <div class="mb-2">
            <h1 style="font-weight: bolder; color: #4466c5">
              Job Recruitment Solution
            </h1>
          </div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem
            similique consequuntur iusto ullam facere culpa beatae tempore
            veritatis provident nisi?
          </div>
          <div class="mt-3">
            <button
              class="btn "
              style="font-size: 20px;padding: 5px 30px; border-radius: 25px; background-color: #fe8d03; color: white; font-weight: bolder; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;;"
            >
              Join us
            </button>
          </div>
        </div>
        <div>
          <img src="../assets/home_ill.png" alt="" style="height: 500px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap");
#home-main {
  background-image: linear-gradient(#c3e2fe, white);
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  font-family: poppins;
}
.home-inner {
  margin: 0 auto;
  max-width: 1200px;
}
</style>
