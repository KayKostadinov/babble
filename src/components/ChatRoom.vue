<template>
  <div>
    <h3>{{chatId}}</h3>
  </div>
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