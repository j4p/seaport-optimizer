import React from "react";
import { Col, Form, FormGroup, Row, Button } from "react-bootstrap";

export const MissionListItemOnEdit = (props) => {
  // destructuring props
  const {
    mission,
    id,
    onMissionEdit: handleMissionEdit,
    onMissionSelectEdit: handleMissionSelectEdit,
    onMissionNumberEdit: handleMissionNumberEdit,
    onMissionDelete: handleMissionDelete,
  } = props;

  return (
    <Col>
      <Form onSubmit={(e) => handleMissionEdit(e, id)}>
        {/* input jenis misi jika sedang diedit */}
        <FormGroup as={Row}>
          <Form.Label column htmlFor="missionTypeInput" sm="6">
            <span className="font-weight-bold">Mission Type</span>
          </Form.Label>
          <Col sm="6">
            <Form.Control
              size="sm"
              as="select"
              id="missionTypeInput"
              value={mission.type}
              required
              onChange={(e) => handleMissionSelectEdit(e, id, "type")}
            >
              <option hidden value="">
                {/*
                  hanya ditampilkan sebelum memilih atau setelah misi disimpan,
                  tidak ada di dalam pilihan (hidden)
                */}
                Select mission type...
              </option>
              <option value="cargo">Cargo Mission</option>
              <option value="crew">Crew Mission</option>
            </Form.Control>
          </Col>
        </FormGroup>
        {/* input jumlah yang akan diantar dalam misi jika sedang diedit */}
        <FormGroup as={Row}>
          <Form.Label column htmlFor="missionQtyInput" sm="6">
            <span className="font-weight-bold">Quantity</span>
          </Form.Label>
          <Col sm="6">
            <Form.Control
              size="sm"
              id="missionQtyInput"
              placeholder="Quantity..."
              value={mission.qty}
              required
              onChange={(e) => handleMissionNumberEdit(e, id, "qty")}
            />
          </Col>
        </FormGroup>
        {/* input faktor pengali jika sedang diedit */}
        <FormGroup as={Row}>
          <Form.Label column htmlFor="missionMultInput" sm="6">
            <span className="font-weight-bold">Multiplier</span>
          </Form.Label>
          <Col sm="6">
            <Form.Control
              size="sm"
              id="missionMultInput"
              placeholder="Multiplier..."
              value={mission.mult}
              required
              onChange={(e) => handleMissionNumberEdit(e, id, "mult")}
            />
          </Col>
        </FormGroup>
        {/* input jumlah kru yang diperlukan untuk mengantar dalam misi */}
        <FormGroup as={Row}>
          <Form.Label column htmlFor="crewCostInput" sm="6">
            <span className="font-weight-bold">Crew Cost</span>
          </Form.Label>
          <Col sm="6">
            <Form.Control
              size="sm"
              id="crewCostInput"
              placeholder="Crew cost..."
              value={mission.crewCost}
              required
              onChange={(e) => handleMissionNumberEdit(e, id, "crewCost")}
            />
          </Col>
        </FormGroup>
        {/* tombol untuk menyimpan perubahan */}
        <Button size="sm" variant="outline-primary" type="submit" block>
          Save
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
      </Form>
    </Col>
  );
};
