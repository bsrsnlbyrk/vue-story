<template>
  <div class="story-view-wrapper">
    <progress-bar
      size="small"
      :spacing="3"
      bar-color="#8F8F8F"
      :val="progressBarValue"
    />
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
        <span style="color: white">{{ progressBarValue }}</span>
        <image-renderer v-if="storyItem.type === 'photo'" :item="storyItem" />
        <video-renderer
          v-else-if="storyItem.type === 'video'"
          :item="storyItem"
          :index-number="index"
          :active-index="activeIndex"
          @clearParentInterval="removeIntervals()"
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
import ProgressBar from "vue-simple-progress";

export default {
  name: "StoryView",
  components: {
    ImageRenderer,
    VideoRenderer,
    Swiper,
    SwiperSlide,
    ProgressBar,
  },
  props: {
    viewingStory: {
      type: Object,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      slideInterval: null,
      progressBarInterval: null,
      progressBarValue: 0,
      activeIndex: null,
      videoItemDuration: null,
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        on: {
          reachEnd: () => {
            console.log("REACH END");
            if (this.videoItemDuration) {
              setTimeout(() => {
                this.videoItemDuration = null;
                this.activeIndex = 0;
                this.resetIntervals();
                this.$emit("sliderReachEnd");
              }, this.videoItemDuration * 1000); // set video duration as interval in ms
            } else {
              this.activeIndex = 0;
              this.resetIntervals();
              this.$emit("sliderReachEnd");
            }
          },
          reachBeginning: () => this.$emit("sliderReachBeginning"),
          slideChange: () => {
            this.activeIndex = this.$refs.storyItemsSwiper.$swiper.realIndex;
            this.resetIntervals();
          },
        },
      },
    };
  },
  created() {
    this.registerSlideInterval();
    this.registerProgressBarInterval();
  },
  mounted() {
    this.$nextTick(() => {
      this.activeIndex = this.$refs.storyItemsSwiper.$swiper.activeIndex;
    });
  },
  beforeDestroy() {
    if (this.videoItemDuration) this.videoItemDuration = null;
    this.removeIntervals();
  },
  methods: {
    registerSlideInterval(time = this.duration) {
      this.slideInterval = setInterval(this.slideNext, time + 500); // add set timeout 500ms to duration time
    },
    progressbarInterval() {
      this.progressBarInterval = setInterval(this.setProgressBarValue, 100);
    },
    registerProgressBarInterval() {
      setTimeout(this.progressbarInterval, 500);
    },
    removeIntervals() {
      clearInterval(this.slideInterval);
      clearTimeout(this.progressbarInterval);
      clearInterval(this.progressBarInterval);
    },
    resetIntervals() {
      this.removeIntervals();
      this.progressBarValue = 0;
      this.registerSlideInterval();
      this.registerProgressBarInterval();
    },
    slideNext() {
      if (this.$refs.storyItemsSwiper) {
        this.$refs.storyItemsSwiper.$swiper.slideNext();
      }
    },
    setDurationData(duration) {
      this.videoItemDuration = duration;
      this.removeIntervals();
      this.registerSlideInterval(this.videoItemDuration);
      this.registerProgressBarInterval();
    },
    setProgressBarValue() {
      console.log("progress bar value:", this.progressBarValue);
      if (this.videoItemDuration) {
        const videoItemDurationInMs = this.videoItemDuration * 1000;
        if (this.progressBarValue < videoItemDurationInMs)
          this.progressBarValue += 100 / ((videoItemDurationInMs - 500) / 100);
      } else if (this.progressBarValue < this.duration) {
        this.progressBarValue += 100 / ((this.duration - 500) / 100); // remove set timeout 500ms from duration time
      }
    },
  },
};
</script>
<style>
.story-view-wrapper {
  width: 50%;
  height: 100%;
  position: relative;
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
/* .vue-simple-progress-bar {
  margin: 16px 0;
} */
</style>
