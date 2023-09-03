import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { Flex, Header } from 'components'
import { PropsWithChildren } from 'react'

export interface IModalProps {
  open: boolean
  title: string
  handleClose: () => void
  hasCloseButton?: boolean
}
const Modal = ({
  title,
  children,
  open,
  handleClose,
  hasCloseButton = true
}: PropsWithChildren<IModalProps>) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="dialog-title"
      maxWidth="sm">
      <DialogTitle>
        {hasCloseButton && (
          <IconButton
            onClick={handleClose}
            color="secondary"
            className="modal-close">
            <CloseIcon />
          </IconButton>
        )}
        <Flex
          align="center"
          justify="flex-start"
          innerPadding="sm"
          padding={['lg', false, false, false]}>
          <Header color="primary" size="md">
            {title}
          </Header>
        </Flex>
      </DialogTitle>

      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}

export default Modal
