import { FC } from 'react'
import Card from 'react-bootstrap/Card'
import { RootState } from '../../../store/store'
import { UserSettingsInterface } from '../../../types/auth-Interfaces'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

interface SettingsPersonProps {
  settings: UserSettingsInterface | undefined
}

const SettingsPerson: FC<SettingsPersonProps> = ({ settings }) => {
  return (
    <Card style={{ width: '25rem' }} className="mx-auto p-5">
      <Form>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Choose theme</Form.Label>
          <Form.Check type={'radio'} id={`black`} label={`Black theme`} />
          <Form.Check type={'radio'} id={`white`} label={`White theme`} />
        </Form.Group>
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
            value={settings?.about}
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

const mapStateToProps = (state: RootState) => ({
  settings: state.auth.user?.settings,
})

export default connect(mapStateToProps)(SettingsPerson)
