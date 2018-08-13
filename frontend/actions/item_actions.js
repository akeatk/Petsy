import * as ItemAPIUtil from '../util/item_util';

export const RECEIVE_ITEM = 'RECEIVE_ITEM';
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';

const receiveItem = item=>({
  type:RECEIVE_ITEM,
  item
});

const receiveItems = items=>({
  type:RECEIVE_ITEMS,
  items
});

export const getItems=()=>dispatch=>
  ItemAPIUtil.getItems()
    .then(items=>dispatch(receiveItems(items)));

export const getItem=userId=>dispatch=>
  ItemAPIUtil.getItem(userId)
    .then(item=>dispatch(receiveItem(item)));

export const editItem=itemId=>dispatch=>
  ItemAPIUtil.editItem(itemId)
    .then(item=>dispatch(receiveItem(item)));

export const updateItem=item=>dispatch=>
  ItemAPIUtil.updateItem(item)
    .then(item=>dispatch(receiveItem(item)));

export const deleteItem=itemId=>dispatch=>
  ItemAPIUtil.deleteItem(itemId);
