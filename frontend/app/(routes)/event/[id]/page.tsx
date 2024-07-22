"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";

interface Media {
  url: string;
  type: string;
}

interface Event {
  title: string;
  content: string;
  like_count: number;
  dislike_count: number;
  media: Media[];
}

const EventPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/get_event/${id}`
        );
        if (!res.ok) {
          notFound();
          return;
        }
        const data = await res.json();
        setEvent(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching event data:", error);
        notFound();
      }
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
    <div>
      <p>{event.title}</p>
      <p>{event.content}</p>
      <p>{event.like_count}</p>
      <p>{event.dislike_count}</p>
      {event.media.length > 0 ? (
        event.media.map((media, index) => (
          <div key={index}>
            <Image
              src={media.url}
              alt={event.title || "Event Image"}
              width={400}
              height={300}
              onError={() =>
                console.error(`Failed to load image: ${media.url}`)
              }
            />
          </div>
        ))
      ) : (
        <div>No media available</div>
      )}
    </div>
  );
};

export default EventPage;
