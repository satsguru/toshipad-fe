import { green } from '@material-ui/core/colors'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import { Flex, Text } from 'components'
import { FC, useCallback, useEffect, useState } from 'react'

import { NOT_ENOUGH_FOR_FEE } from '../../translation'
import Spinner from './Spinner'
import TxHashLink from './TxHaskLink'

import './_transaction-result.scss'

enum TxFinalResult {
  None = 'none',
  Success = 'success',
  Error = 'error'
}

interface TxResultProps {
  response?: any
  error?: string
  setPending: (value: boolean) => void
  pending: boolean
  onSuccess?: () => void
}

const TransactionResult: FC<TxResultProps> = ({
  response,
  error,
  setPending,
  pending,
  onSuccess
}) => {
  const [result, setResult] = useState<TxFinalResult>(TxFinalResult.None) // Enum
  const [resultError, setResultError] = useState<string>('')

  const txhash = response?.result.txhash ?? ''
  const getTxStatus = useCallback(
    async (hash: any) => {
      setResult(TxFinalResult.Error)
      setResultError('some error' + hash)
      setPending(false)
    },
    [setPending, onSuccess]
  )

  useEffect(() => {
    if (pending) {
      setResult(TxFinalResult.None)
    }
  }, [pending])

  useEffect(() => {
    if (error) setResult(TxFinalResult.Error)
  }, [error])

  useEffect(() => {
    function pool() {
      if (result === TxFinalResult.None && txhash) {
        getTxStatus(txhash)
      }
    }
    const id = setInterval(pool, 4000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, txhash, result])

  return (
    <Flex
      className={`full-width transaction-result transaction-result__${result}`}
      padding={['sm', 'sm', 'sm', 'md']}
      margin={['sm', 'sm', false, false]}>
      <Flex
        direction="row"
        align="flex-start"
        justify="flex-start"
        innerPadding="md">
        {pending && (
          <>
            <Flex>
              <Spinner />
            </Flex>
            <Flex>
              <Text color="secondary" size="xxs">
                Please Wait
              </Text>
            </Flex>
          </>
        )}

        <Flex
          direction="row"
          align="center"
          justify="flex-start"
          innerPadding="sm">
          {result === TxFinalResult.Success && (
            <CheckCircleOutlineIcon
              style={{ fontSize: 20, color: green[500] }}
            />
          )}
          {result === TxFinalResult.Error && (
            <ErrorOutlineIcon style={{ fontSize: 20 }} color="error" />
          )}
          <Flex>{txhash && <TxHashLink txHash={txhash} />}</Flex>
          <Flex align="center" justify="center">
            <Text color="secondary" size="xxs" wordBreak="all">
              {error}
              {resultError}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default TransactionResult
