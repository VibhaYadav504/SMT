import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ImageUpload from "../common/form/ImageUpload";
import FormInput from "../common/form/FormInput";
import FormSelect from "../common/form/FormSelect";
import FormTextarea from "../common/form/FormTextarea";

import { studentSchema } from "../../validation/studentSchema";

const StudentForm = ({
  initialValues = {},
  onSubmit,
}) => {

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(studentSchema),

    defaultValues: {
      image: null,

      name: "",
      email: "",
      phone: "",

      gender: "",

      dob: "",

      course: "",

      admissionDate: "",

      fees: "",

      status: "Active",

      city: "",

      state: "",

      pincode: "",

      address: "",

      ...initialValues,
    },
  });

  useEffect(() => {
    reset({
      image: null,
      status: "Active",
      ...initialValues,
    });
  }, [initialValues, reset]);

  const image = watch("image");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >

      {/* Profile Photo */}

      <ImageUpload
        value={image}
        onChange={(file) =>
          setValue("image", file)
        }
      />

      {/* Personal Information */}

      <div>

        <h3 className="mb-5 text-lg font-semibold text-gray-800">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          <FormInput
            control={control}
            name="name"
            label="Full Name"
            placeholder="Enter full name"
          />

          <FormInput
            control={control}
            name="email"
            label="Email"
            type="email"
            placeholder="Enter email"
          />

          <FormInput
            control={control}
            name="phone"
            label="Mobile Number"
            placeholder="Enter mobile number"
          />

          <FormSelect
            control={control}
            name="gender"
            label="Gender"
            options={[
              {
                label: "Male",
                value: "Male",
              },
              {
                label: "Female",
                value: "Female",
              },
              {
                label: "Other",
                value: "Other",
              },
            ]}
          />

          <FormInput
            control={control}
            name="dob"
            label="Date of Birth"
            type="date"
          />

          <FormSelect
            control={control}
            name="course"
            label="Course"
            options={[
              {
                label: "MERN Stack",
                value: "MERN Stack",
              },
              {
                label: "React JS",
                value: "React JS",
              },
              {
                label: "Node.js",
                value: "Node.js",
              },
              {
                label: "Java Full Stack",
                value: "Java Full Stack",
              },
              {
                label: "Python",
                value: "Python",
              },
            ]}
          />

        </div>

      </div>
            {/* Academic Information */}

      <div>

        <h3 className="mb-5 text-lg font-semibold text-gray-800">
          Academic Information
        </h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          <FormInput
            control={control}
            name="admissionDate"
            label="Admission Date"
            type="date"
          />

          <FormInput
            control={control}
            name="fees"
            label="Course Fees"
            type="number"
            placeholder="Enter course fees"
          />

          <FormSelect
            control={control}
            name="status"
            label="Student Status"
            options={[
              {
                label: "Active",
                value: "Active",
              },
              {
                label: "Inactive",
                value: "Inactive",
              },
              {
                label: "Completed",
                value: "Completed",
              },
            ]}
          />

        </div>

      </div>

      {/* Address Information */}

      <div>

        <h3 className="mb-5 text-lg font-semibold text-gray-800">
          Address Information
        </h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          <FormInput
            control={control}
            name="city"
            label="City"
            placeholder="Enter city"
          />

          <FormInput
            control={control}
            name="state"
            label="State"
            placeholder="Enter state"
          />

          <FormInput
            control={control}
            name="pincode"
            label="Pincode"
            placeholder="Enter pincode"
          />

        </div>

        <div className="mt-5">

          <FormTextarea
            control={control}
            name="address"
            label="Full Address"
            placeholder="Enter complete address..."
          />

        </div>

      </div>

      {/* Action Buttons */}

      <div className="flex justify-end gap-4 border-t pt-6">

        <button
          type="button"
          className="rounded-xl border border-gray-300 px-6 py-3 font-medium transition hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-xl bg-orange-500 px-6 py-3 font-medium text-white shadow-lg transition hover:bg-orange-600"
        >
          Save Student
        </button>

      </div>

    </form>
  );
};

export default StudentForm;