import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { SERVER_HOSTNAME } from "@env";
const WatchListContext = React.createContext();

export const WatchListProvider = ({ children }) => {
  const [watchList, setWatchList] = useState([]);

  return (
    <WatchListContext.Provider value={useState([])}>
      {children}
    </WatchListContext.Provider>
  );
};

export const useWatchList = () => {
  const [watchList, setWatchList] = useContext(WatchListContext);
  const { user } = useContext(AuthContext);

  function addToWatchList({ symbol, company }) {
    let status;
    fetch(`http://${SERVER_HOSTNAME}:5000/watchlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ symbol, company, userId: user.id }),
    })
      .then(res => {
        status = res.status;
        return res.json();
      })
      .then(data => {
        if (String(status).match(/^[45]/)) {
          throw new Error(data.message);
        } else {
          setWatchList(prev => [...prev, { id: data.id, symbol, company }]);
          alert("Successfully added");
        }
      })
      .catch(alert);
  }

  function removeFromWatchList(stockId) {
    let status;
    fetch(`http://${SERVER_HOSTNAME}:5000/watchlist/${stockId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(res => {
        status = res.status;
        if (!res.ok) {
          return res.json();
        }
      })
      .then(data => {
        // console.log("data", data, "status", status);
        if (String(status).match(/^[45]/)) {
          throw new Error(data.message);
        } else {
          setWatchList(prev => prev.filter(stock => stock.id !== stockId));
          alert("Successfully deleted");
        }
      })
      .catch(alert);
  }

  useEffect(() => {
    fetch(`http://${SERVER_HOSTNAME}:5000/watchlist/${user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(res => res.json())
      .then(setWatchList);
  }, [user.id, user.token]);

  return {
    watchList,
    addToWatchList,
    removeFromWatchList,
  };
};

// const { watchList, addToWatchList, removeFromWatchList } = useWatchList();
