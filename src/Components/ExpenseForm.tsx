import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import categories from "./Category";

interface Props {
  onSubmit: (data: FormData) => void;
}

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description must contain atleast 3 letter" })
    .max(50),
  Amount: z.number({ invalid_type_error: "amount is required" }).min(10),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required" }),
  }),
});

type FormData = z.infer<typeof schema>;

const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="Amount" className="form-label">
          Amount
        </label>
        <input
          {...register("Amount", { valueAsNumber: true })}
          id="Amount"
          type="number"
          className="form-control"
        />
        {errors.Amount && (
          <p className="text-danger">{errors.Amount.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="Category" className="form-label">
          Category
        </label>
        <select {...register("category")} id="Category" className="form-select">
          <option value=""></option>
          {categories.map((categories) => (
            <option key={categories} value={categories}>
              {categories}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default ExpenseForm;
