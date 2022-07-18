import {
    LineChart,
    Line,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
  } from "recharts";
  
  export function Chart({ title, data, dataKey, grid }) {
    //console.log(data);
  
    return (
      <div className="container mx-auto chart">
        <h3 className="chartTitle">{title}</h3>
        <ResponsiveContainer width="100%" aspect={4 / 1}>
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#5550bd" />
            <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
            <Tooltip />
            {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
          </LineChart>
        </ResponsiveContainer>
        <br />
        <ul className="list-group w-25 mx-auto">
          {data.length ? (
            data.map((item) => (
              <li className="list-group-item d-flex justify-content-between align-items-center">
                {item.name}
                <p>{item.count}</p>
              </li>
            ))
          ) : (
            <h2>Loading...</h2>
          )}
        </ul>
      </div>
    );
  }