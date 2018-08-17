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

export const createItem = (formData)=>(
  $.ajax({
    method:'post',
    url:'/api/items',
    data:formData,
    contentType:false,
    processData:false
  })
);

export const getEditItem=itemId=>(
  $.ajax({
    method:'get',
    url:`/api/items/${itemId}/edit`
  })
);

export const updateItem = (formData)=>(
  $.ajax({
    method:'patch',
    url:`/api/items/${formData.get('item[id]')}`,
    data:formData,
    contentType:false,
    processData:false
  })
);

export const deleteItem=(itemId)=>(
  $.ajax({
    method:'delete',
    url:`/api/items`
  })
);
