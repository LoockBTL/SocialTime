import { Container, Form } from 'react-bootstrap'
import { FC, useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { userActions } from '../../store/slicers/userSlice'
import Loading from '../../components/loader'
import { RootState } from '../../store/store'
import { groupActions } from '../../store/slicers/groupSlice'
import { createSearchData } from '../../store/selectors'
import { SearchInterface } from '../../types/user-interfaces'
import { NavLink } from 'react-router-dom'
import { Card } from 'react-bootstrap'

interface SearchProps {
  searchData: SearchInterface[]
}

const Search: FC<SearchProps> = ({ searchData }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(userActions.loadUserShortInfo())
    dispatch(groupActions.loadGroupRequest())
  })
  const [searchParams, setSearchParams] = useState('')
  if (!searchData) return <Loading />
  return (
    <Container className="mt-3">
      <Form.Control
        value={searchParams}
        onChange={(e) => {
          setSearchParams(e.target.value)
        }}
        placeholder="Search for..."
      />
      <div className="d-flex flex-wrap">
        {searchData
          .filter((obj) =>
            obj.name.toLowerCase().includes(searchParams.toLowerCase())
          )
          .map((obj) => (
            <NavLink
              to={
                obj.type === 'Person'
                  ? `/person/${obj.id}/posts`
                  : `/group/${obj.id}`
              }
              key={obj.id}
            >
              <Card className="m-3" style={{ width: '15rem' }}>
                <Card.Img variant="top" src={obj.img} />
                <Card.Body>
                  <Card.Title>{obj.name}</Card.Title>
                </Card.Body>
              </Card>
            </NavLink>
          ))}
      </div>
    </Container>
  )
}

const mapStateToProps = (state: RootState) => ({
  searchData: createSearchData(state),
})

export default connect(mapStateToProps)(Search)
