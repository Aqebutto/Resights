<template>
  <span> {{ full_name }} </span>
</template>
<script>
export default {
  computed: {
    full_name() {
      const full_name =
        this.user.title +
        " " +
        this.user.first_name +
        " " +
        this.user.last_name;
      return full_name;
    },
  },
  props: ["user"],
};
</script>
