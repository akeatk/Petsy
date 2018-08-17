export const createReview=(review)=>(
  $.ajax({
    method:'post',
    url:'/api/reviews',
    data:{review}
  })
);

export const updateReview=(review)=>(
  $.ajax({
    method:'patch',
    url:`/api/reviews/${review.id}`,
    data:{review}
  })
);

export const deleteReview=(reviewId)=>(
  $.ajax({
    method:'delete',
    url:`/api/reviews/${reviewId}`,
  })
);
