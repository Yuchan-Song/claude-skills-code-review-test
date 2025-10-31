import React, { useEffect, useState } from "react";
import "../styles/Banner.css";
import axios from "../api/axios";
import request from "../api/request";

/**
 * Banner 컴포넌트
 * 메인 페이지 상단에 표시되는 배너로, 현재 상영중인 영화 중 무작위로 선택된 영화를 보여줍니다.
 */
const Banner = () => {
  // 선택된 영화 정보를 저장하는 state
  const [movie, setMovie] = useState([]);

  // 컴포넌트 마운트 시 영화 데이터 가져오기
  useEffect(() => {
    fetchData();
  }, []);

  /**
   * 현재 상영중인 영화 목록을 가져오고, 그 중 하나를 무작위로 선택하여 상세 정보를 가져옵니다.
   */
  const fetchData = async () => {
    // 현재 상영중인 영화 목록 가져오기
    const response = await axios.get(request.fetchNowPlaying);
    if (response.status === 200) {
      const movies = response.data.results;
      setMovie(movies);

      // 영화 목록 중 무작위로 하나 선택
      const movieId = movies[Math.floor(Math.random() * movies.length)].id;

      // 선택된 영화의 상세 정보 가져오기 (비디오 정보 포함)
      const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
        params: { append_to_response: "videos" },
      });

      console.log(movieDetail);
    } else {
      console.log(response.statusText);
    }
  };

  return <div>Banner</div>;
};

export default Banner;
