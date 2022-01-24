<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <button type="button" @click="handleFetchUser">fetch user</button>
  </div>
</template>

<script>
import httpRequest from "../services/httpRequest";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  methods: {
    async handleFetchUser() {
      try {
        const res = await httpRequest.get("/user", {
          apiTimeout: {
            type: "song",
          },
        });
        console.log("fetch user: ", res);
      } catch (err) {
        // show snackbar error
        console.log("fetch user err: ", err);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
