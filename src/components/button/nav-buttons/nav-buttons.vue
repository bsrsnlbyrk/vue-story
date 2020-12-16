<template>
  <div>
    <button class="swiper-button-prev">
      <slot name="leftNavButton"></slot>
    </button>
    <button class="swiper-button-next">
      <slot name="rightNavButton"></slot>
    </button>
  </div>
</template>
<script>
export default {
  name: "nav-buttons"
};
</script>
<style scoped>
.swiper-button-prev,
.swiper-button-next {
  border: 0;
  background: none;
  color: #aaa;
  width: 30px;
}
</style>