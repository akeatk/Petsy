export const getCartItems = user_id=>(
  $.ajax({
    method:'get',
    url:'/api/cart_items',
    data:{user_id}
  })
);

export const createCartItem = cart_item=>(
  $.ajax({
    method:'post',
    url:'/api/cart_items',
    data:{cart_item}
  })
);

export const updateCartItems = (cart_items)=>(
  $.ajax({
    method:'patch',
    url:`/api/cart_items/${undefined}`,
    data:{cart_items}
  })
);


export const deleteCartItem = id=>(
  $.ajax({
    method:'delete',
    url:`/api/cart_items/${id}`
  })
);
