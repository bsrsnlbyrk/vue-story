import { mount } from '@vue/test-utils'
import StoryView from './story-view'

describe('story view component tests', () => {
    const wrapper = mount(StoryView, {
        propsData: {
            viewingStory: {
                stories: [
                  {
                    "type": "photo",
                    "user": {
                        "id": "b4b1be0a-107a-4cc2-9f15-9576d90b989f",
                        "name": "Birgül Güney"
                    },
                    "url": null,
                    "filePath": "/piri/upload/image/2020/12/2/f2667371-slhxx02eipnd24hitoddh.jpg",
                    "content": "",
                    "createdDate": "2020-12-02T14:09:52Z",
                    "isCoverPhoto": false
                  },
                  {
                    "type": "photo",
                    "user": {
                        "id": "b4b1be0a-107a-4cc2-9f15-9576d90b989f",
                        "name": "Birgül Güney"
                    },
                    "url": null,
                    "filePath": "/piri/upload/image/2020/12/2/d1eb35ce-6xa5sdt7nenx2shngep3tp.jpg",
                    "content": "",
                    "createdDate": "2020-12-02T14:10:29Z",
                    "isCoverPhoto": false
                  }
                ]
            },
            duration: 100
        }
    });
    it('mounted test', () => {
        expect(wrapper.vm.interval).not.toBe(null);
    });

    it('props test', () => {
        expect(wrapper.props().viewingStory).not.toBe(null);
        expect(Object.keys(wrapper.props().viewingStory)).toBeTruthy();
    });

    it('components test', () => {
        expect(wrapper.findComponent({ name: 'Swiper' }).exists()).toBe(true);
        expect(wrapper.findComponent({ name: 'SwiperSlide' }).exists()).toBe(true);
    });

    it('image story item test', async () => {
        await wrapper.setProps({ viewingStory: { stories: [{ type: 'photo' }] } });
        
        expect(wrapper.findComponent({ name: 'ImageRenderer' }).exists()).toBe(true);
        expect(wrapper.findComponent({ name: 'VideoRenderer' }).exists()).toBe(false);
    });

    it('video story item test', async () => {
        await wrapper.setProps({ viewingStory: { stories: [{ type: 'video' }] } });
        
        expect(wrapper.findComponent({ name: 'VideoRenderer' }).exists()).toBe(true);
        expect(wrapper.findComponent({ name: 'ImageRenderer' }).exists()).toBe(false);
    });

    it('before destroy test', () => {
        const spyBeforeDestroy = jest.spyOn(StoryView, 'beforeDestroy');
        const wrapper = mount(StoryView, {
            propsData: {
                viewingStory: {},
                duration: 100
            }
        });
        wrapper.destroy();
        expect(spyBeforeDestroy).toHaveBeenCalled();
    });
})