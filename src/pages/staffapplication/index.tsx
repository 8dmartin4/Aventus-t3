import React, { useState } from "react";
import { NextPage } from "next";
import { Sidebar } from "components/Sidebar";
import { useSession } from "next-auth/react";
import { useMediaQuery } from "@mantine/hooks";
import {
  AppShell,
  Button,
  Center,
  Checkbox,
  Group,
  Radio,
  Stack,
  TextInput,
} from "@mantine/core";
import { createFormContext } from "@mantine/form";
import { StaffApplicationForm } from "types/staffForm";

const [FormProvider, useFormContext, useForm] =
  createFormContext<StaffApplicationForm>();

function ContextField() {
  const form = useFormContext();
  const [radioValue, setRadioValue] = useState("");

  return (
    <>
      <Stack>
        <TextInput
          label="OSRS Name"
          placeholder="OSRS Name"
          withAsterisk
          {...form.getInputProps("osrsName")}
        />
        <TextInput
          label="Discord Name"
          placeholder="Discord Name"
          withAsterisk
          {...form.getInputProps("discordName")}
        />
        <Radio.Group
          name="staffReference"
          label="Were you referred by a staff member?"
          mt="xs"
          value={radioValue}
          onChange={setRadioValue}
          withAsterisk
        >
          <Group>
            <Radio value="true" label="Yes" />
            <Radio value="false" label="No" />
          </Group>
        </Radio.Group>
        {radioValue == "true" ? (
          <TextInput
            label="OSRS Name or Discord Name of staff member who referred you"
            placeholder="staff name"
            withAsterisk
            {...form.getInputProps("staffReferenceName")}
          />
        ) : (
          <></>
        )}
        <Checkbox.Group
          label="Select your desired roles to apply for:"
          withAsterisk
          {...form.getInputProps("desiredRole")}
        >
          <Group mt="xs">
            <Checkbox value="Events" label="Events" />
            <Checkbox value="Human Resources" label="Human Resources" />
            <Checkbox value="Highlights" label="Highlights" />
            <Checkbox value="Tech" label="Tech" />
            <Checkbox value="Recruitment" label="Recruitment" />
          </Group>
        </Checkbox.Group>
        <TextInput
          label="When and how did you find/join the community?"
          placeholder=""
          {...form.getInputProps("joinedAventusInput")}
        />
        <TextInput
          label="Why do you want to be a part of the Staff team?"
          placeholder=""
          {...form.getInputProps("reasonForApplicationInput")}
        />
        <TextInput
          label="Why do you think you are a good fit for the subrole(s) you selected?"
          placeholder=""
          {...form.getInputProps("reasonForGoodFitInput")}
        />
      </Stack>
      <Button type="submit" mt="md">
        Submit
      </Button>
    </>
  );
}

const StaffApplicaton: NextPage = () => {
  const { data: session } = useSession();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const username = (session?.user?.name as string) || "Guest";

  const form = useForm({
    initialValues: {
      id: "",
      submittingUserId: "",
      status: "Pending Review",
      osrsName: "",
      discordName: "",
      staffReferenceName: "",
      desiredRole: [],
      joinedAventusInput: "",
      reasonForApplicationInput: "",
      reasonForGoodFitInput: "",
    },
    validate: {
      osrsName: (osrsName) =>
        osrsName.length <= 0 ? "Please enter your OSRS name" : null,
      discordName: (discordName) =>
        discordName.length <= 0 ? "Please enter your Discord name" : null,
    },
  });

  return (
    <>
      <main>
        <AppShell className="flex">
          <Sidebar />
          <Center maw={isMobile ? 400 : 700} mx="auto">
            <FormProvider form={form}>
              <form
                onSubmit={form.onSubmit(() => {
                  console.log(form.values);
                  //Update DB here
                })}
              >
                <ContextField />
              </form>
            </FormProvider>
          </Center>
        </AppShell>
      </main>
    </>
  );
};

export default StaffApplicaton;
