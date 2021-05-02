import React, { useCallback, useState, useReducer, useEffect } from 'react';
import kakao from 'assets/img/kakao.png';
import naver from 'assets/img/naver.png';
import facebook from 'assets/img/facebook.png';
import google from 'assets/img/google.png';
import apple from 'assets/img/apple.png';
import errorJSON from 'assets/common/error.json';
import useSignup from 'hooks/useSignup';
import { regCheckPassword, regCheckEmail } from 'utils';
import { userReducer, initData } from 'utils/UserReducer';
import api from 'api';

const Signup = () => {
  const [user, dispatch] = useReducer(userReducer, initData);
  const [signup] = useSignup();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [email, setEamil] = useState('');
  const [isAgree, setIsAgree] = useState(false);
  const [error, setError] = useState({
    emailError: {
      content: '',
      isError: false,
    },
    passwordError: {
      content: '',
      isError: false,
    },
    checkPasswordError: {
      content: '',
      isError: false,
    },
    nicknameError: {
      content: '',
      isError: false,
    },
  });

  const checkPassword = useCallback(
    (val) => {
      if (regCheckPassword.test(val)) {
        setError({ ...error, passwordError: false });
      } else {
        setError({ ...error, passwordError: true });
      }
    },
    [error],
  );

  const checkPasswordEqual = useCallback(
    (val, checkPassword) => {
      if (checkPassword === val) {
        setError({ ...error, checkPasswordError: false });
      } else {
        setError({ ...error, checkPasswordError: true });
      }
    },
    [error],
  );

  const signupProcess = useCallback(
    (e) => {
      e.preventDefault();

      if (!name) {
        return;
      }
      if (Object.entries(error).some((item) => item[1])) {
        return;
      }

      signup({
        name,
        password,
        email,
        isAgree,
      });
    },
    [error, name, password, email, isAgree, signup],
  );

  const checkEmailApi = useCallback(async (email) => {
    const result = await api.get('user/check-email', { email });
    console.log(result);
  }, []);

  return (
    <div className="sub layout-sub">
      <div className="col-12 col-center mw-430">
        <form className="pr15 pl15 signup-container">
          <div className="mb32 tc">
            <h3>회원가입</h3>
          </div>

          <div>
            <div className="mb20">
              <div className="label-container">
                <label htmlFor="name" className="input-label-style1">
                  이름
                </label>
              </div>

              <div className="mb6">
                <input
                  type="text"
                  className="input-style1"
                  id="name"
                  onChange={(e) => dispatch({ type: 'CHANGE_EMAIL', email: e.target.value })}
                />
              </div>

              <div className="signup-desc-text">
                <p>이름은 표준 한글 또는 영문만 입력 가능합니다.</p>
              </div>
            </div>

            <div className="mb20">
              <div className="label-container">
                <label htmlFor="email" className="input-label-style1">
                  이메일
                </label>
              </div>

              <div className="mb16">
                <div className="input-container">
                  <input
                    type="email"
                    className={
                      user.error.emailError.isError
                        ? 'input-style1 with-button error'
                        : 'input-style1 with-button'
                    }
                    id="email"
                    placeholder="scot@sample.com"
                    onChange={(e) => dispatch({ type: 'CHANGE_EMAIL', email: e.target.value })}
                    value={user.email}
                  />

                  <button
                    className="ml16 check-button-style1"
                    onClick={(e) => {
                      e.preventDefault();
                      checkEmailApi(user.email);
                    }}
                  >
                    중복확인
                  </button>
                </div>
              </div>

              <div
                className={
                  user.error.emailError.isError ? 'error-container active' : 'error-container'
                }
              >
                <p className="error-font">{user.error.emailError.isError.content}</p>
              </div>
            </div>

            <div className="mb20">
              <div className="label-container">
                <label htmlFor="password" className="input-label-style1">
                  비밀번호
                </label>
              </div>

              <div className="mb16">
                <input
                  type="password"
                  className={error.passwordError ? 'input-style1 error' : 'input-style1'}
                  id="password"
                  onChange={(e) => {
                    checkPassword(e.target.value);
                    setPassword(e.target.value);
                  }}
                  autoComplete="off"
                />
              </div>

              <div className={error.passwordError ? 'error-container active' : 'error-container'}>
                <p className="error-font">{errorJSON.SignupError.passwordError}</p>
              </div>
            </div>

            <div className="mb20">
              <div className="label-container">
                <label htmlFor="passwordCheck" className="input-label-style1">
                  비밀번호 확인
                </label>
              </div>

              <div className="mb16">
                <input
                  type="password"
                  className={error.checkPasswordError ? 'input-style1 error' : 'input-style1'}
                  id="passwordCheck"
                  onChange={(e) => {
                    checkPasswordEqual(e.target.value, password);
                    setPasswordCheck(e.target.value);
                  }}
                  autoComplete="off"
                />
              </div>

              <div
                className={error.checkPasswordError ? 'error-container active' : 'error-container'}
              >
                <p className="error-font">{errorJSON.SignupError.checkPasswordError}</p>
              </div>
            </div>

            <div className="chkbox-con mb20">
              <input
                type="checkbox"
                id="agreeInfo"
                className="input-style-checkbox"
                value={isAgree}
                onClick={() => setIsAgree(!isAgree)}
              />
              <label htmlFor="agreeInfo">(선택) 마케팅 목적 혜택/정보 수신 동의합니다</label>
            </div>

            <div className="mb20">
              <input
                type="submit"
                value="동의하고 회원가입"
                className="btn-style1 wid100 btn-font font-white middle"
                onClick={(e) => signupProcess(e)}
                disabled={!(name && password && passwordCheck)}
              />
            </div>

            <div className="tc mb24 agree-bottom-border">
              <p className="caption-font font-color-grayAEAE">
                이용약관, 개인정보 수집 및 이용을 확인하였고 동의합니다.
              </p>
            </div>

            <div className="social-btn kakao mb8">
              <div className="mr10">
                <img src={kakao} alt="kakao" />
              </div>
              <p>카카오로 시작하기</p>
            </div>

            <div className="social-btn naver mb8">
              <div className="mr10">
                <img src={naver} alt="naver" />
              </div>
              <p>네이버로 시작하기</p>
            </div>

            <div className="social-btn facebook mb8">
              <div className="mr10">
                <img src={facebook} alt="facebook" />
              </div>
              <p>페이스북으로 시작하기</p>
            </div>

            <div className="social-btn google mb8">
              <div className="mr10">
                <img src={google} alt="google" />
              </div>
              <p>구글으로 시작하기</p>
            </div>

            <div className="social-btn apple">
              <div className="mr10">
                <img src={apple} alt="apple" />
              </div>
              <p>애플로 시작하기</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
