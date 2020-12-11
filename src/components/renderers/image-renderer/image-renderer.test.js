import { mount } from '@vue/test-utils'
import ImageRenderer from './image-renderer'

describe('image renderer component tests', () => {
    const wrapper = mount(ImageRenderer, {
        propsData: {
            item: {
                type: 'image',
                filePath: '/piri/upload/image/2020/12/2/49c60db6-t6ysnumu67cng2slhcf9.jpg'
            }
        }
    });

    it('props test', () => {
        expect(wrapper.props().item).toBeTruthy();
        expect(wrapper.props().item.filePath).toBeTruthy();
    });

    it('render test', () => {
        expect(wrapper.html()).toBe(`<img src="${wrapper.vm.imgSrc}" alt="image" class="story-item">`);
    });
});