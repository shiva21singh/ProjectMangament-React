import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import {CopyToClipboard} from "react-copy-to-clipboard";


const StyledBoardFeature = styled.div`
  background-color: ${(props) =>
    props.snapshot.isDragging ? "white" : "#E5FFB3"};
  padding: 10px;
  border: 1px solid black;
  border-radius: 4px 4px;
  margin: 0 0 8px 0;
  min-height: 100px;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  font-weight: 600;
  font-size: 18px;
  position: relative;
`;

const StyledTrashButton = styled.i`
  position: absolute;
  font-size: 16px;
  top: 5px;
  right: 5px;
  cursor: default;
  &:hover {
    color: #69BC22;
  }
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
const StyledCopyButton = styled.i`
  font-size: 16px;
  cursor: pointer;
  &:hover {
    color: #69BC22;
  }
`;
const StyledCopyToClipBoardParent = styled.div`
  background-color: #00203FFF;
  min-height: 50px;
  color: white;
  position: relative;
  padding: 25px 6px 6px 6px;
  overflow-wrap: break-word;
  margin: 2px;

`;
const StyledCopyToClipBoardChild = styled.div`
  position: absolute;
  right: 7px;
  top: 2px;
  cursor: pointer;
  color: #ffffff;
`;

export default function BoardFeature(props) {
  return (
    <Draggable key={props.id} draggableId={`${props.id}`} index={props.index}>
      {(provided, snapshot) => {
        return (
          <StyledBoardFeature
            snapshot={snapshot}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
            }}
          >
            {provided.placeholder}
            <div>{props.title}</div>

            <StyledCopyToClipBoardParent>
              <StyledCopyToClipBoardChild>
                <CopyToClipboard text={props.text} >
                  <StyledCopyButton className="fa fa-clipboard"></StyledCopyButton>
                </CopyToClipboard>
              </StyledCopyToClipBoardChild>
              {props.text}
            </StyledCopyToClipBoardParent>


            <StyledCheckButton
              status={props.status}
              onClick={() => props.toggleStatus(props.columnId, props.id)}
              className={`fa ${props.status ? "fa-check-square-o" : "fa-square-o"}`}
            >{props.status ? " Complete" :" Not Complete"}
            </StyledCheckButton>

            <StyledTrashButton
              onClick={() => props.removeFeature(props.columnId, props.id)}
              className="fa fa-trash"
            ></StyledTrashButton>
          </StyledBoardFeature>
        );
      }}
    </Draggable>
  );
}
