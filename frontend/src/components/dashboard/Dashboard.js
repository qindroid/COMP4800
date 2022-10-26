import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["City", "2010 Population", "2000 Population"],
  ["New York City, NY", 8175000, 8008000],
  ["Los Angeles, CA", 3792000, 3694000],
  ["Chicago, IL", 2695000, 2896000],
  ["Houston, TX", 2099000, 1953000],
  ["Philadelphia, PA", 1526000, 1517000],
];

export const options = {
  title: "Population of Largest U.S. Cities",
  chartArea: { width: "50%" },
  hAxis: {
    title: "Total Population",
    minValue: 0,
  },
  vAxis: {
    title: "City",
  },
};

class Dashboard extends React.Component {
  // constructor(props) {
  //     super(props);
  // }

  render() {
    return (
      <div>
        {/* <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
                    <div>
                        <div class="text-xl font-medium text-black">ChitChat</div>
                        <p class="text-slate-500">You have a new message!</p>
                    </div>
                </div> */}
        {/* items-center justify-center align-middle */}
        <div class="">
          <div class="grid gap-4">
            <div class="shadow-lg col-span-2">
              <Chart
                chartType="BarChart"
                width="100%"
                height="400px"
                data={data}
                options={options}
              />
            </div>
            <div class="bg-white shadow-lg col-span-1">
              <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
              />
            </div>
            <div class="bg-white rounded-xl shadow-lg col-span-1 text-center">
              <h1>PROFIT</h1>
              <h1>REVENUE</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
