import React from 'react';
import styled from 'styled-components';

import './SubTutorial.css';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';
// import required modules
import { Pagination, Navigation, Mousewheel, Keyboard } from 'swiper';
export default function SubTutorial(props) {
   const navigate = useNavigate();
   const { setTutoOpen } = props
   
   const PlayGame = () => {
      navigate('../../Main/Main')
   }
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
                  <img src="/img/X_btn_black_30.png" />
               </div>

               <SwiperSlide>
                  <img src="/img/selection.jpg" />
               </SwiperSlide>
               <SwiperSlide>
                  <img src="/img/selection.jpg" />
               </SwiperSlide>
               <SwiperSlide>
                  <img src="/img/selection.jpg" />
               </SwiperSlide>
               <SwiperSlide>
                  <img src="/img/selection.jpg" />
               </SwiperSlide>
               <SwiperSlide>
                  <img src="/img/selection.jpg" />
               </SwiperSlide>
               <SwiperSlide>
                  <img src="/img/selection.jpg" />
                  <button className="PlayBtn" onClick="PlayGame">
                     PLAY
                  </button>
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
    background-color: rgba(255,255,255,0.15);
    backdrop-filter: blur(5px);
    z-index: 10;
`;
