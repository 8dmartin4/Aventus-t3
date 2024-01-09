import { useRef } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { CompetitionDetails } from "@wise-old-man/utils";

export const TopFiveChart = (
  currentCompData: CompetitionDetails
): JSX.Element => {
  const ref = useRef();

  const trackingMetric = currentCompData.title.includes("BOTW") ? "KC" : "XP";

  const progressGained = currentCompData.participations.map(
    (player) => player.progress.gained
  );
  const playerNames = currentCompData.participations.map(
    (participations) => participations.player.username
  );

  const data = {
    labels: [
      playerNames[0],
      playerNames[1],
      playerNames[2],
      playerNames[3],
      playerNames[4],
    ],
    datasets: [
      {
        label: `${trackingMetric} Gained`,
        data: [
          progressGained[0],
          progressGained[1],
          progressGained[2],
          progressGained[3],
          progressGained[4],
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Bar ref={ref} data={data} dir={"ltr"} />
    </>
  );
};
