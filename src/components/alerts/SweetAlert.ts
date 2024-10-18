import Swal from "sweetalert2";

export const SweetAlert = (
  title?: string | undefined,
  text?: string | undefined,
  icon?: "success" | "error" | "warning" | "info" | "question" | undefined,
  confirmButtonText?: string | undefined,
  confirmButtonColor?: string | undefined
): Promise<boolean> => {
  return new Promise((resolve) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: confirmButtonColor,
      cancelButtonColor: "#d33",
      confirmButtonText: confirmButtonText,
      iconColor: "#d33",
      customClass: "alert-modal",
    }).then((result) => {
      resolve(result.isConfirmed);
    });
  });
};
