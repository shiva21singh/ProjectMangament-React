import React, { useState, useEffect } from "react";
import BoardColumn from "../Components/BoardColumn";
import styled from "styled-components";

const StyledButtonComponent = styled.button`
  cursor: pointer;
  outline: none;
  border: none;
  background-color: #92DE34;
  border-radius: 25px;
  min-width: 100px;
  font-size: 20px;
  padding: 5px 10px;
  font-weight: 400;
  color: #000000;
  margin-bottom: 20px;

`;

const StyledBoardBody = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 16px 32px;
  background-color: #E5FFB3;
  overflow-x: auto;
  border: 1px solid black;
  width: 870px;
`;

const StyledSidePanel = styled.div`
  border: 1px solid black;
  height: 615px;
  padding:10px;
  width: 150px;
  background-color: #E5FFB3;
`;

const StyledMainBody = styled.div`
display: flex;
justify-content: space-around;
`;

export default function BoardBody(props) {

  const [hideCurrentColumn, setHideCurrentColumn] = useState(false)
  const [hideIceBoxColumn, setHideIceBoxColumn] = useState(false)
  const [hideBacklogColumn, setHideBacklogColumn] = useState(false)

  const setVisibility = (title) => {
    if(title === "Current") {
      setHideCurrentColumn(!hideCurrentColumn);
    }
    if(title === "IceBox") {
      setHideIceBoxColumn(!hideIceBoxColumn);
    }
    if(title === "Backlog") {
      setHideBacklogColumn(!hideBacklogColumn);
    }

  };

  return (
    <StyledMainBody>
    <StyledSidePanel>{
      Object.entries(props.columns).map(([id, column]) =>{
        return (
            <div key={id}>
            <StyledButtonComponent onClick={() => setVisibility(column.title)}>{`${column.title} `}</StyledButtonComponent>
            </div>
        );
      })
    }
    </StyledSidePanel>
      <StyledBoardBody>
          {
           Object.entries(props.columns).map(([id, column]) => {
              return (
                <div key={id}>

                { (hideCurrentColumn && column.title === "Current") ||
                  (hideIceBoxColumn && column.title === "IceBox") ||
                  (hideBacklogColumn && column.title === "Backlog") ? null :
                  <BoardColumn
                    addFeature={props.addFeature}
                    removeFeature={props.removeFeature}
                    toggleStatus={props.toggleStatus}
                    currentProjectId={props.currentProjectId}
                    column={column}
                    setVisibility={setVisibility}
                    id={id}
                  ></BoardColumn>
                  }
                </div>
              );
            })
          }
      </StyledBoardBody>
    </StyledMainBody>
  );
}
