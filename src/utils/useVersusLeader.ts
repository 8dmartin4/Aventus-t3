import { useCallback } from 'react';

const useVersusLeader = (currentCompTitle: string, playerProgress: number, currentComp:  { participations: { progress: { gained: number | null } }[]}) => {
  const compGained = currentComp?.participations.map(
    (player) => player.progress.gained
  );
  const trackingMetric = currentCompTitle.includes("BOTW") ? "KC" : "XP";

  const versusLeader = useCallback(() => {
    if (!playerProgress && !compGained[0]) {
      return 'Nothing to compare';
    }

    const firstPlace = playerProgress === compGained[0] ? compGained[1] : compGained[0] ?? 0;

    if (!firstPlace) {
      return 'Error parsing leaderboard data.';
    }

    if (playerProgress < firstPlace) {
      return `You are ${(firstPlace - playerProgress).toLocaleString(
        "en-US"
      )} ${trackingMetric} behind first place.`;
    }

    if (playerProgress > firstPlace) {
      return `You are ${(playerProgress - firstPlace).toLocaleString(
        "en-US"
      )} ${trackingMetric} ahead of first place.`;
    }

    return `Error parsing leaderboard data. Player gained: ${playerProgress || ''}, First place: ${compGained[0] || ''}`;
  }, [playerProgress, compGained]);

  return versusLeader;
};

export default useVersusLeader;