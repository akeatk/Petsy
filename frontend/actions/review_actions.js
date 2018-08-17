import * as ReviewUtil from '../util/review_util';

export const RECEIVE_REVIEW='RECEIVE_REVIEW';
export const DELETE_REVIEW='DELETE_REVIEW';

const receiveReview=(review)=>({
  type:RECEIVE_REVIEW,
  review
});

const deleteReview=(reviewId)=>({
  type:DELETE_REVIEW,
  reviewId
});

export const createReview=(review)=>dispatch
  ReviewUtil.createReview(review)
    .then((review)=>dispatch(receiveReview(review)));

export const updateReview=(review)=>dispatch
  ReviewUtil.updateReview(review)
    .then((review)=>dispatch(receiveReview(review)));

export const deleteReview=(reviewId)=>dispatch
  ReviewUtil.deleteReview(reviewId)
    .then(()=>dispatch(deleteReview(reviewId));
