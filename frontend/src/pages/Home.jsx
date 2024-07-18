import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEvent } from "../api/api"; 

const Home = () => {
  const [id, setId] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await getEvent(id); 
      setResponseData(data);

      navigate(`/event/${id}`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter Event ID"
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p>Error: {error}</p>}
      {responseData && (
        <div>
          <p>Event Details:</p>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Home;
