import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CommentType } from '../interfaces/commentsModel';

const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
  }),
  tagTypes: ['Comments', 'Comments'],
  endpoints: (builder) => ({
    getCommentsByArticleId: builder.query<CommentType[], string>({
      query: (commentId) => ({
        url: `/comments?articleId=${commentId}`,
      }),
      providesTags: ['Comments'],
    }),
    getComments: builder.query<CommentType[], void>({
      query: () => ({
        url: `/comments`,
      }),
      providesTags: ['Comments'],
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/comments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comments'],
    }),
    addComment: builder.mutation({
      query: (data) => ({
        url: `/comments`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Comments'],
    }),
    editComment: builder.mutation({
      query: (data) => ({
        url: `/comments/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Comments'],
    }),
  }),
});

export const { useAddCommentMutation, useEditCommentMutation, useGetCommentsQuery, useGetCommentsByArticleIdQuery } =
  commentApi;

export default commentApi;
