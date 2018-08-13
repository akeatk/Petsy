export const getUser = (userId) => (
  $.ajax({
    method:'get',
    url:`/api/users/${userId}`
  })
);

export const editUser = (userId) =>(
  $.ajax({
    method:'get',
    url:`/api/users/${userId}/edit`
  })
);

export const updateUser=user=>(
  $.ajax({
    method:'patch',
    url:`/api/users/${user.id}`,
    data:{user}
  })
);

export const getUsername=(username)=>(
  $.ajax({
    method:'get',
    url:`/api/users/${-1}`,
    data:{user:{username}}
  })
)
