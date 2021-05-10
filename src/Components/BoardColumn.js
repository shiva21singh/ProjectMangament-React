import React, { useState } from "react";
import BoardFeature from "../Components/BoardFeature";
import AddFeatureForm from "../Components/FeatureForm";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const StyledColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 20px;
`;


const StyledContainer = styled.div`
  margin-right: 12px;
  display: grid;
  grid-template-rows: 50px 1fr 40px auto;
`;

const StyledColumnBody = styled.div`
  width: 280px;
  height: 400px;
  overflow-y: auto;
  border: 2px solid #50a0a0b0;
  border-radius: 3px 3px;
  margin-right: 10px;
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
  font-size: 26px;
  color: red ;
  cursor: pointer;
  &:hover {
    color: #69BC22;
  }
  margin-top: 20px;
  margin-right: 10px;
`;


export default function BoardColumn(props) {
  const [isAddingFeature, setIsAddingFeature] = useState(false);
  const [featureText, setFeatureText] = useState("");
  const [featureTitle, setFeatureTitle] = useState("");



  const toggleIsAddingFeature = () => {
    setIsAddingFeature(!isAddingFeature);
  };



  const saveFeatureText = (event) => {
    event.preventDefault();
    if (!featureText || !featureTitle) {
      alert("Field/s is/are empty.")
      return;
    }
    props.addFeature(props.id, featureTitle, featureText);
    toggleIsAddingFeature();
    setFeatureText("");
    setFeatureTitle("");
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
                      columnId={props.id}
                      removeFeature={props.removeFeature}
                      toggleStatus={props.toggleStatus}
                      column={props.column}
                      addTask={props.addTask}
                      feature={feature}

                    />
                  </div>
                );
              })}
            </StyledColumnBody>
            {isAddingFeature ? (
              <AddFeatureForm
                setFeatureText={setFeatureText}
                setFeatureTitle={setFeatureTitle}
                toggleIsAddingFeature={toggleIsAddingFeature}
                saveFeatureText={saveFeatureText}
              />
            ) : (
              <StyledAddFeatureButton onClick={() => toggleIsAddingFeature()}>
                <i className="fas fa-plus"> Add Feature </i>
              </StyledAddFeatureButton>
            )}
          </StyledContainer>
        );
      }}
    </Droppable>
  );
}
