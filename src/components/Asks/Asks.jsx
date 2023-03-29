import React from 'react'
import { useSelector } from 'react-redux'
import sumBy from 'lodash/sumBy'

const Ask = React.memo(function ({ price, count, amount, total, size }) {
  const bg = `linear-gradient(90deg, #FF000022 ${size * 100}%, transparent ${size * 100}%)`

  return (
    <tr style={{ background: bg }}>
      <td align='left'>{price}</td>
      <td align='left'>{total.toFixed(4)}</td>
      <td align='left'>{amount.toFixed(4)}</td>
      <td align='center'>{count}</td>
    </tr>
  )
})

export default function Asks () {
  const asks = useSelector(state => state.book.asks.slice(0, 24))
  const sum = Math.abs(sumBy(asks, '2'))
  let total = 0

  return (
    <table>
      <thead>
        <tr>
          <th align='left'>Price</th>
          <th align='left'>Total</th>
          <th align='left'>Amount</th>
          <th align='center'>Count</th>
        </tr>
      </thead>
      <tbody>
        {asks.map((order) => {
          const [price, count, amount] = order
          const absAmount = Math.abs(amount || 0)
          total += absAmount
          return (
            <Ask
              key={price}
              price={price}
              count={count}
              amount={absAmount}
              total={total}
              size={total / sum}
            />
          )
        })}
      </tbody>
    </table>
  )
}
