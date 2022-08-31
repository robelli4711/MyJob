import { useEffect, useState } from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
//import { Chart } from "react-google-charts";
import '../styles/react-bootstrap-min.own.css';
import { readAllJobs } from '../data/Jobs';

// interface data {
//     name: string;
//     jobs: number;
//     fill: string;
// }

export const Statistics = () => {

    const [jobData, setJobData] = useState([]);

    useEffect(() => {
        data();
    }, [])

    const data = () => {
        readAllJobs('status', 'asc').then((r: any) => {

            var data = [];
            for (var issue of r) {
                var entryFound = false;
                var tempObj = {
                    name: issue.status,
                    count: 1,
                    fill: '#' + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6)
                };

                for (var item of data) {
                    if (item.name === tempObj.name) {
                        item.count++;
                        entryFound = true;
                        break;
                    }
                }

                if (!entryFound) {
                    data.push(tempObj);
                }
            }
            data.sort((a, b) => a.count - b.count);
            setJobData(data);
        }).then((r) => {
            return r;
        });
    }

    const style = {
        top: '50%',
        right: 0,
        transform: 'translate(0, -50%)',
        lineHeight: '24px',
    };

    // const options = {
    //     title: "My Daily Activities",
    //   };
      
    return (
        <div>
            <ResponsiveContainer width="99%" minWidth={'99rem'} aspect={3}>

                <RadialBarChart id='svg1' innerRadius="20%" outerRadius="80%" barSize={50} data={jobData}>
                    <RadialBar 
                        label={{ position: 'insideStart', fill: '#fff' }}
                        background
                        dataKey="count"
                    />
                    <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
                </RadialBarChart>
            </ResponsiveContainer>
        </div>
    )
}