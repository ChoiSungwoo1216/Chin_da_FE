import React from "react";
import LoginModal from "./components/LoginModal";
import "./Start.css";

const Start = () => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const open = () => {
    setModalOpen(true);
  };
  const close = () => {
    setModalOpen(false);
  };
  return (
    <div className="main">
      <div id="title">
        <span>C H I N D A</span>
      </div>

      <div id="loginBtn" onClick={open}>
        <p>L O G I N</p>
      </div>
      <LoginModal open={modalOpen} close={close} />
    </div>
  );
};

export default Start;
