"use client";
import React, { useState, useTransition } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createProfile } from "@/actions/profileActions";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import phoneCode from "@/utils/phoneCode.json";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { setupCompetitionSchema } from "@/lib/zod";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike", "blockquote"],
  [{ list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
  ["link"],
  ["clean"],
];

const JobForm = () => {
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const [stage, setStage] = useState(0);
  const userId = session?.user.id;

  const form = useForm<z.infer<typeof setupCompetitionSchema>>({
    resolver: zodResolver(setupCompetitionSchema),
    defaultValues: {
      title: "",
      role: "",
      description: "",
      startDate: undefined,
      endDate: undefined,
      infoSections: [
        {
          title: "",
          content: "",
        },
      ],
      rounds: [
        {
          title: "",
          content: "",
        },
      ],
      contacts: [
        {
          name: "",
          email: "",
          phoneNumber: "",
          phoneCode: "+91",
        },
      ],
    },
  });

  const {
    fields: infoFields,
    append: appendInfo,
    remove: removeInfo,
  } = useFieldArray({
    control: form.control,
    name: "infoSections",
  });

  const {
    fields: roundFields,
    append: appendRound,
    remove: removeRound,
  } = useFieldArray({
    control: form.control,
    name: "rounds",
  });

  const {
    fields: contactFields,
    append: appendContact,
    remove: removeContact,
  } = useFieldArray({
    control: form.control,
    name: "contacts",
  });

  const onSubmit = async (data: z.infer<typeof setupCompetitionSchema>) => {
    startTransition(async () => {
      const formData = {
        ...data,
        userId,
      };

      console.log("form data", formData);

      const result = await createProfile(formData);

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
              {infoFields.map((field, index) => (
                <Card key={field.id}>
                  <CardHeader>
                    <CardTitle>Info: {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name={`infoSections.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Info Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Info title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`infoSections.${index}.content`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Round Description</FormLabel>
                          <FormControl>
                            <ReactQuill
                              modules={{ toolbar: toolbarOptions }}
                              theme="snow"
                              value={field.value}
                              onChange={(content) => field.onChange(content)}
                              placeholder="Round Description"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {infoFields.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => removeInfo(index)}
                        className=""
                      >
                        Remove Post
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}

              <Button
                type="button"
                variant={"outline"}
                onClick={() => appendInfo({ title: "", content: "" })}
              >
                Add Info Section
              </Button>

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
              {roundFields.map((field, index) => (
                <Card key={field.id}>
                  <CardHeader>
                    <CardTitle>Round: {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name={`rounds.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Round Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Info title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`rounds.${index}.content`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Round Description</FormLabel>
                          <FormControl>
                            <ReactQuill
                              modules={{ toolbar: toolbarOptions }}
                              theme="snow"
                              value={field.value}
                              onChange={(content) => field.onChange(content)}
                              placeholder="Round Description"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {infoFields.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => removeRound(index)}
                        className=""
                      >
                        Remove Post
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}

              <Button
                variant={"outline"}
                type="button"
                onClick={() => appendRound({ title: "", content: "" })}
              >
                Add New Round
              </Button>

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

              {contactFields.map((field, index) => {
                return (
                  <>
                    <FormField
                      control={form.control}
                      name={`contacts.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Contact Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`contacts.${index}.email`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Contact Email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`contacts.${index}.phoneCode`}
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel>Phone Code</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Phone Code" />
                              </SelectTrigger>
                              <SelectContent>
                                {phoneCode.map((code) => (
                                  <SelectItem
                                    key={`${code.name}-${code.dial_code}`}
                                    value={code.dial_code}
                                    className="cursor-pointer"
                                  >
                                    {code.name}: {code.dial_code}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`contacts.${index}.phoneNumber`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Contact Phone Number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {contactFields.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => removeContact(index)}
                        className=""
                      >
                        Remove Contact
                      </Button>
                    )}
                  </>
                );
              })}

              <Button
                variant={"outline"}
                type="button"
                onClick={() =>
                  appendContact({
                    name: "",
                    email: "",
                    phoneCode: "+91",
                    phoneNumber: "",
                  })
                }
              >
                Add More Contact
              </Button>

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

export default JobForm;
