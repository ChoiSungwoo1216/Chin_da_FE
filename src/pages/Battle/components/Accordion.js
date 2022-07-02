import { click } from '@testing-library/user-event/dist/click';
import React, {useState} from 'react';
import styled from 'styled-components';


const Accordion = () => {
    const [clicked, setClicked] = useState(false);

    const toggle = (index) => {
     if(clicked === index) {
        return setClicked(null);
     } setClicked(index);
    }

    const Data = [
       {
          question: 'Question',
          content:
             'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam iure minus exercitationem reprehenderit nihil omnis iusto id praesentium architecto, eius at consequuntur delectus ipsam alias. Ea, eos beatae! Vero, ex.',
       },
    ];

  return (
     <>
   
           <AccordionContainer>
            <Box>
            {Data.map((item, index)=> {
                return (
                   <>
                      <Wrap
                         onClick={() => {
                            toggle(index);
                         }}
                         key={index}
                      >
                         <Title>{item.question}</Title>
                         <ToggleBtn>{clicked === index ? '-' : '+'}</ToggleBtn>
                      </Wrap>
                      {clicked === index ? (
                         <DropDown>
                            <Content>{item.content}</Content>
                         </DropDown>
                      ) : null}
                   </>
                );
            })}
            </Box>
           </AccordionContainer>
     </>
  );
}

const AccordionContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   position: relative;
   height: 100vh;
`;

const Box = styled.div`
   width: 50%;
   position: absolute;
   top: 10%;
   background: #ffffff1a;
   border: 1px solid #0000001a;
   border-radius: 10px 10px 0 0;
`;
const Wrap = styled.div`
   display: flex;
   width: 100%;
   padding: 2px;
   border-radius: 10px 10px 0 0;
   background: #0000003a;
   color: #fff;
   cursor: pointer;
`;

const ToggleBtn = styled.button`
   display: flex;
   justify-content: center;
   margin-right: 3px;
   width: 35px;
   background: transparent;
   color: #fff;
   border-radius: 0 10px 0 0;
   border: 1px solid transparent;
   font-size: 35px;
`;

const Title = styled.h1`
   margin: auto;
   padding: 3px;
   color: #fff;
   font-size: 25px;
`;

const DropDown = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
`;

const Content = styled.p`
   margin: auto;
   padding: 5px;
   color: #fff;
   font-size: 20px;
`;


export default Accordion;