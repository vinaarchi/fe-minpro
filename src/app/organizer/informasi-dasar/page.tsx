"use client";

import * as React from "react";

import OrgSidebar from "@/components/OrgSideBar";
import AuthGuard from "@/guard/AuthGuard";

const OrganizerEditProfilePage: React.FC = () => {
  return (
    <div>
      <AuthGuard allowedRoles={["ORGANIZER"]}>
        
        <div className="flex">
          <OrgSidebar />
          <div>
            <p>Ini Edit Profile</p>
          </div>
        </div>
      </AuthGuard>
    </div>
  );
};

export default OrganizerEditProfilePage;
