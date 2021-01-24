<template>
  <div class="story-view-wrapper">
    <swiper
      ref="storyItemsSwiper"
      :key="viewingStory.id"
      class="swiper"
      :options="swiperOption"
      :auto-update="true"
      :auto-destroy="true"
      :delete-instance-on-destroy="true"
      :cleanup-styles-on-destroy="false"
    >
      <swiper-slide
        v-for="(storyItem, index) in viewingStory.stories"
        :key="storyItem.id"
      >
        <image-renderer
          v-if="storyItem.type === 'photo'"
          :item="storyItem"
        />
        <video-renderer
          v-else-if="storyItem.type === 'video'"
          :item="storyItem"
          :index-number="index"
          :active-index="activeIndex"
          @clearParentInterval="removeInternal()"
          @slideNext="slideNext()"
          @setDurationData="setDurationData"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import ImageRenderer from "../renderers/image-renderer/image-renderer";
import VideoRenderer from "../renderers/video-renderer/video-renderer";

export default {
  name: "StoryView",
  components: {
    ImageRenderer,
    VideoRenderer,
    Swiper,
    SwiperSlide
  },
  props: {
    viewingStory: {
      type: Object,
      required: true
    },
    duration: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      interval: null,
      activeIndex: null,
      videoItemDuration: null,
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        on: {
          reachEnd: () => {
            if (this.videoItemDuration) {
              setTimeout(() => {
                this.$emit("sliderReachEnd")
                this.registerInterval();
                this.videoItemDuration = null;
                this.activeIndex = 0;
              }, this.videoItemDuration * 1000);  // set video duration as interval in ms
            } else {
              this.$emit("sliderReachEnd");
            }
          },
          reachBeginning: () => this.$emit("sliderReachBeginning"),
          slideChange: () => {
            if (this.videoItemDuration) {
              this.activeIndex = this.$refs.storyItemsSwiper.$swiper.realIndex;
            }
            clearInterval(this.interval);
            this.registerInterval();
          }
        }
      }
    };
  },
  created() {
    this.registerInterval();
  },
  mounted() {
    this.$nextTick(() => {
      this.activeIndex = this.$refs.storyItemsSwiper.$swiper.activeIndex;
    });
  },
  beforeDestroy() {
    this.removeInternal();
  },
  methods: {
    registerInterval(time = this.duration) {
      this.interval = setInterval(this.slideNext, time);
    },
    removeInternal() {
      clearInterval(this.interval);
    },
    slideNext() {
      if (this.$refs.storyItemsSwiper) {
        this.$refs.storyItemsSwiper.$swiper.slideNext();
      }
    },
    setDurationData(duration) {
      this.videoItemDuration = duration;
    }
  }
};
</script>
<style>
.story-view-wrapper {
  width: 50%;
  height: 100%;
  /*display: flex;*/
}
.swiper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.swiper-wrapper {
  height: 90%;
}
.swiper-slide {
  width: 100%;
  height: 100%;
}
</style>