import { mount } from '@vue/test-utils'
import VideoRenderer from './video-renderer'

describe('image renderer component tests', () => {
    const wrapper = mount(VideoRenderer, {
        propsData: {
            item: {
                type: 'image',
                filePath: '/piri/upload/video/2020/12/2/ec6bdf2a-4.mp4'
            }
        }
    });

    it('props test', () => {
        expect(wrapper.props().item).toBeTruthy();
        expect(wrapper.props().item.filePath).toBeTruthy();
    });

    it('render test', () => {
        expect(wrapper.html()).toBe(`<video src="${wrapper.vm.videoSrc}" autoplay="autoplay" class="story-item"></video>`);
    });
});