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

export const updateCartItems = (user_id,cart_items)=>(
  $.ajax({
    method:'patch',
    url:`/api/cart_items/${undefined}`,
    data:{user_id, cart_items}
  })
);
