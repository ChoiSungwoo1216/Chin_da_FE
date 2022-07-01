import React from 'react';
import Login from './Login';
import './LoginModal.css';

const LoginModal = (props) => {

    const {open, close} = props;

    return (
        <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
            <section>
                <header>
                    <button className="close" onClick={close}>
                        ✖                  
                    </button>
                </header>
                <main>
                    <Login/>
                </main>
            </section>
        ):null}
        </div>
        );
};

export default LoginModal;
