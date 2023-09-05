import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification();

export const notifyError = (message: string) => {
  notify({
    group: "main",
    title: message,
    duration: 5000,
    type: "error",
  });
};

export const notifySuccess = (message: string) => {
  notify({
    group: "main",
    text: message,
    duration: 3000,
    type: "success",
  });
};
