import { mount, shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import FullScreenStory from './full-screen-story'

describe('full screen story component test', () => {
    const wrapper = mount(FullScreenStory, {
        propsData: {
            stories: [
              {
                "id": "AXYjzFtG0Uiqa9Tzl7M3",
                "title": "Mülteci çocuklar için oyun alanı",
                "publishDate": "2020-12-02T14:12:43Z",
                "expirationDate": null,
                "createdDate": "2020-12-02T14:12:43Z",
                "updatedDate": "2020-12-02T14:12:43Z",
                "coverPhotoPath": "/piri/upload/image/2020/12/2/fab5e6d0-0ukifkg6s4jcjuhpe53wzj.jpg"
              },
              {
                "id": "AXYjxoIa0Uiqa9Tzl7Mm",
                "title": "Pirelli Tire Building",
                "publishDate": "2020-12-02T14:06:20Z",
                "expirationDate": null,
                "createdDate": "2020-12-02T14:06:20Z",
                "updatedDate": "2020-12-02T14:06:20Z",
                "coverPhotoPath": "/piri/upload/image/2020/12/2/143457c2-ubxfh004tbg9xk4l626jte.jpg"
              }
            ],
            viewingStory: {
                "id": "AXYjzFtG0Uiqa9Tzl7M3",
                "title": "Mülteci çocuklar için oyun alanı",
                "publishDate": "2020-12-02T14:12:43Z",
                "expirationDate": null,
                "createdDate": "2020-12-02T14:12:43Z",
                "updatedDate": "2020-12-02T14:12:43Z",
                "coverPhotoPath": "/piri/upload/image/2020/12/2/fab5e6d0-0ukifkg6s4jcjuhpe53wzj.jpg"
            }
        },
        stubs: {
            RecycleScroller: true
        }
    });

    it('props test', () => {
        expect(wrapper.props().stories).not.toBe(null);
        expect(wrapper.props().stories.length).toBeTruthy();
        expect(Object.keys(wrapper.props().viewingStory).length).toBeTruthy();
    });

    it('components test', () => {
        expect(wrapper.findComponent({ name: 'ProgressBar' }).exists()).toBe(true);
        expect(wrapper.findComponent({ name: 'NavButtons' }).exists()).toBe(true);
        expect(wrapper.findComponent({ name: 'StoryNavbarList' }).exists()).toBe(true);
        // expect(wrapper.findComponent({ name: 'StoryNavbarListItem' }).exists()).toBe(true);
        // expect(wrapper.findComponent({ name: 'Story' }).exists()).toBe(true);
        expect(wrapper.findComponent({ name: 'StoryView' }).exists()).toBe(true);
    });

    it('close full screen test', async () => {
        const spyCloseStory = jest.spyOn(FullScreenStory.methods, 'closeStory');
        const wrapper = mount(FullScreenStory, { 
            propsData: { stories: [], viewingStory: {} },
            stubs: {
                RecycleScroller: true
            }
        });

        wrapper.vm.$eventHub = new Vue();

        const closeButton = wrapper.find('button');
        
        await closeButton.trigger('click');
        
        expect(spyCloseStory).toHaveBeenCalled();
    });

    it('change viewing story test', async () => {
        const spychangeViewingStory = jest.spyOn(FullScreenStory.methods, 'changeViewingStory');
        
        /* const Story = {
            name: 'Story',
            template: '<button id="story" @click="emitClick">Close</button>',
            props: {
                story: {
                    type: Object,
                    required: false
                }
            },
            methods: {
                emitClick() {
                    this.$emit('clickingStory', this.$options.propsData)
                }
            }
        }; */

        const StoryNavbarList = {
            template: 
              '<div class="story-navbar-list-item" @click="changeViewingStoryEmit(item)"></div>',
            props: {
              stories: {
                type: Array,
                reguired: false
              },
              activeStory: {
                type: Object,
                required: false
              }
            },
            data() {
              return {
                item: {}
              }
            },
            methods: {
              changeViewingStoryEmit(story) {
                this.$emit('changeViewingStory', story);
              }
            }
        };

        const wrapper = shallowMount(FullScreenStory, { 
            propsData: { stories: [], viewingStory: {} },
            stubs: {
                StoryNavbarList,
                NavButtons: true,
                ProgressBar: true
            }
        });

        const story = wrapper.find('.story-navbar-list-item');
        
        await story.trigger('click');

        expect(spychangeViewingStory).toHaveBeenCalled();
        expect(wrapper.vm.viewing).toEqual(StoryNavbarList.data().item);
    });
});