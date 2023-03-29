import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import useWebSocket from 'react-use-websocket'
import { PRECISION, WS_URL } from '../../utils/constants'
import { actions as bookActions } from '../../redux/slices/book'
import Asks from '../Asks'
import Bids from '../Bids'
import './styles.css'

export default function OrderBook () {
  const [precision, setPrecision] = useState(PRECISION[0])
  const dispatch = useDispatch()

  const { sendJsonMessage } = useWebSocket(WS_URL, {
    onMessage: (message) => {
      const data = JSON.parse(message.data)

      if (Array.isArray(data)) {
        const order = data[1]

        if (Array.isArray(order[0])) {
          dispatch(bookActions.updateBook(order))
        } else {
          dispatch(bookActions.updateOrder(order))
        }
      }
    }
  })

  useEffect(() => {
    sendJsonMessage({
      event: 'subscribe',
      channel: 'book',
      symbol: 'tBTCUSD',
      len: 25,
      prec: precision
    })
  }, [precision])

  const handlePrecChange = (event) => {
    setPrecision(event.target.value)
  }

  return (
    <div>
      <div>
        <label>Precision: </label>
        <select value={precision} onChange={handlePrecChange}>
          {PRECISION.map(p => <option key={p}>{p}</option>)}
        </select>
      </div>
      <div className='order-book'>
        <Bids />
        <Asks />
      </div>
    </div>
  )
}
