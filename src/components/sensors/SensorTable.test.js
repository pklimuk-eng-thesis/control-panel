import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SensorTable from "./SensorTable";

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

  // it("renders the component", () => {
  //   const { getByRole } = render(
  //     <SensorTable sensors={sensors} onToggleState={() => {}} />
  //   );
  //   const table = getByRole("table");
  //   expect(table).toBeInTheDocument();
  // });

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
});