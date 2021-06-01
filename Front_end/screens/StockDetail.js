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
            <Text style={styles.detailsText} h3>
              Price for {symbol} on
            </Text>
            <Text style={styles.detailsText} h3>
              {date[0]}
            </Text>

            <View
              style={{
                flexDirection: "row",
                paddingLeft: "10%",
                paddingRight: "10%",
                paddingTop: "13%",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.priceText} h4>
                Open {Number(open[0]).toFixed(2)} $
              </Text>
              <Text
                style={{ paddingLeft: "20%", color: "rgb(172, 179, 173)" }}
                h4
              >
                Close {Number(close[0]).toFixed(2)} $
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                paddingLeft: "10%",
                paddingRight: "10%",
                marginTop: "1%",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.priceText} h4>
                Low {Number(low[0]).toFixed(2)} $
              </Text>
              <Text style={{ color: "rgb(172, 179, 173)" }} h4>
                High {Number(high[0]).toFixed(2)} $
              </Text>
            </View>
          </View>

          <View style={styles.containerChart}>
            <Text style={styles.chartText} h3>
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
                backgroundColor: "black",
                backgroundGradientFrom: "#090909",
                backgroundGradientTo: "#191923",
                // decimalPlaces: 2, // optional, defaults to 2dp
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

            <Button
              style={{ alignItems: "center" }}
              buttonStyle={styles.button1}
              titleStyle={styles.button}
              title="Add to WatchList"
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
