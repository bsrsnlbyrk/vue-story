<template>
    <div class="story-view-wrapper">
        <image-renderer v-if="viewingStory.type = 'image'"></image-renderer>
        <video-renderer v-if="viewingStory.type = 'video'"></video-renderer>
    </div>
</template>

<script>
export default {
    name: 'story-view',
    props: {
        viewingStory: {
            type: Object,
            required: true
        }
    }    
}
</script>
<style scoped>

</style>