import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthorsType } from '../interfaces/authorsModel';

const authorApi = createApi({
  reducerPath: 'authorApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
  }),
  endpoints: (builder) => ({
    getAuthors: builder.query<AuthorsType[], void>({
      query: () => ({
        url: 'authors',
      }),
    }),
  }),
});

export const { useGetAuthorsQuery } = authorApi;

export default authorApi;
