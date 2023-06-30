import { Link } from 'react-router-dom'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import env from '../environments/enviroments'
const Projects = () => {
  const [data, setData] = useState<any>({})
  const getAllProjects = async () => {
    try {
      await axios.get(`${env.api}/proj`).then((res) => setData(res.data.data))
    } catch (error) {}
  }
  useEffect(() => {
    getAllProjects()
  }, [])

  return (
    <>
      <div className='con-pro'>
        {Object.values(data).map((pro: any) => (
          <div className='container projects' key={pro.id}>
            <div className='card'>
              <img
                src={`${env.local}/image/${pro.imgfront}`}
                className='card-img-top'
                alt='...'
              />
              <div className='card-body'>
                <h5 className='card-title'>{pro.project}</h5>
                <p className='card-text'>
                  <div>
                    <span className='title'>company: </span>
                    <span className='content'>{pro.company}</span>
                  </div>
                  <div>
                    <span className='title'>location: </span>
                    <span className='content'>{pro.location}</span>
                  </div>
                  <div>
                    <span className='title'>type: </span>
                    <span className='content'>{pro.type}</span>
                  </div>
                </p>
                <Link to={`${pro.id}`} className='btn btn-primary'>
                  Go Project
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <input
        type='button'
        value='Add Projects'
        className='btn btn-primary add-project'
      />
    </>
  )
}

export default Projects
