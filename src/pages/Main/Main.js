import React,{useState} from "react";
import './Main.css';
import { useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import {useParams, useNavigate} from "react-router-dom";

// import { loadChannelAxios } from "../../redux/modules/channel"

export function Main () {

   const [userImg,setUserImg] = useState();
   const [userName, setUserName] = useState();
   const [userWin, setUserWin] = useState();
   const [userLose, setUserLose] = useState();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const channelList = useSelector((state) => state.channel.list);
   // console.log(channelList);
   // 백이랑 이걸 숫자로 보낼지, 문자열로 보낼지 합의 (현재는 문자열)
   // const { state } = useLocation();
   // const language = state.language;
   // const level = state.level;
   // console.log(language, level);
   //    React.useEffect(() => {
   //       dispatch(loadChannelAxios(language, level));
   //   }, [])
  let {userId} = useParams();
   return (
      <>
         <div className="mainContainer">
            <main>
               <section>
                  <article className="article">
                     <h3 className="txt">player1</h3>
                     <div className="profile">
                        <div className="thumbnail circle"></div>
                        <div className="description">
                           <p className="content">이름 : player1</p>
                           <p className="content">승/패</p>
                        </div>
                     </div>
                  </article>
                  <aside className="aside">
                     <h3 className="txt2">player2</h3>
                     <div className="profile2">
                        <div
                           className="thumbnail circle"
                           onChange={userImg}
                        ></div>
                        <div className="description">
                           <p className="content2">이름: {userName}</p>
                           <p className="content2">
                              {userWin}승/{userLose}패
                           </p>
                        </div>
                     </div>
                  </aside>
               </section>
            </main>
            <section className="section2">
               <div className="cardContainer">
                  {channelList &&
                     channelList.map((list, idx) => {
                        return (
                           <div
                              className="scene"
                              key={idx}
                              onClick={() => {
                                 let copy = [...list.userImg];
                                 let copy1 = [...list.userName];
                                 let copy2 = [...list.userWin];
                                 let copy3 = [...list.userLose];
                                 navigate(
                                    '/Main/' + list.userId,
                                    setUserImg(copy),
                                    setUserName(copy1),
                                    setUserWin(copy2),
                                    setUserLose(copy3)
                                 );
                              }}
                           >
                              <div className="card">
                                 <div className="face front">
                                    <img
                                       className="thumbnailImg"
                                       src={list.userImg}
                                       alt="none"
                                    />
                                 </div>
                                 <div className="face back">
                                    <p>{list.userName}</p>
                                    <p>
                                       {list.userWin}승 {list.userLose}패
                                    </p>
                                 </div>
                              </div>
                           </div>
                        );
                     })}
                  <img
                     className="reloadBtn"
                     src="/img/reloadBtn_black.png"
                     alt="none"
                  />
               </div>
            </section>
         </div>
      </>
   );
}

export default Main = React.memo(Main);

