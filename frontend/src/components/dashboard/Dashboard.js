import React, { useEffect } from "react";
import { Chart } from "react-google-charts";
import utils from "../../common/Utils";
import { CASHFLOW_READ_ROUTE, CASHFLOW_GLOBAL_ROUTE } from "../../common/urls";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import store from "../../store";
import { useHistory } from "react-router-dom";

export const barChartOptions = {
  title: "Business Cashflows",
  chartArea: { width: "50%" },
  hAxis: {
    title: "Amount in USD",
  },
  vAxis: {
    title: "Company",
  },
};

export const pieChartInOptions = {
  title: "Cash Inflow",
  chartArea: { width: "100%" },
};

export const pieChartOutOptions = {
  title: "Cash Outflow",
  chartArea: { width: "100%" },
};

export const compare = (a, b) => {
  if (a.description < b.description) {
    return -1;
  }
  if (a.description > b.description) {
    return 1;
  }
  return 0;
};

export const filterValues = (array) => {
  // sort array to rearrange cashflows from the same description
  array.sort(compare);

  // removing unnecessary values
  const filteredArray = [];
  for (let i = 0; i < array.length; i++) {
    filteredArray.push([array[i].description, array[i].type, array[i].amount]);
  }

  let inMap = new Map(); // holds all the cashflows that are "In"
  let outMap = new Map(); // holds all the cashflows that are "Out"

  // adds the values to the maps
  // key = description, value = amount
  for (let i = 0; i < filteredArray.length; i++) {
    if (filteredArray[i][1] === "In") {
      if (inMap.has(filteredArray[i][0])) {
        // if the key already exists
        let value = inMap.get(filteredArray[i][0]);
        inMap.set(filteredArray[i][0], value + filteredArray[i][2]);
      } else {
        inMap.set(filteredArray[i][0], filteredArray[i][2]);
      }
    } else if (filteredArray[i][1] === "Out") {
      if (outMap.has(filteredArray[i][0])) {
        // if the key already exists
        let value = outMap.get(filteredArray[i][0]);
        outMap.set(filteredArray[i][0], value + filteredArray[i][2]);
      } else {
        outMap.set(filteredArray[i][0], filteredArray[i][2]);
      }
    }
  }

  // merges the two maps into one array
  let newArray = [["Company", "Amount In", "Amount Out"]];

  for (let [key, value] of inMap) {
    if (outMap.has(key)) {
      newArray.push([key, value, outMap.get(key)]);
    } else {
      newArray.push([key, value, 0]);
    }
  }

  for (let [key, value] of outMap) {
    if (!inMap.has(key)) {
      newArray.push([key, 0, value]);
    }
  }

  return newArray;
};

function Dashboard() {
  const [cashflowData, setData] = React.useState([]);
  const [cashflowOut, setOutData] = React.useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch(CASHFLOW_GLOBAL_ROUTE)
      .then((response) => response.json())
      .then((data) => {
        let values = data.data.cashflows.$values;

        let array = filterValues(values);
        setData(array);

        let newArray = JSON.parse(JSON.stringify(array)); // deep copy of the filtered array
        newArray.forEach((i) => {
          // remove the first column, which is the cash inflows
          i.splice(1, 1);
        });
        setOutData(newArray);
      })
      .catch((error) => console.log(error));
  }, []);

  const chartEvents = [
    {
      eventName: "select",
      callback({ chartWrapper }) {
        let row = chartWrapper.getChart().getSelection()[0].row;
        let name = cashflowData[row + 1][0];

        console.log("Selected ", chartWrapper.getChart().getSelection()[0]);
        console.log("item: ", name);

        history.push('/main/cashflow');
      },
    },
  ];

  return (
    <>
      <div>
        <div class="grid grid-cols-5 gap-4">
          <div class="shadow-lg col-span-5">
            <Chart
              chartType="BarChart"
              width="100%"
              height="400px"
              data={cashflowData}
              options={barChartOptions}
              chartEvents={chartEvents}
            />
          </div>
          <div class="bg-white shadow-lg col-span-2">
            <Chart
              chartType="PieChart"
              data={cashflowData}
              options={pieChartInOptions}
              width={"100%"}
              height={"400px"}
              chartEvents={chartEvents}
            />
          </div>
          <div class="bg-white shadow-lg col-span-2">
            <Chart
              chartType="PieChart"
              data={cashflowOut}
              options={pieChartOutOptions}
              width={"100%"}
              height={"400px"}
              chartEvents={chartEvents}
            />
          </div>
          <div class="bg-white rounded-xl shadow-lg flex justify-center items-center">
            <div class="text-center">
              <h1 class="underline underline-offset-4 font-bold">REVENUE</h1>
              <h3>
                $
                {cashflowData.reduce((total, currentValue, currentIndex) => {
                  if (currentIndex == 0) {
                    return 0;
                  } else {
                    return +total + +currentValue[1];
                  }
                }, 0)}
              </h3>
              <h1 class="underline underline-offset-4 font-bold">PROFIT</h1>
              <h3>
                $
                {cashflowData.reduce((total, currentValue, currentIndex) => {
                  if (currentIndex == 0) {
                    return 0;
                  } else {
                    return +total + +currentValue[1] - +currentValue[2];
                  }
                }, 0)}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// class Dashboard extends React.Component {
//   static propTypes = {
//     cookies: instanceOf(Cookies).isRequired,
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       cashflows: [],
//     }
//     this.getCashflows();

//   }

//   getCashflows() {
//     const { cookies } = this.props;
//     console.log('token==', cookies.get("token"));
//     utils
//       .utilFetch("get", CASHFLOW_GLOBAL_ROUTE, null, cookies.get("token"))
//       .then((res) => {
//         console.log(res, res.data);

//         if (200 === res.status) {
//           console.log("Setting cashflows");
//           let action = {
//             type: "setCashflows",
//             value: res.data,
//           };

//           store.dispatch(action);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         console.log(err.message);
//       });
//   }
//   render() {
//     return (
//       <div>
//         <div class="">
//           <div class="grid gap-4">
//             <div class="shadow-lg col-span-2">
//               <Chart
//                 chartType="BarChart"
//                 width="100%"
//                 height="400px"
//                 data={data}
//                 options={options}
//               />
//             </div>
//             <div class="bg-white shadow-lg col-span-1">
//               <Chart
//                 chartType="PieChart"
//                 data={data}
//                 options={options}
//                 width={"100%"}
//                 height={"400px"}
//               />
//             </div>
//             <div class="bg-white rounded-xl shadow-lg col-span-1 text-center">

//               <h1>PROFIT</h1>

//               <h1>REVENUE</h1>
//               <div>{this.state.cashflows}</div>

//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

export default withCookies(Dashboard);
