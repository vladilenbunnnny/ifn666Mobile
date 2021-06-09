import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { Text, Button, ButtonGroup } from "react-native-elements";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar as farFaStar } from "@fortawesome/free-solid-svg-icons";
import { LineChart } from "react-native-chart-kit";
import { library } from "@fortawesome/fontawesome-svg-core";
import { Table, Rows } from "react-native-table-component";
import { scaleSize } from "../constants/Layout";
import { Styles } from "../constants/Styles";

///Contexts
import { AuthContext } from "../contexts/AuthContext";
import { useWatchList } from "../contexts/WatchListContext";

library.add(farFaStar);

function defineDifference(state) {
  if (state.length == 0) {
    return {};
  }

  let todayClose = Number(state[0]["close"]);
  let todayOpen = Number(state[0]["open"]);
  let priceDif = (todayClose - todayOpen).toFixed(2);
  let result;

  if (priceDif > 0) {
    result = ((priceDif / todayOpen) * 100).toFixed(2);
  } else {
    result = (((todayOpen - todayClose) / todayOpen) * 100).toFixed(2);
  }
  return { priceDif, result };
}

//<My local functions> START
function defineIndex(index, initialLabels, initialPrices) {
  let labelsChart = "";
  let prices = "";
  if (index == 0) {
    labelsChart = initialLabels.slice(-3);
    prices = initialPrices.slice(0, 3);
    return { labelsChart, prices };
  }
  if (index == 1) {
    labelsChart = initialLabels.slice(-7);
    prices = initialPrices.slice(0, 7);
    return { labelsChart, prices };
  }
  if (index == 2) {
    labelsChart = initialLabels.slice(-14);
    prices = initialPrices.slice(0, 14);
    return { labelsChart, prices };
  }
  if (index == 3) {
    labelsChart = initialLabels.slice(-20);
    prices = initialPrices.slice(0, 20);
    return { labelsChart, prices };
  }
}
//</My local functions> END

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

  const { watchList, addToWatchList, removeFromWatchList } = useWatchList();

  // const { user } = useContext(AuthContext);

  //<Setting up variables for the chart X and Y axes> START
  let initialLabels = state.map(el => el.date.slice(-2)).reverse();
  let initialPrices = state.map(el => el.close);

  const { labelsChart, prices } = defineIndex(
    index,
    initialLabels,
    initialPrices
  );

  //</Setting up variables for the chart X and Y axes> END

  const { symbol, company } = route.params;

  useEffect(() => {
    let status;
    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=env.process.STOCKS_API_KEY`
    )
      .then(res => {
        status = res.status;
        return res.json();
      })
      .then(data => {
        if ("Note" in data) {
          alert("The limit is 5 requests per minute");
          return;
        }
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
        firstRow[1] = Number(arr[0].open).toFixed(2);
        firstRow[3] = Number(arr[0].close).toFixed(2);
        secondRow[1] = Number(arr[1].low).toFixed(2);
        secondRow[3] = Number(arr[1].high).toFixed(2);
        setTableData([firstRow, secondRow]);
      })
      .catch(alert)
      .finally(() => setLoading(false));
  }, [symbol]);

  const { priceDif, result } = defineDifference(state);

  const stockInWatchList = watchList.find(stock => stock.symbol === symbol); //Function that looks for stock in watchlist and renders remove button if it is there

  return (
    <>
      {isLoading ? (
        <View style={Styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : state.length > 0 ? (
        <View style={styles.container}>
          <View style={Styles.priceContainer}>
            <TitleComponent
              symbol={symbol}
              date={state[0].date}
              result={result}
              priceDif={priceDif}
            />
            <TableComponent tableData={tableData} />
          </View>

          <View style={Styles.containerChart}>
            <Text style={Styles.chartText} h3>
              Price history for the last {buttons[index]} days
            </Text>

            <ButtonGroup
              onPress={updateIndex}
              selectedIndex={index}
              buttons={buttons}
              containerStyle={Styles.buttonsFilter}
              innerBorderStyle={{ color: "rgb(0, 147, 129)" }}
              style={{ color: "rgb(30, 32, 36)" }}
              selectedButtonStyle={{
                backgroundColor: "rgba(0, 147, 129, 0.9)",
              }}
            />

            <LineChartComponent labelsChart={labelsChart} prices={prices} />
            {stockInWatchList ? (
              <RemoveButton
                removeFromWatchList={() =>
                  removeFromWatchList(stockInWatchList.id)
                }
              />
            ) : (
              <AddButton
                addToWatchList={() => addToWatchList({ symbol, company })}
              />
            )}
          </View>
        </View>
      ) : (
        <View style={Styles.limitRequestContainer}>
          <Text style={Styles.limitRequestText}>
            The limit is 5 requests per minute. Try again later
          </Text>
        </View>
      )}
    </>
  );
}
export default StockDetail;

///<Local components> START
const TitleComponent = props => {
  return (
    <View>
      <Text style={Styles.titleText} h3>
        Price for {props.symbol} on
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={Styles.titleText} h3>
          {props.date}
        </Text>
        <View style={{ paddingLeft: scaleSize(95), flexDirection: "row" }}>
          {props.priceDif > 0 ? (
            <Text
              style={{
                fontSize: scaleSize(25),
                color: props.priceDif > 0 ? "green" : "red",
              }}
            >
              +
            </Text>
          ) : (
            <Text
              style={{
                fontSize: scaleSize(25),
                color: props.priceDif > 0 ? "green" : "red",
              }}
            >
              -
            </Text>
          )}
          <Text
            style={{
              fontSize: scaleSize(27),
              color: props.priceDif > 0 ? "green" : "red",
            }}
          >
            {props.result}%
          </Text>
        </View>
      </View>
    </View>
  );
};
const TableComponent = props => {
  return (
    <View style={Styles.tableContainer}>
      <Table>
        <Rows data={props.tableData} textStyle={Styles.rowsText} />
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
      style={Styles.lineChart}
    />
  );
};

const AddButton = props => {
  return (
    <Button
      buttonStyle={Styles.buttonAdd}
      titleStyle={Styles.button}
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
      buttonStyle={Styles.buttonRemove}
      titleStyle={Styles.button}
      title="Remove from WatchList"
      type="outline"
      onPress={() => props.removeFromWatchList()}
    />
  );
};
//</Local components> END

const styles = StyleSheet.create({
  // Main screen container
  container: {
    flex: 1,
    paddingTop: scaleSize(20),
    backgroundColor: "rgb(40, 44, 52)",
  },
});
