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
import {
  deleteProduct,
  getAllProducts,
  getProduct,
  getProductStats,
} from "@/api/products";
import { deleteSeed, getAllSeeds, getSeed, getSeedsStats } from "@/api/seeds";
import {
  createFranchise,
  deleteFranchise,
  getAllFranchises,
  getAllInActiveFranchise,
  getFranchisesStats,
  updateFranchise,
} from "@/api/franchises";
import {
  getSubscribedProduct,
  getSubscribedSeed,
  getSubsribedsStats,
} from "@/api/subscribe";

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

// Products  API's Functions

export const useGetProductStats = (token: string) => {
  return useQuery({
    queryKey: ["productStats", token],
    queryFn: () => getProductStats(token),
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

export const useGetAllProducts = (token: string) => {
  return useQuery({
    queryKey: ["allProducts", token],
    queryFn: () => getAllProducts(token),
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

export const useGetProduct = (uuid: string, token: string) => {
  return useQuery({
    queryKey: ["product", uuid, token],
    queryFn: () => getProduct(uuid, token),
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
    enabled: !!uuid,
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });
};

export const useDeleteProduct = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid: string) => deleteProduct(uuid, token),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries(["allProducts", token]);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

// Seeds  API's Functions
export const useGetSeedsStats = (token: string) => {
  return useQuery({
    queryKey: ["seedsStats", token],
    queryFn: () => getSeedsStats(token),
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

export const useGetAllSeeds = (token: string) => {
  return useQuery({
    queryKey: ["allSeeds", token],
    queryFn: () => getAllSeeds(token),
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

export const useGetSeed = (uuid: string, token: string) => {
  return useQuery({
    queryKey: ["seed", uuid, token],
    queryFn: () => getSeed(uuid, token),
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
    enabled: !!uuid,
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });
};

export const useDeleteSeed = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid: string) => deleteSeed(uuid, token),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries(["allSeeds", token]);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

// Products  API's Functions

export const useGetFranchiseStats = (token: string) => {
  return useQuery({
    queryKey: ["franchiseStats", token],
    queryFn: () => getFranchisesStats(token),
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

export const useCreateFranchise = () => {
  return useMutation({
    mutationFn: ({ data, token }: { data: any; token: string }) =>
      createFranchise(data, token),
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

export const useGetAllFranchises = (token: string) => {
  return useQuery({
    queryKey: ["allFranchises", token],
    queryFn: () => getAllFranchises(token),
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

export const useGetInActiveFranchises = (token: string) => {
  return useQuery({
    queryKey: ["inactiveFranchises", token],
    queryFn: () => getAllInActiveFranchise(token),
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

export const useDeleteFranchise = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid: string) => deleteFranchise(uuid, token),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries(["allFranchises", token]);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export const useUpdateFranchise = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => updateFranchise(data, token),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data.message);
        queryClient.invalidateQueries(["allFranchises", token]);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

// Subscribed Integrations Functions
export const useGetSubscribedProduct = (uuid: string, token: string) => {
  return useQuery({
    queryKey: ["subsribedProduct", uuid, token],
    queryFn: () => getSubscribedProduct(uuid, token),
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
    enabled: !!uuid,
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });
};

export const useGetSubscribedSeed = (uuid: string, token: string) => {
  return useQuery({
    queryKey: ["subsribedSeed", uuid, token],
    queryFn: () => getSubscribedSeed(uuid, token),
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
    enabled: !!uuid,
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });
};

export const useGetSubscribedStats = (uuid: string, token: string) => {
  return useQuery({
    queryKey: ["subsribedStats", uuid, token],
    queryFn: () => getSubsribedsStats(uuid, token),
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
    enabled: !!uuid,
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });
};
