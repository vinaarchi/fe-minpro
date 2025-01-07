"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Category = {
  displayName: string;
  dbTopic: string;
  image: string;
};

const CATEGORIES: Category[] = [
  {
    displayName: "Art & Design",
    dbTopic: "Desain, Foto, Video",
    image: "/images/category/art.jpg",
  },
  {
    displayName: "Culinary",
    dbTopic: "Kuliner",
    image: "/images/category/culinary.jpg",
  },
  {
    displayName: "Education",
    dbTopic: "Pendidikan",
    image: "/images/category/edu.jpg",
  },
  {
    displayName: "Fashion",
    dbTopic: "Fashion",
    image: "/images/category/fashion.jpg",
  },
  {
    displayName: "Music",
    dbTopic: "Musik",
    image: "/images/category/music.jpg",
  },
  {
    displayName: "Sport",
    dbTopic: "Sport",
    image: "/images/category/sport.jpg",
  },
  {
    displayName: "Tech",
    dbTopic: "Teknologi",
    image: "/images/category/tech.jpg",
  },
  {
    displayName: "Travel",
    dbTopic: "Travel",
    image: "/images/category/travel.jpg",
  },
];

const CategoryEvent = () => {
  const router = useRouter();
  const [availableTopics, setAvailableTopics] = useState<string[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch(
          "http://localhost:3232/event-categories/topics"
        );
        const topics = await response.json();
        setAvailableTopics(topics);
      } catch (error) {
        console.error("Failed to fetch topics:", error);
      }
    };

    fetchTopics();
  }, []);

  const handleCategoryClick = (dbTopic: string) => {
    router.push(`/events?topic=${encodeURIComponent(dbTopic)}`);
  };

  return (
    <div>
      <div className="bg-customLightBlue p-10">
        <h1 className="text-4xl font-ibrand text-white mb-8">Kategori Event</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
          {CATEGORIES.map((category, idx) => (
            <div
              key={idx}
              onClick={() => handleCategoryClick(category.dbTopic)}
              className="group relative w-48 cursor-pointer"
            >
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={category.image}
                  alt={category.displayName}
                  width={500}
                  height={250}
                  className="rounded-lg transition-transform duration-300 group-hover:scale-110"
                  priority={idx < 4}
                />
              </div>

              <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg transition-opacity duration-300 group-hover:bg-opacity-50" />

              <p className="absolute bottom-4 left-0 right-0 text-center font-ibrand text-2xl text-white">
                {category.displayName}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-8">
        <button
          onClick={() => router.push("/events")}
          className="w-full text-center text-4xl font-ibrand transition-colors duration-300 hover:text-customOrange focus:outline-none"
        >
          Jelajahi event lainnya
        </button>
      </div>
    </div>
  );
};

export default CategoryEvent;
