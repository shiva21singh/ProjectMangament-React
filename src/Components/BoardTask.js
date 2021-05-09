import React from "react";
import styled from "styled-components";

const StyledTaskContainer = styled.div`
  background-color: white;
  overflow-wrap: break-word;
  border: 1px solid black;
  padding: 5px;
  margin-top: 10px;
  color: gray;
`;
const StyledTaskTitle = styled.span`
  text-decoration: underline;
  margin-botton: 4px;
  color: black;
`;
const StyledCheckButton = styled.i`
  font-size: 16px;
  color: ${props => props.status ? "green" : "red" };
  cursor: pointer;
  margin: 5px;
  &:hover {
    color: #69BC22;
  }
`;
export default function BoardTask(props) {
  return (
    <div key={props.id}>
    <StyledTaskContainer >
      <StyledTaskTitle>{props.title}</StyledTaskTitle>
      <br/>
      <small>{props.text}</small>
    </StyledTaskContainer>
    <StyledCheckButton
      status={props.status}
      onClick={() => props.toggleStatus(props.columnId,props.featureIndex, props.id)}
      className={`fa ${props.status ? "fa-check-square-o" : "fa-square-o"}`}
    >{props.status ? " Complete" :" Not Complete"}
    </StyledCheckButton>
    </div>
  );
}
