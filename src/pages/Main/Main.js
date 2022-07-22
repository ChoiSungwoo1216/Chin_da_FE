import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { useInView } from 'react-intersection-observer';
import './Main.css';
import effectSound from '../../shared/effectSound';
import selSound from '../../audios/MainCardSelectSE1.mp3';
import entSound from '../..//audios/MainStartSE1.mp3';
import hoverSound from '../../audios/BtnHoverSE1.mp3';

export function Main() {
   const navigate = useNavigate();
   const api = process.env.REACT_APP_API;
   const Authorization = sessionStorage.getItem("Authorization")

   const [user2Info, setUser2Info] = useState({
      creatorGameInfo: {
         playerName: '',
         profileUrl: '',
         winCnt: '',
         loseCnt: '',
      },
   });
   const user = {
      userName: sessionStorage.getItem("username"),
      userCharacter: sessionStorage.getItem("profile"),
      userWin: sessionStorage.getItem("winCnt"),
      userLose: sessionStorage.getItem("loseCnt"),
   };
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
            setAllUsers(response.data);
            // setAllUsers((prevState) => [...prevState, ...response.data]);
         })
         .catch((error) => {
            console.log(error);
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
            navigate(`/battle/${user2Info.roomId}`, {
               state: user2Info,
            });
         })
         .catch((error) => {
            console.log(error);
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
   const [ranImg, setRanImg] = React.useState('');
   let rArr = [3, 2, 0, 1, 2, 3, 2, 0, 1, 2];
   const randomImg = (index, rArr) => {
      let img = [
         '/img/ch1.svg',
         '/img/ch2.svg',
         '/img/mainUser2Img.png',
         '/img/mainUser2Img2.png',
      ];
      if (index >= 10) {
         return img[rArr[index % 10]];
      } else {
         return img[rArr[index]];
      }
   };

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
                  <img className="thumbnail" src={user.userCharacter} alt="" />
                  <div className="description">
                     <p>{user.userName}</p>
                     <p>WIN: {user.userWin}</p>
                     <p>LOSE: {user.userLose}</p>
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
                  <img id="player1" src="/img/ch1.svg" alt="" />
               </article>

               {user2Info.creatorGameInfo.profileUrl !== '' && (
                  <img
                     id="player2"
                     src={ranImg}
                     alt=""
                     onError={(e) => (e.target.style.display = 'none')}
                  />
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
                                       setRanImg(randomImg(idx, rArr));
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
                                             backgroundSize: 'contain',
                                          }}
                                       >
                                          <img
                                             className="characterImg"
                                             src={randomImg(idx, rArr)}
                                             alt=""
                                          />
                                       </div>
                                       <div
                                          className="face back"
                                          style={{
                                             backgroundImage:
                                                'url(/img/mainCard_B.svg)',
                                             backgroundRepeat: 'no-repeat',
                                             backgroundPosition: 'center',
                                             objectFit: 'contain',
                                          }}
                                          onClick={() => {
                                             selEs.play();
                                          }}
                                       >
                                          <img
                                             src={
                                                item.creatorGameInfo.profileUrl
                                             }
                                             alt=""
                                          />
                                          <p>
                                             {item.creatorGameInfo.playerName}
                                          </p>
                                          <p>
                                             {item.creatorGameInfo.winCnt}승
                                             {item.creatorGameInfo.loseCnt}패
                                          </p>
                                       </div>
                                    </div>
                                 </div>
                              ) : ( */}
                              <div
                                 className="scene"
                                 onClick={() => {
                                    setUser2Info(allUsers[idx]);
                                    setRanImg(randomImg(idx, rArr));
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
                                          objectFit: 'contain',
                                       }}
                                    >
                                       <img
                                          className="characterImg"
                                          src={randomImg(idx, rArr)}
                                          alt=""
                                       />
                                    </div>
                                    <div
                                       className="face back"
                                       style={{
                                          backgroundImage:
                                             'url(/img/mainCard_B.svg)',
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
                                          src={
                                             item.creatorGameInfo.profileUrl
                                          }
                                          alt=""
                                       />
                                       <p>
                                          {item.creatorGameInfo.playerName}
                                       </p>
                                       <p>
                                          {item.creatorGameInfo.winCnt}승{' '}
                                          {item.creatorGameInfo.loseCnt}패
                                       </p>
                                    </div>
                                 </div>
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
