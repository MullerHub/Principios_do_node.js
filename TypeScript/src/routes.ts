import { Request, Response } from 'express'
import CreateCourseService from './CreateCourseService'

export function createCourse(request: Request, response: Response) {

  CreateCourseService.execute({
    educator: "Murilo",
    name: "NodeJS",
    duration: 21,
  })

  CreateCourseService.execute({
    educator: "Murilin",
    name: "ReactJS",
  })
  return response.send()
}