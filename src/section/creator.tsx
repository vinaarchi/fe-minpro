"use client";

import * as React from "react";

const Creator = () => {
  const eventCreators = [
    {
      name: "Andi Pratama",
      event: "Festival Musik Nusantara",
      avatar: "https://robohash.org/andipratama",
    },
    {
      name: "Siti Nurhaliza",
      event: "Pameran Seni Tradisional",
      avatar: "https://robohash.org/sitinurhaliza",
    },
    {
      name: "Budi Santoso",
      event: "Lomba Kuliner Khas Daerah",
      avatar: "https://robohash.org/budisantoso",
    },
    {
      name: "Rina Widjaya",
      event: "Jogja Night Carnival",
      avatar: "https://robohash.org/rinawidjaya",
    },
    {
      name: "Eka Putri",
      event: "Pertunjukkan Wayang Kulit",
      avatar: "https://robohash.org/ekaputri",
    },
  ];
  return (
    <div>
      <div className="p-8">
        <h1 className="font-ibrand text-4xl pl-4">Creator Favorit</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
          {eventCreators.map((creator, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 border rounded-xl hover:bg-gray-100 transition"
            >
              <img
                src={creator.avatar}
                alt={creator.name}
                className="w-24 h-24 rounded-full mb-2"
              />
              <h2>{creator.name}</h2>
              <p>{creator.event}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Creator;
