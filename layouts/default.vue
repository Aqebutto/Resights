<template>
  <v-app>
    <v-main>
      <v-toolbar flat>
        <v-spacer />
        <div class="caption overline">Resights</div>
        <v-spacer />
      </v-toolbar>
      <v-container>
        <nuxt />
      </v-container>
      <ThemeChanger />
    </v-main>
  </v-app>
</template>

<script>
import ThemeChanger from "@/components/ThemeChanger";
export default {
  components: {
    ThemeChanger,
  },
};
</script>
