import { format } from "date-fns";

export const getFormattedDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, "d/M/Y - HH:mm");
};
