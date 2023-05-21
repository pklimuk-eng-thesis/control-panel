import React from "react";
import { render } from "@testing-library/react";
import SensorHistoryTable from "./SensorHistoryTable";
import "@testing-library/jest-dom/extend-expect";

describe("SensorHistoryTable", () => {
  const sensorLogs = [
    {
      id: 1,
      created_at: "2023-05-20T10:30:00Z",
      is_enabled: true,
      detected: true,
    },
    {
      id: 2,
      created_at: "2023-05-19T14:45:00Z",
      is_enabled: false,
      detected: false,
    },
    {
      id: 3,
      created_at: "2023-05-18T08:15:00Z",
      is_enabled: true,
      detected: false,
    },
  ];

  const sensorName = "Sensor1";

  it("renders the correct number of sensor logs", () => {
    const { getAllByRole } = render(
      <SensorHistoryTable sensorLogs={sensorLogs} sensorName={sensorName} />
    );
    const rows = getAllByRole("row");
    expect(rows).toHaveLength(sensorLogs.length + 1); // +1 for the table header row
  });

  it("renders the sensor name correctly", () => {
    const { getByText } = render(
      <SensorHistoryTable sensorLogs={sensorLogs} sensorName={sensorName} />
    );
    const titleElement = getByText(`${sensorName} History`);
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the correct date format for each sensor log", () => {
    const { getAllByText } = render(
      <SensorHistoryTable sensorLogs={sensorLogs} sensorName={sensorName} />
    );
    sensorLogs.forEach((sensorLog) => {
      const formattedDate = new Date(sensorLog.created_at).toLocaleString(
        navigator.language,
        {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }
      );
      const regex = new RegExp(formattedDate, "i"); // Case-insensitive match
      const dateElement = getAllByText((content, element) => {
        // Match the text using the regular expression
        const hasText = (node) => node.textContent.match(regex);
        const nodeHasText = hasText(element);
        const childrenDontHaveText = Array.from(element.children).every(
          (child) => !hasText(child)
        );
        return nodeHasText && childrenDontHaveText;
      });
      expect(dateElement.length).toBeGreaterThan(0);
    });
  });
  
  it("renders the correct state for each sensor log", () => {
    const { getAllByText } = render(
      <SensorHistoryTable sensorLogs={sensorLogs} sensorName={sensorName} />
    );
    sensorLogs.forEach((sensorLog) => {
      const stateElement = getAllByText(sensorLog.is_enabled ? "On" : "Off");
      expect(stateElement.length).toBeGreaterThan(0);
    });
  });

  it("renders the correct detection status for each sensor log", () => {
    const { getAllByText } = render(
      <SensorHistoryTable sensorLogs={sensorLogs} sensorName={sensorName} />
    );
    sensorLogs.forEach((sensorLog) => {
      const detectionStatusElement = getAllByText(
        sensorLog.detected ? "Detected" : "Not Detected"
      );
      expect(detectionStatusElement.length).toBeGreaterThan(0);
    });
  });
});
