import React, { useContext } from "react";
import { ListGroup, Row } from "react-bootstrap";
import { MissionListItemOnEdit } from "./MissionListItemOnEdit";
import { MissionListItemOnSave } from "./MissionListItemOnSave";
import { ThemeContext } from "../ThemeContext";

export const MissionList = (props) => {
  // destructuring props
  const {
    missions,
    onMissionEdit,
    onMissionSelectEdit,
    onMissionNumberEdit,
    onMissionDelete,
  } = props;

  // menggunakan context tema
  const { theme } = useContext(ThemeContext);

  return (
    <ListGroup className="my-3 rounded">
      <ListGroup.Item
        // mengubah tema list item berdasarkan context
        className={theme === "light" ? "bg-light" : "border-secondary bg-dark"}
      >
        <span className="font-weight-bold">
          Number of Missions: {missions.length}
        </span>
      </ListGroup.Item>
      {/* mapping daftar misi ke dalam list item */}
      {missions.map((mission, idx) => {
        return (
          <ListGroup.Item
            key={mission.id}
            className={
              // mengubah tema list item berdasarkan context
              theme === "light" ? "bg-light" : "border-secondary bg-dark"
            }
          >
            <Row className="align-items-center">
              {mission.isEditing ? (
                // render jika sedang diedit
                <MissionListItemOnEdit
                  mission={mission}
                  id={mission.id}
                  onMissionEdit={onMissionEdit}
                  onMissionSelectEdit={onMissionSelectEdit}
                  onMissionNumberEdit={onMissionNumberEdit}
                  onMissionDelete={onMissionDelete}
                />
              ) : (
                // render jika tidak sedang diedit
                <MissionListItemOnSave
                  mission={mission}
                  id={mission.id}
                  idx={idx}
                  onMissionEdit={onMissionEdit}
                  onMissionDelete={onMissionDelete}
                />
              )}
            </Row>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};
