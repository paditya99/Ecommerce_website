import React from 'react'
import "./ReviewCard.css";
import profileimg from '../../images/profileimg.png'
import ReactStars from 'react-rating-stars-component'

const ReviewCard = ({review}) => {

    const options={
        edit: false,
        value: review.rating,
        color: "rgba(20,20,20,0.2)",
        activeColor: "tomato",
        isHalf: true,
        size: window.innerWidth < 600? 15:18
      }

  return (
   
    <div class="container">
    
    <ul class="hash-list cols-3 cols-1-xs pad-30-all align-center text-sm">
        <li>
          <img src={profileimg} class="wpx-100 img-round mgb-20" title="" alt="" data-edit="false" data-editor="field" data-field="src[Image Path]; title[Image Title]; alt[Image Alternate Text]"></img>
          <p class="fs-110 font-cond-l" contenteditable="false">{review.comment}</p>
          <h5 class="font-cond mgb-5 fg-text-d fs-130" contenteditable="false">{review.name}</h5>
          <div className='stars'>
            <ReactStars {...options}></ReactStars>
          </div>
        </li>
        
      </ul>
     
      
</div>

  )
}

export default ReviewCard