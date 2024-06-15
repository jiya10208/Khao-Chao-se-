import React, { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const resp = await fetch(url, config);

  const respData = await resp.json();

  if (!resp.ok) {
    throw new Error(respData.message || "Something went wrong");
  }
  return respData;
}

export default function useHttp(url, config, initialData) {
  const [error, setError] = useState();
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async function sendRequest(d) {
      setLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: d });
        setData(resData);
      } catch (err) {
        setError(err.message || "something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && config.method === "GET") || !config || !config.method) {
      sendRequest();
    }
  }, [sendRequest, config]);
  return {
    data,
    loading,
    error,
    sendRequest,
    clearData,
  };
}
