import React from "react";
import { Col, Form, FormGroup, Row, Button } from "react-bootstrap";

export const ShipListItemOnEdit = (props) => {
  // destructuring props
  const {
    ship,
    id,
    onShipEdit: handleShipEdit,
    onShipTextEdit: handleShipTextEdit,
    onShipNumberEdit: handleShipNumberEdit,
    onShipDelete: handleShipDelete,
  } = props;

  return (
    <Col>
      <Form onSubmit={(e) => handleShipEdit(e, id)}>
        {/* input nama kapal jika sedang diedit */}
        <FormGroup as={Row}>
          <Form.Label column htmlFor="shipNameInput" sm="4">
            <span className="font-weight-bold">Ship Name</span>
          </Form.Label>
          <Col sm="8">
            <Form.Control
              size="sm"
              id="shipNameInput"
              placeholder="Ship name..."
              value={ship.name}
              required
              onChange={(e) => handleShipTextEdit(e, id, "name")}
            />
          </Col>
        </FormGroup>
        {/* input kru kapal jika sedang diedit */}
        <FormGroup as={Row}>
          <Form.Label column htmlFor="shipCrewInput" sm="4">
            <span className="font-weight-bold">Crew</span>
          </Form.Label>
          <Col sm="8">
            <Form.Control
              size="sm"
              id="shipCrewInput"
              placeholder="Crew..."
              value={ship.crew}
              required
              onChange={(e) => handleShipNumberEdit(e, id, "crew")}
            />
          </Col>
        </FormGroup>
        {/* input jumlah kargo kapal jika sedang diedit */}
        <FormGroup as={Row}>
          <Form.Label column htmlFor="shipCargoInput" sm="4">
            <span className="font-weight-bold">Cargo</span>
          </Form.Label>
          <Col sm="8">
            <Form.Control
              size="sm"
              id="shipCargoInput"
              placeholder="Cargo..."
              value={ship.cargo}
              required
              onChange={(e) => handleShipNumberEdit(e, id, "cargo")}
            />
          </Col>
        </FormGroup>
        {/* input jumlah slot yang digunakan kapal jika sedang diedit */}
        <FormGroup as={Row}>
          <Form.Label column htmlFor="shipSlotInput" sm="4">
            <span className="font-weight-bold">Slot</span>
          </Form.Label>
          <Col sm="8">
            <Form.Control
              size="sm"
              id="shipSlotInput"
              placeholder="Slot..."
              value={ship.slot}
              required
              onChange={(e) => handleShipNumberEdit(e, id, "slot")}
            />
          </Col>
        </FormGroup>
        {/* tombol untuk menyimpan perubahan */}
        <Button size="sm" variant="outline-primary" type="submit" block>
          Save
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
      </Form>
    </Col>
  );
};
