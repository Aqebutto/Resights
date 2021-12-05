<template>
  <v-app dark>
    <div class="text-h1">
      {{ error.statusCode }}
    </div>
    <h3 class="text-h5">
      {{ error.message }}. <br />Go Back to the
      <NuxtLink to="/"> Home Page. </NuxtLink>
    </h3>
  </v-app>
</template>

<script>
export default {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "404",
      otherError: "Error",
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>
