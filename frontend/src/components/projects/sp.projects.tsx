import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import env from '../environments/enviroments'
const SpProjects = () => {
  const { projectId } = useParams()
  const [project, setProject] = useState<any>('')
  useEffect(() => {
    try {
      axios.get(`${env.api}/proj/${projectId}`).then((res) => {
        setProject(res.data.data)
      })
    } catch (error) {
      console.log(error)
    }
  }, [])
  console.log(project)

  return (
    <>
      <div className='con-sp-projects'>
        <div className='con-img'>
          <img
            src={`${env.local}/image/${project.imgback}`}
            alt=''
            className='back'
          />
          <img
            src={`${env.local}/image/${project.imgfront}`}
            alt=''
            className='front'
          />
        </div>
        <button
          className='btn btn-primary'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#multiCollapseExample1'
          aria-expanded='false'
          aria-controls='multiCollapseExample1'>
          CV
        </button>
        <div className='col'>
          <div className='collapse multi-collapse' id='multiCollapseExample1'>
            <div className='card card-body'>
              Some placeholder content for the first collapse component of this
              multi-collapse example. This panel is hidden by default but
              revealed when the user activates the relevant trigger.
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SpProjects
