import './Graph.css'
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Graph = (props) => {
  var competents_information=props.competents_information;
  console.log(competents_information,"ghewa")
    const data = [
        {
          name: 'Page A',
          pv: 2400,
        },
        {
          name: 'Page B',
          pv: 1398,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
  return (
              <ResponsiveContainer width="90%" height="50%">
        <BarChart
          width={500}
          height={300}
          data={competents_information}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="numberOfAppointments" fill="#7E1E80" />
        </BarChart>
      </ResponsiveContainer>

  )
}

export default Graph
