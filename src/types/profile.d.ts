import { EducationLevel } from "@prisma/client";
import { Omit } from "@prisma/client/runtime/library";

export type Profile = {
	id?: number;
	employeeId?: string;
	highestEducationLevel: EducationLevel;
	portfolio?: string;
	cv?: string;
	github?: string;
	linkedin?: string;
	rating?: number;
	createdAt?: Date;
	updatedAt?: Date;
}

