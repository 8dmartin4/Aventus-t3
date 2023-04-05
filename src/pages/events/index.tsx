import { AppShell, Button, Group, LoadingOverlay, Modal, Input, NativeSelect, TextInput, Code, Radio } from '@mantine/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import React, { useState } from 'react';
import { Sidebar } from '~/components/Sidebar';
import { api } from '~/utils/api';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { Metric } from '@wise-old-man/utils';

const index = () => {
  const { data: groupCompetition, status: groupCompetitionFetchStatus } =
  api.wom.findGroupCompetitions.useQuery({ id: 267 });

  const calendarEvents = groupCompetition?.map((value) => {return {
    title: value.title, 
    start: value.startsAt.toISOString(), 
    end: value.endsAt.toISOString()
  }})

  const [opened, { open, close }] = useDisclosure(false);
  const [eventStart, setEventStart] = useState(new Date());
  const [eventEnd, setEventEnd] = useState(new Date());
  const [value, setValue] = useState('');
  const [submittedValues, setSubmittedValues] = useState('');

  const form = useForm({
    initialValues: {
      title: "",
      metric: "",
      startsAt: eventStart.toISOString(),
      endsAt: eventEnd.toISOString(),
      groupId: 3017,
      groupVerificationCode: ""
    },
  })

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
                plugins={[ interactionPlugin, dayGridPlugin ]}
                initialView="dayGridMonth"
                selectable={true}
                events={calendarEvents}
                select={(info) => { 
                  open();
                  setEventStart(info.start)
                  setEventEnd(info.end)
                  // alert('Start: ' + info.start.toISOString() + ' End: ' + info.end.toISOString());
                }}
              />
              <Modal opened={opened} onClose={close} title="Create New Event">
                <form onSubmit={form.onSubmit((values) => setSubmittedValues(JSON.stringify(values, null, 2)))}>
                  <TextInput 
                    label="Event Title"
                    placeholder="Event Title"
                    {...form.getInputProps('title')}
                  />
                  <Radio.Group
                    name="eventType"
                    label="Select Event Type"
                    mt="xs"
                    value={value}
                    onChange={setValue}
                    withAsterisk
                  >
                    <Group >
                      <Radio value="SOTW" label="SOTW"/>
                      <Radio value="BOTW" label="BOTW"/>
                    </Group>
                  </Radio.Group>
                  <NativeSelect 
                    mt="xs"
                    data={ value=="SOTW" ?
                      ['attack', 'defence', 'strength', 'hitpoints', 'ranged', 'prayer', 'magic', 'cooking', 'woodcutting', 'fletching', 'fishing', 'firemaking', 'crafting', 'smithing', 'mining', 'herblore', 'agility', 'thieving', 'slayer', 'farming', 'runecrafting', 'hunter', 'construction']
                      : ['abyssal_sire', 'alchemical_hydra', 'barrows_chests', 'bryophyta', 'callisto', 'cerberus', 'chambers_of_xeric', 'chambers_of_xeric_challenge_mode', 'chaos_elemental', 'chaos_fanatic', 'commander_zilyana', 'corporeal_beast', 'crazy_archaeologist', 'dagannoth_prime', 'dagannoth_rex', 'dagannoth_supreme', 'deranged_archaeologist', 'general_graardor', 'giant_mole', 'grotesque_guardians', 'hespori', 'kalphite_queen', 'king_black_dragon', 'kraken', 'kreearra', 'kril_tsutsaroth', 'mimic', 'nex', 'nightmare', 'phosanis_nightmare', 'obor', 'phantom_muspah', 'sarachnis', 'scorpia', 'skotizo', 'tempoross', 'the_gauntlet', 'the_corrupted_gauntlet', 'theatre_of_blood', 'theatre_of_blood_hard_mode', 'thermonuclear_smoke_devil', 'tombs_of_amascut', 'tombs_of_amascut_expert', 'tzkal_zuk', 'tztok_jad', 'venenatis', 'vetion', 'vorkath', 'wintertodt', 'zalcano', 'zulrah']
                    } 
                    {...form.getInputProps('metric')}
                  />
                  <Code block mt={5}>
                    {JSON.stringify(form.values, null, 2)}
                  </Code>
                  <Button type="submit" mt="md">
                    Submit
                  </Button>
                </form>
              </Modal>
            </div>
          )}
        </AppShell>
      </main>
    </>
  )
}

export default index;