import React from "react";
import { render } from "@testing-library/react";
import ACHistoryTable from "./ACHistoryTable";
import "@testing-library/jest-dom/extend-expect";

describe("ACHistoryTable", () => {
  const acLogs = [
    {
      id: 1,
      created_at: "2023-05-20T10:30:00Z",
      is_enabled: true,
      temperature: 23,
      humidity: 60,
    },
    {
      id: 2,
      created_at: "2023-05-19T14:45:00Z",
      is_enabled: false,
      temperature: 22,
      humidity: 55,
    },
    {
      id: 3,
      created_at: "2023-05-18T08:15:00Z",
      is_enabled: true,
      temperature: 24,
      humidity: 62,
    },
  ];

  const acName = "AC1";

  it("renders the correct number of AC logs", () => {
    const { getAllByRole } = render(
      <ACHistoryTable acLogs={acLogs} acName={acName} />
    );
    const rows = getAllByRole("row");
    expect(rows).toHaveLength(acLogs.length + 1); // +1 for the table header row
  });

  it("renders the AC name correctly", () => {
    const { getByText } = render(
      <ACHistoryTable acLogs={acLogs} acName={acName} />
    );
    const titleElement = getByText(`${acName} History`);
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the correct date format for each AC log", () => {
    const { getAllByText } = render(
      <ACHistoryTable acLogs={acLogs} acName={acName} />
    );
    acLogs.forEach((acLog) => {
      const formattedDate = new Date(acLog.created_at).toLocaleString(
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

  it("renders the correct state for each AC log", () => {
    const { getAllByText } = render(
      <ACHistoryTable acLogs={acLogs} acName={acName} />
    );
    acLogs.forEach((acLog) => {
      const stateElement = getAllByText(acLog.is_enabled ? "On" : "Off");
      expect(stateElement.length).toBeGreaterThan(0);
    });
  });

  it("renders the correct temperature for each AC log", () => {
    const { getAllByText } = render(
      <ACHistoryTable acLogs={acLogs} acName={acName} />
    );
    acLogs.forEach((acLog) => {
      const temperatureElement = getAllByText(String(acLog.temperature));
      expect(temperatureElement.length).toBeGreaterThan(0);
    });
  });

  it("renders the correct humidity for each AC log", () => {
    const { getAllByText } = render(
      <ACHistoryTable acLogs={acLogs} acName={acName} />
    );
    acLogs.forEach((acLog) => {
      const humidityElement = getAllByText(String(acLog.humidity));
      expect(humidityElement.length).toBeGreaterThan(0);
    });
  });
});
