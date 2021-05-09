import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import {CopyToClipboard} from "react-copy-to-clipboard";
import BoardTask from "../Components/BoardTask";
import AddTaskForm from "../Components/TaskForm";

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

const StyledAddTaskButton = styled.button`
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
export default function BoardFeature(props) {

  const [isAddingTask, setIsAddingTask] = useState(false);
  const [taskText, setTaskText] = useState("");
  const [taskTitle, setTaskTitle] = useState("");

  const toggleIsAddingTask = () => {
    setIsAddingTask(!isAddingTask);
  };

  const saveTaskText = (event) => {
    event.preventDefault();
    if (!taskText || !taskTitle) {
      alert("Field is empty.")
      return;
    }

    props.addTask(props.columnId, props.index, taskTitle, taskText);
    toggleIsAddingTask();
    setTaskText("");
    setTaskTitle("");
  };

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


            <BoardTask
              columnId={props.columnId}
              featureId={props.id}
              addTask={props.addTask}
              featureIndex={props.index}
              featureTasks={props.tasks}
            />

            <StyledTrashButton
              onClick={() => props.removeFeature(props.columnId, props.id)}
              className="fa fa-trash"
            ></StyledTrashButton>


            <p>Tasks: ({props.feature.tasks.filter((task) => task.status).length}/{props.feature.tasks.length})</p>

            {props.feature.tasks.map((task, index) => {
              return (
                <div key={task.id}>
                <BoardTask
                id={task.id}
                title={task.title}
                text={task.text}
                />
                </div>
              );
            })}
            {isAddingTask ? (
              <AddTaskForm
                setTaskText={setTaskText}
                setTaskTitle={setTaskTitle}
                toggleIsAddingTask={toggleIsAddingTask}
                saveTaskText={saveTaskText}
              />
            ) : (
              <StyledAddTaskButton onClick={() => toggleIsAddingTask()}>
                <i className="fas fa-plus"></i>
              </StyledAddTaskButton>
            )}
          </StyledBoardFeature>
        );
      }}
    </Draggable>
  );
}
