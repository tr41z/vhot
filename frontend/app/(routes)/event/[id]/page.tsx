"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { CarouselComponent } from "@/components/event/carousel";
import { ChevronDown, ChevronUp } from "lucide-react";
import LoadingSpinner from "../../../../components/loading/spinner";

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
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

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

        // Check local storage for the liked and disliked status
        const likedEvents = JSON.parse(
          localStorage.getItem("likedEvents") || "[]"
        );
        const dislikedEvents = JSON.parse(
          localStorage.getItem("dislikedEvents") || "[]"
        );
        setIsLiked(likedEvents.includes(id));
        setIsDisliked(dislikedEvents.includes(id));

        setLoading(false);
      } catch (error) {
        console.error("Error fetching event data:", error);
        notFound();
      }
    };

    fetchEventData();
  }, [id]);

  const handleLike = async () => {
    if (isLiked) {
      await handleRemoveLike();
      setIsLiked(false);
      updateLocalStorage("likedEvents", false);
      setEvent((prevEvent) =>
        prevEvent
          ? { ...prevEvent, like_count: prevEvent.like_count - 1 }
          : null
      );
    } else {
      if (isDisliked) {
        await handleRemoveDislike();
        setIsDisliked(false);
        updateLocalStorage("dislikedEvents", false);
        setEvent((prevEvent) =>
          prevEvent
            ? { ...prevEvent, dislike_count: prevEvent.dislike_count - 1 }
            : null
        );
      }
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/like_event/${id}`,
          {
            method: "PUT",
          }
        );

        if (!res.ok) {
          throw new Error(
            "There was an error with network while liking event!"
          );
        }
        setIsLiked(true);
        updateLocalStorage("likedEvents", true);
        setEvent((prevEvent) =>
          prevEvent
            ? { ...prevEvent, like_count: prevEvent.like_count + 1 }
            : null
        );
      } catch (error) {
        console.error("There was an error while liking event! ", error);
      }
    }
  };

  const handleRemoveLike = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/remove_like/${id}`,
        {
          method: "PUT",
        }
      );

      if (!res.ok) {
        throw new Error("There was an error with network while removing like!");
      }
    } catch (error) {
      console.error("There was an error while removing like! ", error);
    }
  };

  const handleDislike = async () => {
    if (isDisliked) {
      await handleRemoveDislike();
      setIsDisliked(false);
      updateLocalStorage("dislikedEvents", false);
      setEvent((prevEvent) =>
        prevEvent
          ? { ...prevEvent, dislike_count: prevEvent.dislike_count - 1 }
          : null
      );
    } else {
      if (isLiked) {
        await handleRemoveLike();
        setIsLiked(false);
        updateLocalStorage("likedEvents", false);
        setEvent((prevEvent) =>
          prevEvent
            ? { ...prevEvent, like_count: prevEvent.like_count - 1 }
            : null
        );
      }
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dislike_event/${id}`,
          {
            method: "PUT",
          }
        );

        if (!res.ok) {
          throw new Error(
            "There was an error with network while disliking event!"
          );
        }
        setIsDisliked(true);
        updateLocalStorage("dislikedEvents", true);
        setEvent((prevEvent) =>
          prevEvent
            ? { ...prevEvent, dislike_count: prevEvent.dislike_count + 1 }
            : null
        );
      } catch (error) {
        console.error("There was an error while disliking event! ", error);
      }
    }
  };

  const handleRemoveDislike = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/remove_dislike/${id}`,
        {
          method: "PUT",
        }
      );

      if (!res.ok) {
        throw new Error(
          "There was an error with network while removing dislike!"
        );
      }
    } catch (error) {
      console.error("There was an error while removing dislike! ", error);
    }
  };

  const updateLocalStorage = (key: string, status: boolean) => {
    let events = JSON.parse(localStorage.getItem(key) || "[]");
    if (status) {
      if (!events.includes(id)) {
        events.push(id);
        localStorage.setItem(key, JSON.stringify(events));
      }
    } else {
      events = events.filter((eventId: string) => eventId !== id);
      localStorage.setItem(key, JSON.stringify(events));
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="p-4">
      <div className="flex flex-col justify-center items-center mt-10">
        <div className="text-center uppercase tracking-wider font-light mb-4">
          <p className="text-xl md:text-2xl lg:text-3xl">{event.title}</p>
          <p className="text-base md:text-xl lg:text-2xl">{event.content}</p>
        </div>
        <div className="flex flex-col justify-around items-center w-full">
          <CarouselComponent media={event.media} />
          <div className="flex justify-between w-full items-center mt-10 space-x-4">
            <button
              onClick={handleLike}
              className={`flex justify-center ${
                isLiked
                  ? "bg-green-500 hover:bg-green-400"
                  : "bg-slate-500 hover:bg-slate-400"
              } duration-300 text-white px-4 py-2 rounded-xl w-1/2 font-light gap-1`}
            >
              {event.like_count}
              <ChevronUp />
            </button>
            <button
              onClick={handleDislike}
              className={`flex justify-center ${
                isDisliked
                  ? "bg-red-500 hover:bg-red-400"
                  : "bg-slate-500 hover:bg-slate-400"
              } duration-300 text-white px-4 py-2 rounded-xl w-1/2 font-light gap-1`}
            >
              {event.dislike_count}
              <ChevronDown />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
