import React, { useState, useEffect } from "react";
import Dexie from "dexie";
import uuid from "react-uuid";
import { Row, Col } from "react-bootstrap";
import {
  AddShipForm,
  ShipList,
  AddMissionForm,
  MissionList,
  GenerateDeployment,
} from "../components";

export const Home = () => {
  // menambahkan state dan fungsi-fungsi untuk mengontrol input
  const [input, setInput] = useState({
    ship: {
      name: "",
      crew: "",
      cargo: "",
      slot: "",
      isEditing: false,
    },
    mission: {
      type: "",
      qty: "",
      mult: "",
      crewCost: "",
      isEditing: false,
    },
  });

  const handleChange = (e, form, field) => {
    setInput({
      ...input,
      [form]: {
        ...input[form],
        [field]: e.target.value,
      },
    });
  };

  const handleNumberChange = (e, form, field) => {
    const value = parseInt(e.target.value);
    setInput({
      ...input,
      [form]: {
        ...input[form],
        [field]: value < 0 || isNaN(value) ? "" : value.toString(),
      },
    });
  };

  // buat database IDB
  const db = new Dexie("Seaport-Optimizer");
  db.version(1).stores({
    ships: "id, name, crew, cargo, slot, isEditing",
    missions: "id, type, qty, mult, crewCost, isEditing",
  });
  db.open().catch((err) => {
    console.log(err.stack || err);
  });

  // menambahkan state dan fungsi-fungsi untuk mengontrol daftar kapal
  const [ships, setShips] = useState([]);

  const handleShipAdd = (e) => {
    e.preventDefault();

    const ship = {
      id: uuid(),
      name: input.ship.name,
      crew: input.ship.crew,
      cargo: input.ship.cargo,
      slot: input.ship.slot,
      isEditing: false,
    };

    // tambahkan kapal ke IDB
    db.ships.put(ship).then(async () => {
      const allShips = await db.ships.toArray();
      setShips(allShips);

      // bersihkan input
      setInput({
        ...input,
        ship: {
          ...input.ship,
          name: "",
          crew: "",
          cargo: "",
          slot: "",
        },
      });
    });
  };

  const handleShipEdit = async (e, id) => {
    e.preventDefault();

    const ship = await db.ships.where("id").equals(id).toArray();

    // ubah database
    db.ships
      .put({
        ...ship[0],
        isEditing: !ship[0].isEditing,
      })
      .then(async () => {
        const allShips = await db.ships.toArray();
        setShips(allShips);
      });
  };

  const handleShipTextEdit = (e, id, field) => {
    const clone = [...ships];
    const idx = clone.findIndex((ship) => ship.id === id);
    clone[idx] = {
      ...clone[idx],
      [field]: e.target.value,
    };

    // ubah database
    db.ships.put(clone[idx]).then(async () => {
      const allShips = await db.ships.toArray();
      setShips(allShips);
    });
  };

  const handleShipNumberEdit = (e, id, field) => {
    const value = parseInt(e.target.value);
    const clone = [...ships];
    const idx = clone.findIndex((ship) => ship.id === id);
    clone[idx] = {
      ...clone[idx],
      [field]: value < 0 || isNaN(value) ? "" : value.toString(),
    };

    // ubah database
    db.ships.put(clone[idx]).then(async () => {
      const allShips = await db.ships.toArray();
      setShips(allShips);
    });
  };

  const handleShipDelete = (id) => {
    // hapus dari database
    db.ships.delete(id).then(async () => {
      const allShips = await db.ships.toArray();
      setDeployedShips([]);
      setShips(allShips);
    });
  };

  // menambahkan state dan fungsi-fungsi untuk mengontrol daftar misi
  const [missions, setMissions] = useState([]);

  const handleMissionAdd = (e) => {
    e.preventDefault();

    const mission = {
      id: uuid(),
      type: input.mission.type,
      qty: input.mission.qty,
      mult: input.mission.mult,
      crewCost: input.mission.crewCost,
      isEditing: false,
    };

    // tambahkan misi ke IDB
    db.missions.add(mission).then(async () => {
      let allMissions = await db.missions.toArray();
      setMissions(allMissions);

      // bersihkan input
      setInput({
        ...input,
        mission: {
          type: "",
          qty: "",
          mult: "",
          crewCost: "",
        },
      });
    });
  };

  const handleMissionEdit = async (e, id) => {
    e.preventDefault();

    const mission = await db.missions.where("id").equals(id).toArray();

    // ubah database
    db.missions
      .put({
        ...mission[0],
        isEditing: !mission[0].isEditing,
      })
      .then(async () => {
        const allMissions = await db.missions.toArray();
        setMissions(allMissions);
      });
  };

  const handleMissionSelectEdit = (e, id, field) => {
    const clone = [...missions];
    const idx = clone.findIndex((mission) => mission.id === id);
    clone[idx] = {
      ...clone[idx],
      [field]: e.target.value,
    };

    // ubah database
    db.missions.put(clone[idx]).then(async () => {
      const allMissions = await db.missions.toArray();
      setMissions(allMissions);
    });
  };

  const handleMissionNumberEdit = (e, id, field) => {
    const value = parseInt(e.target.value);
    const clone = [...missions];
    const idx = clone.findIndex((mission) => mission.id === id);
    clone[idx] = {
      ...clone[idx],
      [field]: value < 0 || isNaN(value) ? "" : value.toString(),
    };

    // ubah database
    db.missions.put(clone[idx]).then(async () => {
      const allMissions = await db.missions.toArray();
      setMissions(allMissions);
    });
  };

  const handleMissionDelete = (id) => {
    // hapus dari database
    db.missions.delete(id).then(async () => {
      const allMissions = await db.missions.toArray();
      setDeployedShips([]);
      setMissions(allMissions);
    });
  };

  // menambahkan state dan fungsi untuk mengontrol daftar misi yang di-deploy
  const [deployedShips, setDeployedShips] = useState([]);

  // tampilkan data dari IDB
  useEffect(() => {
    const getShips = async () => {
      let allShips = await db.ships.toArray();
      setShips(allShips);
    };
    const getMissions = async () => {
      let allMissions = await db.missions.toArray();
      setMissions(allMissions);
    };
    getShips();
    getMissions();
  }, []);

  return (
    <Row className="pt-4">
      <Col>
        {/* input untuk kapal */}
        <AddShipForm
          input={input}
          onTextChange={handleChange}
          onNumberChange={handleNumberChange}
          onShipAdd={handleShipAdd}
        />
        {/* daftar kapal */}
        <ShipList
          ships={ships}
          onShipEdit={handleShipEdit}
          onShipTextEdit={handleShipTextEdit}
          onShipNumberEdit={handleShipNumberEdit}
          onShipDelete={handleShipDelete}
        />
      </Col>
      <Col>
        {/* input untuk misi */}
        <AddMissionForm
          input={input}
          onSelectChange={handleChange}
          onNumberChange={handleNumberChange}
          onMissionAdd={handleMissionAdd}
        />
        {/* daftar misi */}
        <MissionList
          missions={missions}
          onMissionEdit={handleMissionEdit}
          onMissionSelectEdit={handleMissionSelectEdit}
          onMissionNumberEdit={handleMissionNumberEdit}
          onMissionDelete={handleMissionDelete}
        />
      </Col>
      <Col>
        {/* tombol dan daftar kapal yang dideploy berdasarkan daftar kapal dan misi */}
        <GenerateDeployment
          ships={ships}
          missions={missions}
          deployedShips={deployedShips}
          setDeployedShips={setDeployedShips}
        />
      </Col>
    </Row>
  );
};
