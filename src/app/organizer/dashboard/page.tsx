/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AuthGuard from "@/guard/AuthGuard";
import OrgSidebar from "@/components/OrgSideBar";
import Image from "next/image";
import axios from "axios";
import { stat } from "fs";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Dashboard = () => {
  const [eventCount, setEventCount] = useState<number>(0);
  const [transactionCount, setTransactionCount] = useState<number>(0);
  const [ticketSold, setTicketSold] = useState<number>(0);
  const [totalPerson, setTotalPerson] = useState<number>(0);
  const [monthlyStats, setMonthlyStats] = useState<any[]>([]);

  //ini buat total event yang telah dibuat
  useEffect(() => {
    const totalEvent = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        console.log("User ID is not found");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3232/events/total-events/${userId}`
        );
        setEventCount(response.data.result);
      } catch (error) {
        console.log("Failed to fetch total events", error);
      }
    };

    totalEvent();
  }, []);

  //ini buat total transaksi yang udah dibeli
  useEffect(() => {
    const totalTransaction = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        console.log("User ID is not found");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3232/transactions/total-earnings/organizer/${userId}`
        );
        setTransactionCount(response.data.result);
      } catch (error) {
        console.log("Failed to fetch total Transaction", error);
      }
    };
    totalTransaction();
  }, []);

  //ini buat total tiket yang terjual
  useEffect(() => {
    const totalTickets = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        console.log("User ID is not found");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3232/tickets/total-ticket/organizer/${userId}`
        );
        setTicketSold(response.data.result);
      } catch (error) {
        console.log("Failed to fetch total Tickets", error);
      }
    };
    totalTickets();
  }, []);

  //ini buat total ticket yang
  useEffect(() => {
    const totalCustomer = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        console.log("User ID is not found");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3232/tickets/total-customer/all-event/${userId}`
        );
        setTotalPerson(response.data.result);
      } catch (error) {
        console.log("Failed to fetch total Customer");
      }
    };
    totalCustomer();
  }, []);

  // ini buat monthly nya
  useEffect(() => {
    const fetchStats = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        console.log("User ID is not found");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3232/transactions/organizer/${userId}/stats`
        );

        console.log("Data Berhasil didapatkan", response.data);

        setMonthlyStats(response.data.monthlyBreakdown);
      } catch (error) {
        console.error("Failed to fetch monthly stats", error);
      }
    };
    fetchStats();
  }, []);

  //format data untuk chart
  const chartData = monthlyStats.map((stat) => ({
    month: `${stat.month}/${stat.year}`,
    earnings: stat.earnings,
    ticketsSold: stat.ticketsSold,
  }));

  //ngatur konfigurasi chart (label dan warna)
  const chartConfig = {
    earnings: {
      label: "Pendapatan",
      color: "rgb(45, 50, 80)",
    },
    ticketsSold: {
      label: "Ticket Terjual",
      color: "rgb(249, 177, 122)",
    },
  } satisfies ChartConfig;

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
                          <label>{eventCount} Event</label>
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
                <h1>Pendapatan & Tiket Terjual</h1>
                <div className="overflow-hidden mt-10">
                  <ChartContainer
                    config={chartConfig}
                    className="min-h-[100px] w-96"
                  >
                    <BarChart
                      data={chartData}
                      layout="horizontal"
                      margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
                    >
                      <CartesianGrid vertical={false} />
                      <YAxis
                        label={{
                          value: "Pendapatan / Tiket Terjual",
                          angle: -90,
                          position: "center",
                          offset: 20,
                        }}
                        tickLine={false}
                        axisLine={false}
                        ticks={[]}
                        tickFormatter={() => ""}
                      />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                      />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="earnings"
                        fill={chartConfig.earnings.color}
                        radius={4}
                        barSize={40}
                        stackId="a"
                      />
                      <Bar
                        dataKey="ticketsSold"
                        fill={chartConfig.ticketsSold.color}
                        radius={4}
                        barSize={40}
                        stackId="b"
                      />
                    </BarChart>
                  </ChartContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Dashboard;
