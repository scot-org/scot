import React, { useState } from 'react';
import Address from '../../components/Address';
import useEditUserInfo from 'hooks/useEditUserInfo';
import Lnb from 'components/layout/Lnb';
import { checkNicknameApi } from 'utils/UserReducer';
import ImageUpload from 'components/ImageUpload';

const Mypage = () => {
  const [showPost, setShowPost] = useState(false);
  const [user, dispatch] = useEditUserInfo();
  return (
    <div className="sub layout-sub">
      <div className="col-12 col-center mw-1280">
        <div className="show-mobile mb24 mb-sm-0">
          <ImageUpload isMypage={true} />
        </div>

        <form className="mypage-container pr24 pl24">
          <Lnb />
          <div className="right-container">
            <h5 className="mb20 bold">기본정보</h5>

            <div className="mb20">
              <div className="label-container">
                <label htmlFor="name" className="input-label-style1">
                  이메일
                </label>
              </div>

              <div className="mb6">
                <input
                  readOnly={true}
                  disabled={true}
                  value={user.email || ''}
                  type="text"
                  className="input-style1"
                  id="name"
                  placeholder="scot@sample.com"
                />
              </div>
            </div>

            <div className="mb20">
              <div className="label-container">
                <label htmlFor="name" className="input-label-style1">
                  이름
                </label>
              </div>

              <div className="mb6">
                <input
                  readOnly={true}
                  disabled={true}
                  type="text"
                  className="input-style1"
                  id="name"
                  placeholder="홍길동"
                  value={user.name || ''}
                  onChange={(e) => {
                    dispatch({ type: 'CHANGE_NAME', name: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="mb20">
              <div className="label-container">
                <label htmlFor="name" className="input-label-style1">
                  생년월일
                </label>
              </div>

              <div className="date-birth-container">
                <div className="width-per-33 pl4 pr4">
                  <select className="select-style1" name="" id="" required onChange={(e) => console.log(e.target.value)}>
                    <option value="" disabled selected hidden>
                      년도
                    </option>
                    {Array(60)
                      .fill(0)
                      .map((n, i) => {
                        const startYear = new Date().getFullYear();
                        return (
                          <option value={startYear - i} key={startYear - i + 'year'}>
                            {startYear - i}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="width-per-33 pl4 pr4">
                  <select className="select-style1" name="" id="" required onChange={(e) => console.log(e.target.value)}>
                    <option value="" disabled selected hidden>
                      월
                    </option>
                    {Array(12)
                      .fill(0)
                      .map((n, i) => {
                        return (
                          <option value={i + 1} key={i + 1 + 'moment'}>
                            {i + 1}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="width-per-33 pl4 pr4">
                  <select className="select-style1" name="" id="" required onChange={(e) => console.log(e.target.value)}>
                    <option value="" disabled selected hidden>
                      일
                    </option>
                    {Array(31)
                      .fill(0)
                      .map((n, i) => {
                        return (
                          <option value={i + 1} key={i + 1 + 'day'}>
                            {i + 1}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            </div>

            <div className="mb40">
              <div className="label-container">
                <label htmlFor="name" className="input-label-style1">
                  성별
                </label>
              </div>
              <div className="radio-wrap">
                <div className="radio-btn-con">
                  <input
                    type="radio"
                    id="woman"
                    className="radio-style-0"
                    name="gender"
                    checked={user.gender === 'w'}
                    value={'w'}
                    onChange={(e) => {
                      dispatch({ type: 'CHANGE_GENDER', gender: 'w' });
                    }}
                  />
                  <label htmlFor="woman">여자</label>
                </div>
                <div className="radio-btn-con">
                  <input
                    type="radio"
                    id="man"
                    className="radio-style-0"
                    name="gender"
                    checked={user.gender === 'm'}
                    value={'m'}
                    onChange={(e) => {
                      dispatch({ type: 'CHANGE_GENDER', gender: 'm' });
                    }}
                  />
                  <label htmlFor="man">남자</label>
                </div>
              </div>
            </div>

            <div className="">
              <h5 className="mb20 bold">추가정보</h5>

              <div className="mb20">
                <div className="label-container">
                  <label htmlFor="email" className="input-label-style1">
                    닉네임 변경
                  </label>
                </div>

                <div className="mb16">
                  <div className="input-container">
                    <input
                      type="nickname"
                      className={'input-style1 with-button'}
                      id="nickname"
                      placeholder="wearAt"
                      onChange={(e) => dispatch({ type: 'CHANGE_NICKNAME', nickname: e.target.value })}
                      value={user.nickname || ''}
                    />

                    <button
                      disabled={user.nickname === '' || user.checkNickName}
                      className="ml16 check-btn-style1"
                      onClick={(e) => {
                        e.preventDefault();
                        checkNicknameApi(user.nickname, dispatch);
                      }}
                    >
                      중복확인
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb20">
                <div className="label-container">
                  <label htmlFor="name" className="input-label-style1">
                    주소
                  </label>
                </div>

                <div className="d-flex">
                  <div className="adress-container pr8">
                    <input type="text" className="input-style1" id="name" placeholder="우편번호" readOnly value={user.zipCode} />
                  </div>

                  <div className="address-btn-container">
                    <input type="submit" value="주소검색" className="btn-style1 wid100 btn-font font-white" onClick={() => setShowPost(!showPost)} />
                  </div>
                </div>
              </div>
            </div>

            <Address
              showPost={showPost}
              setShowPost={setShowPost}
              onChange={({ address, zipCode }) => {
                dispatch({ type: 'CHANGE_ADDRESS', address });
                dispatch({ type: 'CHANGE_ZIPCODE', zipCode });
              }}
            />

            <div className="mb64">
              <div className="mb16">
                <input
                  type="text"
                  className="input-style1"
                  id="name"
                  placeholder="검색버튼을 눌러 주소를 검색해주세요."
                  readOnly
                  value={user.address}
                />
              </div>
              <div>
                <input
                  type="text"
                  className="input-style1"
                  id="name"
                  placeholder="상세주소를 입력해주세요."
                  value={user.detailAddress || ''}
                  onChange={(e) => {
                    dispatch({ type: 'CHANGE_DETAIL_ADDRESS', detailAddress: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="mb36">
              <h5 className="mb28 bold">웨어앳 이벤트, 프로모션 수신 </h5>
              <div className="chkbox-con mb20">
                <input
                  type="checkbox"
                  id="agreeInfoReciving"
                  className="input-style-checkbox"
                  checked={user.checkReceivingConsent}
                  onChange={() =>
                    dispatch({
                      type: 'CHAHNE_RECEIVING_CONSENT',
                      checkReceivingConsent: !user.checkReceivingConsent,
                    })
                  }
                />
                <div class="chk-label-container">
                  <label for="agreeInfoReciving">
                    <span class="option-font">(선택)</span> 마케팅 목적 혜택/정보 수신 동의
                  </label>
                </div>
              </div>
            </div>

            <div className="mb15">
              <input disabled type="button" className="width-100 btn-style1 tc white" value="정보 수정 완료" />
            </div>

            <div>
              <p className="more-font">탈퇴하기</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Mypage;
