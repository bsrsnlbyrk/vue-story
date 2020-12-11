import { mount } from '@vue/test-utils'
import StoryNavbarList from './story-navbar-list'

describe('story navbar list component tests', () => {
    const wrapper = mount(StoryNavbarList, {
        propsData: {
            stories: [
              {
                id: '111',
                title: 'abc'
              },
              {
                id: '222',
                title: 'def'
              },
              {
                id: '333',
                title: 'xyz'
              }
            ],
            activeStory: {
                id: '111',
                title: 'abc'
            }
        },
        stubs: {
          StoryInfo: {
            template: '<div></div>'
          }
        }
    });

    it('props test', () => {
        expect(wrapper.props().stories).not.toBe(null);
        expect(wrapper.props().stories.length).toBeTruthy();
        expect(wrapper.props().activeStory).not.toBe(null);
    });

    it('components existence test', () => {
        expect(wrapper.findComponent({ name: 'StoryNavbarListItem' }).exists()).toBe(true);
    });
})