import React, { useState } from "react";
import BoardFeature from "../Components/BoardFeature";

import AddFeatureForm from "../Components/FeatureForm";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const StyledColumnHeader = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 600;
  font-size: 20px;
`;


const StyledContainer = styled.div`
  margin-right: 12px;
  display: grid;
  grid-template-rows: 50px 1fr 40px auto;
`;

const StyledColumnBody = styled.div`
  padding: 12px 16px;
  width: 250px;
  height: 400px;
  overflow-y: auto;
  border: 2px solid #50a0a0b0;
  border-radius: 3px 3px;
  margin-right: 10px;
  margin-top: 20px;
  background-color: ${(props) =>
    props.snapshot.isDraggingOver ? "#DBF8A3" : "white"};
`;

const StyledAddFeatureButton = styled.button`
  border: none;
  background: none;
  display: block;
  margin: 8px auto;
  font-size: 16px;
  &:hover {
    color: #69BC22;
    cursor: pointer;
  }
`;

const StyledCrossButton = styled.i`
  font-size: 16px;
  color: ${props => props.status ? "green" : "red" };
  cursor: pointer;
  margin: 5px;
  &:hover {
    color: #69BC22;
  }
`;


export default function BoardColumn(props) {
  const [isAddingFeature, setIsAddingFeature] = useState(false);
  const [featureText, setFeatureText] = useState("");
  const [featureTitle, setFeatureTitle] = useState("");
  const [featureStatus, setFeatureStatus] = useState(false);



  const toggleIsAddingFeature = () => {
    setIsAddingFeature(!isAddingFeature);
  };



  const saveFeatureText = (event) => {
    event.preventDefault();
    if (!featureText || !featureTitle) {
      alert("Field is empty.")
      return;
    }
    props.addFeature(props.id, featureTitle, featureText);
    toggleIsAddingFeature();
    setFeatureText("")
  };



  return (
    <Droppable droppableId={`${props.id}`} key={props.id}>
      {(provided, snapshot) => {
        return (
          <StyledContainer>
              <StyledColumnHeader>
              {props.column.title}
                <StyledCrossButton onClick={() => props.setVisibility(props.column.title)} className="fas fa-times"> </StyledCrossButton>
              </StyledColumnHeader >

            <StyledColumnBody
              snapshot={snapshot}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {provided.placeholder}
              {props.column.features.filter((feature) => feature.projectId === props.currentProjectId).map((feature, index) => {
                return (
                  <div key={feature.id}>
                    <BoardFeature
                      id={feature.id}
                      index={index}
                      title={feature.title}
                      text={feature.text}
                      status={feature.status}
                      columnId={props.id}
                      removeFeature={props.removeFeature}
                      toggleStatus={props.toggleStatus}
                    />
                  </div>
                );
              })}
            </StyledColumnBody>
            <p>Completed: ({props.column.features.filter((feature) => feature.projectId === props.currentProjectId && feature.status).length}/{props.column.features.filter((feature) => feature.projectId === props.currentProjectId).length})</p>
            {isAddingFeature ? (
              <AddFeatureForm
                setFeatureText={setFeatureText}
                setFeatureTitle={setFeatureTitle}
                setFeatureStatus={setFeatureStatus}
                featureStatus={featureStatus}
                toggleIsAddingFeature={toggleIsAddingFeature}
                saveFeatureText={saveFeatureText}
              />
            ) : (
              <StyledAddFeatureButton onClick={() => toggleIsAddingFeature()}>
                <i className="fas fa-plus"></i>
              </StyledAddFeatureButton>
            )}
          </StyledContainer>
        );
      }}
    </Droppable>
  );
}
