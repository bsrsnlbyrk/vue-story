import { mount } from '@vue/test-utils'
import StoryInfo from './story-info'

describe('story info component tests', () => {
    const wrapper = mount(StoryInfo, {
        propsData: {
            title: 'Pirelli Tire Building',
            date: '2020-12-02T14:06:20Z'
        }
    });

    it('props test', () => {
        expect(wrapper.props().title).toBe('Pirelli Tire Building');
    });
});