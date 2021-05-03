import React, { useState, useEffect } from "react";
import BoardBody from "./BoardBody";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";


const StyledProjectSection = styled.div`
  background-color: #E5FFB3;
  border: 1px solid black;
  padding: 10px;
  height: 180px;
  overflow: auto;
`;
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
  margin-bottom: 15px;
`;
const StyledInputComponent = styled.input`
  cursor: pointer;
  outline: none;
  border: 1px solid black;
  background-color: #92DE34;
  border-radius: 25px;
  min-width: 100px;
  font-size: 20px;
  padding: 5px 10px;
  font-weight: 400;
  color: #000000;
  margin-bottom: 15px;
  margin-right: 5px;
`;

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceFeatures = [...sourceColumn.features];
    const destFeatures = [...destColumn.features];
    const [removed] = sourceFeatures.splice(source.index, 1);
    destFeatures.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        features: sourceFeatures,
      },
      [destination.droppableId]: {
        ...destColumn,
        features: destFeatures,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedFeatures = [...column.features];
    const [removed] = copiedFeatures.splice(source.index, 1);
    copiedFeatures.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        features: copiedFeatures,
      },
    });
  }
};

export default function ProjectBoard() {

  const [projects, setProjects] = useState([
    { projectId: uuidv4(), projectName: "First Project"},
    { projectId: uuidv4(), projectName: "Second Project"}
  ]);

  const[currentProjectId, setCurrentProjectId] = useState("")
  const[currentProjectName, setCurrentProjectName] = useState("No Project")

  const[projectName, setProjectName] = useState("")

  const [columns, setColumns] = useState(
    {
      [uuidv4()]: {
        title: "Current",
        features: [],
      },
      [uuidv4()]: {
        title: "IceBox",
        features: [],
      },
      [uuidv4()]: {
        title: "Backlog",
        features: [],
      }
    }

  );



  useEffect(() => {
    window.sessionStorage.setItem("columns", JSON.stringify(columns));
  }, [columns]);


  const addFeature = (columnId, featureTitle, featureText) => {
    let columnToUpdate = columns[columnId];
    let newFeature = {
      id: uuidv4(),
      projectId: currentProjectId,
      title: featureTitle,
      text: featureText,
      status: false
    };
    columnToUpdate.features.push(newFeature);
    setColumns({ ...columns });
  };

  const removeFeature = (columnId, featureId) => {
    let columnToUpdate = columns[columnId];
    let newFeatures = columnToUpdate.features.filter((feature) => {
      return feature.id !== featureId;
    });
    columnToUpdate.features = newFeatures;
    setColumns({ ...columns });
  };

  const toggleStatus = (columnId, featureId) => {
    let columnToUpdate = columns[columnId];
    let newFeatures = columnToUpdate.features.map((feature) => feature.id === featureId ?
    {
    id: feature.id,
    projectId: feature.projectId,
    title: feature.title,
    text: feature.text,
    status: !feature.status}
     :
     feature
   )
    columnToUpdate.features = newFeatures;
    setColumns({ ...columns });
  };

  const addCurrentProject = (project) => {
    setCurrentProjectId(project.projectId)
    setCurrentProjectName(project.projectName)

    console.log(currentProjectId)
    console.log(currentProjectName)
  }

  const addProject = (event) => {
    event.preventDefault();
    if (!projectName) {
      alert("Field is empty.")
      return;
    }
    let newProject = {
      projectId: uuidv4(),
      projectName: projectName
    };

    setProjects(projects => [...projects,newProject]);
    setProjectName("");
  }


  return (
    <div>
    <StyledProjectSection>
      <StyledInputComponent
        type="text"
        onChange={(event) => setProjectName(event.target.value)}
        placeholder="Add Project"
        value={projectName}
      />
      <StyledButtonComponent type="submit" onClick={(event) => addProject(event)}>
        Save

      </StyledButtonComponent>
      {Object.entries(projects).map(([id, project]) =>
        <div key={id}>
        <StyledButtonComponent type="button" onClick={() => addCurrentProject(project)}>
          {project.projectName}
        </StyledButtonComponent>
        </div>
      )}
    </StyledProjectSection>
    { !currentProjectId ? "NO DATA! SELECT/ADD PROJECT" :
      <div>
        <h1>{currentProjectName}</h1>
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >

          <BoardBody
            columns={columns}
            addFeature={addFeature}
            removeFeature={removeFeature}
            toggleStatus={toggleStatus}
            currentProjectId={currentProjectId}
          />

          </DragDropContext>
      </div>
    }
    </div>
  );
}
