import { reaction } from 'mobx';
import { EventEmitter } from 'events';
import qs from 'qs';

export default ({ provider, stores, eventHandler }) => {
  const onStoryListeners = new EventEmitter();
  const { store } = stores;

  const api = {
    onStory(cb) {
      onStoryListeners.on('story', cb);

      const { component } = store.urlData;

      // // TODO: is this even nessesary event?
      // if (store.selectedKind && store.selectedStory) {
      //   // Using a setTimeout to call the callback to make sure it's
      //   // not called on current event-loop. When users add callbacks
      //   // they usually expect it to be called in a future event loop.
      //   setTimeout(() => cb(store.storiesHash[component]), 0);
      // }

      // removeListener
      return () => onStoryListeners.removeListener('story', cb);
    },
    setStories: store.setStories.bind(store),
    selectInCurrentKind: store.selectInCurrentKind.bind(store),
    selectStory: store.selectStory.bind(store),
    handleShortcut: eventHandler.handle.bind(store),
    setOptions(options) {
      store.setOptions(options);
      store.setShortcutsOptions(options);
    },
    setQueryParams: store.setQueryParams.bind(store),
    getQueryParam(key) {
      if (store.customQueryParams) {
        return store.customQueryParams[key];
      }
      return undefined;
    },
    getUrlState(overrideParams) {
      const url = qs.stringify(
        {
          ...store.urlState,
          ...overrideParams,
        },
        { encode: false, addQueryPrefix: true }
      );

      return {
        ...store.urlState,
        url,
      };
    },
  };

  provider.handleAPI(api);

  reaction(
    () => ({
      selectedId: store.selectedId,
    }),
    () => {
      if (!store.selectedId) return;
      onStoryListeners.emit('story', store.storiesHash[store.selectedId]);
    }
  );
};
