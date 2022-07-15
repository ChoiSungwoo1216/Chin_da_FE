import React,{ useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import './Main.css';
// import { loadChannelAxios } from "../../redux/modules/channel";

import effectSound from '../../shared/effectSound';
import selectSound from '../../audios/btnselect.mp3';
import enterSound from '../..//audios/SelectionRoomClickSE1.mp3';
import hoverSound from '../../audios/BtnHoverSE1.mp3';

export function Main () {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const [user2Info, setUser2Info] = useState({});
   const user = {
      userName: 'player1',
      userCharacter: '/img/mainUser1Img.png',
      userWin: '1',
      userLose: '2',
   };
   const showUserImg = useState(true);
   const languageImg = [
      '/img/miniPython3.svg',
      '/img/miniJava.svg',
      '/img/miniJs.svg',
   ];
   const levelImg = [
      '/img/miniStar1.svg',
      '/img/miniStar2.svg',
      '/img/miniStar3.svg',
   ];
   const [allUsers, setAllUsers] = useState([]);
   const [page, setPage] = useState(1);
   const [loading, setLoading] = useState(false);
   const [ref, inView] = useInView();

   const userSound = useSelector((state) => state.user.sound);
   const es = effectSound(selectSound, userSound.es);
   const hoverEs = effectSound(hoverSound, userSound.es);
   const enterEs = effectSound(enterSound, userSound.es);

   const selected = useSelector((state) => state.user.selected);
   const language = selected.language;
   const level = selected.level;
   // 백이랑 이걸 숫자로 보낼지, 문자열로 보낼지 합의 (현재는 문자열)
   React.useEffect(() => {
      // dispatch(loadChannelAxios(language, level));
   }, []);

   // getItems:서버에서 아이템을 가지고 오는 함수
   const getItems = useCallback(
      async (page) => {
         setLoading(true);
         await axios
            .get('http://localhost:5001/page')
            .then((response) => {
               setAllUsers((prevState) => [...prevState, ...response.data]);
            });
               setLoading(false);
      },[page]);

   // getItems가 바뀔때마다 함수 실행
   React.useEffect(() => {
      getItems(page);
   }, [getItems]);
   
   // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면 setPage실행
   React.useEffect(() => {
      if (inView && !loading) {
         setPage((prevState) => prevState + 1);
      }
   }, [inView, loading]);

   const EnterBattle = () => {
      enterEs.play();
      navigate(`/battle/${user2Info.channelId}`);
   };
   const goSelection = () => {
      hoverEs.play();
      navigate('/selection');
   };
   return (
      <>
         <div className="mainContainer">
            <main>
               <div
                  className="mainNavBar"
                  style={{
                     background: 'url(/img/mainNavBar.svg)',
                     backgroundRepeat: 'no-repeat',
                     backgroundPosition: 'center',
                     objectFit: 'cover',
                  }}
               >
                  <div>
                     <img
                        className="languageImg"
                        src={languageImg[language]}
                        onClick={goSelection}
                        alt=""
                     />
                     <img
                        className="levelImg"
                        src={levelImg[level]}
                        onClick={goSelection}
                        alt=""
                     />
                  </div>
               </div>
               <article className="article">
                  <div className="profileContainer">
                     <div
                        className="profile"
                        style={{
                           background: 'url(/img/mainCardPlayer.svg)',
                        }}
                     >
                        <div
                           className="thumbnail circle"
                           style={{ backgroundImage: `${user.userImg}` }}
                        ></div>
                        <div className="description">
                           <tr className="content">이름: {user.userName}</tr>
                           <tr className="content">WIN: {user.userWin}</tr>
                           <tr className="content">LOSE: {user.userLose}</tr>
                        </div>
                     </div>
                  </div>

                  <img id="player1" src={user.userCharacter} alt="" />
               </article>

               <aside className="aside">
                  <div
                     className="profile2"
                     style={{
                        background: 'url(/img/mainCardPlayer.svg)',
                     }}
                  >
                     <div
                        className="thumbnail circle"
                     ></div>
                     <div className="description">
                        <tr className="content2">이름: {user2Info.userName}</tr>
                        <tr className="content2">WIN: {user2Info.userWin}</tr>
                        <tr className="content2">LOSE: {user2Info.userLose}</tr>
                     </div>
                  </div>
                  {showUserImg ? (
                     <img id="player2" src={user2Info.userCharacter} alt="" />
                  ) : null}
               </aside>
            </main>

            <section>
               <div className="cardContainer">
                  {allUsers.length > 0 &&
                     allUsers.map((item, idx) => {
                        return (
                           <React.Fragment key={idx}>
                              {allUsers.length - 1 === idx ? (
                                 <div
                                    ref={ref}
                                    className="scene"
                                    onClick={() => {
                                       setUser2Info(allUsers[idx]);
                                    }}
                                 >
                                    <div className="card">
                                       <div
                                          className="face front"
                                          style={{
                                             backgroundImage:
                                                'url(/img/mainCard_F.svg)',
                                             backgroundRepeat: 'no-repeat',
                                             backgroundPosition: 'center',
                                             objectFit: 'cover',
                                          }}
                                       >
                                          <img
                                             className="thumbnailImg"
                                             src={item.userImg}
                                             alt="none"
                                          />
                                       </div>
                                       <div
                                          className="face back"
                                          style={{
                                             backgroundImage:
                                                'url(/img/mainCard_B.svg)',
                                             backgroundRepeat: 'no-repeat',
                                             backgroundPosition: 'center',
                                             objectFit: 'cover',
                                          }}
                                          onClick={() => {
                                             hoverEs.play();
                                          }}
                                       >
                                          <p>{item.userName}</p>
                                          <p>
                                             {item.userWin}승{item.userLose}패
                                          </p>
                                       </div>
                                    </div>
                                 </div>
                              ) : (
                                 <div
                                    className="scene"
                                    onClick={() => {
                                       setUser2Info(allUsers[idx]);
                                    }}
                                 >
                                    <div className="card">
                                       <div
                                          className="face front"
                                          style={{
                                             backgroundImage:
                                                'url(/img/mainCard_F.svg)',
                                             backgroundRepeat: 'no-repeat',
                                             backgroundPosition: 'center',
                                             objectFit: 'cover',
                                          }}
                                       >
                                          <img
                                             className="thumbnailImg"
                                             src={item.userImg}
                                             alt="none"
                                          />
                                       </div>
                                       <div
                                          className="face back"
                                          style={{
                                             backgroundImage:
                                                'url(/img/mainCard_B.svg)',
                                             backgroundRepeat: 'no-repeat',
                                             backgroundPosition: 'center',
                                             objectFit: 'cover',
                                          }}
                                          onClick={() => {
                                             hoverEs.play();
                                          }}
                                       >
                                          <p>{item.userName}</p>
                                          <p>
                                             {item.userWin}승 {item.userLose}패
                                          </p>
                                       </div>
                                    </div>
                                 </div>
                              )}
                           </React.Fragment>
                        );
                     })}
               </div>
               <div
                  className="btnCard"
                  style={{
                     backgroundImage: 'url(/img/mainBtnCard.svg)',
                     backgroundRepeat: 'no-repeat',
                     backgroundPosition: 'center',
                     objectFit: 'cover',
                  }}
               >
                  <h3>Find More</h3>

                  <img id="btnClick" src="/img/btnClick.svg" alt="none" />

                  <h3>Game Start</h3>

                  <img
                     id="btnEnter"
                     onClick={EnterBattle}
                     src="/img/btnEnter.svg"
                     alt="none"
                  />
                  <img
                     id="reloadBtn"
                     onClick={() => {
                        hoverEs.play();
                        window.location.reload();
                     }}
                     src="/img/reloadBtn_black.svg"
                     alt=""
                  />
               </div>
            </section>
         </div>
         <img className="txtVS" src="/img/txt_vs.svg" alt="none" />
      </>
   );
}

export default Main;

