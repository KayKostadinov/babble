<template>
  <div>
    <h3>Sign in Anonimously</h3>
    <button @click="auth().signInAnonymously()">Sign In</button>
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
};
</script>