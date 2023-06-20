import { configureStore } from '@reduxjs/toolkit';
import { articleApi, authorApi, commentApi, topicApi } from '../../api';

const store = configureStore({
  reducer: {
    [articleApi.reducerPath]: articleApi.reducer,
    [authorApi.reducerPath]: authorApi.reducer,
    [topicApi.reducerPath]: topicApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(articleApi.middleware)
      .concat(authorApi.middleware)
      .concat(topicApi.middleware)
      .concat(commentApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
