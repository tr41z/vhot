"use client"

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

interface Event {
  title: string;
  content: string;
  like_count: number;
  dislike_count: number;
}

const EventPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      const res = await fetch(`http://localhost:3001/api/v1/get_event/${id}`);
      if (!res.ok) {
        notFound();
        return;
      }
      const data = await res.json();
      setEvent(data);
      setLoading(false);
    };

    fetchEventData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="text-white">
      <h1>{event.title}</h1>
      <p>{event.content}</p>
      <p>Likes: {event.like_count}</p>
      <p>Dislikes: {event.dislike_count}</p>
    </div>
  );
};

export default EventPage;
