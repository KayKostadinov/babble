<template>
  <main>
    <h3>Babble on {{chatId}}</h3>
  </main>
</template>

<script>
export default {
  computed: {
    chatId() {
      return this.$route.params.id;
    },
  },
};
</script>