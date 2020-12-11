import { mount } from '@vue/test-utils';
import StoryNavbarListItem from './story-navbar-list-item'

function wrapperFactory() {
    return mount(StoryNavbarListItem, {
        propsData: {
            listItem: {
                id: '222',
                title: 'def'
            },
            activeStory: {
                id: '111',
                title: 'abc'
            }
        },
        stubs: {
            StoryInfo: {
                name: 'story-info',
                template: '<div></div>'
            }
        }
    });
};

describe('story navbar list item component tests', () => {
    const wrapper = wrapperFactory();

    it('props test', () => {
        expect(wrapper.props().listItem).not.toBe(null);
        expect(Object.keys(wrapper.props().listItem).length).toBeTruthy();
        expect(wrapper.props().activeStory).not.toBe(null);
    });

    it('components existence test', () => {
        expect(wrapper.findComponent({ name: 'Story' }).exists()).toBe(true);
        expect(wrapper.findComponent({ name: 'StoryInfo' }).exists()).toBe(true);
    });

    it('set active story', async () => {
        const spySetActiveStory = jest.spyOn(StoryNavbarListItem.methods, 'setActiveStory');

        const wrapper = wrapperFactory();
        const listItem = wrapper.find('.story-navbar-list-item');

        await listItem.trigger('click');

        expect(spySetActiveStory).toHaveBeenCalled();
        expect(wrapper.vm.activeStoryItem).toEqual({ id: '222', title: 'def' });
    });
})