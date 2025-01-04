"use client";

import * as React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "next/image";
import CardBody from "react-bootstrap/esm/CardBody";
import CardTitle from "react-bootstrap/esm/CardTitle";
import CardText from "react-bootstrap/esm/CardText";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Event {
  event_id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  price?: number;
  image?: string;
  createdAt: string;
  locationDetail?: {
    name: string;
  };
  category?: {
    name: string;
  };
}

const EventList = () => {
  const [events, setEvents] = React.useState<Event[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const router = useRouter();

  const fetchEvents = async () => {
    try {
      const response = await fetch(`http://localhost:3232/events?limit=4`);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setEvents(data.events);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchEvents();
  }, []);

  if (isLoading) return <div className="m-12">Loading...</div>;

  return (
    <div className="m-12">
      <div>
        <h1 className="font-ibrand text-5xl">Event Terbaru</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
        {events.map((event) => (
          <Card
            key={event.event_id}
            className="border rounded-md shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => router.push(`/event/${event.event_id}`)}
          >
            <Image
              src={event.image || "/images/event-list-default.svg"}
              alt={event.name}
              width={400}
              height={400}
              className="object-cover"
            />
            <CardBody className="space-y-2 p-4">
              <CardTitle className="font-ibrand text-3xl line-clamp-2">
                {event.name}
              </CardTitle>
              <CardText className="text-customMediumBlue">
                {new Date(event.date).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </CardText>
              {event.price !== undefined && (
                <CardText className="font-bold">
                  Rp{event.price.toLocaleString("id-ID")}
                </CardText>
              )}
              <hr className="my-2" />
              <CardTitle className="font-ibrand text-2xl line-clamp-1">
                {event.locationDetail?.name || event.location}
              </CardTitle>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventList;
