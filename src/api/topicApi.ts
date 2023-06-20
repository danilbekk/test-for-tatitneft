import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TopicsType } from '../interfaces/topicsModel';

const topicApi = createApi({
  reducerPath: 'topicApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
  }),
  endpoints: (builder) => ({
    getTopics: builder.query<TopicsType[], void>({
      query: () => ({
        url: 'topics',
      }),
    }),
  }),
});

export const { useGetTopicsQuery } = topicApi;

export default topicApi;
