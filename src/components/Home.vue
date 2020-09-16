<template>
  <div>
    <h3>home</h3>
    <User>
      <Login />
    </User>
  </div>
</template>

<script>
import Login from "./Login";
import User from "./User";

export default {
  components: {
    Login,
    User,
  },
};
</script>