/* eslint-disable @typescript-eslint/no-explicit-any */
import { callAPI } from "@/config/axios";

export const switchRoleApi = async (
  userId: string,
  newRole: "CUSTOMER" | "ORGANIZER"
) => {
  try {
    const response = await callAPI.patch(`/user/switch-role/${userId}`, {
      role: newRole,
    });
    return response;
  } catch (error:any) {
    throw new Error("Failed to switch role", error);
  }
};
