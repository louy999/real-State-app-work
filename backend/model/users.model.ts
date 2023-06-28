import db from '../database/index'
import Users from '../types/users.types'
import config from '../config'
import bcrypt from 'bcrypt'

const hashPassword = (password: string) => {
	const salt = parseInt(config.salt as unknown as string, 10)
	return bcrypt.hashSync(`${password}${config.pepper}`, salt)
}

class UsersModel {
	//authenticate user
	async auth(email: string, password: string): Promise<Users | null> {
		try {
			const connect = await db.connect()
			const sql = `SELECT password FROM users WHERE email=$1`
			const res = await connect.query(sql, [email])
			if (res.rows.length) {
				const {password: hashPassword} = res.rows[0]
				const isPassValid = bcrypt.compareSync(
					`${password}${config.pepper}`,
					hashPassword
				)
				if (isPassValid) {
					const userInfo = await connect.query(
						`SELECT id, email, number, statusaccess FROM users WHERE email=($1)`,
						[email]
					)
					return userInfo.rows[0]
				}
			} else {
				throw new Error('not found this email')
			}
			connect.release()
			return null
		} catch (err) {
			throw new Error(`${err}`)
		}
	}
	// create users
	async createUsers(u: Users): Promise<Users> {
		try {
			//open connect with DB1
			const connect = await db.connect()
			const sql =
				'INSERT INTO users ( email, number, password, statusaccess ) values ($1, $2, $3, $4) returning *'
			//run query
			const result = await connect.query(sql, [
				u.email,
				u.number,
				hashPassword(u.password),
				u.statusaccess,
			])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err: any) {
			// throw new Error(`email already exists! `)
			throw new Error(`${err} `)
		}
	}
	//get all users
	async getAllUsers(): Promise<Users[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from users'
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
	//get specific user
	async getOneUsers(id: string): Promise<Users> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from users WHERE id=($1)'
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
	//get one user by email
	async getOneFromEmail(email: string): Promise<Users> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from users WHERE email=($1)'
			//run query
			const result = await connect.query(sql, [email])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`.could not find user ${email}, ${err}`)
		}
	}
	//update user
	async updateUsers(u: Users): Promise<Users> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = `UPDATE users SET email=$1, number=$2, statusaccess=$3 WHERE id=$4 RETURNING *`
			//run query
			const result = await connect.query(sql, [
				u.email,
				u.number,
				u.statusaccess,
				u.id,
			])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not update  user ${u.email}, ${err}`)
		}
	}
	//update pass
	async updatePassUsers(u: Users): Promise<Users> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = `UPDATE users SET  password=$1  WHERE id=$2 RETURNING *`
			//run query
			const result = await connect.query(sql, [hashPassword(u.password), u.id])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not update  user , ${err}`)
		}
	}
	//delete user
	async deleteUsers(id: string): Promise<Users> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'DELETE from users  WHERE id=($1) RETURNING *'
			//run query
			const result = await connect.query(sql, [id])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not delete  user ${id}, ${err}`)
		}
	}
}

export default UsersModel
