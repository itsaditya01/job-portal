<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">JobPortal</a>
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
      <ul class="navbar-nav mr-auto" v-if="role === 'employer'">
        <li class="nav-item active">
          <a class="nav-link" @click="updateSelection('addjob')">Post a Job</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" @click="updateSelection('joblist')"
            >Jobs Listed</a
          >
        </li>
      </ul>
      <ul class="navbar-nav mr-auto" v-else-if="role === 'jobseeker'">
        <li class="nav-item active">
          <a class="nav-link" @click="updateSelection('joblist')">Jobs</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" @click="updateSelection('applicationlist')"
            >Applications</a
          >
        </li>
      </ul>
      <form class="form-inline my-4 my-lg-0 ms-4">
        <button
          class="btn btn-outline-success my-2 my-sm-0"
          @click="logout"
          type="submit"
        >
          Logout
        </button>
      </form>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    role: String,
    selection: Function
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      popup: false,
      message: "",
      is_teacher: false,
      message: "",
      pop: false
    };
  },
  created() {
    // this.getUser();
  },
  methods: {
    updateSelection: function(newSelection) {
      console.log(newSelection);
      this.$emit("selection", newSelection);
    },
    logout: function() {
      console.log("clicked");
      localStorage.removeItem("token");
      this.$router.push({ name: "Hero" });
    },
    getUser: function() {
      fetch("http://localhost:3000/api/getuser", {
        method: "get",
        headers: {
          Accept: "application/json",
          token: localStorage.getItem("token")
        }
      })
        .then(response => response.json())
        .then(data => {
          this.is_teacher = data.is_teacher;
          console.log(this.is_teacher);
        });
    },

    addAdmin: function() {
      this.$http
        .post("http://localhost:3000/auth/createadmin", {
          name: this.name,
          email: this.email,
          password: this.password,
          is_admin: true
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            this.pop = true;
            this.message = data.message;
          } else {
            this.pop = true;
            this.message = data.message;
          }
          this.popup = false;
        });
    }
  }
};
</script>

<style scoped>
nav {
  padding: 10px 100px;
}
a {
  cursor: pointer;
}
</style>
<!-- <style scoped>
#header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.icon-holder {
  text-align: center;
}
.logout-container {
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-size: 18px;
  border-radius: 25px;
  background-color: #fc7300;
  padding: 0px 27px;
  height: 50px;
  color: white;
  align-self: center;
  cursor: pointer;
}
.input {
  display: flex;
  width: 300px;
  height: 40px;
  border-radius: 5px;
  padding: 2px 10px;
  margin-bottom: 20px;
}
ul {
  list-style: none;
  display: flex;
  flex-direction: row;
}
ul li {
  margin-left: 50px;
}
a {
  font-size: 20px;
  text-decoration: none;
}
.add-button {
  background: #1f8a70;
  border: 1px solid #1f8a70;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: nunito, roboto, proxima-nova, "proxima nova", sans-serif;
  font-size: 16px;
  font-weight: 800;
  line-height: 16px;
  min-height: 40px;
  outline: 0;
  padding: 12px 14px;
  text-align: center;
  text-rendering: geometricprecision;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
}
</style> -->
