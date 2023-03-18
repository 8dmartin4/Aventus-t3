import { Title, type TitleOrder } from "@mantine/core";
import { type CompetitionListItem } from "@wise-old-man/utils";

const EventInfo = ({
  event,
  order,
}: {
  event: CompetitionListItem;
  order: TitleOrder | undefined;
}) => {
  return (
    <div>
      <Title order={order || 3}>{event.title}</Title>
      <Title weight={400} order={((order as number) + 1 || 4) as TitleOrder}>
        {event.group?.name}
      </Title>
      <Title weight={400} order={((order as number) + 1 || 4) as TitleOrder}>
        Event ID: {event.id}
      </Title>
      <Title weight={400} order={((order as number) + 1 || 4) as TitleOrder}>
        Starts At: {event.startsAt.toLocaleString()}
      </Title>
      <Title weight={400} order={((order as number) + 1 || 4) as TitleOrder}>
        Ends At: {event.endsAt.toLocaleString()}
      </Title>
    </div>
  );
};
export default EventInfo;
