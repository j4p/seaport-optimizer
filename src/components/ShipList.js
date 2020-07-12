import React, { useContext } from "react";
import { ListGroup, Row } from "react-bootstrap";
import { ShipListItemOnEdit } from "./ShipListItemOnEdit";
import { ShipListItemOnSave } from "./ShipListItemOnSave";
import { ThemeContext } from "../ThemeContext";

export const ShipList = (props) => {
  // destructuring props
  const {
    ships,
    onShipEdit,
    onShipTextEdit,
    onShipNumberEdit,
    onShipDelete,
  } = props;

  // menggunakan context tema
  const { theme } = useContext(ThemeContext);

  return (
    <ListGroup className="my-3 border-secondary rounded">
      <ListGroup.Item
        // mengubah tema list item berdasarkan context
        className={theme === "light" ? "bg-light" : "border-secondary bg-dark"}
      >
        <span className="font-weight-bold">
          Number of Ships: {ships.length}
        </span>
      </ListGroup.Item>
      {/* mapping daftar ship ke dalam list item */}
      {ships.map((ship) => {
        return (
          <ListGroup.Item
            key={ship.id}
            className={
              // mengubah tema list item berdasarkan context
              theme === "light" ? "bg-light" : "border-secondary bg-dark"
            }
          >
            <Row className="align-items-center">
              {ship.isEditing ? (
                // render jika sedang diedit
                <ShipListItemOnEdit
                  ship={ship}
                  id={ship.id}
                  onShipEdit={onShipEdit}
                  onShipTextEdit={onShipTextEdit}
                  onShipNumberEdit={onShipNumberEdit}
                  onShipDelete={onShipDelete}
                />
              ) : (
                // render jika tidak sedang diedit
                <ShipListItemOnSave
                  ship={ship}
                  id={ship.id}
                  onShipEdit={onShipEdit}
                  onShipDelete={onShipDelete}
                />
              )}
            </Row>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};
