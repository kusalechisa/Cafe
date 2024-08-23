import { toast } from "react-toastify";
import axios from "axios";

export const uploadImage = async (file) => {
  let toastId = null;

  if (!file) return null;

  const formData = new FormData();
  formData.append("image", file, file.name);

  try {
    const response = await axios.post("/api/upload", formData, {
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (toastId) {
          toast.update(toastId, {
            render: `Uploading... ${progress}%`,
            progress,
          });
        } else {
          toastId = toast.success(`Uploading... ${progress}%`, { progress });
        }
      },
    });

    toast.dismiss(toastId);

    if (response.data && response.data.imageUrl) {
      return response.data.imageUrl;
    } else {
      toast.error("Failed to get image URL from server");
      return null;
    }
  } catch (error) {
    toast.dismiss(toastId);
    toast.error("Error uploading image: " + error.message);
    return null;
  }
};
