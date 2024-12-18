import React from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import Footer from "@/components/Footer";
import Footer2 from "@/components/Footer2";

const breadcrumbData = { breadcrumbs: ["Home", "Tentang Kami"] };
export default function AboutUs() {
  return (
    <div>
      <Navbar />

      <header
        className="h-[70vh] bg-black/50 bg-blend-overlay bg-cover bg-center"
        style={{ backgroundImage: "url('/images/tentang.jpg')" }}
      >
        <div className="px-20 py-36 text-white lg:px-80">
          <div className="flex items-center">
            {breadcrumbData.breadcrumbs.map((item, i) => (
              <React.Fragment key={item}>
                <Link href={i === 0 ? "/" : "/about"}>
                  <span className="hover:underline">{item}</span>
                </Link>
                {i < breadcrumbData.breadcrumbs.length - 1 && (
                  <FaChevronRight className="mx-2 h-4 w-4" />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="mt-8">
            <h1 className="mb-6 text-2xl font-ibrand font-bold">
              Tentang Kami
            </h1>
            <p className="max-w-2xl">
              EVENTRA, perusahaan teknologi asal Indonesia yang membawa misi
              pemerataan teknologi digital bagi penyelenggara event dari
              berbagai skala.
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-5 py-10 text-left text-gray-700">
        <p className="mb-6">
          EVENTRA adalah platform yang memiliki Ticketing Management Service
          (TMS) teknologi unggul dalam mendukung seluruh penyelenggara event
          mulai dari distribusi & manajemen tiket, hingga penyediaan laporan
          analisa event di akhir acara.
        </p>

        <p className="mb-6">
          Beberapa teknologi yang kami sediakan siap untuk memfasilitasi
          penyelenggara event dalam setiap tahap persiapan yang meliputi:
        </p>

        <ul className="mb-6 space-y-4 list-disc pl-4 inline-block text-left ">
          <li>
            Distributor tiket terlengkap yang telah bekerja sama dengan EVENTRA
            untuk menjual tiket Anda.
          </li>
          <li>
            Sistem pembayaran yang beragam dan aman memberikan kemudahan kepada
            calon pembeli, untuk mendapatkan konversi yang lebih tinggi.
          </li>
          <li>
            Gate management yang paling aman dan nyaman untuk akses saat event
            berlangsung.
          </li>
          <li>
            Sistem analisis data yang lengkap dan komprehensif setelah acara
            berlangsung untuk memudahkan penyelenggara event dalam menentukan
            strategi event selanjutnya.
          </li>
        </ul>

        <p>
          Sudah ada ratusan event yang bekerja sama dengan kami dan semuanya
          tersebar di seluruh Indonesia. Kini, saatnya perkenalkan event Anda
          pada dunia untuk membawa penonton yang lebih banyak lagi bersama kami!
        </p>
      </div>
      <Footer />
      <Footer2 />
    </div>
  );
}
