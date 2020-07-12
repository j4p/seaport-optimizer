import React, { useContext } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { ThemeContext } from "../ThemeContext";

export const AddMissionForm = (props) => {
  // destructuring props
  const {
    input,
    onSelectChange: handleChange,
    onNumberChange: handleNumberChange,
    onMissionAdd: handleMissionAdd,
  } = props;

  // menggunakan context tema
  const { theme } = useContext(ThemeContext);

  return (
    <Form
      className={
        // mengubah tema berdasarkan context
        theme === "light"
          ? "border rounded bg-light"
          : "border border-secondary rounded bg-dark"
      }
      style={{
        padding: "1em",
      }}
      onSubmit={(e) => handleMissionAdd(e)}
    >
      <Form.Label>
        <span className="font-weight-bold">Add your mission</span>
      </Form.Label>
      {/* input jenis misi */}
      <Form.Group>
        <Form.Label htmlFor="typeInput" srOnly>
          Mission Type
        </Form.Label>
        <Form.Control
          size="sm"
          as="select"
          id="typeInput"
          value={input.mission.type}
          required
          onChange={(e) => handleChange(e, "mission", "type")}
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
      </Form.Group>
      <Form.Row>
        {/* input jumlah yang akan diantar dalam misi */}
        <Form.Group as={Col}>
          <Form.Label htmlFor="qtyInput" srOnly>
            Quantity
          </Form.Label>
          <Form.Control
            size="sm"
            id="qtyInput"
            placeholder="Quantity..."
            value={input.mission.qty}
            required
            onChange={(e) => handleNumberChange(e, "mission", "qty")}
          />
        </Form.Group>
        {/* input faktor pengali */}
        <Form.Group as={Col}>
          <Form.Label htmlFor="multInput" srOnly>
            Multiplier
          </Form.Label>
          <Form.Control
            size="sm"
            id="multInput"
            placeholder="Multiplier..."
            value={input.mission.mult}
            required
            onChange={(e) => handleNumberChange(e, "mission", "mult")}
          />
        </Form.Group>
        {/* input kru yang diperlukan untuk mengantar */}
        <Form.Group as={Col}>
          <Form.Label htmlFor="crewCostInput" srOnly>
            Crew Cost
          </Form.Label>
          <Form.Control
            size="sm"
            id="crewCostInput"
            placeholder="Crew cost..."
            value={input.mission.minCrew}
            required
            onChange={(e) => handleNumberChange(e, "mission", "crewCost")}
          />
        </Form.Group>
      </Form.Row>
      {/* tombol untuk menambahkan misi ke dalam daftar misi */}
      <Button size="sm" variant="primary" type="submit" block>
        Add Mission
      </Button>
    </Form>
  );
};
