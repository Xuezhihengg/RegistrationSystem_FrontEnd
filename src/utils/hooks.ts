import { useEffect } from "react";
import toast from "react-hot-toast";
import { FormState } from "@/entity/entity";

export const useToast = (state: FormState) => {
  useEffect(() => {
    if (state.message == "") return;
    if (state.error) {
      toast.error(state.message);
    } else {
      toast.success(state.message);
    }
  }, [state]);
};
