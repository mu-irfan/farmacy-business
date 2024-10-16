import {
  forgotPassword,
  forgotPasswordOtpVerify,
  forgotPasswordResetPassword,
  loginCompany,
  registerCompany,
} from "@/api/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "./useAuth";
import {
  createManager,
  deleteManager,
  getAllManagers,
  updateManager,
} from "@/api/manager";
import {
  createQuery,
  deleteQuery,
  getAllQueries,
  getQueriesChats,
} from "@/api/suggestions";

export const useRegisterCompany = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: RegisterCompanyPayload) => registerCompany(data),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
        router.push("/");
      } else {
        toast.error(data?.response?.data?.field);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.field);
      console.log(error);
    },
  });
};

export const useLoginCompany = () => {
  const { loginCompanyAuth } = useAuth();
  return useMutation({
    mutationFn: (data: any) => loginCompany(data),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
        loginCompanyAuth(data?.data.accessToken);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: any) => forgotPassword(data),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export const useForgotPasswordOtpVerify = () => {
  return useMutation({
    mutationFn: (data: any) => forgotPasswordOtpVerify(data),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export const useForgotPasswordResetPassword = () => {
  return useMutation({
    mutationFn: (data: any) => forgotPasswordResetPassword(data),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

// managers API's Functions
export const useCreateManager = () => {
  return useMutation({
    mutationFn: ({ data, token }: { data: any; token: string }) =>
      createManager(data, token),
    onSuccess: (data: any) => {
      console.log(data, "createManager");
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export const useGetAllManagers = (token: string) => {
  return useQuery({
    queryKey: ["allManagers", token],
    queryFn: () => getAllManagers(token),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateManager = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => updateManager(data, token),
    onSuccess: (data: any) => {
      console.log(data, "updateManager");
      if (data?.success) {
        toast.success(data.message);
        queryClient.invalidateQueries(["allManagers", token]);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useDeleteManager = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid: string) => deleteManager(uuid, token),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries(["allManagers", token]);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

// Suggestion  API's Functions
export const useCreateTicket = () => {
  return useMutation({
    mutationFn: ({ data, token }: { data: any; token: string }) =>
      createQuery(data, token),
    onSuccess: (data: any) => {
      console.log(data, "create ticket");
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export const useGetAllTickets = (token: string) => {
  return useQuery({
    queryKey: ["alTickets", token],
    queryFn: () => getAllQueries(token),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });
};

export const useGetTicketsChats = (uuid: any, token: string) => {
  return useQuery({
    queryKey: ["alTicketsChats", token],
    queryFn: () => getQueriesChats(uuid, token),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });
};

export const useDeleteQuery = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid: string) => deleteQuery(uuid, token),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries(["alTickets", token]);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};
