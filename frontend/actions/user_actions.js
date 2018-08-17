import * as UserAPIUtil from '../util/user_util';

export const RECEIVE_USER = 'RECEIVE_USER';

const receiveUser = payload=>({
  type:RECEIVE_USER,
  payload
});


export const getUser=userId=>dispatch=>
  UserAPIUtil.getUser(userId)
    .then(payload=>dispatch(receiveUser(payload)));

export const editUser=userId=>dispatch=>
  UserAPIUtil.editUser(userId)
    .then(payload=>dispatch(receiveUser(payload)));

export const updateUser=formData=>dispatch=>
  UserAPIUtil.updateUser(formData)
    .then(payload=>dispatch(receiveUser(payload)));

export const getUsername=username=>dispatch=>
  UserAPIUtil.getUsername(username)
    .then(payload=>dispatch(receiveUser(payload)));
