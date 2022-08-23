import React, { useState, useEffect } from "react";

function useFetch(url: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [urls, setUrls] = useState<any>([]);
  const [urlsData, setDataUrls] = useState<any>([]);

  useEffect(() => {
    if (urls.indexOf(url) !== -1) {
      setData(urlsData[urls.indexOf(url)]);
      setLoading(false);
    } else if (url !== "" && urls.indexOf(url) === -1) {
      fetch(url)
        .then((Response) => Response.json())
        .then((data) => {
          setUrls((prevUrls: any) => [...prevUrls, url]);
          setDataUrls((prevDataUrls: any) => [...prevDataUrls, data]);
          setData(data);
        })
        .catch((error) => {
          setError(error);
          setLoading(true);
        })
        .finally(() => setLoading(false));
    }
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
