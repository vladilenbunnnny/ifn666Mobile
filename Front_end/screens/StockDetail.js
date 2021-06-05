import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { Text, Button, ButtonGroup } from "react-native-elements";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar as farFaStar } from "@fortawesome/free-solid-svg-icons";
import { LineChart } from "react-native-chart-kit";
import { library } from "@fortawesome/fontawesome-svg-core";

import { Table, Rows } from "react-native-table-component";
///Contexts
import { AuthContext } from "../contexts/AuthContext";
import { useWatchList } from "../contexts/WatchListContext";
import { scaleSize } from "../constants/Layout";

library.add(farFaStar);

// function choose(val) {
//   switch (val) {
//     case 7:
//       break;
//     case 14:
//       break;
//     case 28:
//       break;
//     case 100:
//       break;
//     default:
//   }
// }

function StockDetail({ route }) {
  const [state, setState] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([
    ["Open", "", "Close", ""],
    ["Low", "", "High", ""],
  ]);
  const [index, setIndex] = useState(1);

  const buttons = [3, 7, 14, 20];
  function updateIndex(index) {
    setIndex(index);
  }

  const { watchList, addToWatchList } = useWatchList();

  const { user } = useContext(AuthContext);

  //<Variables for the chart X and Y axes> START
  let initialLabels = state.map(el => el.date.slice(-2)).reverse();
  let labelsChart = initialLabels.slice(-14);

  let initialPrices = state.map(el => el.close);
  let prices = initialPrices.slice(0, 14);

  if (index == 0) {
    labelsChart = initialLabels.slice(-3);
    prices = initialPrices.slice(0, 3);
  }
  if (index == 1) {
    labelsChart = initialLabels.slice(-7);
    prices = initialPrices.slice(0, 7);
  }
  if (index == 2) {
    labelsChart = initialLabels.slice(-14);
    prices = initialPrices.slice(0, 14);
  }
  if (index == 3) {
    labelsChart = initialLabels.slice(-20);
    prices = initialPrices.slice(0, 20);
  }

  let titleNumber = index;

  //</Variables for the chart X and Y axes> END

  const { symbol, company } = route.params;

  useEffect(() => {
    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=env.process.STOCKS_API_KEY`
    )
      .then(res => res.json())
      .then(data => {
        const timeSeries = data["Time Series (Daily)"];
        const dates = Object.keys(timeSeries);
        const arr = dates.map(date => ({
          date,
          open: timeSeries[date]["1. open"],
          close: timeSeries[date]["4. close"],
          low: timeSeries[date]["3. low"],
          high: timeSeries[date]["2. high"],
        }));
        setState(arr);
        const firstRow = tableData[0].slice();
        const secondRow = tableData[1].slice();
        firstRow[1] = arr[0].open;
        firstRow[3] = arr[0].close;
        secondRow[1] = arr[1].low;
        secondRow[3] = arr[1].high;
        setTableData([firstRow, secondRow]);
      })
      .catch(alert)
      .finally(() => setLoading(false));
  }, []);

  const stockInWatchList = watchList.find(stock => stock.symbol === symbol); //Function that looks for stock in watchlist and renders remove button if it is there

  return (
    <>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.priceContainer}>
            <TitleComponent symbol={symbol} date={state[0].date} />
            <TableComponent tableData={tableData} />
          </View>

          <View style={styles.containerChart}>
            <Text style={styles.chartText} h3>
              Price history for the last {buttons[index]} days
            </Text>

            <ButtonGroup
              onPress={updateIndex}
              selectedIndex={index}
              buttons={buttons}
              containerStyle={styles.buttonsFilter}
              buttonStyle={{ color: "red" }}
              buttonContainerStyle={{ color: "red" }}
              innerBorderStyle={{ color: "rgb(0, 147, 129)" }}
              style={{ color: "rgb(30, 32, 36)" }}
              selectedButtonStyle={{
                backgroundColor: "rgba(0, 147, 129, 0.9)",
              }}
            />

            <LineChartComponent labelsChart={labelsChart} prices={prices} />
            {stockInWatchList ? (
              <RemoveButton />
            ) : (
              <AddButton
                addToWatchList={() => addToWatchList({ symbol, company })}
              />
            )}
          </View>
        </View>
      )}
    </>
  );
}
export default StockDetail;

//<Local components> START
const TitleComponent = props => {
  return (
    <View>
      <Text style={styles.titleText} h3>
        Price for {props.symbol} on
      </Text>
      <Text style={styles.titleText} h3>
        {props.date}
      </Text>
    </View>
  );
};
const TableComponent = props => {
  return (
    <View style={styles.tableContainer}>
      <Table>
        <Rows
          data={props.tableData}
          textStyle={styles.text}
          textStyle={styles.rowsText}
        />
      </Table>
    </View>
  );
};

const LineChartComponent = props => {
  return (
    <LineChart
      data={{
        labels: props.labelsChart,
        datasets: [
          {
            data: props.prices,
          },
        ],
      }}
      width={Dimensions.get("window").width} // from react-native
      height={scaleSize(200)}
      chartConfig={{
        backgroundColor: "black",
        backgroundGradientFrom: "#090909",
        backgroundGradientTo: "#191923",
        color: (opacity = 1) => `rgba(202, 255, 208, ${opacity})`,
      }}
      bezier
      style={styles.lineChart}
    />
  );
};

const AddButton = props => {
  return (
    <Button
      style={{ alignItems: "center" }}
      buttonStyle={styles.button1}
      titleStyle={styles.button}
      title="Add to WatchList"
      onPress={() => props.addToWatchList()}
      type="outline"
      icon={
        <FontAwesomeIcon
          icon={farFaStar}
          color={"rgb(0, 147, 129)"}
          size={15}
          transform="left-1"
          opacity={0.85}
        />
      }
    />
  );
};

const RemoveButton = props => {
  return (
    <Button
      style={{ alignItems: "center" }}
      buttonStyle={styles.button1}
      titleStyle={styles.button}
      title="Remove from watchlist"
      type="outline"
    />
  );
};
//</Local components> END

const styles = StyleSheet.create({
  //                                    Main screen container
  container: {
    flex: 1,
    // backgroundColor: "white",
    paddingTop: scaleSize(50),
    backgroundColor: "rgb(40, 44, 52)",
  },
  //                                     Loading spinner
  loadingContainer: {
    //Loading spinner
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "rgb(172, 179, 173)",
  },
  //                                    Container with Title, date and table component
  priceContainer: {
    paddingLeft: scaleSize(15),
    paddingRight: scaleSize(15),
  },
  titleText: {
    color: "rgb(172, 179, 173)",
  },
  //                                      Buttons
  button: {
    color: "rgb(0, 147, 129)",
  },
  button1: {
    width: scaleSize(250),
    color: "white",
    backgroundColor: "rgb(40, 44, 52)",
    borderColor: "rgb(0, 147, 129)",
    marginTop: scaleSize(30),
  },
  //                                      Chart
  lineChart: {
    marginVertical: scaleSize(8),
    borderRadius: scaleSize(16),
  },
  chartText: {
    color: "rgb(172, 179, 173)",
    fontFamily: "Arial",
    paddingLeft: scaleSize(15),
  },
  containerChart: {
    paddingTop: scaleSize(45),
    flex: 1,
    // alignItems: "center",
  },
  //                                      Table Component
  tableContainer: {
    paddingTop: scaleSize(25),
  },
  rowsText: {
    margin: scaleSize(6),
    fontSize: scaleSize(25),
  },
  buttonsFilter: {
    height: scaleSize(25),
    marginTop: scaleSize(10),
    backgroundColor: "rgb(30, 34, 41)",
    borderColor: "rgb(0, 147, 129)",
    color: "red",
  },
});
