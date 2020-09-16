<template>
  <div>
    {{user.email ? user.email : user.uid}}
    <button @click="auth.signOut()">Log out</button>
  </div>
</template>

<script>
import { auth } from "../firebase";
export default {
  data() {
    return {
      auth,
    };
  },
  props: ["user"],
};
</script>