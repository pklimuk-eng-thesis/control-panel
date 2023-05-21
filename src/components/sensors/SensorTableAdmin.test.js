import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SensorTableAdmin from "./SensorTableAdmin";

describe("SensorTableAdmin", () => {
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
      <SensorTableAdmin
        sensors={sensors}
        onToggleState={() => {}}
        onToggleDetectionStatus={() => {}}
      />
    );
    const rows = getAllByRole("row");
    expect(rows).toHaveLength(sensors.length + 1);
  });

  it("calls onToggleState when state button is clicked", () => {
    const mockOnToggleState = jest.fn();
    const { getAllByText } = render(
      <SensorTableAdmin
        sensors={sensors}
        onToggleState={mockOnToggleState}
        onToggleDetectionStatus={() => {}}
      />
    );
    const firstStateButton = getAllByText("On")[0];
    fireEvent.click(firstStateButton);
    expect(mockOnToggleState).toHaveBeenCalledWith(sensors[0]);
  });

  it("calls onToggleDetectionStatus when detection status button is clicked", () => {
    const mockOnToggleDetectionStatus = jest.fn();
    const { getAllByText } = render(
      <SensorTableAdmin
        sensors={sensors}
        onToggleState={() => {}}
        onToggleDetectionStatus={mockOnToggleDetectionStatus}
      />
    );
    const firstDetectionStatusButton = getAllByText("Detected")[0];
    fireEvent.click(firstDetectionStatusButton);
    expect(mockOnToggleDetectionStatus).toHaveBeenCalledWith(sensors[0]);
  });

  it("renders sensor names correctly", () => {
    const { getAllByText } = render(
      <SensorTableAdmin
        sensors={sensors}
        onToggleState={() => {}}
        onToggleDetectionStatus={() => {}}
      />
    );
    sensors.forEach((sensor) => {
      const sensorName = getAllByText(sensor.name);
      expect(sensorName.length).toBeGreaterThan(0);
    });
  });

  it("renders the correct state button state based on sensor state", () => {
    const { getAllByText } = render(
      <SensorTableAdmin
        sensors={sensors}
        onToggleState={() => {}}
        onToggleDetectionStatus={() => {}}
      />
    );
    sensors.forEach((sensor) => {
      const stateButton = getAllByText(sensor.state ? "On" : "Off");
      expect(stateButton.length).toBeGreaterThan(0);
    });
  });

  it("renders the correct detection status button state based on sensor detection status", () => {
    const { getAllByText } = render(
      <SensorTableAdmin
        sensors={sensors}
        onToggleState={() => {}}
        onToggleDetectionStatus={() => {}}
      />
    );
    sensors.forEach((sensor) => {
      const detectionStatusButton = getAllByText(
        sensor.detectionStatus ? "Detected" : "NotDetected"
      );
      expect(detectionStatusButton.length).toBeGreaterThan(0);
    });
  });
});
