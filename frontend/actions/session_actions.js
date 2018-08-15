import * as SessionAPIUtil from '../util/session_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

const receiveCurrentUser = user =>({
  type:RECEIVE_CURRENT_USER,
  user
});

const logoutCurrentUser = () =>({
  type:LOGOUT_CURRENT_USER
});

export const createUser=user=>dispatch=>
  SessionAPIUtil.postUser(user)
    .then((user)=>dispatch(receiveCurrentUser(user)),
      (errors)=>dispatch(receiveSessionErrors(errors)));

export const createSession=user=>dispatch=>
  SessionAPIUtil.postSession(user)
    .then((user)=>dispatch(receiveCurrentUser(user)),
      (errors)=>dispatch(receiveSessionErrors(errors)));

export const deleteSession= () =>dispatch=>
  SessionAPIUtil.deleteSession()
    .then(()=>dispatch(logoutCurrentUser()),
      (errors)=>dispatch(receiveSessionErrors(errors)));

export const guestLogin= () => dispatch =>
  SessionAPIUtil.postSession({field1:'guest@dot.com',password:'123094812309478'})
    .then((user)=>dispatch(receiveCurrentUser(user)),
      (errors)=>dispatch(receiveSessionErrors(errors)));

export const receiveSessionErrors=(errors)=>({
  type:RECEIVE_SESSION_ERRORS,
  errors:errors.responseJSON
});
