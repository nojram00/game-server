'use client'
import React from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Score, Progress } from '@main/types/types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface Props{
    score : Score;
    progress : Progress
}
export default function Main(props : Props)
{
    console.log(props.score)
    const score_data = {
        labels: ['Pre Test', 'Post Test'],
        datasets: [
          {
            label: 'Scores',
            data: [props.score?.pre_test, props.score?.post_test],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      };

    const progress_data = {
        labels : ['Quantum Mastery', 'Ecology Mastery', 'Momentum Mastery', 'Tera Mastery'],
        datasets : [
            {
                label : 'Progress',
                data: [
                    props.progress?.quantum_mastery,
                    props.progress?.ecology_mastery,
                    props.progress?.momentum_mastery,
                    props.progress?.tera_mastery
                ]
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
        <div className='grid grid-cols-2 gap-2 p-3'>
            <div className='flex items-center justify-center'>
                {/* <Bar data={data} options={options}/> */}
                <Pie data={score_data} />
            </div>
            <div className='flex items-center justify-center'>
                {/* <Bar data={data} options={options}/> */}
                <Pie data={progress_data} />
            </div>
        </div>
    )
}
