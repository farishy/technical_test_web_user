import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

// Menggunakan keyframes untuk membuat animasi spinner
const spinAnimation = keyframes`
  to {
    transform: rotate(360deg);
  }
`;
const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Spinner = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spinAnimation} 1s linear infinite;
`;

export default function LoadingSpinner() {
  return (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );
}
