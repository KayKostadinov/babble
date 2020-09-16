<template>
  <div>
    <slot name="user" v-bind:user="user"></slot>
  </div>
</template>

<script>
import { ref } from "@vue/composition-api";
import { auth } from "firebase";

export default {
  setup() {
    const user = ref(null);
    const unsubscribe = auth.onAuthStateChange(
      (firebaseUser) => (user.value = firebaseUser)
    );
    return {
      user,
      unsubscribe,
    };
  },
  destroyed() {
    this.unsubscribe();
  },
};
</script>