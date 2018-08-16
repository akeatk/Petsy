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

export const updateUser=formData=>{
  let userId = formData.get('user[id]');
  return $.ajax({
    method:'patch',
    url:`/api/users/${userId}`,
    data:formData,
    contentType:false,
    processData:false
  });
};

export const getUsername=(username)=>(
  $.ajax({
    method:'get',
    url:`/api/users/${-1}`,
    data:{user:{username}}
  })
);
