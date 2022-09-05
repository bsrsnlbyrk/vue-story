<template>
  <div>
    <button class="swiper-button-prev">
      <slot name="leftNavButton" />
    </button>
    <button class="swiper-button-next">
      <slot name="rightNavButton" />
    </button>
  </div>
</template>
<script>
export default {
  name: "NavButtons",
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

.swiper-button-prev {
  right: 100px;
  left: auto;
}
</style>
