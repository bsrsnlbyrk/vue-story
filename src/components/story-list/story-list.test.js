import { mount } from '@vue/test-utils'
import StoryList from './story-list'
import * as storiesJson from '../../stories.json';

describe('story list component test', () => {
    const wrapper = mount(StoryList, {
        propsData: {
            stories: [{ id: 123 }]
        },
        data() {
            return {
                itemNumber: 5
            }
        },
        computed: {
            slicedStories() {
                return storiesJson.default.slice(0, this.itemNumber);
            }
        }
    });
    /* beforeEach(() => {
        wrapper.vm.itemNumber = 5;
    }) */
    it('props test', () => {
        expect(wrapper.props().stories).not.toBe(null);
        expect(wrapper.props().stories.length).toBeTruthy();
    });

    it('components existence test', () => {
        expect(wrapper.getComponent({ name: 'Story' }));
        expect(wrapper.findComponent({ name: 'Swiper' }).exists()).toBe(true);
        expect(wrapper.findComponent({ name: 'SwiperSlide' }).exists()).toBe(true);
    });

    it('methods test', () => {
        wrapper.vm.goNext();
        expect(wrapper.vm.slicedStories.length).toBe(wrapper.vm.itemNumber);

        wrapper.vm.goBack();
        expect(wrapper.vm.slicedStories.length).toBe(wrapper.vm.itemNumber);
    });
})