"use client";

import React, { useState } from "react";
import {
  FaChevronRight,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import Footer from "@/components/Footer";

const eventData = {
  breadcrumbs: [
    "Home",
    "Konser - Musik",
    "CINTA KALA SENJA - BERNADYA • ADRIAN KHALIF by BENGKELIVE•",
  ],
  eventName: "CINTA KALA SENJA - BERNADYA • ADRIAN KHALIF by BENGKELIVE•",
  date: "December 18, 2024",
  time: "08:00 PM - 10:30 PM",
  location: "Bengkel Space, DKI Jakarta",
  organizer: "Bengkel Space",
  imageUrl: "/images/bernadya.jpg",
  description: `BENGKELIVE PRESENTS CINTA KALA SENJA LIVE IN CONCERT - BERNADYA • ADRIAN KHALIF

Syarat & Ketentuan

No outside food or drink allowed
Dilarang membawa makanan atau minuman dari luar Bengkel Space
Open gate started at 6.30 PM
Pintu masuk di buka pada pukul 18.30 WIB
Scan your ticket barcode at the location to enter the Bengkel Space Hall
Scan barcode tiket anda di lokasi untuk memasuki aula Bengkel Space
Tickets are non-refundable
Tiket yang sudah dibeli tidak dapat dikembalikan
We are NOT responsible for the lost of this e-voucher
Kami tidak bertanggung jawab atas kehilangan e-voucher ini
NO WEAPON & NO DRUGS
DILARANG MEMBAWA SENJATA ATAU OBAT-OBATAN
No slippers 
Dilarang menggunakan sandal jepit
Guest are required to undergo a security check at the entrance 
Pengunjung wajib melalui pemeriksaan oleh petugas keamanan di pintu masuk
No professional photography / videography will be allowed unless prior permission is given 
Fotografer/ videografer profesional tidak diperkenankan kecuali atas izin yang diberikan sebelumnya
Take care of your personal belongings 
Jagalah bawaan pribadi anda
We will have every right to refuse and/or discharge entry for ticket holders that does not meet the Term & Condition
Penyelenggara berhak untuk tidak memberikan izin untuk masuk ke dalam tempat acara apabila syarat-syarat & ketentuan tidak dipenuhi`,
  tickets: [
    {
      id: 1,
      name: "Normal Price",
      price: 299000,
    },
    {
      id: 2,
      name: "VIP Standing",
      price: 350000,
    },
    {
      id: 3,
      name: "Flash Sale BCA",
      price: 200000,
      description: "Khusus pengguna BCA",
    },
    {
      id: 4,
      name: "Flash Sale BCA II",
      price: 225000,
      description: "Khusus Pengguna BCA",
    },
  ],
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const EventDetailPage = () => {
  const [ticketPicked, setTicketPicked] = useState<number | null>(null);

  const handleBuyTicket = () => {
    if (!ticketPicked) return;
    console.log("beli ticket:", ticketPicked);
  };

  const selectedTicket = eventData.tickets.find((t) => t.id === ticketPicked);

  return (
    <div>
      <div className="container p-4 mx-auto">
        <div className="mb-4 gap-4 grid grid-cols-2">
          <div className="space-y-4">
            <div className="flex text-sm text-gray-600 items-center">
              {eventData.breadcrumbs.map((item, i) => (
                <React.Fragment key={item}>
                  <span>{item}</span>
                  {i < eventData.breadcrumbs.length - 1 && (
                    <FaChevronRight className="w-4 h-4 mx-2" />
                  )}
                </React.Fragment>
              ))}
            </div>

            <img
              src={eventData.imageUrl}
              alt="Poster event"
              className="object-contain rounded-lg w-full shadow-md h-96"
            />
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h1 className="mb-4 text-2xl font-bold">{eventData.eventName}</h1>

            <div className="space-y-3">
              <div className="flex">
                <FaCalendarAlt className="mt-1 mr-2 text-gray-600" />
                <span>{eventData.date}</span>
              </div>
              <div className="items-center flex">
                <FaClock className="w-4 h-4 text-gray-600 mr-3" />
                <span>{eventData.time}</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2 h-5 w-5 text-gray-600" />
                <span className="hover:text-blue-600">
                  {eventData.location}
                </span>
              </div>
              <div className="flex">
                <FaUser className="w-5 h-5 mr-2 text-gray-600" />
                <span>Diselenggarakan oleh {eventData.organizer}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-2">
          <div className="space-y-4">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full grid grid-cols-2 border-0 bg-transparent h-14">
                <TabsTrigger
                  className="text-base font-medium data-[state=active]:font-bold data-[state=active]:shadow-none data-[state=active]:bg-transparent border-0 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600 after:transform after:scale-x-0 after:transition-transform after:duration-300 data-[state=active]:after:scale-x-100"
                  value="description"
                >
                  DESKRIPSI
                </TabsTrigger>
                <TabsTrigger
                  className="text-base font-medium data-[state=active]:font-bold data-[state=active]:shadow-none data-[state=active]:bg-transparent border-0 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600 after:transform after:scale-x-0 after:transition-transform after:duration-300 data-[state=active]:after:scale-x-100"
                  value="tickets"
                >
                  TIKET
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description">
                <div className="p-6 bg-white shadow-md rounded-lg">
                  <p className="whitespace-pre-line">{eventData.description}</p>
                </div>
              </TabsContent>

              <TabsContent value="tickets">
                <div className="space-y-4">
                  {eventData.tickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      onClick={() => setTicketPicked(ticket.id)}
                      className={`p-4 border rounded-lg cursor-pointer hover:border-blue-300 ${
                        ticketPicked === ticket.id
                          ? "border-blue-500 bg-blue-50"
                          : ""
                      }`}
                    >
                      <h3 className="text-lg font-semibold">{ticket.name}</h3>
                      {ticket.description && (
                        <p className="mt-1 text-gray-600">
                          {ticket.description}
                        </p>
                      )}
                      <p className="mt-2 text-xl font-bold">
                        {formatPrice(ticket.price)}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg">
            {selectedTicket ? (
              <div>
                <h2 className="mb-4 text-xl font-bold">Tiket Dipilih</h2>
                <div className="space-y-3">
                  <p className="text-lg">{selectedTicket.name}</p>
                  <p className="text-2xl font-bold">
                    {formatPrice(selectedTicket.price)}
                  </p>
                  <button
                    onClick={handleBuyTicket}
                    className="w-full py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                  >
                    Beli Tiket
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-600">
                Kamu belum memilih tiket, silakan pilih lebih dulu di tab menu
                TIKET
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventDetailPage;
