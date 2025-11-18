import React, { useEffect } from "react";

/**
 * 특정 요소 외부 클릭을 감지하는 커스텀 훅
 * 모달이나 드롭다운 등에서 외부 영역 클릭 시 닫기 기능을 구현할 때 사용합니다.
 *
 * @param {React.RefObject} ref - 감지할 요소의 ref 객체
 * @param {Function} handler - 외부 클릭 시 실행할 콜백 함수
 */
const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    // 클릭 이벤트 리스너 함수
    const listener = (event) => {
      // ref가 없거나, 클릭한 요소가 ref 내부에 있으면 아무것도 하지 않음
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      // 외부 클릭 시 handler 실행
      handler(event);
    };

    // 마우스 클릭과 터치 이벤트 모두 감지
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    // cleanup 함수: 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);

  return <div>useOnClickOutside</div>;
};

export default useOnClickOutside;
