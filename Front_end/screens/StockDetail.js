import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { Text, Button } from "react-native-elements";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar as farFaStar } from "@fortawesome/free-solid-svg-icons";
import { LineChart } from "react-native-chart-kit";
import { library } from "@fortawesome/fontawesome-svg-core";

import { Table, Rows } from "react-native-table-component";
///Contexts
import { AuthContext } from "../contexts/AuthContext";
import { useWatchList } from "../contexts/WatchListContext";

library.add(farFaStar);

function StockDetail({ route, navigation }) {
  const [state, setState] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([
    ["Open", "", "Close", ""],
    ["Low", "", "High", ""],
  ]);

  const { watchList, addToWatchList } = useWatchList();

  const { user } = useContext(AuthContext);

  //<Variables for the chart X and Y axes> START
  const labelsChart = state
    .slice(0, 14)
    .map(el => el.date.slice(-2))
    .reverse();

  const prices = state.slice(0, 14).map(el => el.close);

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

  const stockInWatchList = watchList.find(stock => stock.symbol === symbol);

  return (
    <>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.containerText}>
            <TitleComponent symbol={symbol} date={state[0].date} />

            {/* <View
              style={{
                flexDirection: "row",
                paddingLeft: "10%",
                paddingRight: "10%",
                paddingTop: "13%",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.priceText} h4>
                Open {Number(state[0].open).toFixed(2)} $
              </Text>
              <Text
                style={{ paddingLeft: "20%", color: "rgb(172, 179, 173)" }}
                h4
              >
                Close {Number(state[0].close).toFixed(2)} $
              </Text>
            </View> */}

            {/* <View
              style={{
                flexDirection: "row",
                paddingLeft: "10%",
                paddingRight: "10%",
                marginTop: "1%",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.priceText} h4>
                Low {Number(state[0].low).toFixed(2)} $
              </Text>
              <Text style={{ color: "rgb(172, 179, 173)" }} h4>
                High {Number(state[0].high).toFixed(2)} $
              </Text>
            </View> */}

            <TableComponent tableData={tableData} />
          </View>

          <View style={styles.containerChart}>
            <Text style={styles.chartText} h3>
              Price history for the last 14 days
            </Text>
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
      <Text style={styles.detailsText} h3>
        Price for {props.symbol} on
      </Text>
      <Text style={styles.detailsText} h3>
        {props.date}
      </Text>
    </View>
  );
};
const TableComponent = props => {
  return (
    <View>
      <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
        <Rows data={props.tableData} textStyle={styles.text} />
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
      height={220}
      chartConfig={{
        backgroundColor: "black",
        backgroundGradientFrom: "#090909",
        backgroundGradientTo: "#191923",
        color: (opacity = 1) => `rgba(202, 255, 208, ${opacity})`,
        style: {
          borderRadius: 16,
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
        marginTop: "7%",
      }}
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
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50,
    backgroundColor: "rgb(40, 44, 52)",
  },
  containerChart: {
    paddingTop: "17%",
    flex: 1,
    // alignItems: "center",
  },
  detailsText: {
    color: "rgb(172, 179, 173)",
  },
  priceText: {
    color: "rgb(172, 179, 173)",
  },

  chartText: {
    color: "rgb(172, 179, 173)",
    fontFamily: "Arial",
    paddingLeft: "4%",
  },
  containerText: {
    paddingLeft: 15,
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    color: "rgb(0, 147, 129)",
  },
  button1: {
    width: "70%",
    color: "white",
    backgroundColor: "rgb(40, 44, 52)",
    borderColor: "rgb(0, 147, 129)",
    marginTop: 30,
  },
});
