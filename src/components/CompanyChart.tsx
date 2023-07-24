import { CompanyData } from "../types/CompanyData";
import type { ChartData, ChartOptions } from 'chart.js';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


export type CompanyChartProps = {
    companyData: CompanyData[]
}

export default function CompanyChart({ companyData }: CompanyChartProps): JSX.Element {
    const data: ChartData<'line'> = {
        labels: companyData.sort((a, b) => (a.date > b.date ? 1 : -1)).map((data: CompanyData) => {
            return data.date
        }),
        datasets: [
            {
                data: companyData.map((data: CompanyData) => {
                    return data.close
                }),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    }
    const options: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
            },           
        
        }
    }
    
    return (
        <>
            {data ? <Line options={options} data={data} /> : <p>Cannot draw chart</p>}
        </>
    )
}