import { Request, Response } from "express";
import { EmployeeRepository } from "../repository/employee.repository";
import { StatusCode } from "../utils/constants/statusCode";
import { getErrorMessage } from "../utils/helpers/error";
import { ProfileRepository } from "../repository/profile.repository";

class ProfileController {
	employeeRepository: EmployeeRepository
	profileRepository: ProfileRepository
	constructor() {
		this.employeeRepository = new EmployeeRepository();
		this.profileRepository = new ProfileRepository();
	}

	public createProfile = async (req: Request, res: Response) => {
		const { telegramId, highestEducationLevel, portfolio, cv, github, linkedin } = req.body;

		if (!telegramId || !highestEducationLevel) {
			return res.status(StatusCode.BAD_REQUEST).send({
				message: "Please enter all fields!!"
			});
		}

		try {
			const employee = await this.employeeRepository.getEmployeeByTelegramId(telegramId);

			if (!employee) return res.status(StatusCode.BAD_REQUEST).send({ message: "User not found, please regsiter using /start command!!" });

			const newProfile = await this.profileRepository.addProfile({
				employeeId: employee.id,
				highestEducationLevel,
				portfolio,
				cv,
				github,
				linkedin
			});

			return res.status(StatusCode.OK).send(newProfile);
		} catch (error) {
			console.log(error);
			return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
				message: getErrorMessage(error),
				error
			});
		}
	}

	public getProfile = async (req: Request, res: Response) => {
		const employeeId = req.params.employeeId;

		if (!employeeId) return res.status(StatusCode.BAD_REQUEST).send({ message: "Please enter all fields!!" });

		try {
			const profile = await this.profileRepository.getProfile(employeeId);
			return res.status(StatusCode.OK).send(profile);
		} catch (error) {
			console.log(error);
			return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
				message: getErrorMessage(error),
				error
			});
		}
	}

	public updateProfile = async (req: Request, res: Response) => {
		const { telegramId, highestEducationLevel, portfolio, cv, github, linkedin } = req.body;

		if (!telegramId || !highestEducationLevel) {
			return res.status(StatusCode.BAD_REQUEST).send({
				message: "Please enter all fields!!"
			});
		}

		try {
			const employee = await this.employeeRepository.getEmployeeByTelegramId(telegramId);

			if (!employee) return res.status(StatusCode.BAD_REQUEST).send({ message: "User not found, please regsiter using /start command!!" });

			const newProfile = await this.profileRepository.updateProfile({
				highestEducationLevel,
				portfolio,
				cv,
				github,
				linkedin
			}, employee.id);

			return res.status(StatusCode.OK).send(newProfile);
		} catch (error) {
			console.log(error);
			return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
				message: getErrorMessage(error),
				error
			});
		}
	}
}

export { ProfileController }
