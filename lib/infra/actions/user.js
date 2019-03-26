export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const REQUEST_LOGOUT = 'REQUEST_LOGOUT'
export const REQUEST_INFO = 'REQUEST_INFO'
// mock
export function requestLogin() {
  return {
    type: REQUEST_LOGIN,
    payload: true
  }
}
// mock
export function requestLogout() {
  return {
    type: REQUEST_LOGOUT,
    payload: false
  }
}