import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { getDistChanList, getCustNumList } from "../apicalls";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
require("highcharts/modules/exporting")(Highcharts);

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    flexWrap: "wrap",
    boxShadow: "none",
    padding: theme.spacing(1.5),
    outline: "none",
    maxWidth: "400px",
    margin: "0 0",
    border: "2.5px solid #fff",
    borderRadius: "10px",
    marginBottom: "10px",
    justifyContent: "center",
  },
  textContainer1: {
    display: "flex",
    marginBottom: theme.spacing(1),
    gap: theme.spacing(1.5),
    border: "none",
  },
  buttonContainer: {
    display: "flex",
    width: "100%",
    marginTop: theme.spacing(1),
    gap: theme.spacing(1.5),
  },
  viewButton: {
    float: "left",
    marginTop: "3px",
    borderRadius: "10px",
    backgroundColor: "transparent",
    color: "white",
    border: "1px solid #fff",
    fontSize: "13px",
    padding: "8px 13px",
    textTransform: "none",
  },
  textField1: {
    flex: "100%",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "white",
    marginBottom: "10px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
    },
  },
  textField2: {
    flex: "100%",
    borderRadius: "10px",
    backgroundColor: "white",
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
    },
    padding: 0,
  },
  input: {
    width: "100%",
    height: "2.5rem",
    margin: "0",
    border: "none",
    borderRadius: "3px",
    paddingLeft: "5px",
  },
}));

const AnalyticsView = () => {
  const classes = useStyles();
  const [distChanList, setDistChanList] = useState([]);
  const [custNumList, setCustNumList] = useState([]);
  const [distChanData, setDistChanData] = useState([]);
  const [custNumData, setCustNumData] = useState([]);
  const [custNumPerDistChanData, setCustNumPerDistChanData] = useState([]);
  const [chartOptions, setChartOptions] = useState(null);
  let distChanUserInput;
  let custNumUserInput;

  const distChanInput = () => {
    distChanUserInput = document.getElementById("distribution-channel").value;
  };

  const custNumInput = () => {
    custNumUserInput = document.getElementById("customer-number").value;
  };

  useEffect(() => {
    (async () => setDistChanList(await getDistChanList()))();
  }, []);

  useEffect(() => {
    (async () => setCustNumList(await getCustNumList()))();
  }, []);

  const handleDistChanSubmit = async (e) => {
    try {
      const resp = await axios.get(
        `http://localhost:8080/invoices/analytics/distChan/${distChanUserInput}`
      );
      setDistChanData(resp.data);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  const handleCustNumSubmit = async (e) => {
    try {
      const resp = await axios.get(
        `http://localhost:8080/invoices/analytics/custNum/${custNumUserInput}`
      );
      setCustNumData(resp.data);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  const handleCustNumPerDistChan = async (e) => {
    try {
      const resp = await axios.get(
        `http://localhost:8080/invoices/analytics/${distChanUserInput}/${custNumUserInput}`
      );
      setCustNumPerDistChanData(resp.data);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  const handleViewClick = () => {
    distChanInput();
    handleDistChanSubmit();
    const options1 = {
      chart: {
        type: "bar",
        backgroundColor: "#666666",
        style: {
          fontFamily: "Roboto",
          borderRadius: "10px",
        },
      },
      title: {
        text: "Total Amount Per Distribution Channel",
        style: {
          color: "#ffff",
        },
      },
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      xAxis: {
        lineColor: "white",
        title: {
          text: "Distribution Channel",
          style: {
            color: "#ffff",
          },
        },
        labels: {
          style: {
            color: "white",
          },
        },
        categories: [distChanUserInput],
      },
      yAxis: {
        max: 54000,
        endOnTick: false,
        labels: {
          style: {
            color: "white",
          },
        },
        title: {
          text: "Total Amount",
          style: {
            color: "#ffff",
          },
        },
      },
      series: [
        {
          name: "Amount",
          data: [distChanData],
          color: "#fc7500",
          dataLabels: [
            {
              enabled: true,
              style: {
                fontFamily: "Roboto",
                textOutline: "none",
              },
            },
          ],
        },
      ],
      navigation: {
        buttonOptions: {
          enabled: true,
        },
      },
    };

    custNumInput();
    handleCustNumSubmit();
    const options2 = {
      chart: {
        type: "bar",
        backgroundColor: "#666666",
        style: {
          fontFamily: "Roboto",
          borderRadius: "10px",
        },
      },
      title: {
        text: "Total Amount Per Customer Number",
        style: {
          color: "#ffff",
        },
      },
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      xAxis: {
        lineColor: "white",
        title: {
          text: "Customer Number",
          style: {
            color: "#ffff",
          },
        },
        labels: {
          style: {
            color: "white",
          },
        },
        categories: [custNumUserInput],
      },
      yAxis: {
        max: 54000,
        endOnTick: false,
        labels: {
          style: {
            color: "white",
          },
        },
        title: {
          text: "Total Amount",
          style: {
            color: "#ffff",
          },
        },
      },
      series: [
        {
          name: "Amount",
          data: [custNumData],
          color: "#fc7500",
          dataLabels: [
            {
              enabled: true,
              style: {
                fontFamily: "Roboto",
                textOutline: "none",
              },
            },
          ],
        },
      ],
      navigation: {
        buttonOptions: {
          enabled: true,
        },
      },
    };

    //Total Amount of a customer at a particular Country and vice versa.
    handleCustNumPerDistChan();
    const options3 = {
      chart: {
        type: "pie",
        backgroundColor: "#666666",
        style: {
          fontFamily: "Roboto",
          borderRadius: "10px",
        },
      },
      title: {
        text: `Total order amount of "${custNumUserInput}" in ${distChanUserInput}`,
        style: {
          color: "#ffff",
        },
      },
      legend: {
        enabled: true,
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          name: "Percentage",
          data: [
            {
              name: "Other Customers",
              y: ((distChanData - custNumPerDistChanData) / distChanData) * 100,
              color: "#fc7500",
            },
            {
              name: [custNumUserInput],
              y: (custNumPerDistChanData / distChanData) * 100,
              color: "#404040",
            },
          ],
          dataLabels: {
            enabled: true,
            format: "{point.name}: {point.percentage:.1f} %",
            style: {
              color: "white",
              textOutline: "none",
              fontWeight: "bold",
            },
          },
        },
      ],
      navigation: {
        buttonOptions: {
          enabled: true,
        },
      },
    };

    const options4 = {
      chart: {
        type: "pie",
        backgroundColor: "#666666",
        style: {
          fontFamily: "Roboto",
          borderRadius: "10px",
        },
      },
      title: {
        text: `Total order amount in ${distChanUserInput} for "${custNumUserInput}"`,
        style: {
          color: "#ffff",
        },
      },
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          name: "Percentage",
          data: [
            {
              name: "Other Countries",
              y: ((custNumData - custNumPerDistChanData) / custNumData) * 100,
              color: "#404040",
            },
            {
              name: [distChanUserInput],
              y: (custNumPerDistChanData / custNumData) * 100,
              color: "#fc7500",
            },
          ],
          dataLabels: {
            enabled: true,
            format: "{point.name}: {point.percentage:.1f} %",
            style: {
              color: "white",
              textOutline: "none",
              fontWeight: "bold",
            },
          },
        },
      ],
      navigation: {
        buttonOptions: {
          enabled: true,
          backgroundColor: "black",
        },
      },
    };

    setChartOptions([options1, options2, options3, options4]);
  };

  return (
    <div>
      <form className={classes.formContainer}>
        <FormControl variant="outlined" className={classes.textField1}>
          <InputLabel htmlFor="outlined-age-native-simple">
            Distribution Channel
          </InputLabel>
          <Select native id="distribution-channel">
            <option aria-label="None" value="" />
            {distChanList.map((data) => {
              return (
                <option key={data.id} value={data.id}>
                  {data}
                </option>
              );
            })}
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.textField2}>
          <InputLabel htmlFor="outlined-age-native-simple">
            Customer Number
          </InputLabel>
          <Select native id="customer-number">
            <option aria-label="None" value="" />
            {custNumList.map((data) => {
              return (
                <option key={data.id} value={data.id}>
                  {data}
                </option>
              );
            })}
          </Select>
        </FormControl>

        <div className={classes.buttonContainer}>
          <Button
            className={classes.viewButton}
            fullWidth
            variant="contained"
            color="default"
            onClick={handleViewClick}
          >
            VIEW
          </Button>
        </div>
      </form>
      {chartOptions && (
        <div>
          <div
            style={{
              marginBottom: "20px",
              border: "3px white solid",
              borderRadius: "10px",
            }}
          >
            <HighchartsReact
              highcharts={Highcharts}
              options={chartOptions[0]}
            />
          </div>
          <div
            style={{
              marginBottom: "20px",
              border: "3px white solid",
              borderRadius: "10px",
            }}
          >
            <HighchartsReact
              highcharts={Highcharts}
              options={chartOptions[1]}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                marginBottom: "20px",
                marginRight: "20px",
                border: "3px white solid",
                borderRadius: "10px",
              }}
            >
              <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions[2]}
              />
            </div>
            <div
              style={{
                marginBottom: "20px",
                border: "3px white solid",
                borderRadius: "10px",
              }}
            >
              <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions[3]}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsView;
