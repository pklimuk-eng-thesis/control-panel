import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SensorTable from "./SensorTable";
import "@testing-library/jest-dom/extend-expect";

describe("SensorTable", () => {
  const sensors = [
    {
      id: 1,
      name: "Sensor1",
      state: true,
      detectionStatus: true,
      serviceName: "Service1",
    },
    {
      id: 2,
      name: "Sensor2",
      state: false,
      detectionStatus: false,
      serviceName: "Service2",
    },
    {
      id: 3,
      name: "Sensor3",
      state: true,
      detectionStatus: false,
      serviceName: "Service3",
    },
  ];

  it("renders the correct number of sensors", () => {
    const { getAllByRole } = render(
      <SensorTable sensors={sensors} onToggleState={() => {}} />
    );
    const rows = getAllByRole("row");
    expect(rows).toHaveLength(sensors.length + 1);
  });

  it("calls onToggleState when button is clicked", () => {
    const mockOnToggleState = jest.fn();
    const { getAllByText } = render(
      <SensorTable sensors={sensors} onToggleState={mockOnToggleState} />
    );
    const firstButton = getAllByText("On")[0];
    fireEvent.click(firstButton);
    expect(mockOnToggleState).toHaveBeenCalledWith(sensors[0]);
  });

  it("renders sensor names correctly", () => {
    const { getAllByText } = render(
      <SensorTable sensors={sensors} onToggleState={() => {}} />
    );
    sensors.forEach((sensor) => {
      const sensorName = getAllByText(sensor.name);
      expect(sensorName.length).toBeGreaterThan(0);
    });
  });

  it("renders the correct button state based on sensor state", () => {
    const { getAllByText } = render(
      <SensorTable sensors={sensors} onToggleState={() => {}} />
    );
    sensors.forEach((sensor) => {
      const button = getAllByText(sensor.state ? "On" : "Off");
      expect(button.length).toBeGreaterThan(0);
    });
  });

  it("renders the correct detection status", () => {
    const { getAllByText } = render(
      <SensorTable sensors={sensors} onToggleState={() => {}} />
    );
    sensors.forEach((sensor) => {
      const detectionStatus = getAllByText(
        sensor.detectionStatus ? "Detected" : "Not Detected"
      );
      expect(detectionStatus.length).toBeGreaterThan(0);
    });
  });

  it("renders with the correct styles and classes", () => {
    const { container } = render(
      <SensorTable sensors={sensors} onToggleState={() => {}} />
    );
    const sensorTable = container.querySelector(".sensorTable");
    const title = container.querySelector(".title");
    const table = container.querySelector(".table");
    const buttonOn = container.querySelector(".buttonOn");
    const buttonOff = container.querySelector(".buttonOff");
    const historyButton = container.querySelector(".historyButton");
    const textRed = container.querySelector(".textRed");
    const textGreen = container.querySelector(".textGreen");
    const boldText = container.querySelector(".boldText");
    
    expect(sensorTable).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(table).toBeInTheDocument();
    expect(buttonOn).toBeInTheDocument();
    expect(buttonOff).toBeInTheDocument();
    expect(historyButton).toBeInTheDocument();
    expect(textRed).toBeInTheDocument();
    expect(textGreen).toBeInTheDocument();
    expect(boldText).toBeInTheDocument();
  });
});
