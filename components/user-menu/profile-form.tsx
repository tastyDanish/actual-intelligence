"use client";
import { useUser } from "@/hooks/user-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogFooter } from "../ui/dialog";
import { AvatarSelections } from "./avatar-selections";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { HatSelections } from "./hat-selections";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useConversation } from "@/hooks/conversations-provider";

const FormSchema = z.object({
  avatar: z.string().nullable(),
  hat: z.string().nullable(),
});

type ProfileFormParams = {
  handleSubmit: () => void;
};

export const ProfileForm = ({ handleSubmit }: ProfileFormParams) => {
  const { toast } = useToast();
  const { getMessages } = useConversation();
  const { updateAvatar, user } = useUser();
  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      hat: user?.avatar.hat,
      avatar: user?.avatar.name,
    },
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    handleSubmit();
    await updateAvatar({
      hat: parseBack(data.hat),
      name: parseBack(data.avatar),
    });
    getMessages();
    toast({
      description: "you have updated your avatar!",
    });
  };

  const parseValue = (value: string | null) => {
    if (value == null) return "null";
    return value;
  };

  const parseBack = (value: string | null) => {
    if (value === "null") return null;
    return value;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4 px-10">
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel>select an avatar</FormLabel>
              <FormControl>
                <AvatarSelections
                  avatar={parseValue(field.value)}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hat"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-8 items-center">
              <FormLabel>select a hat</FormLabel>
              <FormControl>
                <HatSelections
                  hat={parseValue(field.value)}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button>Save</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
