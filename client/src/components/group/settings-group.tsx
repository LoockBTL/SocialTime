import { FC } from 'react'
import Card from 'react-bootstrap/Card'
import { RootState } from '../../store/store'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { GroupInterface } from '../../types/group-interface'
import { oneGroupById } from '../../store/selectors'

interface SettingsGroupProps {
  id: string | undefined
  settings: GroupInterface | undefined | null
}

const SettingsGroup: FC<SettingsGroupProps> = ({ settings }) => {
  return (
    <Card style={{ width: '25rem' }} className="mx-auto p-5">
      <Form>
        <Form.Group controlId="formFile" className="mb-3"></Form.Group>
        <Form.Group controlId="img" className="mb-3">
          <Form.Label>Choose avatar imagine</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        <Form.Group>
          <Form.Label column sm="2">
            About section
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            type="text"
            placeholder="Large text"
            value={''}
            className="mb-5"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </Card>
  )
}

const mapStateToProps = (state: RootState, { id }: any) => ({
  settings: oneGroupById(state, id),
})

export default connect(mapStateToProps)(SettingsGroup)
