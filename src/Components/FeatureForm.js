import React from "react";
import styled from "styled-components";

const StyledAddFeatureForm = styled.form`
  align-items: center;
  margin: 6px;
  height: 40px;
  margin-bottom: 20px;

`;

export default function AddFeatureForm(props) {
  return (
    <StyledAddFeatureForm>
      <input
        type="text"
        onChange={(event) => props.setFeatureTitle(event.target.value)}
        placeholder="Title"
      />
      <br/>
      <textarea
        type="text"
        onChange={(event) => props.setFeatureText(event.target.value)}
        placeholder="Text"
      />

      <br/>
      <button type="button" onClick={() => props.toggleIsAddingFeature()}>
        Cancel
      </button>
      <button type="submit" onClick={(event) => props.saveFeatureText(event)}>
        Save
      </button>
    </StyledAddFeatureForm>
  );
}
