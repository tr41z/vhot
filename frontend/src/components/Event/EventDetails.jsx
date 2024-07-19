import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dislikeEvent, getEvent, likeEvent, removeDislike, removeLike } from "../../api/api";

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEvent(eventId);
        setEvent(eventData);
      } catch (error) {
        console.error("Error fetching event! ", error);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleLike = async () => {
    try {
      await likeEvent(eventId);

      const updatedEvent = await getEvent(eventId);
      setEvent(updatedEvent);
      setIsLiked(true)
    } catch (error) {
      console.error("Error while liking event! ", error);
    }
  };

  const handleRemoveLike = async () => {
    try {
      await removeLike(eventId);

      const updatedEvent = await getEvent(eventId);
      setEvent(updatedEvent);
      setIsLiked(false)
    } catch (error) {
      console.error("Error while removing like from event! ", error);
    }
  }

  const handleDislike = async () => {
    try {
      await dislikeEvent(eventId);
      const updatedEvent = await getEvent(eventId);
      setEvent(updatedEvent);
      setIsDisliked(true);
    } catch (error) {
      console.error("Error while disliking event! ", error);
    }
  }

  if (!event) {
    return <p>No Event Found</p>;
  }

  const handleRemoveDislike = async () => {
    try {
      await removeDislike(eventId)
      const updatedEvent = await getEvent(eventId);
      setEvent(updatedEvent)
      setIsDisliked(false);
    } catch (error) {
      console.error("Error while removing dislike from event! ", error);
    }
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
      <button onClick={isLiked ? handleRemoveLike : handleLike}>
        {isLiked ? "Unlike" : "Like"}
      </button>{" "}
      <p>Like count: {event.like_count}</p>
      <button onClick={isDisliked ? handleRemoveDislike : handleDislike}>{isDisliked ? "Undislike" : "Dislike"}</button>
      <p>Dislike count: {event.dislike_count}</p>
    </div>
  );
};

export default EventDetails;
