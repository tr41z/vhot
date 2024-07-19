export const getEvent = async (eventId) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/v1/get_event/${eventId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch events!");
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
      throw new Error("Failed to create event!");
    }

    const data = await response.json();
    return data.event_id;
  } catch (error) {
    console.error("Error creating event! ", error);
    throw error;
  }
};

export const likeEvent = async (eventId) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/v1/like_event/${eventId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to like an event!");
    }

  } catch (error) {
    console.error("Error while liking event!", error);
    throw error;
  }
};

export const removeLike = async (eventId) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/v1/remove_like/${eventId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to remove like from an event!");
    }
  } catch (error) {
    console.error("Error while removing like from event!", error);
    throw error;
  }
};

export const dislikeEvent = async (eventId) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/v1/dislike_event/${eventId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to like an event!");
    }
  } catch (error) {
    console.error("Error while liking event!", error);
    throw error;
  }
};

export const removeDislike = async (eventId) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/v1/remove_dislike/${eventId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to remove dislike from an event!");
    }
  } catch (error) {
    console.error("Error while removing dislike from event!", error);
    throw error;
  }
};