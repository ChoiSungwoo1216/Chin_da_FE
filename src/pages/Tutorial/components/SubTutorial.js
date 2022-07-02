import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './SubTutorial.css';
import styled from 'styled-components';
// import required modules
import { Pagination, Navigation } from 'swiper';

export default function SubTutorial(props) {
   const { setTutoOpen } = props
   return (
      <>
         <Background onClick={() => setTutoOpen(false)} />

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
               <div class="xBtn" onClick={() => setTutoOpen(false)}>
                  <img src="/img/X_btn_white_30.png" />
               </div>

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
const Background = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background-color: rgba(255,255,255,0.15);
    backdrop-filter: blur(5px);
    z-index: 10;
    `;