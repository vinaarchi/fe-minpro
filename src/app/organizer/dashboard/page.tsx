"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaCalendar, FaRegMoneyBillAlt, FaChartLine } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import AuthGuard from "@/guard/AuthGuard";
import OrgSidebar from "@/components/OrgSideBar";
import Image from "next/image";

const Dashboard = () => {
  const [ticketCount, setTicketCount] = useState<number>(0);
  const [transactionCount, setTransactionCount] = useState<number>(0);
  const [ticketSold, setTicketSold] = useState<number>(0);
  const [totalPerson, setTotalPerson] = useState<number>(0);

  // useEffect (() => {

  // })
  return (
    <AuthGuard allowedRoles={["ORGANIZER"]}>
      <div>
        <div className="flex">
          <OrgSidebar />
          <div className="m-8 p-8">
            <div className=" font-ibrand text-5xl">
              <h1>Event Management Dashboard</h1>
            </div>
            <div className="flex space-x-3 mt-20">
              <div className="text-center">
                <Image
                  src="/images/table.png"
                  alt="Logo"
                  width={500}
                  height={100}
                  className="hidden md:flex"
                />
              </div>
              <div className="space-y-6 md:space-x-6 flex flex-col md:flex-row">
                <div className="space-y-6 w-96">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-3xl">Event Kami</CardTitle>
                      <hr />
                      <CardContent className="p-4">
                        <div className="text-2xl">
                          <label>{ticketCount} Event</label>
                        </div>
                      </CardContent>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-3xl">
                        Total Transaksi
                      </CardTitle>
                      <hr />
                      <CardContent className="p-4">
                        <div className="text-2xl">
                          <label>{transactionCount}</label>
                        </div>
                      </CardContent>
                    </CardHeader>
                  </Card>
                </div>
                <div className="space-y-6 w-96">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-3xl">
                        Total Tiket Terjual
                      </CardTitle>
                      <hr />
                      <CardContent className="p-4">
                        <div className="text-2xl">
                          <label>{ticketSold} tiket</label>
                        </div>
                      </CardContent>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-3xl">
                        Total Pengunjung
                      </CardTitle>
                      <hr />
                      <CardContent className="p-4">
                        <div className="text-2xl">
                          <label>{totalPerson} Orang</label>
                        </div>
                      </CardContent>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </div>
            <div className="pt-10">
              <div className=" font-ibrand text-5xl">
                <h1>Statistic Management</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Dashboard;
