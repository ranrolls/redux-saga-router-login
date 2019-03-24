import * as routers from './route'
export const { REQUEST_REDIRECT, requestRedirect } = routers

 import * as counters from './counter'
export const { INCREMENT, DECREMENT, INCREMENT_IF_ODD,
 INCREMENT_ASYNC, CANCEL_INCREMENT_ASYNC,
 COUNTDOWN_TERMINATED } = counters

import * as posts from './posts'
export const { SELECT_REDDIT, INVALIDATE_REDDIT, REQUEST_POSTS, RECEIVE_POSTS,
  INCREMENT_FETCH, CANCEL_INCREMENT_FETCH, COUNTDOWN_FETCH_TERMINATED,
  selectReddit, invalidateReddit, requestPosts, receivePosts } = posts

import * as users from './user'
export const { REQUEST_LOGIN, REQUEST_LOGOUT, REQUEST_INFO,
  requestLogin, requestLogout } = users
