import React from "react";
import { useForm } from "react-hook-form";
import Title from "../Title/Title";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useAuth } from "../../hooks/useAuth";

export default function ChangePassword() {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const { changePassword } = useAuth();

  const submit = (passwords) => {
    changePassword(passwords);
  };

  return (
    <div>
      <Title title="Change Password" />
      <form onSubmit={handleSubmit(submit)}>
        <Input
          type="password"
          label="Current Password"
          {...register("currentPassword", {
            required: "Current Password is required",
          })}
          error={errors.currentPassword}
        />

        <Input
          type="password"
          label="New Password"
          {...register("newPassword", {
            required: "New Password is required",
            minLength: {
              value: 5,
              message: "New Password must be at least 5 characters long",
            },
          })}
          error={errors.newPassword}
        />

        <Input
          type="password"
          label="Confirm Password"
          {...register("confirmNewPassword", {
            required: "Confirm Password is required",
            validate: (value) =>
              value !== getValues("newPassword")
                ? "Passwords do not match"
                : true,
          })}
          error={errors.confirmNewPassword}
        />

        <Button type="submit" text="Change" />
      </form>
    </div>
  );
}
