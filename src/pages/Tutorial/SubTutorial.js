import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './SubTutorial.css';
// import required modules
import { Pagination, Navigation } from 'swiper';
import Battle from './../Battle/Battle';

export default function SubTutorial() {
    const navigate = useNavigate();
    const PlayGame = () => {
        navigate('../Battle/Battle');
    }

   return (
      <>
         <div className="Container">
            <Swiper
               pagination={{
                  type: 'progressbar',
               }}
               navigation={true}
               modules={[Pagination, Navigation]}
               className="mySwiper"
               style={{ color: '#000' }}
            >
               <SwiperSlide>
                  <div class="InputContainer">
                     <h3>문제 난이도</h3>

                     <ul>
                        <li>
                           <input type="radio" id="f-option" name="selector" />
                           <label for="f-option">Easy</label>
                           <div class="check"></div>
                        </li>

                        <li>
                           <input type="radio" id="t-option" name="selector" />
                           <label for="t-option">Hard</label>
                           <div class="check">
                              <div class="inside"></div>
                           </div>
                        </li>
                     </ul>
                  </div>
               </SwiperSlide>
               <SwiperSlide>
                  <h3>상대방 선택하는 것에 대한 설명</h3>
               </SwiperSlide>
               <SwiperSlide>
                  <h3>대결방 안에 대한 설명</h3>
               </SwiperSlide>
               <SwiperSlide>
                  <h3>Slide 4</h3>
               </SwiperSlide>
               <SwiperSlide>
                  <h3>Slide 5</h3>
               </SwiperSlide>
               <SwiperSlide>
                  <h3>
                     Slide 6<button onClick="PlayGame">PLAY</button>
                  </h3>
               </SwiperSlide>
            </Swiper>
         </div>
      </>
   );
}
