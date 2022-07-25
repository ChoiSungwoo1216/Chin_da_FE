import React from 'react';
import styled from 'styled-components';

import './SubTutorial.css';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination, Navigation, Mousewheel, Keyboard } from 'swiper';
export default function SubTutorial(props) {
   const { setTutoOpen } = props;

   return (
      <>
         <Background onClick={() => setTutoOpen(false)} />

         <div className="Container">
            <Swiper
               cssMode={true}
               pagination={true}
               navigation={true}
               mousewheel={true}
               keyboard={true}
               modules={[Pagination, Navigation, Mousewheel, Keyboard]}
               className="mySwiper"
               style={{ color: '#000' }}
            >
               <div class="xBtn" onClick={() => setTutoOpen(false)}>
                  <ExitBtn src="/img/X_btn_black_30.svg" />
               </div>

               <SwiperSlide>
                  <img src="/img/selection.jpg" alt="" />
               </SwiperSlide>
               <SwiperSlide>
                  <img src="/img/selection.jpg" alt="" />
               </SwiperSlide>
               <SwiperSlide>
                  <img src="/img/selection.jpg" alt="" />
               </SwiperSlide>
               <SwiperSlide>
                  <img src="/img/selection.jpg" alt="" />
               </SwiperSlide>
               <SwiperSlide>
                  <img src="/img/selection.jpg" alt="" />
               </SwiperSlide>
               <SwiperSlide>
                  <img src="/img/selection.jpg" alt=''/>
               </SwiperSlide>
            </Swiper>
         </div>
      </>
   );
}
const Background = styled.div`
   position: fixed;
   width: 100%;
   height: 100%;
   top: 0;
   background-color: rgba(255, 255, 255, 0.15);
   backdrop-filter: blur(5px);
   z-index: 10;
`;
const ExitBtn = styled.img`
   position: absolute;
   top: calc((2.7vw + 2.7vh) / 8.5 * -1);
   right: calc((2.7vw + 2.7vh) / 8.5 * -1);
   width: calc((2.7vw + 2.7vh) / 2);
   height: calc((2.7vw + 2.7vh) / 2);
   z-index: 12;

   @keyframes push {
      50% {
         transform: scale(0.98);
      }
      100% {
         transform: scale(1);
      }
   }
   &:hover {
      content: url(/img/X_btn_white_30.svg);
      cursor: pointer;
      animation-name: push;
      animation-duration: 0.5s;
      animation-timing-function: ease-in;
      animation-iteration-count: 1;
   }
`;
