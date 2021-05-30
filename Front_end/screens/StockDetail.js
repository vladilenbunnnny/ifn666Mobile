import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { Text, Button } from "react-native-elements";
import { LineChart } from "react-native-chart-kit";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar as farFaStar } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(farFaStar);

function StockDetail({ route, navigation }) {
  // TODO: combine this state in one
  const [date, setDate] = useState("");
  const [open, setOpen] = useState("");
  const [close, setClose] = useState("");
  const [low, setLow] = useState("");
  const [high, setHigh] = useState("");
  const [isLoading, setLoading] = useState(true);

  //Variables for the chart X and Y axes
  const labelsChart = Object.values(date)
    .slice(0, 14)
    .map(d => d.slice(-2))
    .reverse();
  const prices = Object.values(close).slice(0, 14);

  const { symbol } = route.params;

  useEffect(() => {
    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=env.process.STOCKS_API_KEY`
    )
      .then(res => res.json())
      .then(data => {
        const timeSeries = data["Time Series (Daily)"];
        const dates = Object.keys(timeSeries);

        setDate(dates);
        setOpen(dates.map(date => timeSeries[date]["1. open"]));
        setClose(dates.map(date => timeSeries[date]["4. close"]));
        setLow(dates.map(date => timeSeries[date]["3. low"]));
        setHigh(dates.map(date => timeSeries[date]["2. high"]));
      })
      .catch(err => {
        if (err.response) {
          console.error(err.response.status);
          console.error(err.response.data);
        } else if (err.request) {
          console.error("No response from api");
        } else {
          console.error("Unable to send a request");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.containerText}>
            <Text style={styles.detailsText} h1>
              Details for {symbol}
            </Text>
            <Text h2>on {date[0]}</Text>
            <Text h4>
              The open price is <Text h3>{Number(open[0]).toFixed(2)} $</Text>
            </Text>
            <Text h4>
              The close price is <Text h3>{Number(close[0]).toFixed(2)} $</Text>
            </Text>
            <Text h4>
              The low price is <Text h3>{Number(low[0]).toFixed(2)} $</Text>
            </Text>

            <Text h4>
              The high price is
              <Text h3> {Number(high[0]).toFixed(2)} $</Text>
            </Text>
          </View>
          <View style={styles.containerChart}>
            <Text style={styles.chartText} h1>
              Price history for the last 14 days
            </Text>
            {/* Chart */}
            <LineChart
              data={{
                labels: labelsChart,
                datasets: [
                  {
                    data: prices,
                  },
                ],
              }}
              width={Dimensions.get("window").width} // from react-native
              height={220}
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                // decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
            <View style={{ flex: 1 }}>
              <Button
                style={styles.button}
                title="Add to WatchList"
                type="outline"
                icon={
                  <FontAwesomeIcon
                    icon={farFaStar}
                    color={"#6CB4EE"}
                    size={15}
                    transform="left-1"
                    opacity={0.85}
                  />
                }
              />
            </View>
          </View>
        </View>
      )}
    </>
  );
}
export default StockDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  containerChart: {
    paddingTop: 50,
    flex: 1,

    alignItems: "flex-start",
  },
  chartText: {
    // textAlign: "center",
    color: "#696969",
    fontFamily: "Arial",
    paddingLeft: 15,
  },
  containerText: {
    paddingLeft: 15,
  },
  button: {
    paddingTop: 10,
    paddingLeft: "10%",
    minWidth: "90%",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: "rgb(40, 44, 52)",
    fontSize: 40,
  },
});
