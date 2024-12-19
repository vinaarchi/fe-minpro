"use client";

import React, { useState } from "react";

import { Ticket, Plus, X } from "lucide-react";
import Footer from "@/components/Footer";

const CreateEvent: React.FC = () => {
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [showPaidTicketPopup, setShowPaidTicketPopup] = useState(false);
  const [showFreeTicketPopup, setShowFreeTicketPopup] = useState(false);
  const [activeTab, setActiveTab] = useState("detail");

  return (
    <div>
      <div className="pt-10 flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-3/4 space-y-6">
          {/*card1*/}
          <div className="bg-white shadow rounded-lg p-6 space-y-4">
            <div>
              <label className="block text-xl font-semibold mb-2 font-ibrand">
                Nama Event
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Masukkan nama event"
              />
            </div>
            <div>
              <label className="block text-xl font-semibold mb-2">
                Deskripsi Event
              </label>
              <textarea
                className="w-full border border-gray-300 rounded p-2"
                rows={4}
                placeholder="Masukkan deskripsi event"
              ></textarea>
            </div>
            <div>
              <label className="block text-xl font-semibold mb-2">
                Pilih Kategori
              </label>
              <button
                onClick={() => setShowCategoryPopup(true)}
                className="w-full border text-slate-400 border-gray-300 rounded p-2 bg-gray-50 text-left"
              >
                Pilih Kategori
              </button>

              {showCategoryPopup && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white rounded-lg shadow p-6 w-96">
                    <h3 className="font-semibold text-xl mb-4">
                      Pilih Kategori
                    </h3>

                    {/*dropdown*/}
                    <div className="mb-4">
                      <label className="block font-semibold mb-2">Format</label>
                      <select className="w-full border border-gray-300 rounded p-2">
                        <option value="festival">Festival, Fair, Bazaar</option>
                        <option value="konser">Konser</option>
                        <option value="pertandingan">Pertandingan</option>
                        <option value="exhibition">
                          {" "}
                          Exhibition, Expo, Pameran
                        </option>
                        <option value="konferensi">Konferensi</option>
                        <option value="workshop">Workshop</option>
                        <option value="pertunjukan">Pertunjukan</option>
                        <option value="atraksi">Atraksi</option>
                        <option value="theme_park">Theme Park</option>
                        <option value="akomodasi">Akomodasi</option>
                        <option value="seminar">Seminar, Talk Show</option>
                        <option value="social_gathering">
                          Social Gathering
                        </option>
                        <option value="training">
                          Training, Sertifikasi, Ujian
                        </option>
                        <option value="school_event">
                          Pensi, Event Sekolah, Kampus
                        </option>
                        <option value="trip">Trip, Tur</option>
                        <option value="lainnya">Lainnya</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block font-semibold mb-2">Topik</label>
                      <select className="w-full border border-gray-300 rounded p-2">
                        <option value="anak_keluarga">Anak</option>
                        <option value="bisnis">Bisnis</option>
                        <option value="desain">Desain</option>
                        <option value="fashion_beauty">
                          Fashion, Kecantikan
                        </option>
                        <option value="film">Film, Sinema</option>
                        <option value="game">Game, E-Sport</option>
                        <option value="hobi">Hobi, Kerajinan Tangan</option>
                        <option value="investasi">Investasi, Saham</option>
                        <option value="karir">Karir, Pengembangan Diri</option>
                        <option value="keagamaan">Keagamaan</option>
                        <option value="kesehatan">Kesehatan, Kebugaran</option>
                        <option value="keuangan">Keuangan, Finansial</option>
                        <option value="lingkungan">Lingkungan Hidup</option>
                        <option value="makanan_minuman">
                          Makanan, Minuman
                        </option>
                        <option value="marketing">Marketing</option>
                        <option value="musik">Musik</option>
                        <option value="olahraga">Olahraga</option>
                        <option value="otomotif">Otomotif</option>
                        <option value="sains_teknologi">
                          Sains, Teknologi
                        </option>
                        <option value="seni_budaya">Seni_Budaya</option>
                        <option value="soshumpol">
                          Sosial, Hukum, Politik
                        </option>
                        <option value="pendidikan">Pendidikan, Beasiswa</option>
                        <option value="tech_startup">Tech, Start-Up</option>
                        <option value="wisata">Wisata & Liburan</option>
                        <option value="lainnya">Lainnya</option>
                      </select>
                    </div>

                    <button
                      onClick={() => setShowCategoryPopup(false)}
                      className="w-full bg-blue-600 text-white rounded p-2 mt-4"
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold mb-2">
                  Diselenggarakan Oleh
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Nama penyelenggara"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">
                  Tanggal & Waktu
                </label>
                <input
                  type="datetime-local"
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Lokasi</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Lokasi event"
                />
              </div>
            </div>
          </div>

          {/*card2*/}
          <div className="bg-white shadow rounded-lg p-6 space-y-4">
            {/*kategori tiket */}
            <div className="flex space-x-4">
              <button
                onClick={() => setShowPaidTicketPopup(true)}
                className="bg-white border-[1px] border-slate-500 text-slate-500 px-8 py-4 rounded-lg hover:bg-blue-500 hover:text-white shadow-md flex items-center space-x-2 text-lg"
              >
                <Ticket className="w-6 h-6  hover:text-white" />
                <span>Buat Tiket Berbayar</span>
                <Plus className="w-6 h-6" />
              </button>
              <button
                onClick={() => setShowFreeTicketPopup(true)}
                className="bg-white border-[1px] border-slate-500 text-slate-500 px-8 py-4 rounded-lg hover:bg-blue-500 hover:text-white shadow-md flex items-center space-x-2 text-lg"
              >
                <Ticket className="w-6 h-6 hover:text-white" />
                <span>Buat Tiket Gratis</span>
                <Plus className="w-6 h-6" />
              </button>
            </div>

            {showPaidTicketPopup && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow p-6 w-96 relative">
                  <button
                    className="absolute top-4 right-4"
                    onClick={() => setShowPaidTicketPopup(false)}
                  >
                    <X className="w-6 h-6 hover:border-black hover:border-[1px]" />
                  </button>
                  <h3 className="font-semibold mb-4">Buat Tiket Berbayar</h3>
                  <div className="mb-4 flex ">
                    <button
                      onClick={() => setActiveTab("detail")}
                      className={`w-1/2 py-2 bg-white border-x-white ${
                        activeTab === "detail"
                          ? "bg-white text-black border-b-blue-500 border-[5px]"
                          : "bg-white text-gray-600 hover:bg-blue-700 hover:text-white"
                      }`}
                    >
                      Detail Tiket
                    </button>
                    <button
                      onClick={() => setActiveTab("tanggal")}
                      className={`w-1/2 py-2 bg-white border-x-white  ${
                        activeTab === "tanggal"
                          ? " text-black border-b-blue-500 border-[5px]"
                          : "bg-white text-gray-600  hover:bg-blue-700 hover:text-white"
                      }`}
                    >
                      Tanggal Penjualan
                    </button>
                  </div>
                  {activeTab === "detail" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block font-semibold mb-2">
                          Nama Tiket
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded p-2"
                          placeholder="Nama tiket"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-2">
                          Jumlah Tiket
                        </label>
                        <input
                          type="number"
                          className="w-full border border-gray-300 rounded p-2"
                          placeholder="Jumlah tiket"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-2">
                          Harga
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded p-2"
                          placeholder="Harga tiket (Rp)"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-2">
                          Deskripsi Tiket
                        </label>
                        <textarea
                          className="w-full border border-gray-300 rounded p-2"
                          rows={3}
                          placeholder="Deskripsi tiket"
                        ></textarea>
                      </div>
                    </div>
                  )}
                  {activeTab === "tanggal" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block font-semibold mb-2">
                          Tanggal Mulai
                        </label>
                        <input
                          type="date"
                          className="w-full border border-gray-300 rounded p-2"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-2">
                          Tanggal Berakhir
                        </label>
                        <input
                          type="date"
                          className="w-full border border-gray-300 rounded p-2"
                        />
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => setShowPaidTicketPopup(false)}
                    className="w-full bg-blue-600 text-white rounded p-2 mt-4"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            )}

            {showFreeTicketPopup && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow p-6 w-96 relative">
                  <button
                    className="absolute top-4 right-4"
                    onClick={() => setShowFreeTicketPopup(false)}
                  >
                    <X className="w-6 h-6 hover:border-black hover:border-[1px]" />
                  </button>
                  <h3 className="font-semibold mb-4">Buat Tiket Gratis</h3>
                  <div className="mb-4 flex">
                    <button
                      onClick={() => setActiveTab("detail")}
                      className={`w-1/2 py-2 bg-white border-x-white ${
                        activeTab === "detail"
                          ? " bg-white text-black border-b-blue-500 border-[5px]"
                          : "bg-white text-gray-600 hover:bg-blue-700 hover:text-white"
                      }`}
                    >
                      Detail Tiket
                    </button>
                    <button
                      onClick={() => setActiveTab("tanggal")}
                      className={`w-1/2 py-2 bg-white border-x-white ${
                        activeTab === "tanggal"
                          ? "bg-white text-black border-b-blue-500 border-[5px]"
                          : "bg-white text-gray-600  hover:bg-blue-700 hover:text-white"
                      }`}
                    >
                      Tanggal Penjualan
                    </button>
                  </div>
                  {activeTab === "detail" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block font-semibold mb-2">
                          Nama Tiket
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded p-2"
                          placeholder="Nama tiket"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-2">
                          Jumlah Tiket
                        </label>
                        <input
                          type="number"
                          className="w-full border border-gray-300 rounded p-2"
                          placeholder="Jumlah tiket"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-2">
                          Deskripsi Tiket
                        </label>
                        <textarea
                          className="w-full border border-gray-300 rounded p-2"
                          rows={3}
                          placeholder="Deskripsi tiket"
                        ></textarea>
                      </div>
                    </div>
                  )}
                  {activeTab === "tanggal" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block font-semibold mb-2">
                          Tanggal Mulai
                        </label>
                        <input
                          type="date"
                          className="w-full border border-gray-300 rounded p-2"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-2">
                          Tanggal Berakhir
                        </label>
                        <input
                          type="date"
                          className="w-full border border-gray-300 rounded p-2"
                        />
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => setShowFreeTicketPopup(false)}
                    className="w-full bg-blue-600 text-white rounded p-2 mt-4"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-2">
                  Nama Narahubung
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Nama narahubung"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Email narahubung"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">No. Ponsel</label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="No. ponsel narahubung"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pb-6 space-x-4">
            <button className="bg-gray-300 text-black rounded p-2 hover:bg-slate-400 border-[2px] border-b-black border-x-black shadow-sm shadow-black border-t-slate-400">
              Simpan ke Draft
            </button>
            <button className="bg-blue-600 text-white rounded p-2 hover:bg-blue-900 border-[2px] border-b-black border-x-black shadow-sm shadow-black border-t-slate-400">
              Simpan
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateEvent;
