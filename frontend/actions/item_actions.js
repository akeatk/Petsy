import * as ItemAPIUtil from '../util/item_util';

export const RECEIVE_ITEM = 'RECEIVE_ITEM';
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';

const receiveItem = payload=>({
  type:RECEIVE_ITEM,
  payload
});

const receiveItems = items=>({
  type:RECEIVE_ITEMS,
  items
});

export const getItems=(sortType,page)=>dispatch=>
  ItemAPIUtil.getItems(sortType,page)
    .then(items=>dispatch(receiveItems(items)));

export const getItem=userId=>dispatch=>
  ItemAPIUtil.getItem(userId)
    .then(item=>dispatch(receiveItem(item)));

export const createItem=item=>dispatch=>
  ItemAPIUtil.createItem(item)
    .then(item=>dispatch(receiveItem(item)));

export const updateItem=item=>dispatch=>
  ItemAPIUtil.updateItem(item)
    .then(item=>dispatch(receiveItem(item)));

export const deleteItem=itemId=>dispatch=>
  ItemAPIUtil.deleteItem(itemId);
