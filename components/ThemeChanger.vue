<template>
  <v-btn
    fab
    small
    bottom
    right
    absolute
    class="mb-8"
    text
    @click="onChangeTheme"
  >
    <v-icon v-if="$vuetify.theme.dark"> mdi-weather-night </v-icon>
    <v-icon v-else> mdi-white-balance-sunny mdi-spin</v-icon>
  </v-btn>
</template>

<script>
export default {
  mounted: function () {
    this.$vuetify.theme.dark = localStorage.getItem("dark") === "true";
  },
  methods: {
    onChangeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark", this.$vuetify.theme.dark);
    },
  },
};
</script>
<style></style>
