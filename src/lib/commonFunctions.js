import { toast } from "sonner";

export const validateRecord = (record) => {
    if (!record.name && !record.email) {
        toast.error("Name and Email are required");
        return false;
    } else if (!record.name) {
        toast.error("Name is required");
        return false;
    } else if (!record.email) {
        toast.error("Email is required");
        return false;
    } else if (
        !record.email.match(
            // eslint-disable-next-line no-useless-escape
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        )
    ) {
        toast.error("Invalid email address");
        return false;
    } else return true;
};
