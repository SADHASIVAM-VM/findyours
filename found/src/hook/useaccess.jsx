import { useState, useEffect } from "react";
const public_url = import.meta.env.VITE_PUBLIC_URL;

export default  function useAccess(endpoint) {
  const [loading, setLoading] = useState(true);
  const [fetchError, setError] = useState(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching:", `${public_url}${endpoint}`);

        const response = await fetch(`${public_url}${endpoint}`);
        const result = await response.json();
        
       if(response.ok){
        setData(result.data)
       }
        setError(null);  // Reset error if successful
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]); // Runs whenever `endpoint` changes

  return { data, loading, fetchError };
}
