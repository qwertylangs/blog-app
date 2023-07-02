import { combineReducers } from '@reduxjs/toolkit';
import { ArticleDetailsPageSchema } from '../types';
import { articleDetailsCommentReducer } from './ArticleDetailsCommentSlice';
import { articleDetailsPageRecommendationsReducer } from './ArticleDetailsPageRecommendationsSlice';

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
  comments: articleDetailsCommentReducer,
  recommendations: articleDetailsPageRecommendationsReducer,
});
