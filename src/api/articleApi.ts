import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ArticleType } from '../interfaces/articlesModel';

const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
  }),
  tagTypes: ['Articles', 'Comments'],
  endpoints: (builder) => ({
    getArticles: builder.query<ArticleType[], void>({
      query: () => ({
        url: 'articles',
      }),
      providesTags: ['Articles'],
    }),
    getArticleById: builder.query<ArticleType, string>({
      query: (id) => ({
        url: `articles/${id || null}`,
      }),
      providesTags: ['Articles'],
    }),
    deleteArticle: builder.mutation({
      query: (id) => ({
        url: `/articles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Articles'],
    }),
    addArticle: builder.mutation({
      query: (data) => ({
        url: `articles`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Articles'],
    }),
    editArticle: builder.mutation({
      query: ([data, id]) => ({
        url: `articles/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Articles'],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleByIdQuery,
  useDeleteArticleMutation,
  useAddArticleMutation,
  useEditArticleMutation,
} = articleApi;

export default articleApi;
