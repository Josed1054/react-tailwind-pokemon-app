import React, { useState, useEffect } from "react";

function useFetch(url: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (url !== "") {
      fetch(url)
        .then((Response) => Response.json())
        .then((data) => setData(data))
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
