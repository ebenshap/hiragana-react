import React from 'react'

export default function NumOfTries (props) {
  return <table id='numOfTries'>
        <tbody><tr>{props.tryNum === 3 ?<td>&#19968;&#22238;</td>: null}
            {props.tryNum >= 2 ?<td>&#20108;&#22238;</td>: null}
            {props.tryNum >= 1 ?<td>&#19977;&#22238;</td>: null}</tr></tbody>
      </table>
}