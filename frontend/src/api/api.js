export const getEvent = async (eventId) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/v1/get_event/${eventId}`
    );

    if (!response.ok) {
      console.log("There was an error!");
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching event!", error);
    throw error; 
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await fetch("http://localhost:3001/api/v1/create_event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error("Failed to create event");
    }

    const data = await response.json();
    return data.event_id;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};