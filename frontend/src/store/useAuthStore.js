import toast from "react-hot-toast";
import { api } from "../lib/axios.js";
import { create } from "zustand";
import axios from "axios";
export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLogging: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  checkAuth: async () => {
    try {
      const res = await api.get("/auth/check"); //? we always get output.data --> as the actual data using axios
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth store : ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await api.post("/auth/signup", data);
      toast.success("Account created succesfully");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in signup", error);
      toast.error(error);
    } finally {
      set({ isSigningUp: false });
    }
  },
  logout: async () => {
    try {
      await api.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.log("Error in logout store : " + error);
      toast.error(error);
    }
  },
  login: async (data) => {
    set({ isLogging: true });
    try {
      const res = await api.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      console.log("Error in login : ", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLogging: false });
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await api.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in updateProfile : ", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
