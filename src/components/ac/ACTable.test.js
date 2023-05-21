import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ACTable from "./ACTable";
import "@testing-library/jest-dom/extend-expect";

describe("ACTable", () => {
  const acs = [
    {
      id: 1,
      serviceName: "ac1",
      name: "AC Living Room",
      state: true,
      temperature: 22,
      humidity: 55,
    },
    {
      id: 2,
      serviceName: "ac2",
      name: "AC Bedroom",
      state: false,
      temperature: 19,
      humidity: 50,
    },
    {
      id: 3,
      serviceName: "ac3",
      name: "AC Kitchen",
      state: true,
      temperature: 20,
      humidity: 45,
    },
  ];

  it("renders the correct number of ACs", () => {
    const { getAllByRole } = render(
      <ACTable acs={acs} onToggleState={() => {}} onUpdateSettings={() => {}} />
    );
    const rows = getAllByRole("row");
    expect(rows).toHaveLength(acs.length + 1);
  });

  it("calls onToggleState when button is clicked", () => {
    const mockOnToggleState = jest.fn();
    const { getAllByText } = render(
      <ACTable acs={acs} onToggleState={mockOnToggleState} onUpdateSettings={() => {}} />
    );
    const firstButton = getAllByText("On")[0];
    fireEvent.click(firstButton);
    expect(mockOnToggleState).toHaveBeenCalledWith(acs[0]);
  });

  it("calls onUpdateSettings when update button is clicked", () => {
    const mockOnUpdateSettings = jest.fn();
    const { getAllByText } = render(
      <ACTable acs={acs} onToggleState={() => {}} onUpdateSettings={mockOnUpdateSettings} />
    );
    const updateButtons = getAllByText("Update");
    fireEvent.click(updateButtons[0]); // Assuming the first "Update" button is the one we want to target
    expect(mockOnUpdateSettings).toHaveBeenCalled();
  });
  
  it("renders AC names correctly", () => {
    const { getAllByText } = render(
      <ACTable acs={acs} onToggleState={() => {}} onUpdateSettings={() => {}} />
    );
    acs.forEach((ac) => {
      const acName = getAllByText(ac.name);
      expect(acName.length).toBeGreaterThan(0);
    });
  });

  it("renders the correct button state based on AC state", () => {
    const { getAllByText } = render(
      <ACTable acs={acs} onToggleState={() => {}} onUpdateSettings={() => {}} />
    );
    acs.forEach((ac) => {
      const button = getAllByText(ac.state ? "On" : "Off");
      expect(button.length).toBeGreaterThan(0);
    });
  });

  it("renders the correct current values", () => {
    const { getAllByText } = render(
      <ACTable acs={acs} onToggleState={() => {}} onUpdateSettings={() => {}} />
    );
    acs.forEach((ac) => {
      const temperature = getAllByText(ac.temperature.toString());
      const humidity = getAllByText(ac.humidity.toString());
      expect(temperature.length).toBeGreaterThan(0);
      expect(humidity.length).toBeGreaterThan(0);
    });
  });
});
