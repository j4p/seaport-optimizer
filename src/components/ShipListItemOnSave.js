import React from "react";
import { Col, Button } from "react-bootstrap";
import { FiBox as CargoIcon } from "react-icons/fi";
import { BsPerson as CrewIcon } from "react-icons/bs";
import { TiAnchorOutline as SlotIcon } from "react-icons/ti";

export const ShipListItemOnSave = (props) => {
  // destructuring props
  const {
    ship,
    id,
    onShipEdit: handleShipEdit,
    onShipDelete: handleShipDelete,
  } = props;

  return (
    <>
      {/* tampilan nama, jumlah kru, jumlah kargo, dan jumlah slot kapal */}
      <Col>
        <span className="font-weight-bold">{ship.name}</span>
      </Col>
      <Col>
        <CrewIcon /> <span className="font-weight-bold">{ship.crew}</span>
        <br />
        <CargoIcon /> <span className="font-weight-bold">{ship.cargo}</span>
        <br />
        <SlotIcon /> <span className="font-weight-bold">{ship.slot}</span>
      </Col>
      <Col>
        {/* tombol untuk masuk ke mode editing */}
        <Button
          size="sm"
          variant="outline-warning"
          type="submit"
          block
          onClick={(e) => handleShipEdit(e, id)}
        >
          Edit
        </Button>
        {/* tombol untuk menghapus kapal dari daftar kapal */}
        <Button
          size="sm"
          variant="outline-danger"
          block
          onClick={() => handleShipDelete(id)}
        >
          Delete
        </Button>
      </Col>
    </>
  );
};
