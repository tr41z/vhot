import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../api/api";

const CreateEventForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const eventId = await createEvent({ title, content });

      navigate(`/event/${eventId}`);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default CreateEventForm;
