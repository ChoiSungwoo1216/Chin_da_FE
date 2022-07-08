import React from 'react'; 
import Modal from 'react-modal';
import JSConfetti from 'js-confetti';
import ConfettiCanvas from 'react-confetti-canvas';
import './Modals.css';

/*QuestionModal*/
export const QuestionModal = () => {
   const [modalIsOpen, setIsOpen] = React.useState(true);
   const customModalStyles = {
      overlay: {
         background: '#0000006a',
      },
      content: {
         width: '60%',
         height: '70%',
         margin: 'auto',
         background: '#0C1119',
         borderRadius: '5px',
         position: 'relative',
         zIndex:10,
         padding: '15px',
         overflowY: 'auto',
         overflowX: 'hidden',      

      },
   };
   return (
      <>
         <section className="ModalSection">
            <Modal
               className="ModalBox"
               isOpen={modalIsOpen}
               style={customModalStyles}
            >
               <div className="TitleContainer">
                  <img
                     className="ExitBtn"
                     src="/img/X_btn_black_30.png"
                     onClick={() => setIsOpen(false)}
                     alt=""
                  />
                  <h3>문제1</h3>
               </div>
               <div className="ContentContainer">
                  <table className="Content">
                     <thead>문제 설명</thead>
                     <tr>
                        새로 생긴 놀이기구는 인기가 매우 많아 줄이 끊이질
                        않습니다. 이 놀이기구의 원래 이용료는 price원 인데,
                        놀이기구를 N 번 째 이용한다면 원래 이용료의 N배를 받기로
                        하였습니다. 즉, 처음 이용료가 100이었다면 2번째에는 200,
                        3번째에는 300으로 요금이 인상됩니다. 놀이기구를 count번
                        타게 되면 현재 자신이 가지고 있는 금액에서 얼마가
                        모자라는지를 return 하도록 solution 함수를 완성하세요.
                        단, 금액이 부족하지 않으면 0을 return 하세요.
                     </tr>
                     <th>제한사항</th>
                     <tr>
                        놀이기구의 이용료 price : 1 ≤ price ≤ 2,500, price는
                        자연수 처음 가지고 있던 금액 money : 1 ≤ money ≤
                        1,000,000,000, money는 자연수 놀이기구의 이용 횟수 count
                        : 1 ≤ count ≤ 2,500, count는 자연수
                     </tr>
                     <th>입출력 예 설명</th>
                     <tr>
                        입출력 예 #1 이용금액이 3인 놀이기구를 4번 타고 싶은
                        고객이 현재 가진 금액이 20이라면, 총 필요한 놀이기구의
                        이용 금액은 30 (= 3+6+9+12) 이 되어 10만큼 부족하므로
                        10을 return 합니다.
                     </tr>
                     <th>참고 사항</th>
                     <tr>
                        미션 언어는 Java, JavaScript, Python3, C++ 만 해당
                        됩니다. 같은 코드를 제출한 사람이 여럿이라면 코드를 가장
                        먼저 제출한 분께 상품을 드립니다. 좋아요 수가 동일할
                        경우 코드를 가장 먼저 제출한 분께 상품을 드립니다.
                     </tr>
                  </table>
               </div>
            </Modal>
         </section>
      </>
   );
};


/*SuccessModal*/
export const SuccessModal = () => {
   const [modalIsOpen, setIsOpen] = React.useState(true);
   const customModalStyles = {
      overlay: {
         background: '#0000009a',
      },
      content: {
         background: 'transparent',
         border: 'transparent',
         borderRadius: '5px',
         overflow: 'hidden',
    

      },
   };
   return (
      <>
         <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setIsOpen(false)}
            style={customModalStyles}
         >
            <button onClick={() => setIsOpen(false)}>Close</button>

            <span className="ConfettiTxt">
               <span>S</span>
               <span>u</span>
               <span>c</span>
               <span>c</span>
               <span>e</span>
               <span>s</span>
               <span>s</span>
            </span>
            <ConfettiCanvas ribbonParticleMass={1} />
            <ConfettiCanvas ribbonParticleDrag={0.05} />
         </Modal>
      </>
   );
};


/*FailModal*/
export const FailModal = () => {
   const [modalIsOpen, setIsOpen] = React.useState(true);
   const confetti = new JSConfetti();
   const confettiList = () => {
      confetti.addConfetti({
         emojiSize: 30,
         emojis: ['Lose'],
      });
      confetti.addConfetti({
         emojis: ['😭', '😥'],
         emojiSize: 50,
         confettiNumber: 30,
      });
   };

   React.useEffect(() => {
      confettiList();
   }, []);

   const customModalStyles = {
      overlay: {
         background: '#0000009a',
      },
      content: {
         background: 'transparent',
         border: 'transparent',
         borderRadius: '5px',
         overflow: 'hidden',
      },
   };

   return (
      <>
         <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setIsOpen(false)}
            style={customModalStyles}
         >
            <button onClick={() => setIsOpen(false)}>Close</button>
            <span className="ConfettiTxt">
               <span>L</span>
               <span>o</span>
               <span>s</span>
               <span>e</span>
            </span>
         </Modal>
      </>
   );
};


