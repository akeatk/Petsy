import * as ItemAPIUtil from '../util/item_util';

export const RECEIVE_ITEM = 'RECEIVE_ITEM';
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';
export const RECEIVE_ITEM_ERRORS = 'RECEIVE_ITEM_ERRORS';
export const RECEIVE_EDIT_ITEM='RECEIVE_EDIT_ITEM';

const receiveItem = payload=>({
  type:RECEIVE_ITEM,
  payload
});

const receiveItems = payload=>({
  type:RECEIVE_ITEMS,
  payload
});

const receiveEditItem = payload=>({
  type:RECEIVE_EDIT_ITEM,
  payload
});

export const receiveItemErrors=(errors)=>({
type:RECEIVE_ITEM_ERRORS,
errors:errors.responseJSON
});

export const getItems=(sortType,offset)=> dispatch=>
  ItemAPIUtil.getItems(sortType,offset)
    .then(payload=>dispatch(receiveItems(payload)));

export const getItem=userId=> dispatch=>
  ItemAPIUtil.getItem(userId)
    .then(item=>dispatch(receiveItem(item)));

export const getEditItem=userId=> dispatch=>
  ItemAPIUtil.getEditItem(userId)
    .then(payload=>dispatch(receiveEditItem(payload)));

export const createItem=item=> dispatch=>
  ItemAPIUtil.createItem(item)
    .then(item=>dispatch(receiveItem(item)),
      (errors)=>dispatch(receiveItemErrors));

export const updateItem=item=> dispatch=>
  ItemAPIUtil.updateItem(item)
    .then(item=>dispatch(receiveItem(item)),
      (errors)=>dispatch(receiveItemErrors));

export const deleteItem=itemId=> dispatch=>
  ItemAPIUtil.deleteItem(itemId);
