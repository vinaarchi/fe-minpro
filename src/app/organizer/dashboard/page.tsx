"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaCalendar, FaRegMoneyBillAlt, FaChartLine } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import AuthGuard from "@/guard/AuthGuard";
import OrgSidebar from "@/components/OrgSideBar";

const Dashboard = () => {

    const [ticketCount, setTicketCount] = useState<number>(0)
    const [transactionCount, setTransactionCount] = useState<number>(0)
    const [ticketSold, setTicketSold] = useState<number>(0)

    // useEffect (() => {

    // })
  return (
    <AuthGuard allowedRoles={["ORGANIZER"]}>
      <div>
        <div className="flex">
          <OrgSidebar />
          <div className="m-8 p-8">
            <div className="p-8 font-ibrand text-5xl">
              <h1>Event Management Dashboard</h1>
            </div>
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl">Event Kami</CardTitle>
                </CardHeader>
                <hr />
                <CardContent>
                  <div className="p-4">
                    <label> {ticketCount} Event </label>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl">
                    Total Transaksi
                  </CardTitle>
                  <hr />
                  <CardContent>
                    <div>
                      <label>{transactionCount}</label>
                    </div>
                  </CardContent>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>
                    Total Tiket Terjual
                  </CardTitle>
                  <hr />
                  <CardContent>
                    <div>
                      <label>{ticketSold} tiket</label>
                    </div>
                  </CardContent>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Dashboard;
