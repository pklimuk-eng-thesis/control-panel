import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ACHistoryTable from "../ac/ACHistoryTable";
import { handleACFetchLogs } from "../ac/ACHandlers";
import { ACS_CONFIG } from "../../config/ACConfig";
import Layout from "../layout/Layout";

export default function ACHistoryPage() {
  const { acServiceName } = useParams();
  const [acLogs, setACsLogs] = useState([]);
  const acName = ACS_CONFIG.filter(
    (ac) => ac.serviceName === acServiceName
  )[0].name;

  useEffect(() => {
    const fetchACDataAndLogs = async () => {
      const logs = await handleACFetchLogs(acServiceName, 10);
      setACsLogs(logs);

      const intervalId = setInterval(async () => {
        const logs = await handleACFetchLogs(acServiceName, 10);
        setACsLogs(logs);
      }, 5000);

      return () => clearInterval(intervalId);
    };

    fetchACDataAndLogs();
  }, [acServiceName]);

  return (
    <div>
      <Layout />
      <ACHistoryTable acLogs={acLogs} acName={acName} />
    </div>
  );
}