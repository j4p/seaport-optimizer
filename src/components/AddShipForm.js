import React, { useContext } from "react";
import { Col, Form, Button } from "react-bootstrap";
import { ThemeContext } from "../ThemeContext";

export const AddShipForm = (props) => {
  // destructuring props
  const {
    input,
    onTextChange: handleChange,
    onNumberChange: handleNumberChange,
    onShipAdd: handleShipAdd,
  } = props;

  // menambahkan context tema
  const { theme } = useContext(ThemeContext);

  return (
    <Form
      className={
        // mengubah tema form berdasarkan context
        theme === "light"
          ? "border rounded bg-light"
          : "border border-secondary rounded bg-dark"
      }
      style={{
        padding: "1em",
      }}
      onSubmit={(e) => handleShipAdd(e)}
    >
      <Form.Label>
        <span className="font-weight-bold">Add your ship</span>
      </Form.Label>
      {/* input nama kapal */}
      <Form.Group>
        <Form.Label htmlFor="nameInput" srOnly>
          Ship Name
        </Form.Label>
        <Form.Control
          size="sm"
          id="nameInput"
          placeholder="Enter ship name..."
          value={input.ship.name}
          required
          onChange={(e) => handleChange(e, "ship", "name")}
        />
      </Form.Group>
      <Form.Row>
        {/* input jumlah kru kapal */}
        <Form.Group as={Col}>
          <Form.Label htmlFor="crewInput" srOnly>
            Crew Capacity
          </Form.Label>
          <Form.Control
            size="sm"
            id="crewInput"
            placeholder="Crew..."
            value={input.ship.crew}
            required
            onChange={(e) => handleNumberChange(e, "ship", "crew")}
          />
        </Form.Group>
        {/* input jumlah kargo kapal */}
        <Form.Group as={Col}>
          <Form.Label htmlFor="cargoInput" srOnly>
            Cargo Capacity
          </Form.Label>
          <Form.Control
            size="sm"
            id="cargoInput"
            placeholder="Cargo..."
            value={input.ship.cargo}
            onChange={(e) => handleNumberChange(e, "ship", "cargo")}
          />
        </Form.Group>
        {/* input slot yang digunakan kapal */}
        <Form.Group as={Col}>
          <Form.Label htmlFor="slotInput" srOnly>
            Ship Slot
          </Form.Label>
          <Form.Control
            size="sm"
            id="slotInput"
            placeholder="Slot..."
            value={input.ship.slot}
            required
            onChange={(e) => handleNumberChange(e, "ship", "slot")}
          />
        </Form.Group>
      </Form.Row>
      {/* tombol menambahkan kapal ke dalam daftar kapal */}
      <Button size="sm" variant="primary" type="submit" block>
        Add Ship
      </Button>
    </Form>
  );
};
