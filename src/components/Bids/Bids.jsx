import React from 'react'
import { useSelector } from 'react-redux'
import sumBy from 'lodash/sumBy'

const Bid = React.memo(function ({ price, count, amount, total, size }) {
  const bg = `linear-gradient(-90deg, #00FF0022 ${size * 100}%, transparent ${size * 100}%)`

  return (
    <tr style={{ background: bg }}>
      <td align='center'>{count}</td>
      <td align='right'>{amount.toFixed(4)}</td>
      <td align='right'>{total.toFixed(4)}</td>
      <td align='right'>{price}</td>
    </tr>
  )
})

export default React.memo(function Bids () {
  const bids = useSelector(state => state.book.bids.slice(0, 24))
  const sum = sumBy(bids, '2')
  let total = 0

  return (
    <table>
      <thead>
        <tr>
          <th align='center'>Count</th>
          <th align='right'>Amount</th>
          <th align='right'>Total</th>
          <th align='right'>Price</th>
        </tr>
      </thead>
      <tbody>
        {bids.map((order) => {
          const [price, count, amount] = order
          total += amount
          return (
            <Bid
              key={price}
              price={price}
              count={count}
              amount={amount}
              total={total}
              size={total / sum}
            />
          )
        })}
      </tbody>
    </table>
  )
})
