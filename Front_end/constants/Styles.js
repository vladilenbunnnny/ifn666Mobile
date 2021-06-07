import { StyleSheet } from "react-native";
import { scaleSize } from "./Layout";

export const Styles = StyleSheet.create({
  //                                    Main screen container
  container: {
    flex: 1,
    paddingTop: scaleSize(50),
    backgroundColor: "rgb(40, 44, 52)",
  },
  //                                     Loading spinner
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    color: "rgb(172, 179, 173)",
    backgroundColor: "rgb(40, 44, 52)",
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
  buttonAdd: {
    width: scaleSize(250),
    backgroundColor: "rgb(40, 44, 52)",
    borderColor: "rgb(0, 147, 129)",
    marginTop: scaleSize(30),
    marginLeft: scaleSize(60),
  },
  buttonRemove: {
    width: scaleSize(250),
    backgroundColor: "rgb(40, 44, 52)",
    borderColor: "rgb(0, 147, 129)",
    marginTop: scaleSize(30),
    marginLeft: scaleSize(60),
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
    paddingTop: scaleSize(30),
    flex: 1,
  },
  //                                      Table Component
  tableContainer: {
    paddingTop: scaleSize(15),
  },
  rowsText: {
    margin: scaleSize(6),
    fontSize: scaleSize(22),
    color: "white",
  },
  buttonsFilter: {
    height: scaleSize(25),
    marginTop: scaleSize(25),
    backgroundColor: "rgb(30, 34, 41)",
    borderColor: "rgb(0, 147, 129)",
    color: "red",
  },
  limitRequestText: {
    color: "rgb(0, 147, 129)",
  },
  limitRequestContainer: {
    backgroundColor: "rgb(40, 44, 52)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const StylesAuth = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  inputFields: {
    maxWidth: scaleSize(300),
  },
  titleText: {
    fontSize: scaleSize(28),
    paddingBottom: scaleSize(18),
  },
  errorMsg1: {
    color: "red",
    marginTop: scaleSize(-15),
    paddingRight: scaleSize(160),
  },
  errorMsg2: {
    color: "red",
    marginTop: scaleSize(-15),
    paddingRight: scaleSize(135),
  },
  button: {
    color: "rgb(0, 147, 129)",
    fontSize: scaleSize(19),
  },
});
