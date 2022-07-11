import React from "react";
import Login from "./Login";
import "./LoginModal.css";

const LoginModal = (props) => {
  const { open, close } = props;

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <>
          <section>
            <header>
              <p>L O G I N</p>
              <div className="close" onClick={close}></div>
            </header>
            <main>
              <Login />
            </main>
          </section>
        </>
      ) : null}
    </div>
  );
};

export default LoginModal;
