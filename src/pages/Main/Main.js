import React, { useState, useCallback } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { useInView } from 'react-intersection-observer';
import './Main.css';
import effectSound from '../../shared/effectSound';
import selSound from '../../audios/MainCardSelectSE1.mp3';
import entSound from '../..//audios/MainStartSE1.mp3';
import hoverSound from '../../audios/BtnHoverSE1.mp3';

import { setRoomId } from '../../redux/modules/user';

const api = process.env.REACT_APP_API;
const Authorization = sessionStorage.getItem("Authorization")

export function Main() {
   const navigate = useNavigate();
   const dispatch = useDispatch();

    const [user1Info, setUser1Info] = useState({
      loseCnt: 0,
      playerName: "",
      profileUrl:"",
      winCnt: 0
    })
    console.log(user1Info)

   const [user2Info, setUser2Info] = useState({
      creatorGameInfo: {
         playerName: '',
         profileUrl: '',
         winCnt: '',
         loseCnt: '',
      },
   });

   const languageImg = [
      '/img/miniJava.svg',
      '/img/miniJs.svg',
      '/img/miniPython3.svg',
   ];
   const levelImg = [
      '/img/miniStar1.svg',
      '/img/miniStar2.svg',
      '/img/miniStar3.svg',
   ];
   const [allUsers, setAllUsers] = useState([]);



   //무한스크롤
   // const [page, setPage] = useState(1);
   // const [loading, setLoading] = useState(false);
   // const [ref, inView] = useInView();


   const [refresh, setRefresh] = useState(false);
   const userSound = useSelector((state) => state.user.sound);
   const selEs = effectSound(selSound, userSound.es);
   const hoverEs = effectSound(hoverSound, userSound.es);
   const entEs = effectSound(entSound, userSound.es);

   const selected = useSelector((state) => state.user.selected);
   const language = selected.language;
   const level = selected.level;

   function RandomNumber(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }

   // getItems:서버에서 아이템을 가지고 오는 함수
   const getItems = useCallback(async (language, level) => {
      const numLan = parseInt(language)
      const numLev = parseInt(level)
      // setLoading(true);
      await axios
         .get(`${api}/game/rooms`, {
            params: {
               "langIdx": numLan,
               "levelIdx": numLev,
            },
            headers: {
               "Authorization": Authorization
            }
         })
         .then((response) => {
            console.log(response.data);
            for (let i = 0; i < response.data.gameRooms.length; i++) {
               response.data.gameRooms[i].num = RandomNumber(0,5)
             }
            setAllUsers(response.data.gameRooms);
            setUser1Info(response.data.userGameInfo);
            // setAllUsers((prevState) => [...prevState, ...response.data]);
         })
         .catch((error) => {
            console.log(error);
            if (error.response.data.reLogin === true){
               sessionStorage.clear();
               localStorage.clear();
               window.location.replace('/');
            }
         });
      // setLoading(false);
   }, []
      // [page]
   );

   //방 입장
   const enterRoomAxios = async () => {
      await axios(
         {
            url: "/game/room/enter",
            method: "PUT",
            baseURL: api,
            data: {
               "roomId": user2Info.roomId,
               "server": user2Info.server
            },
            headers: {
               "Authorization": Authorization,
            },
         })
         .then((response) => {
            dispatch(setRoomId(user2Info.roomId))
            navigate(`/battle`, {
               state: user2Info,
            });
         })
         .catch((error) => {
            console.log(error);
            window.alert(error.response.data, " Refresh를 누르세요")
            if (error.response.data.reLogin === true){
               sessionStorage.clear();
               localStorage.clear();
               window.location.replace('/');
            }
         });
   }

   // getItems가 바뀔때마다 함수 실행
   React.useEffect(() => {
      getItems(language, level);
   }, [getItems, refresh, language, level]);

   // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면 setPage실행
   // React.useEffect(() => {
   //    if (inView && !loading) {
   //       setPage((prevState) => prevState + 1);
   //    }
   // }, [inView, loading]);

   const refreshBtn = () => {
      selEs.play();
      if (refresh) {
         setRefresh(false);
      } else {
         setRefresh(true);
      }
   };

   //페이지 이동
   const EnterBattle = () => {
      entEs.play();
      enterRoomAxios();
   };
   const goSelection = () => {
      hoverEs.play();
      navigate('/selection');
   };

   //캐릭터 표출
   const randomImg = [
         '/img/Char2.svg',
         '/img/Char3.svg',
         '/img/Char4.svg',
         '/img/Char5.svg',
         '/img/Char6.svg',
      ];

   const CharBody = [
      '/img/Char2Body.svg',
      '/img/Char3Body.svg',
      '/img/Char4Body.svg',
      '/img/Char5Body.svg',
      '/img/Char6Body.svg',
   ];

   const CharAni = [
      '/img/Char2Ani.svg',
      '/img/Char3Ani.svg',
      '/img/Char4Ani.svg',
      '/img/Char5Ani.svg',
      '/img/Char6Ani.svg',
   ];

   return (
      <>
         <div className="mainContainer">
            <main>
               <div
                  className="profile"
                  style={{
                     backgroundImage: 'url(/img/mainCardPlayer.svg)',
                     backgroundRepeat: 'no-repeat',
                     backgroundSize: 'contain',
                  }}
               >
                  <img className="thumbnail" src={user1Info.profileUrl} alt="" />
                  <div className="description">
                     <p>{user1Info.playerName}</p>
                     <p>WIN: {user1Info.winCnt}</p>
                     <p>LOSE: {user1Info.loseCnt}</p>
                  </div>
               </div>
               {user2Info.creatorGameInfo.profileUrl !== '' && (
                  <div
                     className="profile"
                     style={{
                        backgroundImage: 'url(/img/mainCardPlayer.svg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                     }}
                  >
                     <img
                        className="thumbnail"
                        src={user2Info.creatorGameInfo.profileUrl}
                        alt=""
                        onError={(e) => (e.target.style.display = 'none')}
                     />

                     <div className="description">
                        <p>{user2Info.creatorGameInfo.playerName}</p>
                        <p>WIN: {user2Info.creatorGameInfo.winCnt}</p>
                        <p>LOSE: {user2Info.creatorGameInfo.loseCnt}</p>
                     </div>
                  </div>
               )}
               <article className="article">
                  <div className="player1">
                     <img
                        className="player1 CharAni"
                        src="/img/Char1Ani.svg"
                        alt=""
                     />
                     <div className="player1 bullet1"></div>
                     <img
                        className="player1 CharBody"
                        src="/img/Char1Body.svg"
                        alt=""
                     />
                  </div>
               </article>

               {user2Info.creatorGameInfo.profileUrl !== '' && (
                  <div className="player2">
                     {user2Info.num < 2 && (
                        <>
                           <div className="player2 bullet2"></div>
                        </>
                     )}
                     <img
                        className={`CharAni${user2Info.num}`}
                        src={CharAni[user2Info.num]}
                        alt=""
                     />
                     {user2Info.num === 4 && (
                        <>
                           <div className="player2 light"></div>
                        </>
                     )}
                     <img
                        className={`CharBody${user2Info.num}`}
                        src={CharBody[user2Info.num]}
                        alt=""
                     />
                  </div>
               )}
            </main>

            <section className="mainSection">
               <div
                  className="nav"
                  style={{
                     background: 'url(/img/mainNavBar.svg)',
                     backgroundRepeat: 'no-repeat',
                     backgroundPosition: 'center',
                  }}
                  onClick={goSelection}
               >
                  <img
                     className="languageImg"
                     src={languageImg[language]}
                     alt=""
                  />

                  <img className="levelImg" src={levelImg[level]} alt="" />
               </div>
               <div className="cardContainer">
                  {allUsers.length > 0 ? (
                     allUsers.map((item, idx) => {
                        return (
                           <React.Fragment key={idx}>
                              {/* {allUsers.length - 1 === idx ? (
                                 <div
                                    ref={ref}
                                    className="scene"
                                    onClick={() => {
                                       setUser2Info(allUsers[idx]);
                                       setRanImg(randomImg(idx));
                                    }}
                                 >
                                <Cards />
                                 </div>
                              ) : ( */}
                              <div
                                 className="scene"
                                 onClick={() => {
                                    setUser2Info(allUsers[idx]);
                                 }}
                              >
                                 <Card
                                    className="card"
                                    randomImg={randomImg}
                                    selEs={selEs}
                                    item={item}
                                    idx={idx}
                                 />
                              </div>
                              {/* )} */}
                           </React.Fragment>
                        );
                     })
                  ) : (
                     <p className="empty">There's no user.</p>
                  )}
               </div>
               <div
                  className="btnCard"
                  style={{
                     backgroundImage: 'url(/img/mainBtnCard1.svg)',
                     backgroundRepeat: 'no-repeat',
                     backgroundPosition: 'center',
                     objectFit: 'cover',
                  }}
               >
                  <h3>Refresh</h3>

                  <img
                     id="btnClick"
                     src="/img/btnClick.svg"
                     alt="none"
                     onClick={refreshBtn}
                  />

                  <h3>Game Start</h3>

                  <img
                     id="btnEnter"
                     onClick={EnterBattle}
                     src="/img/btnEnter.svg"
                     alt="none"
                  />
               </div>
            </section>
         </div>
         <img className="txtVS" src="/img/txt_vs.svg" alt="" />
      </>
   );
}

export default Main;

const Card = (props) => {
   const { randomImg, selEs } = props;
   return (
      <div className="card">
         <div
            className="face front"
            style={{
               backgroundImage: 'url(/img/mainCard_F.svg)',
               backgroundRepeat: 'no-repeat',
               backgroundPosition: 'center',
               objectFit: 'contain',
            }}
         >
            <img className="characterImg" src={randomImg[props.item.num]} alt="" />
         </div>
         <div
            className="face back"
            style={{
               backgroundImage: 'url(/img/mainCard_B.svg)',
               backgroundRepeat: 'no-repeat',
               backgroundPosition: 'center',
               objectFit: 'contain',
            }}
            onClick={() => {
               selEs.play();
            }}
         >
            <img
               className="userProfile"
               src={props.item.creatorGameInfo.profileUrl}
               alt=""
            />
            <p>{props.item.creatorGameInfo.playerName}</p>
            <p>
               {props.item.creatorGameInfo.winCnt}승{props.item.creatorGameInfo.loseCnt}패
            </p>
         </div>
      </div>
   );
}