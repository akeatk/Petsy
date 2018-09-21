import * as ReviewUtil from '../util/review_util';

export const RECEIVE_REVIEW='RECEIVE_REVIEW';
export const DELETE_REVIEW='DELETE_REVIEW';

const receiveReview=(review)=>({
  type:RECEIVE_REVIEW,
  review
});

const deleteReview=()=>({
  type:DELETE_REVIEW
});

export const createReview=(review)=> dispatch =>
  ReviewUtil.createReview(review)
    .then((reviews)=>dispatch(receiveReview(reviews)));

export const updateReview=(review)=> dispatch =>
  ReviewUtil.updateReview(review)
    .then((reviews)=>dispatch(receiveReview(reviews)));

export const removeReview=(reviewId)=> dispatch =>
  ReviewUtil.deleteReview(reviewId)
    .then(()=>dispatch(deleteReview()));
