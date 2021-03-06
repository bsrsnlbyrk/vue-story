import { mount } from '@vue/test-utils'
import Story from './story'

describe('story component tests', () => {
    const wrapper = mount(Story, {
        propsData: {
            story: {
                id: 'xyz',
                coverPhotoPath:
                    'https://images-na.ssl-images-amazon.com/images/I/61BCNx-1CIL._SL1200_.jpg'
            }
        }
    });
    it('rendering story cover', () => {
        expect(wrapper.get('img'));
    });
    
    it('props test', () => {
        expect(wrapper.props().story.id).toBe('xyz');
        expect(wrapper.props().story.coverPhotoPath).toBeTruthy();
    });
    
    it('story open emit', () => {
        wrapper.vm.$emit('open_story', wrapper.props().story);
        expect(wrapper.emitted('open_story')).toBeTruthy();
        expect(wrapper.emitted('open_story')[0]).toEqual([wrapper.props().story]);
    });
})