import { useEffect, useState } from 'react'

/**
 * 디바운스 기능을 제공하는 커스텀 훅
 * 빠르게 변경되는 값을 지연시켜 마지막 값만 반환합니다.
 * 주로 검색 입력 필드 등에서 API 호출을 최적화하는 데 사용됩니다.
 *
 * @param {any} value - 디바운스할 값
 * @param {number} delay - 지연 시간 (밀리초)
 * @returns {any} 디바운스된 값
 */
const useDebounce = (value, delay) => {
  // 디바운스된 값을 저장할 state
  const [deboundValue, setDeboundValue] = useState(value);

  useEffect(() => {
    // delay 시간 후에 값을 업데이트하는 타이머 설정
    const handler = setTimeout(() => {
      setDeboundValue(value);
    }, delay);

    // cleanup 함수: 컴포넌트가 언마운트되거나 value/delay가 변경되면 이전 타이머를 취소
    return () => {
      clearTimeout(handler);
    }
  }, [value, delay]);

  return deboundValue;
}

export default useDebounce;