import React from 'react';
import { Link } from 'react-router-dom';
import Logo from 'assets/img/logo.png';
import menu from 'assets/img/menu.png';

export default function Header({ setDrawerStatus }) {
  return (
    <>
      <header className="col-12 nav-container">
        <div className="web d-flex x-eq pl40 pr24">
          <div className="left-nav">
            <ul>
              <li>
                <Link to="/">
                  <h1 className="logo">
                    <img src={Logo} alt="logo" />
                  </h1>
                </Link>
              </li>
              <li>
                <Link to="/intro">
                  서비스 소개
                </Link>
              </li>
              <li>
                <Link to="/intro" className="styleTip">
                  STYLE TIP
                </Link>
              </li>
              <li>
                <Link to="/intro">
                  커뮤니티
                </Link>
              </li>
              <li>
                <Link to="/intro">
                  고객센터
                </Link>
              </li>
            </ul>
          </div>
          <div className="right-nav">
            <ul>
              <li>
                <Link to="/login">
                  로그인
                </Link>
              </li>
              <li>
                <Link to="/intro">
                  <div className="btn-style1">
                    <p className="btn-font-style1">
                      지금 시작하기
                    </p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mobile">
          <ul className="d-flex x-eq y-center">
            <li>
              <Link to="/">
                <h1 className="logo">
                  <img src={Logo} alt="logo" />
                </h1>
              </Link>
            </li>

            <li>
              <div className="menu" onClick={() => setDrawerStatus(true)}>
                <img src={menu} alt="menu" />
              </div>
            </li>
          </ul>
        </div>
      </header>
    </>

  );
}
