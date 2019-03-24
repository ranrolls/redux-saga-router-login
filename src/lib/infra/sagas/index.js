import { take, put, call, fork, race, cancelled, select } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import fetch from 'isomorphic-fetch'
import { selectedRedditSelector, postsByRedditSelector } from '../reducers/selectors'
import { INCREMENT_FETCH, CANCEL_INCREMENT_FETCH, 
  INCREMENT_ASYNC, INCREMENT, CANCEL_INCREMENT_ASYNC, COUNTDOWN_TERMINATED, 
  requestPosts, receivePosts, INVALIDATE_REDDIT, SELECT_REDDIT } from '../actions'
const action = type => ({ type })
export const countdown = secs => {
  console.log('countdown', secs)
  return eventChannel(listener => {
    const iv = setInterval(() => {
      secs -= 1
      console.log('countdown', secs)
      if (secs > 0) listener(secs)
      else {
        listener(END)
        clearInterval(iv)
        console.log('countdown terminated')
      }
    }, 1000)
    return () => {
      clearInterval(iv)
      console.log('countdown cancelled')
    }
  })
}
export function* incrementAsync({ value }) {
  const chan = yield call(countdown, value)
  try {
    while (true) {
      let seconds = yield take(chan)
      yield put({ type: INCREMENT_ASYNC, value: seconds })
    }
  } finally {
    if (!(yield cancelled())) {
      yield put(action(INCREMENT))
      yield put(action(COUNTDOWN_TERMINATED))
    }
    chan.close()
  }
}
export function* watchIncrementAsync() {
  try {
    while (true) {
      const action = yield take(INCREMENT_ASYNC)
      // starts a 'Race' between an async increment and a user cancel action
      // if user cancel action wins, the incrementAsync will be cancelled automatically
      yield race([call(incrementAsync, action), take(CANCEL_INCREMENT_ASYNC)])
    }
  } finally {
    console.log('watchIncrementAsync terminated')
  }
}
export function cancelFetchPostsApi(reddit) {
  return eventChannel(listener => {
    try{
      setTimeout(function(){
        fetch(`../${reddit}.json`)
        .then(response => response.json())
        .then(json => {
          listener(json)
        })
      }, 5000)
    } catch(e) {
      listener(END)
    }
    return () => {
      console.log('Event channel for cancelFetchPostsApi started')
    }
  })
}
export function* cancelFetchPosts(reddit) {
  const chan = yield call(cancelFetchPostsApi, reddit)
  try {
    var posts = yield take(chan);
  } finally {
    if (!(yield cancelled())) {
      yield put(receivePosts(reddit, posts))
    }
    chan.close()
  }
}
export function fetchPostsApi(reddit) {
  return fetch(`../${reddit}.json`)
    .then(response => response.json())
}
export function* fetchPosts(reddit) {
  yield put(requestPosts(reddit))
  const posts = yield call(fetchPostsApi, reddit)
  yield put(receivePosts(reddit, posts))
}
export function* invalidateReddit() {
  while (true) {
    const { reddit } = yield take(INVALIDATE_REDDIT)
    yield call(fetchPosts, reddit)
  }
}
export function* nextRedditChange() {
  while (true) {
    const prevReddit = yield select(selectedRedditSelector)
    yield take(SELECT_REDDIT)

    const newReddit = yield select(selectedRedditSelector)
    const postsByReddit = yield select(postsByRedditSelector)
    if (prevReddit !== newReddit && !postsByReddit[newReddit]) yield fork(fetchPosts, newReddit)
  }
}
export function* startup() {
  try {
    while (true) {
      yield take(INCREMENT_FETCH)
      const selectedReddit = yield select(selectedRedditSelector)
      yield race([call(cancelFetchPosts, selectedReddit), take(CANCEL_INCREMENT_FETCH)])
    }
  } finally {
    console.log('startup terminated')
  }
}
export default function* rootSaga() {
  yield fork(watchIncrementAsync)
  yield fork(startup)
  yield fork(nextRedditChange)
  yield fork(invalidateReddit)
}