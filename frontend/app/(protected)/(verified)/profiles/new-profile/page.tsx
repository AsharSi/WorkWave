"use client";
import React, { useState, useTransition } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createProfile } from "@/actions/profileActions";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { setupCompetitionSchema } from "@/lib/zod";

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
  const { data: session } = useSession();

  console.log("new profile ", session);

  const [isPending, startTransition] = useTransition();
  const [stage, setStage] = useState(0);
  const userId = session?.user.id;

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

  const form = useForm<z.infer<typeof setupCompetitionSchema>>({
    resolver: zodResolver(setupCompetitionSchema),
  });

  const { infoSectionFields, append, remove } = useFieldArray({
    control: form.control,
    name: "infoSections",
  });

  const onSubmit = async (data: z.infer<typeof setupCompetitionSchema>) => {
    startTransition(async () => {
      const formData = {
        ...data,
        userId,
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {stage === 0 && (
            <>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        autoComplete="off"
                        placeholder="Enter Job Title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        autoComplete="off"
                        placeholder="Enter Job Role"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        autoComplete="off"
                        placeholder="Enter Job Description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="registrationDeadline"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Registration Deadline</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxParticipants"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Participants</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        autoComplete="off"
                        placeholder="Enter max no. of Participants"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="button"
                variant={"outline"}
                onClick={() => setStage((curr) => curr + 1)}
              >
                Next
              </Button>
            </>
          )}

          {stage === 1 && (
            <>
              {infoSectionFields.map((field, index) => (
                <Card key={field.id}>
                  <CardHeader>
                    <CardTitle>Post {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name={`posts.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Post title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`posts.${index}.content`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Post content" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {infoSectionFields.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => remove(index)}
                      >
                        Remove Post
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
              
              
              <Button type="button" variant={"outline"} onClick={() => append({ title: '', content: '' })}>
                Add Info Section
              </Button>

              <div>
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={() =>
                    setInfoSections([
                      ...infoSections,
                      {
                        title: "",
                        content: "",
                      },
                    ])
                  }
                >
                  Add Info Section
                </Button>
              </div>

              <div className="space-x-2">
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={() => setStage((curr) => curr - 1)}
                >
                  Prev
                </Button>
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={() => setStage((curr) => curr + 1)}
                >
                  Next
                </Button>
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
                <Button
                  variant={"outline"}
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
                >
                  Add New Round
                </Button>
              </div>

              <div className="space-x-2">
                <Button
                  variant={"outline"}
                  type="button"
                  onClick={() => setStage((curr) => curr - 1)}
                >
                  Prev
                </Button>
                <Button
                  type="button"
                  onClick={() => setStage((curr) => curr + 1)}
                  variant={"outline"}
                >
                  Next
                </Button>
              </div>
            </>
          )}

          {stage === 3 && (
            <>
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Location</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        autoComplete="off"
                        placeholder="Enter Job Location"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <div className="space-x-2">
                <Button
                  variant={"outline"}
                  type="button"
                  onClick={() => setStage((curr) => curr - 1)}
                >
                  Prev
                </Button>
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={() => setStage((curr) => curr + 1)}
                >
                  Next
                </Button>
              </div>
            </>
          )}

          {stage === 4 && (
            <div className="space-x-2">
              <Button
                type="button"
                variant={"outline"}
                onClick={() => setStage((curr) => curr - 1)}
              >
                Prev
              </Button>
              <Button type="submit" disabled={isPending}>
                Submit
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default BlogForm;
