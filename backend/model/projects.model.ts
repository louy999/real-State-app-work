import db from '../database/index'
import config from '../config'
import Projects from '../types/projects.types'

class ProjectsModel {
	//create user
	async createProjects(pro: Projects): Promise<Projects> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = `INSERT INTO projects 
			( imgback, imgfront, project, company, engineering, cv, owner, location, design, facility, payment, type, evaluation, datecreate)
			 values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
			 returning *`
			//run query
			const result = await connect.query(sql, [
				pro.imgback,
				pro.imgfront,
				pro.project,
				pro.company,
				pro.engineering,
				pro.cv,
				pro.owner,
				pro.location,
				pro.design,
				pro.facility,
				pro.payment,
				pro.type,
				pro.evaluation,
				pro.datecreate,
			])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err: any) {
			throw new Error(`${err}`)
		}
	}
	//get all projects
	async getAllProjects(): Promise<Projects[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from projects'
			//run query
			const result = await connect.query(sql)
			//release connect
			connect.release()
			//return created user
			return result.rows
		} catch (err) {
			throw new Error(`${err}`)
		}
	}
	//get specific projects
	async getOneProjects(id: string): Promise<Projects> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from projects WHERE id=($1)'
			//run query
			const result = await connect.query(sql, [id])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`.could not find user ${id}, ${err}`)
		}
	}
	//update projects
	async UpdateProjects(pro: Projects): Promise<Projects> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = `UPDATE projects SET cv=$1, owner=$2,  location=$3, design=$4, facility=$5, payment=$6, type=$7, evaluation=$8, datecreate=$9 ,project=$10, company=$11, engineering=$12  WHERE id=$13 RETURNING *`
			//run query
			const result = await connect.query(sql, [
				pro.cv,
				pro.owner,
				pro.location,
				pro.design,
				pro.facility,
				pro.payment,
				pro.type,
				pro.evaluation,
				pro.datecreate,
				pro.project,
				pro.company,
				pro.engineering,
				pro.id,
			])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not update  projects ${pro.id}, ${err}`)
		}
	}
	//delete projects
	async deleteProjects(id: string): Promise<Projects> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'DELETE from projects  WHERE id=($1) RETURNING *'
			//run query
			const result = await connect.query(sql, [id])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not delete  projects ${id}, ${err}`)
		}
	}
}
export default ProjectsModel
