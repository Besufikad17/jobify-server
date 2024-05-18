import { PrismaClient } from "@prisma/client";
import { Organization } from "../types/organization";
import { v4 as uuidv4 } from "uuid";

class OrganizationRepository {
	prisma: PrismaClient

	constructor() {
		this.prisma = new PrismaClient();
	}

	public addOrganization = async (organization: Organization) => {
		return await this.prisma.organizations.create({
			data: {
				id: uuidv4(),
				name: organization.name,
				type: organization.type,
				description: organization.description,
				email: organization.email,
				phone_number: organization.phoneNumber,
				linkedin: organization.linkedin,
				telegram_username: organization.telegramUsername,
				telegram_id: organization.telegramId
			}
		});
	}

	public getOrganizationByTelegramId = async (telegramId: string) => {
		return await this.prisma.organizations.findFirst({
			where: {
				telegram_id: telegramId
			}
		});
	}
}

export { OrganizationRepository }
