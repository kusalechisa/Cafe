import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { add, getById, update } from "../../services/foodService";
import { uploadImage } from "../../services/uploadService";
import Title from "../../components/Title/Title";
import InputContainer from "../../components/InputContainer/InputContainer";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { toast } from "react-toastify";
import classes from "./foodEdit.module.css";

export default function FoodEditPage() {
  const { foodId } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const isEditMode = !!foodId;
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (!isEditMode) return;

    const loadFood = async () => {
      try {
        const food = await getById(foodId);
        if (food) {
          reset(food);
          // Ensure HTTPS for existing food image URLs
          setImageUrl(
            food.imageUrl
              ? food.imageUrl.replace(/^http:\/\//i, "https://")
              : ""
          );
        }
      } catch (err) {
        toast.error("Failed to load food details.");
      }
    };

    loadFood();
  }, [foodId, isEditMode, reset]);

  const submit = async (foodData) => {
    const food = { ...foodData, imageUrl };

    try {
      if (isEditMode) {
        await update(food);
        toast.success(`Food "${food.name}" updated successfully!`);
      } else {
        const newFood = await add(food);
        toast.success(`Food "${food.name}" added successfully!`);
        navigate(`/admin/editFood/${newFood.id}`, { replace: true });
      }
    } catch (err) {
      toast.error("Failed to save food details.");
    }
  };

  const upload = async (event) => {
    if (event.target.files.length === 0) return;

    try {
      const file = event.target.files[0];
      const url = await uploadImage(file);
      if (url) {
        // Ensure HTTPS for uploaded image URLs
        setImageUrl(url.replace(/^http:\/\//i, "https://"));
      } else {
        toast.error("Image upload failed. Please try again.");
      }
    } catch (err) {
      toast.error("Failed to upload image.");
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Title title={isEditMode ? "Edit Food" : "Add Food"} />
        <form
          className={classes.form}
          onSubmit={handleSubmit(submit)}
          noValidate
        >
          <InputContainer label="Select Image">
            <input type="file" onChange={upload} accept="image/jpeg" />
          </InputContainer>

          {imageUrl && (
            <a
              href={imageUrl}
              className={classes.image_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={imageUrl}
                alt="Uploaded"
                onError={(e) =>
                  (e.target.src = "/path-to-placeholder-image.jpg")
                }
              />
            </a>
          )}

          <Input
            type="text"
            label="Name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 5,
                message: "Name must be at least 5 characters long",
              },
            })}
            error={errors.name}
          />

          <Input
            type="number"
            label="Price"
            {...register("price", { required: "Price is required" })}
            error={errors.price}
          />

          <Input
            type="text"
            label="Tags"
            {...register("tags")}
            error={errors.tags}
          />

          <Input
            type="text"
            label="Origins"
            {...register("origins", { required: "Origins are required" })}
            error={errors.origins}
          />

          <Input
            type="text"
            label="Cook Time"
            {...register("cookTime", { required: "Cook Time is required" })}
            error={errors.cookTime}
          />

          <Button type="submit" text={isEditMode ? "Update" : "Create"} />
        </form>
      </div>
    </div>
  );
}
