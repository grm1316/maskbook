import styled, { keyframes } from 'styled-components';

// keyframes 정의
const ldsSpinner = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

// styled-components 변환
const Spinner = styled.div`
  color: currentColor;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  .lds-spinner-div {
    transform-origin: 40px 40px;
    animation: ${ldsSpinner} 1.2s linear infinite;
    position: absolute;
    &:after {
      content: " ";
      display: block;
      position: absolute;
      top: 3.2px;
      left: 36.8px;
      width: 6.4px;
      height: 17.6px;
      border-radius: 20%;
      background: currentColor;
    }
  }
  ${Array.from({ length: 12 })
    .map(
      (_, i) => `
    .lds-spinner-div:nth-child(${i + 1}) {
      transform: rotate(${i * 30}deg);
      animation-delay: -${1.2 - i * 0.1}s;
    }
  `
    )
    .join('\n')}
`;

// Spinner 컴포넌트
export function LdsSpinner() {
  return (
    <Spinner className="lds-spinner">
      {Array.from({ length: 12 }).map((_, i) => (
        <div className="lds-spinner-div" key={i}></div>
      ))}
    </Spinner>
  );
}