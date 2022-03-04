import { Bar } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

type ChartLabels = Array<string>;

interface DataSet {
    label: string;
    data: Array<number>;
    backgroundColor?: string;
}

interface BarChartProps {
    labels: ChartLabels;
    datasets: Array<DataSet>;
    tooltipFormatter?: (tooltipItems: any) => string;
}

export const BarChart = ({
    labels,
    datasets,
    tooltipFormatter,
}: BarChartProps) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const data = {
        labels,
        datasets: datasets,
    };

    const formatToolTipLabel = (tooltipItems: any) => {
        if (tooltipFormatter) return tooltipFormatter(tooltipItems);
        return `${tooltipItems.dataset.label}: ${tooltipItems.formattedValue}`;
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItems: any) =>
                        formatToolTipLabel(tooltipItems),
                },
            },
        },
    };

    return <Bar options={options} data={data} />;
};
