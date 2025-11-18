import React, { useRef } from "react";
import "./MovieModal.css";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

/**
 * 영화/TV 프로그램의 상세 정보를 보여주는 모달 컴포넌트
 *
 * @param {string} backdrop_path - 영화 배경 이미지 경로
 * @param {string} title - 영화 제목
 * @param {string} overview - 영화 줄거리
 * @param {string} name - TV 프로그램 이름
 * @param {string} release_date - 영화 개봉일
 * @param {string} first_air_date - TV 프로그램 첫 방영일
 * @param {number} vote_average - 평점
 * @param {Function} setModalOpen - 모달 열림/닫힘 상태를 변경하는 함수
 */
const MovieModal = ({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setModalOpen,
}) => {
  // 모달 요소에 대한 ref 생성
  const ref = useRef();

  // 모달 외부 클릭 시 모달 닫기
  useOnClickOutside(ref, () => setModalOpen(false));

  return (
    <div className="presentation" role="presentation">
      <div className="wrapper_modal">
        {/* 모달 본체 */}
        <div className="modal" ref={ref}>
          {/* 닫기 버튼 */}
          <span onClick={() => setModalOpen(false)} className="modal_close">
            X
          </span>

          {/* 영화 포스터 이미지 */}
          <img
            className="modal_poster_img"
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt="modal-img"
          />

          {/* 영화 상세 정보 */}
          <div className="modal_content">
            <p className="modal_details">
              <span className="modal_user_perc">100% for you</span>{" "}
              {/* 영화는 release_date, TV는 first_air_date 사용 */}
              {release_date ? release_date : first_air_date}
            </p>
            {/* 영화는 title, TV는 name 사용 */}
            <h2 className="modal_title">{title ? title : name}</h2>
            <p className="modal_overview">평점 : {vote_average}</p>
            <p className="modal_overview">{overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
