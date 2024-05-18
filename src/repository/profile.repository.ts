import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { Profile } from "../types/profile";

class ProfileRepository {
	prisma: PrismaClient
	constructor() {
		this.prisma = new PrismaClient();
	}

	public addProfile = async (profile: Profile) => {
		return await this.prisma.profiles.create({
			data: {
				id: uuidv4(),
				employee_id: profile.employeeId!,
				highest_education_level: profile.highestEducationLevel,
				portfolio: profile.portfolio,
				cv: profile.cv,
				github: profile.github,
				linkedin: profile.linkedin,
			}
		});
	}

	public updateProfile = async (profile: Profile, id: string) => {
		return await this.prisma.profiles.update({
			where: {
				id: id
			},
			data: {
				employee_id: profile.employeeId,
				highest_education_level: profile.highestEducationLevel,
				portfolio: profile.portfolio,
				cv: profile.cv,
				github: profile.github,
				linkedin: profile.linkedin,
				rating: profile.rating
			}
		});
	}

	public getProfile = async (employeeId: string) => {
		return await this.prisma.profiles.findFirst({
			where: {
				employee_id: employeeId
			}
		});
	}
}

export { ProfileRepository }
