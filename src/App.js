import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProjectBoard from "./Containers/ProjectBoard";


const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-features: center;
  width: 100%;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
  background-color: #FFFFE7;
`;

function App() {

  return (
    <StyledApp>
      <ProjectBoard/>
    </StyledApp>
  );
}

export default App;
