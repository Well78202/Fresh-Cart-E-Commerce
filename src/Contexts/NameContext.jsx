import { createContext, useEffect, useState } from "react";

export let NameContext = createContext();

export default function NameContextProvider(props) {
  const [userData, setUserData] = useState(null);
  useEffect(()=>{

    if (localStorage.getItem("token")) {
      setUserData(localStorage.getItem("token"));
    }
  }, [])

  return (
    <NameContext.Provider value={{ userData, setUserData }}>
      {props.children}
    </NameContext.Provider>
  );
}