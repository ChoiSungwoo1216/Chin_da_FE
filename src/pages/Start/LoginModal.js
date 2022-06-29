import React from 'react';
import styled from 'styled-components';
import Login from '../Login/Login';
const LoginModal = (props) => {

    const {open, close} = props;

    return (
        <div className={open ? 'openModal' : 'modal'}>
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

const Header = styled.div`

`