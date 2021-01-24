<template>
  <button
    class="close-button"
    @click="clickEmit"
  >
    <slot name="closeButton" />
  </button>
</template>
<script>
export default {
  name: "CloseButton",
  methods: {
    clickEmit() {
      this.$emit("clicked");
    }
  }
};
</script>
<style scoped>
.close-button {
  border: 0;
  background: none;
  color: #aaa;
  outline-style: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>