import React from "react";
import { Col, Button } from "react-bootstrap";
import { FiBox as CargoIcon } from "react-icons/fi";
import { BsPerson as CrewIcon } from "react-icons/bs";
import { TiTimesOutline as MultIcon } from "react-icons/ti";

export const MissionListItemOnSave = (props) => {
  // destructuring props
  const {
    mission,
    id,
    idx,
    onMissionEdit: handleMissionEdit,
    onMissionDelete: handleMissionDelete,
  } = props;

  return (
    <>
      <Col>
        {/* penomoran, kapitalisasi, dan penamaan misi */}
        <span className="font-weight-bold text-capitalize">{`${idx + 1}. ${
          mission.type
        } Mission`}</span>
      </Col>
      <Col>
        {/* icon berdasarkan tipe misi */}
        {mission.type === "cargo" ? <CargoIcon /> : <CrewIcon />}{" "}
        <span className="font-weight-bold">{mission.qty}</span>
        <br />
        <MultIcon /> <span className="font-weight-bold">{mission.mult}</span>
        <br />
        <CrewIcon />{" "}
        <span className="font-weight-bold">{mission.crewCost}</span>
      </Col>
      <Col>
        {/* tombol untuk masuk ke mode editing */}
        <Button
          size="sm"
          variant="outline-warning"
          block
          onClick={(e) => handleMissionEdit(e, id)}
        >
          Edit
        </Button>
        {/* tombol untuk menghapus misi dari daftar misi */}
        <Button
          size="sm"
          variant="outline-danger"
          block
          onClick={() => handleMissionDelete(id)}
        >
          Delete
        </Button>
      </Col>
    </>
  );
};
