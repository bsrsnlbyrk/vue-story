<template>
  <div>
    <span v-if="itemObject">{{ itemObject.name }}</span>
    <span v-else>{{ name }}</span>
  </div>
</template>
<script>
import { ref } from '@vue/composition-api';

export default {
  name: "StoryItem",
  setup({ itemObject }) {
    const name = ref("Empty Item");
    return { itemObject, name };
  }
};
</script>