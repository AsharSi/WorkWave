"use client";
import React, { useState, useTransition } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createProfile } from "@/actions/profileActions";
import { toast } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  title: string;
  role: string;
  description: string;
  contacts: {
    name: string;
    email: string;
    phoneNumber?: string;
  };
  location: string;
  startDate: Date;
  registrationDeadline: Date;
  maxParticipants: number;
};

type InfoSection = {
  title: string;
  content: string;
};

type Round = {
  title: string;
  content: string;
};

type Contact = {
  name: string;
  email: string;
  phoneNumber?: string;
};

const toolbarOptions = [
  ["bold", "italic", "underline", "strike", "blockquote"],
  [{ list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
  ["link"],
  ["clean"],
];

const BlogForm = () => {
  const [isPending, startTransition] = useTransition();
  const [stage, setStage] = useState(0);

  const recruiterId = "6700cbefa769a116f6015412";
  const userId = "6700cbefa769a116f6015412";
  const companyName = "MyLamp AI";

  const [infoSections, setInfoSections] = useState<InfoSection[]>([
    {
      title: "",
      content: "",
    },
  ]);

  const [rounds, setRounds] = useState<Round[]>([
    {
      title: "",
      content: "",
    },
  ]);

  const [contacts, setContacts] = useState<Contact[]>([
    {
      name: "",
      email: "",
      phoneNumber: "",
    },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    startTransition(async () => {
      const formData = {
        ...data,
        recruiterId,
        userId,
        companyName,
        contacts,
        infoSections,
      };

      console.log("data", formData, rounds);

      const result = await createProfile(formData, rounds);

      console.log("result", result);

      if (result === "success") {
        toast.success("Profile created successfully");
      } else {
        toast.error("Failed to create profile");
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {stage === 0 && (
          <>
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Job Title
              </label>
              <input
                type="text"
                placeholder="Enter Job Title"
                {...register("title", { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.title && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Role
              </label>
              <input
                type="text"
                placeholder="Enter Role"
                {...register("role", { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">
                Job Description
              </label>
              <input
                type="text"
                placeholder="Enter Job Description"
                {...register("description", { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                placeholder="Enter Start Date"
                {...register("startDate", { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">
                Registration Deadline
              </label>
              <input
                type="date"
                placeholder="Enter Registration Deadline"
                {...register("registrationDeadline", { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">
                Max Participants
              </label>
              <input
                type="number"
                placeholder="Enter Max Participants"
                {...register("maxParticipants", { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <button
              type="button"
              onClick={() => setStage((curr) => curr + 1)}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Next
            </button>
          </>
        )}

        {stage === 1 && (
          <>
            {infoSections.map((infoSection, index) => (
              <div key={index} className="relative">
                <input
                  type="text"
                  placeholder="Enter Info Section Title"
                  value={infoSection.title}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    const newInfoSections = [...infoSections];
                    newInfoSections[index].title = e.target.value;
                    setInfoSections(newInfoSections);
                  }}
                />
                <ReactQuill
                  value={infoSection.content}
                  modules={{ toolbar: toolbarOptions }}
                  onChange={(content) => {
                    const newInfoSections = [...infoSections];
                    newInfoSections[index].content = content;
                    setInfoSections(newInfoSections);
                  }}
                  placeholder="Enter Info Section Content"
                  theme="snow"
                  className="mt-1"
                />

                <button
                  type="button"
                  onClick={() => {
                    const newInfoSections = [...infoSections];
                    newInfoSections.splice(index, 1);
                    setInfoSections(newInfoSections);
                  }}
                  className="absolute top-0 right-0 p-2 text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}

            <div>
              <button
                type="button"
                onClick={() =>
                  setInfoSections([
                    ...infoSections,
                    {
                      title: "",
                      content: "",
                    },
                  ])
                }
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Info Section
              </button>
            </div>

            <div>
              <button
                type="button"
                onClick={() => setStage((curr) => curr - 1)}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={() => setStage((curr) => curr + 1)}
                className="inline-flex pr-4 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Next
              </button>
            </div>
          </>
        )}

        {stage === 2 && (
          <>
            {rounds.map((round, index) => (
              <div key={index} className="relative">
                <input
                  type="text"
                  placeholder="Enter Round Title"
                  value={round.title}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    const newRounds = [...rounds];
                    newRounds[index].title = e.target.value;
                    setRounds(newRounds);
                  }}
                />

                <ReactQuill
                  value={round.content}
                  modules={{ toolbar: toolbarOptions }}
                  onChange={(content) => {
                    const newRounds = [...rounds];
                    newRounds[index].content = content;
                    setRounds(newRounds);
                  }}
                  placeholder="Enter Round Description"
                  theme="snow"
                  className="mt-1"
                />

                <button
                  type="button"
                  onClick={() => {
                    const newRounds = [...rounds];
                    newRounds.splice(index, 1);
                    setRounds(newRounds);
                  }}
                  className="absolute top-0 right-0 p-2 text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}

            <div>
              <button
                type="button"
                onClick={() =>
                  setRounds([
                    ...rounds,
                    {
                      title: "",
                      content: "",
                    },
                  ])
                }
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add New Round
              </button>
            </div>

            <div>
              <button
                type="button"
                onClick={() => setStage((curr) => curr - 1)}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={() => setStage((curr) => curr + 1)}
                className="inline-flex pr-4 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Next
              </button>
            </div>
          </>
        )}

        {stage === 3 && (
          <>
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Job Location
              </label>
              <input
                type="text"
                placeholder="Enter Job Location"
                {...register("location", { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.location && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            {contacts.map((contact, index) => (
              <>
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    value={contact.name}
                    onChange={(e) => {
                      const newContacts = [...contacts];
                      newContacts[index].name = e.target.value;
                      setContacts(newContacts);
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.contacts?.name && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    value={contact.email}
                    onChange={(e) => {
                      const newContacts = [...contacts];
                      newContacts[index].email = e.target.value;
                      setContacts(newContacts);
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.contacts?.email && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={contact.phoneNumber}
                    onChange={(e) => {
                      const newContacts = [...contacts];
                      newContacts[index].phoneNumber = e.target.value;
                      setContacts(newContacts);
                    }}
                    placeholder="Enter Phone Number"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </>
            ))}

            <div>
              <button
                type="button"
                onClick={() => setStage((curr) => curr - 1)}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={() => setStage((curr) => curr + 1)}
                className="inline-flex pr-4 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Next
              </button>
            </div>
          </>
        )}

        {stage === 4 && (
          <>
            <button
              type="button"
              onClick={() => setStage((curr) => curr - 1)}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Prev
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Next
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default BlogForm;
