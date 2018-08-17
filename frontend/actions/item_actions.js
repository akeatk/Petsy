import * as ItemAPIUtil from '../util/item_util';

export const RECEIVE_ITEM = 'RECEIVE_ITEM';
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';
export const RECEIVE_ITEM_ERRORS = 'RECEIVE_ITEM_ERRORS';

const receiveItem = payload=>({
  type:RECEIVE_ITEM,
  payload
});

const receiveItems = items=>({
  type:RECEIVE_ITEMS,
  items
});

const receiveEditItem = item=>({
  type:RECEIVE_EDIT_ITEM,
  item
});

export const getItems=(sortType,page)=>dispatch=>
  ItemAPIUtil.getItems(sortType,page)
    .then(items=>dispatch(receiveItems(items)));

export const getItem=userId=>dispatch=>
  ItemAPIUtil.getItem(userId)
    .then(item=>dispatch(receiveItem(item)));

export const getEditItem=userId=>dispatch=>
  ItemAPIUtil.getEditItem(userId)
    .then(item=>dispatch(receiveEditItem));

export const createItem=item=>dispatch=>
  ItemAPIUtil.createItem(item)
    .then(item=>dispatch(receiveItem(item)),
      (errors)=>dispatch(receiveItemErrors));

export const updateItem=item=>dispatch=>
  ItemAPIUtil.updateItem(item)
    .then(item=>dispatch(receiveItem(item)),
      (errors)=>dispatch(receiveItemErrors));

export const deleteItem=itemId=>dispatch=>
  ItemAPIUtil.deleteItem(itemId);

export const receiveItemErrors=(errors)=>({
  type:RECEIVE_ITEM_ERRORS,
  errors:errors.responseJSON
});
