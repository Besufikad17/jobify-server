import { OrganizationType } from "@prisma/client";

export type Organization = {
	id?: number;
	name: string;
	type: OrganizationType;
	description: string;
	email: string;
	phoneNumber: string;
	linkedin: string;
	website: string;
	telegramUsername: string;
	telegramId: string;
	createdAt?: Date;
	updatedAt?: Date;
}
