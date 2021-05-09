import React from "react";
import styled from "styled-components";

export default function BoardTask(props) {
  return (
    <div key={props.id}>
      <p>{props.text}</p>
      <p>{props.title}</p>
    </div>
  );
}
