import {
  AppShell,
  Button,
  Group,
  LoadingOverlay,
  Modal,
  NativeSelect,
  TextInput,
  Radio,
  Menu,
  Text,
  Alert,
} from "@mantine/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useState } from "react";
import { Sidebar } from "components/Sidebar";
import { api } from "utils/api";
import { useForm } from "@mantine/form";
import { Metric } from "@wise-old-man/utils";
import router from "next/router";

const Events = () => {
  const { data: groupCompetition, status: groupCompetitionFetchStatus } =
    api.wom.findGroupCompetitions.useQuery({ id: 267 });

  const calendarEvents = groupCompetition?.map((value) => {
    return {
      title: value.title,
      start: value.startsAt.toISOString(),
      end: value.endsAt.toISOString(),
      extendedProps: {
        id: value.id,
      },
    };
  });

  const [openForm, setOpenForm] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [radioValue, setRadioValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [eventIdValue, setEventIdValue] = useState(0);

  const closeAllModals = () => {
    setOpenForm(false);
    setOpenConfirmation(false);
  };

  const form = useForm({
    initialValues: {
      title: "",
      metric: Metric.ATTACK as Metric,
      startsAt: new Date(),
      endsAt: new Date(),
      groupId: 267 || undefined,
      groupVerificationCode: process.env.WOMVCODE || "",
      participants: [],
    },
    validate: {
      title: (value) =>
        value.length <= 0 ? "Please enter a title for the event" : null,
      metric: (value) =>
        value.length <= 0 ? "Please select a metric for the event" : null,
    },
  });

  const createNewCompetition = api.wom.createCompetition.useMutation({});
  const deleteSelectedCompetition = api.wom.deleteCompetition.useMutation({});

  return (
    <>
      <main>
        <AppShell className="flex">
          <Sidebar />
          {groupCompetitionFetchStatus === "loading" ? (
            <LoadingOverlay visible />
          ) : (
            <div>
              <FullCalendar
                plugins={[interactionPlugin, dayGridPlugin]}
                initialView="dayGridMonth"
                selectable={true}
                events={calendarEvents}
                select={(info) => {
                  setOpenForm(true);
                  form.setFieldValue("startsAt", info.start);
                  form.setFieldValue("endsAt", info.end);
                }}
                eventContent={(e) => {
                  return (
                    <Menu>
                      <Menu.Target>
                        <div>
                          <Text>{e.event.title}</Text>
                        </div>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item
                          color="red"
                          onClick={() => {
                            setTitleValue(e.event.title);
                            setEventIdValue(e.event.extendedProps.id as number);
                            setOpenConfirmation(true);
                          }}
                        >
                          Delete Event
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  );
                }}
              />
              <Modal
                opened={openForm}
                onClose={closeAllModals}
                title="Create New Event"
              >
                <form
                  onSubmit={form.onSubmit(() => {
                    void createNewCompetition
                      .mutateAsync(form.values)
                      .then(() => {
                        router.reload();
                      });
                    close();
                  })}
                >
                  <TextInput
                    label="Event Title"
                    placeholder="Event Title"
                    withAsterisk
                    {...form.getInputProps("title")}
                  />
                  <Group mt="sm">
                    <Text>
                      Event Duration:{" "}
                      {form.values.startsAt.toLocaleDateString()} to{" "}
                      {form.values.endsAt.toLocaleDateString()}
                    </Text>
                  </Group>
                  <Radio.Group
                    name="eventType"
                    label="Select Event Type"
                    mt="xs"
                    value={radioValue}
                    onChange={setRadioValue}
                    withAsterisk
                  >
                    <Group>
                      <Radio value="SOTW" label="SOTW" />
                      <Radio value="BOTW" label="BOTW" />
                    </Group>
                  </Radio.Group>
                  <NativeSelect
                    mt="md"
                    data={
                      radioValue == "SOTW"
                        ? [
                            "attack",
                            "defence",
                            "strength",
                            "hitpoints",
                            "ranged",
                            "prayer",
                            "magic",
                            "cooking",
                            "woodcutting",
                            "fletching",
                            "fishing",
                            "firemaking",
                            "crafting",
                            "smithing",
                            "mining",
                            "herblore",
                            "agility",
                            "thieving",
                            "slayer",
                            "farming",
                            "runecrafting",
                            "hunter",
                            "construction",
                          ]
                        : [
                            "abyssal_sire",
                            "alchemical_hydra",
                            "barrows_chests",
                            "bryophyta",
                            "callisto",
                            "cerberus",
                            "chambers_of_xeric",
                            "chambers_of_xeric_challenge_mode",
                            "chaos_elemental",
                            "chaos_fanatic",
                            "commander_zilyana",
                            "corporeal_beast",
                            "crazy_archaeologist",
                            "dagannoth_prime",
                            "dagannoth_rex",
                            "dagannoth_supreme",
                            "deranged_archaeologist",
                            "general_graardor",
                            "giant_mole",
                            "grotesque_guardians",
                            "hespori",
                            "kalphite_queen",
                            "king_black_dragon",
                            "kraken",
                            "kreearra",
                            "kril_tsutsaroth",
                            "mimic",
                            "nex",
                            "nightmare",
                            "phosanis_nightmare",
                            "obor",
                            "phantom_muspah",
                            "sarachnis",
                            "scorpia",
                            "skotizo",
                            "tempoross",
                            "the_gauntlet",
                            "the_corrupted_gauntlet",
                            "theatre_of_blood",
                            "theatre_of_blood_hard_mode",
                            "thermonuclear_smoke_devil",
                            "tombs_of_amascut",
                            "tombs_of_amascut_expert",
                            "tzkal_zuk",
                            "tztok_jad",
                            "venenatis",
                            "vetion",
                            "vorkath",
                            "wintertodt",
                            "zalcano",
                            "zulrah",
                          ]
                    }
                    {...form.getInputProps("metric")}
                  />
                  <Button type="submit" mt="md">
                    Submit
                  </Button>
                </form>
              </Modal>
              <Modal
                opened={openConfirmation}
                onClose={closeAllModals}
                title="Delete Event"
              >
                <Alert title="Confirm Deletion" color="red">
                  Are you sure you want to delete {`"${titleValue}"`}? This
                  action can not be undone.
                </Alert>
                <Group sx={{ display: "flex", justifyContent: "right" }}>
                  <Button
                    color="red"
                    variant="outline"
                    mt="sm"
                    onClick={() => {
                      void deleteSelectedCompetition
                        .mutateAsync({
                          id: eventIdValue,
                          groupVerificationCode:
                            form.values.groupVerificationCode,
                        })
                        .then(() => {
                          router.reload();
                        });
                    }}
                  >
                    Confirm Deletion
                  </Button>
                </Group>
              </Modal>
            </div>
          )}
        </AppShell>
      </main>
    </>
  );
};

export default Events;
