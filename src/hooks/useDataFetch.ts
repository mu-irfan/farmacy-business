import { loginCompany, registerCompany } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useRegisterCompany = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: RegisterCompanyPayload) => registerCompany(data),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
        router.push("/");
        console.log(data);
      } else {
        toast.error(data?.response?.data?.field);
        console.log(data);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.field);
      console.log(error);
    },
  });
};

export const useLoginCompany = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: any) => loginCompany(data),
    onSuccess: (data: any) => {
      console.log(data, "login data");
      if (data?.success) {
        toast.success(data?.message);
        router.push("/products");
        console.log(data);
      } else {
        toast.error(data?.response?.data?.message);
        console.log(data);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
      console.log(error, "login error");
    },
  });
};
