import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, useColorScheme, Button } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { ListItem } from "react-native-elements";

function WatchList({ navigation }) {
  const [watchlist, setWatchList] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:5000/watchlist/${user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(res => res.json())
      .then(setWatchList);
  }, []);

  console.log(watchlist);

  function handleSubmit() {
    alert("Button pressed");
  }
  return (
    <View>
      {watchlist.map((stock, i) => (
        <ListItem
          key={i}
          bottomDivider
          // containerStyle={{ backgroundColor: "rgb(40, 44, 52)" }}
        >
          <ListItem.Content>
            <ListItem.Title
            // style={{
            //   color: "rgb(172, 179, 173)",
            //   fontWeight: "bold",
            // }}
            >
              {stock.symbol}
            </ListItem.Title>
            <ListItem.Subtitle>{stock.company}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
}

export default WatchList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#999999",
  },
});
