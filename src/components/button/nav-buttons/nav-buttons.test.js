import { mount } from '@vue/test-utils'
import NavButtons from './nav-buttons'

describe('nav buttons component tests', () => {
    const wrapper = mount(NavButtons, {
        slots: {
            leftNavButton: '<custom-icon name="chevron-left"></custom-icon>',
            rightNavButton: '<custom-icon name="chevron-right"></custom-icon>'
        },
        stubs: ['custom-icon']
    });

    it('render test', () => {
        expect(wrapper.html()).toContain(
          '<custom-icon-stub name="chevron-left"></custom-icon-stub>'
        );
        expect(wrapper.html()).toContain(
          '<custom-icon-stub name="chevron-right"></custom-icon-stub>' 
        );
    });
});