"use client";
import { submitInformation } from "@/action/infomation-form";
import Button from "@/components/button/button";
import Input from "@/components/input/input";
import Select from "@/components/selector/select";
import { connectWebSocket, sendFormUpdate } from "@/storage/websocket";
import { useActionState, useEffect, useState, useRef } from "react";
import { useFormStatus } from "react-dom";

export default function Form() {
  const genderOptions = [
    {
      label: "Select Gender",
      value: "",
    },
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
  ];

  const preferredLanguageOptions = [
    {
      label: "Select Preferred Language",
      value: "",
    },
    {
      label: "Thai",
      value: "thai",
    },
    {
      label: "English",
      value: "english",
    },
  ];

  const [state, action, isPending] = useActionState(
    submitInformation,
    undefined
  );
  const { pending } = useFormStatus();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    preferredLanguage: "",
    nationality: "",
    email: "",
    address: "",
    street: "",
    province: "",
    district: "",
    subDistrict: "",
    postalCode: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelationship: "",
  });

  const activityTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    connectWebSocket(() => {});
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    sendFormUpdate({ ...updated, status: "active" });

    if (activityTimeout.current) {
      clearTimeout(activityTimeout.current);
    }
    activityTimeout.current = setTimeout(() => {
      sendFormUpdate({ ...updated, status: "inactive" });
    }, 30000);
  };

  return (
    <form action={action} className="flex flex-col gap-6 items-center py-12">
      <div className="flex flex-col items-start gap-4 border border-zinc-300 bg-white rounded-2xl w-[80%]">
        <section className="flex flex-col justify-between w-full">
          <div className="relative border-b border-zinc-300 pb-2 w-full py-2 px-4">
            <h1 className="text-xl font-semibold">Informations</h1>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-5 gap-4 mt-4 w-full">
            <div className="flex flex-col w-full">
              <Input
                name="firstName"
                value={form.firstName}
                type="text"
                label="First Name"
                placeholder="First Name"
                onChange={handleChange}
              />
              {state?.errors?.firstName && (
                <p className="text-red-500 text-sm">{state.errors.firstName}</p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <Input
                value={form.lastName}
                onChange={handleChange}
                name="lastName"
                type="text"
                label="Last Name"
                placeholder="Last Name"
              />
              {state?.errors?.lastName && (
                <p className="text-red-500 text-sm">{state.errors.lastName}</p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <Input
                value={form.dateOfBirth}
                onChange={handleChange}
                name="dateOfBirth"
                type="date"
                label="Date of Birth"
                placeholder=""
              />
              {state?.errors?.dateOfBirth && (
                <p className="text-red-500 text-sm">
                  {state.errors.dateOfBirth}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <Select
                value={form.gender}
                onChange={handleChange}
                name="gender"
                label="Gender"
                options={genderOptions}
              />
              {state?.errors?.gender && (
                <p className="text-red-500 text-sm">{state.errors.gender}</p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <Input
                value={form.phoneNumber}
                onChange={handleChange}
                name="phoneNumber"
                type="tel"
                label="Phone Number"
                placeholder="09-000-0000"
              />
              {state?.errors?.phoneNumber && (
                <p className="text-red-500 text-sm">
                  {state.errors.phoneNumber}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <Input
                value={form.email}
                onChange={handleChange}
                name="email"
                type="email"
                label="Email"
                placeholder="example : paniwat@gmail.com"
              />
              {state?.errors?.email && (
                <p className="text-red-500 text-sm">{state.errors.email}</p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <Select
                value={form.preferredLanguage}
                onChange={handleChange}
                name="preferredLanguage"
                label="Preferred Language"
                options={preferredLanguageOptions}
              />
              {state?.errors?.preferredLanguage && (
                <p className="text-red-500 text-sm">
                  {state.errors.preferredLanguage}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <Input
                value={form.nationality}
                onChange={handleChange}
                name="nationality"
                type="text"
                label="Nationality"
                placeholder="example : paniwat@gmail.com"
              />
              {state?.errors?.nationality && (
                <p className="text-red-500 text-sm">
                  {state.errors.nationality}
                </p>
              )}
            </div>
          </div>
        </section>
      </div>

      <div className="flex flex-col items-start gap-4 border border-zinc-300 bg-white rounded-2xl w-[80%]">
        <section className="flex flex-col justify-between w-full">
          <div className="relative border-b border-zinc-300 pb-2 w-full py-2 px-4">
            <h1 className="text-xl font-semibold">Address</h1>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-5 gap-4 mt-4 w-full">
            <div className="flex flex-col w-full">
              <Input
                value={form.address}
                onChange={handleChange}
                name="address"
                type="text"
                label="Address"
                placeholder="House number"
              />
              {state?.errors?.address && (
                <p className="text-red-500 text-sm">{state.errors.address}</p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <Input
                value={form.street}
                onChange={handleChange}
                name="street"
                type="text"
                label="Street"
                placeholder="Street name"
              />
              {state?.errors?.street && (
                <p className="text-red-500 text-sm">{state.errors.street}</p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <Input
                value={form.province}
                onChange={handleChange}
                name="province"
                type="text"
                label="Province"
                placeholder="Province name"
              />
              {state?.errors?.province && (
                <p className="text-red-500 text-sm">{state.errors.province}</p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <Input
                value={form.district}
                onChange={handleChange}
                name="district"
                type="text"
                label="District"
                placeholder="District name"
              />
              {state?.errors?.district && (
                <p className="text-red-500 text-sm">{state.errors.district}</p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <Input
                value={form.subDistrict}
                onChange={handleChange}
                name="subDistrict"
                type="text"
                label="Sub-District"
                placeholder="Sub-District name"
              />
              {state?.errors?.subDistrict && (
                <p className="text-red-500 text-sm">
                  {state.errors.subDistrict}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <Input
                value={form.postalCode}
                onChange={handleChange}
                name="postalCode"
                type="text"
                label="Postal Code"
                placeholder="00000"
              />
              {state?.errors?.postalCode && (
                <p className="text-red-500 text-sm">
                  {state.errors.postalCode}
                </p>
              )}
            </div>
          </div>
        </section>
      </div>

      <div className="flex flex-col items-start gap-4 border border-zinc-300 bg-white rounded-2xl w-[80%] mb-8">
        <section className="flex flex-col justify-between w-full">
          <div className="relative border-b border-zinc-300 pb-2 w-full py-2 px-4">
            <h1 className="text-xl font-semibold">Emergency Contact</h1>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-5 gap-4 mt-4 w-full">
            <div className="flex flex-col w-full">
              <Input
                value={form.emergencyContactName}
                onChange={handleChange}
                name="emergencyContactName"
                type="text"
                label="Name"
                placeholder="Name of Emergency Contact"
              />
              {state?.errors?.emergencyContactName && (
                <p className="text-red-500 text-sm">
                  {state.errors.emergencyContactName}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <Input
                value={form.emergencyContactRelationship}
                onChange={handleChange}
                name="emergencyContactRelationship"
                type="text"
                label="Relationship"
                placeholder="Relationship"
              />
              {state?.errors?.emergencyContactRelationship && (
                <p className="text-red-500 text-sm">
                  {state.errors.emergencyContactRelationship}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <Input
                value={form.emergencyContactPhone}
                onChange={handleChange}
                name="emergencyContactPhone"
                type="tel"
                label="Phone Number"
                placeholder="09-000-0000"
              />
              {state?.errors?.emergencyContactPhone && (
                <p className="text-red-500 text-sm">
                  {state.errors.emergencyContactPhone}
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
      <div className="flex gap-2 border fixed bottom-0 mb-3 py-2 px-8 rounded-2xl border-zinc-300 bg-white w-[80%] justify-between z-0">
        <Button disabled={pending} text="Back" href="/" />
        <button
          disabled={pending || isPending}
          type="submit"
          className="bg-background text-white px-8 py-2 rounded cursor-pointer hover:bg-foreground"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
