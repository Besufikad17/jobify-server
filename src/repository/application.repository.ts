import { PrismaClient } from "@prisma/client";
import { Application } from "../types/application";
import { v4 as uuidv4 } from "uuid";

class ApplicationRepository {
	prisma: PrismaClient

	constructor() {
		this.prisma = new PrismaClient()
	}

	public addApplication = async (application: Application) => {
		return await this.prisma.applications.create({
			data: {
				id: uuidv4(),
				employee_id: application.employeeId,
				post_id: application.postId,
				note: application.note
			}
		});
	}

	public getAllApplications = async (postId: string, skip: number = 0, take: number = 10, orderBy: any = 'desc') => {
		return await this.prisma.applications.findMany({
			where: {
				post_id: postId
			},
			skip: skip || undefined,
			take: take || undefined,
			orderBy: {
				updated_at: orderBy || undefined
			}
		});
	}

	public getApplicationById = async (id: string) => {
		return await this.prisma.applications.findFirst({
			where: {
				id: id,
			}
		});
	}

	public updateApplication = async (id: string, note: string) => {
		return await this.prisma.applications.update({
			where: {
				id: id
			},
			data: {
				note: note
			}
		});
	}

	public deleteApplication = async (id: string) => {
		return await this.prisma.applications.delete({
			where: {
				id: id
			}
		});
	}
}

export { ApplicationRepository }
