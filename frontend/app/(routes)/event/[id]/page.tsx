"use client"

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";

interface Event {
  title: string;
  content: string;
  like_count: number;
  dislike_count: number;
  media: any;
}

const EventPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
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
      {event.media.map((media: any, index: number) => (
        <Image
          key={index} 
          src={media.url}
          alt={event.title}
          width={600}
          height={300}
        />
      ))}
    </div>
  );
};

export default EventPage;
