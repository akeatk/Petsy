import React from 'react';

export default (({score}) => (
  <div id='review-stars'>
    {
      [0,1,2,3,4].map((i)=>{
        if(score - i > 0.75)
          return <img key={i} src={window.images.fullStar}/>;
        if(score - i > 0.25)
          return <img key={i} src={window.images.halfStar}/>;
        return <img key={i} src={window.images.noStar}/>;
      })
    }
  </div>
));
