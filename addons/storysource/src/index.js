import { ADDON_ID, PANEL_ID, STORY_EVENT_ID, SAVE_FILE_EVENT_ID } from './events';
import { withStorySource } from './preview';
import createChannel from '@storybook/channel-postmessage';

export { ADDON_ID, PANEL_ID, STORY_EVENT_ID, SAVE_FILE_EVENT_ID, withStorySource };

const channel = createChannel({page: 'manager'});

const saveFile = ({fileName, content}) => {
  console.log(`Asking to update the file ${fileName}`)
}

channel.on(SAVE_FILE_EVENT_ID, saveFile);

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}
