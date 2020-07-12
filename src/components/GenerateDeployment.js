import React, { useContext } from "react";
import { ListGroup, Button, Row, Col } from "react-bootstrap";
import { FiBox as CargoIcon } from "react-icons/fi";
import { TiTimesOutline as MultIcon } from "react-icons/ti";
import { BsPerson as CrewIcon } from "react-icons/bs";
import { TiAnchorOutline as SlotIcon } from "react-icons/ti";
import { ThemeContext } from "../ThemeContext";

export const GenerateDeployment = (props) => {
  // destructuring props
  const { ships, missions, deployedShips, setDeployedShips } = props;

  // menggunakan context tema
  const { theme } = useContext(ThemeContext);

  // (perlu diperbaiki)
  const deployShips = (ships, missions) => {
    if (missions.length <= 0) setDeployedShips([]);
    else {
      let clone = [...deployedShips];
      missions.forEach((mission, idx) => {
        // filter untuk kapal yang memiliki jumlah kru yang cukup
        let qualifiedShips = ships.filter(
          (ship) => parseInt(ship.crew) >= parseInt(mission.crewCost)
        );
        console.log("qualifiedShips", qualifiedShips);

        // filter untuk kapal yang belum dipakai
        let filteredQualifiedShips;
        if (idx === 0) filteredQualifiedShips = qualifiedShips;
        else if (idx > 0)
          filteredQualifiedShips = qualifiedShips.filter((ship) => {
            let shipIsUsed = false;
            for (let i = 0; i < idx; i++) {
              if (clone[i].includes(ship)) {
                shipIsUsed = true;
                break;
              }
            }
            return !shipIsUsed;
          });
        console.log("filteredQualifiedShips", filteredQualifiedShips);
        // let loss = Number.MAX_SAFE_INTEGER;
        // let triedCombinations = [];
        // let bestCombination = [];
        let combination = [];
        for (let i = 0; i < filteredQualifiedShips.length; i++) {
          // cek kapasitas kargo dalam kombinasi
          let cargo = 0;
          if (combination.length === 0) cargo = 0;
          else if (combination.length === 1)
            cargo = parseInt(combination[0].cargo);
          else
            for (let j = 0; j < combination.length; j++) {
              console.log(parseInt(combination[j].cargo));
              cargo += parseInt(combination[j].cargo);
            }

          // hentikan loop bila melebihi kuantitas yang diperlukan
          console.log("cargo", cargo);
          if (cargo >= mission.qty / mission.mult) break;
          combination = combination.concat(ships[i]);
        }
        clone[idx] = combination;
      });
      setDeployedShips(clone);
    }
  };

  return (
    <ListGroup>
      <ListGroup.Item
        // mengubah tema list item berdasarkan context tema
        className={theme === "light" ? "bg-light" : "border-secondary bg-dark"}
      >
        <Button
          size="sm"
          variant="success"
          block
          onClick={() => deployShips(ships, missions)}
        >
          Generate Optimized Deployment
        </Button>
      </ListGroup.Item>
      {/* mapping daftar kapal yang di-deploy ke dalam list */}
      {deployedShips.map((mission, missionIdx) => (
        <React.Fragment key={missionIdx}>
          <ListGroup.Item
            className={
              theme === "light" ? "bg-light" : "border-secondary bg-dark"
            }
          >
            <Row className="align-items-center">
              <Col>
                <span className="font-weight-bold text-capitalize">
                  {`${missionIdx + 1}. ${missions[missionIdx].type} Mission`}
                </span>
              </Col>
              <Col>
                {missions[missionIdx].type === "cargo" ? (
                  <CargoIcon />
                ) : (
                  <CrewIcon />
                )}{" "}
                <span className="font-weight-bold">
                  {missions[missionIdx].qty}
                </span>
                <br />
                <MultIcon />{" "}
                <span className="font-weight-bold">
                  {missions[missionIdx].mult}
                </span>
                <br />
                <CrewIcon />{" "}
                <span className="font-weight-bold">
                  {missions[missionIdx].crewCost}
                </span>
              </Col>
            </Row>
          </ListGroup.Item>
          {mission.map((ship, shipIdx) => (
            <ListGroup.Item
              key={shipIdx}
              className={
                // mengubah tema list item berdasarkan context tema
                theme === "light" ? "bg-light" : "border-secondary bg-dark"
              }
            >
              <Row className="align-items-center">
                <Col>
                  <span className="font-weight-bold">{ship.name}</span>
                </Col>
                <Col>
                  <CrewIcon />{" "}
                  <span className="font-weight-bold">{ship.crew}</span>
                  <br />
                  <CargoIcon />{" "}
                  <span className="font-weight-bold">{ship.cargo}</span>
                  <br />
                  <SlotIcon />{" "}
                  <span className="font-weight-bold">{ship.slot}</span>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </React.Fragment>
      ))}
    </ListGroup>
  );
};
