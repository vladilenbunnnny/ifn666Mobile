import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";

function StockDetail({ route, navigation }) {
  const [date, setDate] = useState("");
  const [open, setOpen] = useState("");
  const [close, setClose] = useState("");
  const [low, setLow] = useState("");
  const [high, setHigh] = useState("");

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
      });
  }, []);
  return (
    <View style={styles.container}>
      <Text h1>Details for {symbol}</Text>
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
  );
}
export default StockDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#999999",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 100,
  },
});
