import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DeviceTable from "./DeviceTable";
import "@testing-library/jest-dom/extend-expect";

describe("DeviceTable", () => {
  const devices = [
    { id: 1, name: "Device1", state: true, serviceName: "Service1" },
    { id: 2, name: "Device2", state: false, serviceName: "Service2" },
    { id: 3, name: "Device3", state: true, serviceName: "Service3" },
  ];

  it("renders the correct number of devices", () => {
    const { getAllByRole } = render(
      <DeviceTable devices={devices} onToggleState={() => {}} />
    );
    const rows = getAllByRole("row");
    expect(rows).toHaveLength(devices.length + 1);
  });

  it("calls onToggleState when state button is clicked", () => {
    const mockOnToggleState = jest.fn();
    const { getAllByText } = render(
      <DeviceTable devices={devices} onToggleState={mockOnToggleState} />
    );
    const firstButton = getAllByText("On")[0];
    fireEvent.click(firstButton);
    expect(mockOnToggleState).toHaveBeenCalledWith(devices[0]);
  });

  it("renders device names correctly", () => {
    const { getAllByText } = render(
      <DeviceTable devices={devices} onToggleState={() => {}} />
    );
    devices.forEach((device) => {
      const deviceName = getAllByText(device.name);
      expect(deviceName.length).toBeGreaterThan(0);
    });
  });

  it("renders the correct button state based on device state", () => {
    const { getAllByText } = render(
      <DeviceTable devices={devices} onToggleState={() => {}} />
    );
    devices.forEach((device) => {
      const button = getAllByText(device.state ? "On" : "Off");
      expect(button.length).toBeGreaterThan(0);
    });
  });
});
