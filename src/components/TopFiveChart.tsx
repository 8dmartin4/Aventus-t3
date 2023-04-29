import { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Top5ProgressResult } from '@wise-old-man/utils';

export const TopFiveChart = (topFiveData : Top5ProgressResult): JSX.Element => {
    const ref = useRef();
    console.log(JSON.stringify(topFiveData))
    console.log((topFiveData && topFiveData.length > 0 
        ? topFiveData?.map(event => event.history.map(progress => progress.value)) 
        : null))

    const data = {
        labels: ['Fri', 'Sat', 'Sun', 'Mon', 'Tues', 'Weds', 'Thurs', 'Fri'],
        datasets: [
            {
                label: 'exp gained',
                data: (topFiveData && topFiveData.length > 0 
                    ? topFiveData?.map(event => event.history.map(progress => progress.value)) 
                    : null)
            }
        ] 
    }

    return <Line ref={ref} data={data} />
};