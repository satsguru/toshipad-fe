import { Flex, Text } from 'components'
import { useEffect, useState } from 'react'
import { useTimer } from 'react-timer-hook'

import './_timer.scss'

type TimerProps = {
  isoTime: string
  timerStatus: string
}

export const Timer: React.FunctionComponent<TimerProps> = ({
  isoTime,
  timerStatus
}) => {
  const [refresh, setRefresh] = useState(false)
  const { seconds, minutes, hours, days, restart } = useTimer({
    expiryTimestamp: new Date(),
    onExpire: () => {
      setRefresh(t => !t)
      window.location.reload()
    }
  })

  useEffect(() => {
    const time = new Date(isoTime)
    restart(time)
  }, [restart, refresh, isoTime])

  return (
    <Flex className="timer-cont">
      <Text size="xs" color="grey6">
        {timerStatus}
      </Text>

      <Flex className="timer">
        <RemainingTime value={days} unit="Days" />
        <RemainingTime value={hours} unit="Hours" />
        <RemainingTime value={minutes} unit="Minutes" />
        <RemainingTime value={seconds} unit="Seconds" />
      </Flex>
    </Flex>
  )
}

type RemainingTimeProps = {
  value: number
  unit: string
}

const RemainingTime = ({ value, unit }: RemainingTimeProps) => (
  <Flex className="remaining-time">
    <Text className="time-values" size="lg">
      {value > 9 ? value : `0${value}`}
    </Text>
    <Text className="time-units" size="xxs">
      {unit}
    </Text>
  </Flex>
)
