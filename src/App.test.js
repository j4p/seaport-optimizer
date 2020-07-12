import React from "react";
import App from "./App";
import {
  AddShipForm,
  AddMissionForm,
  ShipList,
  MissionList,
} from "./components";

it("renders app", async () => {
  expect(<App />).toBeTruthy();
});

it("renders ship form", async () => {
  expect(<AddShipForm />).toBeTruthy();
});

it("renders mission form", async () => {
  expect(<AddMissionForm />).toBeTruthy();
});

it("renders ship list", async () => {
  expect(<ShipList />).toBeTruthy();
});

it("renders mission list", async () => {
  expect(<MissionList />).toBeTruthy();
});
