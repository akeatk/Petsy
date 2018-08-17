import React from 'react';

// class ProfImg extends React.Component{
//   constructor(props){
//     super(props);
//
//     let img = new Image();
//     img.src = src;
//     let divStyle={
//       minWidth:length,
//       maxWidth:length,
//       width:length,
//       minHeight:length,
//       maxHeight:length,
//       height:length
//     };
//   }
// }

export const ProfImg=({src,round,className='',length,onClick})=>{
  let img = new Image();
  img.src = src;
  let divStyle={
    minWidth:length,
    maxWidth:length,
    width:length,
    minHeight:length,
    maxHeight:length,
    height:length
  };
  if(img.height > img.width)
    return (
      <div id='tall-image'
        className={(round ? 'round prof-img ' : 'prof-img ')+className}
        style={divStyle} onClick={onClick}>
        <img src={src} style={{width:length}}/>
      </div>
    );
  return (
    <div id='flat-image'
      className={(round ? 'round prof-img ' : 'prof-img ')+className}
      style={divStyle} onClick={onClick}>
      <img src={src} style={{height:length}}/>
    </div>
  );
}
