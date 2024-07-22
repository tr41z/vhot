"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { CarouselComponent } from "@/components/event/carousel";
import { ChevronDown, ChevronUp } from "lucide-react";

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

  const handleLike = () => {
    if (event) {
      setEvent({
        ...event,
        like_count: event.like_count + 1,
      });
    }
  };

  const handleDislike = () => {
    if (event) {
      setEvent({
        ...event,
        dislike_count: event.dislike_count + 1,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="p-4">
      <div className="flex flex-col justify-center items-center mt-10">
        <div className="text-center uppercase tracking-wider font-light mb-4">
          <p className="text-lg md:text-xl lg:text-2xl">{event.title}</p>
          <p className="text-sm md:text-base lg:text-lg">{event.content}</p>
        </div>
        <div className="flex flex-col justify-around items-center w-full">
          <CarouselComponent />
          <div className="flex justify-between w-full items-center mt-10 space-x-4">
            <button
              onClick={handleLike}
              className="flex justify-center bg-slate-500 hover:bg-slate-400 duration-300 text-white px-4 py-2 rounded-xl w-1/2"
            >
              <ChevronUp />
            </button>
            <button
              onClick={handleDislike}
              className="flex justify-center bg-red-500 hover:bg-red-400 duration-300 text-white px-4 py-2 rounded-xl w-1/2"
            >
              <ChevronDown />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
