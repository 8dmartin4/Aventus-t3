import React, { useEffect } from "react";
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
  LoadingOverlay,
  Radio,
  Stack,
  TextInput,
} from "@mantine/core";
import { createFormContext } from "@mantine/form";
import { StaffApplicationForm } from "types/staffForm";
import { v4 } from "uuid";
import { api } from "utils/api";
import { Prism } from "@mantine/prism";

const [FormProvider, useFormContext, useForm] =
  createFormContext<StaffApplicationForm>();

function ContextField() {
  const form = useFormContext();

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
          withAsterisk
          onChange={(value) => {
            form.setValues({
              ...form.values,
              staffReference: value === "true",
            });
          }}
          value={form.values.staffReference ? "true" : "false"}
        >
          <Group>
            <Radio value="true" label="Yes" />
            <Radio value="false" label="No" />
          </Group>
        </Radio.Group>
        {form.values.staffReference && (
          <TextInput
            label="OSRS Name or Discord Name of staff member who referred you"
            placeholder="staff name"
            withAsterisk
            {...form.getInputProps("staffReferenceName")}
          />
        )}
        <Checkbox.Group
          label="Select the roles you would like to apply for:"
          withAsterisk
          {...form.getInputProps("desiredRoles")}
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
          label="When and how did you find/join the Aventus community?"
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

const StaffApplicaton: NextPage = (props) => {
  const { data: session } = useSession();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const utils = api.useContext();

  const {
    data: pendingStaffApplications,
    fetchStatus: pendingStaffApplicationsFetchStatus,
  } = api.staffApplication.findPendingStaffApplicationsByUserId.useQuery({
    userId: (session?.user?.id as string) || "",
  });

  const {
    data: finalStaffApplications,
    fetchStatus: finalStaffApplicationsFetchStatus,
  } = api.staffApplication.findFinalizedStaffApplicationsByUserId.useQuery({
    userId: (session?.user?.id as string) || "",
  });

  const upsertStaffApplication =
    api.staffApplication.upsertOneStaffApplication.useMutation({
      async onSuccess() {
        await utils.staffApplication.invalidate();
      },
    });

  const form = useForm({
    initialValues: {
      oid: "",
      id: v4(),
      submittingUserId: "",
      approvingUserId: "",
      approvingUserName: "",
      status: "Pending Review",
      osrsName: "",
      discordName: "",
      staffReference: false,
      staffReferenceName: "",
      desiredRoles: [],
      joinedAventusInput: "",
      reasonForApplicationInput: "",
      reasonForGoodFitInput: "",
    },
    validate: {
      osrsName: (osrsName) =>
        osrsName.length <= 0 ? "Please enter your OSRS name" : null,
      discordName: (discordName) =>
        discordName.length <= 0 ? "Please enter your Discord name" : null,
      desiredRoles: (value) => {
        if (value.length <= 0) {
          return "Please select at least one role";
        }
        return null;
      },
    },
  });

  useEffect(() => {
    if (pendingStaffApplications && pendingStaffApplications.length > 0) {
      form.setValues(pendingStaffApplications[0] as StaffApplicationForm);
    }
  }, [pendingStaffApplications]);

  useEffect(() => {
    if (
      !form.values.submittingUserId &&
      session &&
      session.user &&
      session.user.id
    ) {
      form.setValues({
        ...form.values,
        submittingUserId: session.user.id,
      });
    }
  }, [session, form.values]);

  return (
    <>
      <main>
        <AppShell className="flex">
          <Sidebar />
          <Center maw={isMobile ? 400 : 700} mx="auto">
            {pendingStaffApplicationsFetchStatus === "fetching" ||
            finalStaffApplicationsFetchStatus === "fetching" ? (
              <LoadingOverlay visible={true} />
            ) : (
              <FormProvider form={form}>
                <form
                  onSubmit={form.onSubmit(() => {
                    console.log(form.values);
                    //Update DB here
                    upsertStaffApplication.mutate({
                      ...form.values,
                      approvingUserId: "",
                      approvingUserName: "",
                    });
                  })}
                >
                  <ContextField />
                </form>
              </FormProvider>
            )}
          </Center>

          {process.env.NODE_ENV === "development" && (
            <>
              {finalStaffApplicationsFetchStatus === "fetching" ? (
                <div>Loading...</div>
              ) : (
                finalStaffApplications &&
                finalStaffApplications.length > 0 && (
                  <Prism language="json">
                    {JSON.stringify(finalStaffApplications, null, `\t`)}
                  </Prism>
                )
              )}
            </>
          )}
        </AppShell>
      </main>
    </>
  );
};

export default StaffApplicaton;
