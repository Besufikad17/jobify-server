import { PrismaClient } from "@prisma/client";
import { Employee } from "../types/employee";
import { v4 as uuidv4 } from 'uuid';

class EmployeeRepository {
	prisma: PrismaClient
	constructor() {
		this.prisma = new PrismaClient()
	}

	public addEmployee = async (employee: Employee) => {
		return await this.prisma.employees.create({
			data: {
				id: uuidv4(),
				first_name: employee.firstName,
				last_name: employee.lastName,
				date_of_birth: employee.dateOfBirth,
				email: employee.email,
				phone_number: employee.phoneNumber,
				telegram_username: employee.telegramUsername,
				telegram_id: employee.telegramId
			}
		});
	}

	public getEmployees = async (skip?: number, take?: number, text?: string, orderBy: any = 'asc') => {
		return await this.prisma.employees.findMany({
			where: {
				OR: [
					{
						first_name: {
							contains: text || undefined
						},
						last_name: {
							contains: text || undefined
						},
						email: {
							contains: text || undefined
						}
					}
				]

			},
			skip: skip || undefined,
			take: take || undefined,
			orderBy: {
				updated_at: orderBy || undefined
			}
		})
	}

	public getEmployeeById = async (id: string) => {

	}

	public getEmployeeByTelegramId = async (telegramId: string) => {
		return await this.prisma.employees.findFirst({
			where: {
				telegram_id: telegramId
			},
			include: {
				Profiles: true
			}
		});
	}
}

export { EmployeeRepository }
