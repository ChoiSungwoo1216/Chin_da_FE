import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ModalBox = () => {
   const [modalIsOpen, setIsOpen] = React.useState(true);

   return (
     <>
      <Container>
         <Modal isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)}
         style={{  position: 'absolute', zIndex: 10, width: '70%'}}>
            <button onClick={() => setIsOpen(false)}>Close Modal</button>
         </Modal>
      </Container>
     </>

   );
};

const Container = styled.div`

`;

export default ModalBox;
