import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/v1/get_event/${eventId}`
        );
        if (!response.ok) {
          throw new Error("Event not found");
        }
        const eventData = await response.json();
        setEvent(eventData);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (!event) {
    return <p>No Event Found</p>;
  }

  return (
    <div>
      <h2>Event Details</h2>
      <p>ID: {eventId}</p>
      <p>Title: {event.title}</p>
      <p>Description: {event.content}</p>
      <div>
        <h3>Media:</h3>
        {event.media && event.media.length > 0 ? (
          event.media.map((mediaItem, index) => (
            <div key={index}>
              {mediaItem.type.startsWith("image/") ? (
                <img src={mediaItem.url} alt={`Media ${index + 1}`} />
              ) : (
                <a
                  href={mediaItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {mediaItem.url}
                </a>
              )}
            </div>
          ))
        ) : (
          <p>No media available</p>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
