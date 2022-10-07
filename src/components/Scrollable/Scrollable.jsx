import { Scrollbars } from 'react-custom-scrollbars-2';
import React from "react"

export default function Scrollable ({ children }) {
  return (
    <Scrollbars universal autoHide>{children}</Scrollbars>
  )
}
