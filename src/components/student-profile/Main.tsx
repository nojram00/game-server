'use client'
import React from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Main(
    { score, progress } :
    {
        score : { [key : string] : number } | any,
        progress : { [key : string] : number } | any
    })
{
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';

        let color = '#';

        for(let i = 0; i < 6; i++){
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    }

    const score_data = {
        labels: Object.keys(score).map(label => label),
        datasets: [
          {
            label: 'Scores',
            data: Object.keys(score).map((label : any) => score[label]),
            fill: false,
            borderColor: '#000000',
            backgroundColor : Object.keys(score).map(() => getRandomColor()),
            tension: 0.1,
          },
        ],
      };

    const progress_data = {
        labels : Object.keys(progress).map(label => label),
        datasets : [
            {
                label : 'Progress',
                data: Object.keys(progress).map(label => progress[label]),
                fill: false,
                borderColor : '#000000',
                backgroundColor : Object.keys(progress).map(() => getRandomColor()),
                tension : 0.1,
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
        legend: {
            position: 'top',
        },
        tooltip: {
            callbacks: {
            label: function (context : any) {
                return `${context.dataset.label}: ${context.raw}`;
            },
            },
        },
        },
        scales: {
        x: {
            beginAtZero: true,
        },
        y: {
            beginAtZero: true,
        },
        },
    };
    return (
        <div className='bg-accent grid grid-cols-2 gap-3 p-4 rounded-md'>
            <div className='card bg-base-content flex items-center justify-center'>
                {/* <Bar data={data} options={options}/> */}
                <div className='card-body text-2xl'>
                    <Pie data={score_data} />
                </div>
            </div>
            <div className='card bg-base-content flex items-center justify-center'>
                {/* <Bar data={data} options={options}/> */}
                <div className='card-body text-2xl'>
                    <Pie data={progress_data} />
                </div>
            </div>
        </div>
    )
}
