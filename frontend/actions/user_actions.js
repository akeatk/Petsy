import * as UserAPIUtil from '../util/user_util';

export const RECEIVE_USER = 'RECEIVE_USER';

const receiveUser = user=>({
  type:RECEIVE_USER,
  user
});


export const getUser=userId=>dispatch=>
  UserAPIUtil.getUser(userId)
    .then(user=>dispatch(receiveUser(user)));

export const editUser=userId=>dispatch=>
  UserAPIUtil.editUser(userId)
    .then(user=>dispatch(receiveUser(user)));

export const updateUser=formData=>dispatch=>
  UserAPIUtil.updateUser(formData)
    .then(user=>dispatch(receiveUser(user)));

export const getUsername=username=>dispatch=>
  UserAPIUtil.getUsername(username)
    .then(user=>dispatch(receiveUser(user)));
