import React from 'react'; 
import Modal from 'react-modal';
import JSConfetti from 'js-confetti';
import ConfettiCanvas from 'react-confetti-canvas';
import './Modals.css';


/*QuestionModal*/
export const QuestionModal = () => {
   const [modalIsOpen, setIsOpen] = React.useState(true);
   return (
      <>
      <div className="QuestionContainer">
            <Modal
               isOpen={modalIsOpen}
               onRequestClose={() => setIsOpen(false)}
               style={{ position: 'absolute', zIndex: 10, width: '70%' }}
            >
               <button onClick={() => setIsOpen(false)}>Close</button>
            </Modal>
         </div>
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
      <div className="successContainer">
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
      </div>
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
      <div className="FailContainer">
         <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setIsOpen(false)}
            style={customModalStyles}
         >
            {/* <button onClick={confettiList}>showConfetti</button> */}
            <button onClick={() => setIsOpen(false)}>Close</button>
            <span className="ConfettiTxt">
               <span>L</span>
               <span>o</span>
               <span>s</span>
               <span>e</span>
            </span>
         </Modal>
      </div>
   );
};


