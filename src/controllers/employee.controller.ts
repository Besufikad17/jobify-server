import { Request, Response } from "express";
import { EmployeeRepository } from "../repository/employee.repository";
import { StatusCode } from "../utils/constants/statusCode";
import { getErrorMessage } from "../utils/helpers/error";

class EmployeeController {
	employeeRepository: EmployeeRepository

	constructor() {
		this.employeeRepository = new EmployeeRepository();
	}

	public start = async (req: Request, res: Response) => {
		const { firstName, lastName, email, phoneNumber, dateOfBirth, telegramUsername, telegramId } = req.body;

		if (!firstName || !lastName || !email || !phoneNumber || !dateOfBirth || !telegramUsername || !telegramId) {
			return res.status(StatusCode.BAD_REQUEST).send({
				message: "Please enter all fields!!"
			})
		}

		try {
			const newEmployee = await this.employeeRepository.addEmployee({
				firstName,
				lastName,
				email,
				phoneNumber,
				dateOfBirth: new Date(dateOfBirth),
				telegramUsername,
				telegramId
			});
			return res.status(StatusCode.OK).send(newEmployee);
		} catch (error) {
			console.log(error);
			return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
				message: getErrorMessage(error),
				error
			});
		}
	}
}

export { EmployeeController }
