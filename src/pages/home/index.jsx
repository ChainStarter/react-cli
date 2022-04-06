import React from 'react'
import {HomePage} from "./style";
import {useIsDarkMode} from "../../hooks";
export default function Home() {
  const {darkMode, changeDarkMode} = useIsDarkMode()
  return (
    <HomePage onClick={() => changeDarkMode(!darkMode)}>
      <h1>home</h1>
    </HomePage>
  )
}
