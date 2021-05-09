import React from "react";
import styled from "styled-components";

const StyledAddTaskForm = styled.form`
  align-items: center;
  margin: 6px;
  height: 40px;
  margin-bottom: 50px;

`;

export default function AddTaskForm(props) {
  return (
    <StyledAddTaskForm>
      <input
        type="text"
        onChange={(event) => props.setTaskTitle(event.target.value)}
        placeholder="Title"
      />
      <br/>
      <textarea
        type="text"
        onChange={(event) => props.setTaskText(event.target.value)}
        placeholder="Text"
      />

      <br/>
      <button type="button" onClick={() => props.toggleIsAddingTask()}>
        Cancel
      </button>
      <button type="submit" onClick={(event) => props.saveTaskText(event)}>
        Save
      </button>
    </StyledAddTaskForm>
  );
}
