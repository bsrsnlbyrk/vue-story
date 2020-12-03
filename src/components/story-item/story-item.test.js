import { render } from '@testing-library/vue';
import StoryItem from './story-item.vue';

test('story items test', () => {
    const component = render(StoryItem, { props: { itemObject: {} } });
    console.log(component);
});

