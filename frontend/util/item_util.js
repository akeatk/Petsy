export const getItems = (sortType,page)=>(
  $.ajax({
    method:'get',
    url:`/api/items/`,
    data:{sortType,page}
  })
);

export const getItem = (itemId)=>(
  $.ajax({
    method:'get',
    url:`api/items/${itemId}`
  })
);

export const createItem = (item)=>(
  $.ajax({
    method:'post',
    url:'/api/items',
    data:{item}
  })
);

export const updateItem = (item)=>(
  $.ajax({
    method:'patch',
    url:`/api/items/${itemId}`,
    data:{item}
  })
);

export const deleteItem=(itemId)=>(
  $.ajax({
    method:'delete',
    url:`/api/items`
  })
);
