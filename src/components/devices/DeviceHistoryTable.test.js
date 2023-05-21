import React from 'react';
import { render } from '@testing-library/react';
import DeviceHistoryTable from './DeviceHistoryTable';
import '@testing-library/jest-dom/extend-expect';

describe('DeviceHistoryTable', () => {
  const deviceLogs = [
    {
      id: 1,
      created_at: '2023-05-20T10:30:00Z',
      is_enabled: true,
    },
    {
      id: 2,
      created_at: '2023-05-19T14:45:00Z',
      is_enabled: false,
    },
    {
      id: 3,
      created_at: '2023-05-18T08:15:00Z',
      is_enabled: true,
    },
  ];

  const deviceName = 'Device1';

  it('renders the correct number of device logs', () => {
    const { getAllByRole } = render(
      <DeviceHistoryTable deviceLogs={deviceLogs} deviceName={deviceName} />
    );
    const rows = getAllByRole('row');
    expect(rows).toHaveLength(deviceLogs.length + 1); // +1 for the table header row
  });

  it('renders the device name correctly', () => {
    const { getByText } = render(
      <DeviceHistoryTable deviceLogs={deviceLogs} deviceName={deviceName} />
    );
    const titleElement = getByText(`${deviceName} History`);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the correct date format for each device log', () => {
    const { getAllByText } = render(
      <DeviceHistoryTable deviceLogs={deviceLogs} deviceName={deviceName} />
    );
    deviceLogs.forEach((deviceLog) => {
      const formattedDate = new Intl.DateTimeFormat(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }).format(new Date(deviceLog.created_at));
      const regex = new RegExp(formattedDate, 'i'); // Case-insensitive match
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

  it('renders the correct state for each device log', () => {
    const { getAllByText } = render(
      <DeviceHistoryTable deviceLogs={deviceLogs} deviceName={deviceName} />
    );
    deviceLogs.forEach((deviceLog) => {
      const stateElement = getAllByText(deviceLog.is_enabled ? 'On' : 'Off');
      expect(stateElement.length).toBeGreaterThan(0);
    });
  });
});
