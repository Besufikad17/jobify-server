import { Request, Response } from "express";
import { ApplicationRepository } from "../repository/application.repository";
import { StatusCode } from "../utils/constants/statusCode";
import { getErrorMessage } from "../utils/helpers/error";
import { EmployeeRepository } from "../repository/employee.repository";
import { PostRepository } from "../repository/post.repository";
import { OrganizationRepository } from "../repository/organization.repository";

class ApplicationController {
	applicationRepository: ApplicationRepository
	employeeRepository: EmployeeRepository
	orgRepository: OrganizationRepository
	postRepository: PostRepository

	constructor() {
		this.applicationRepository = new ApplicationRepository();
		this.employeeRepository = new EmployeeRepository();
		this.orgRepository = new OrganizationRepository();
		this.postRepository = new PostRepository();
	}

	public apply = async (req: Request, res: Response) => {
		const { telegramId, postId, note } = req.body;

		if (!telegramId || !postId || !note) {
			return res.status(StatusCode.BAD_REQUEST).send({ message: "Please enter all fields!!" })
		}

		try {
			const employee = await this.employeeRepository.getEmployeeByTelegramId(telegramId);

			if (!employee) return res.status(StatusCode.BAD_REQUEST).send({ message: "User not found, please regsiter using /start command!!" });

			const post = await this.postRepository.getPostById(postId);

			if (!post) return res.status(StatusCode.BAD_REQUEST).send({ message: "Post not found!!" });

			const application = await this.applicationRepository.addApplication({
				postId,
				employeeId: employee.id,
				note
			});

			return res.status(StatusCode.OK).send(application);
		} catch (error) {
			console.log(error);
			return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
				message: getErrorMessage(error),
				error
			});
		}
	}

	public getApplications = async (req: Request, res: Response) => {
		const { telegramId, postId } = req.body;
		const skip = parseInt(req.query.skip as string);
		const take = parseInt(req.query.take as string);
		const orderBy = req.query.orderBy;

		if (!telegramId || !postId) {
			return res.status(StatusCode.BAD_REQUEST).send({ message: "Please enter all fields!!" })
		}

		try {
			const org = await this.orgRepository.getOrganizationByTelegramId(telegramId);

			if (!org) return res.status(StatusCode.BAD_REQUEST).send({ message: "Organization not found, please register as an organization first!!" });

			const applications = await this.applicationRepository.getAllApplications(postId, skip, take, orderBy);
			return res.status(StatusCode.OK).send(applications);
		} catch (error) {
			console.log(error);
			return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
				message: getErrorMessage(error),
				error
			});
		}
	}

	public getApplicationById = async (req: Request, res: Response) => {
		const id = req.params.id;
		const { telegramId } = req.body;

		if (!id || !telegramId) return res.status(StatusCode.BAD_REQUEST).send({ message: "Please enter all fields!!" });

		try {
			const employee = await this.employeeRepository.getEmployeeByTelegramId(telegramId);
			const org = await this.orgRepository.getOrganizationByTelegramId(telegramId);

			if (!employee && !org) return res.status(StatusCode.BAD_REQUEST).send({ message: "Unauthorized!!" });

			const application = await this.applicationRepository.getApplicationById(id);

			return res.status(StatusCode.OK).send(application);
		} catch (error) {
			console.log(error);
			return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
				message: getErrorMessage(error),
				error
			});
		}
	}

	public updateApplication = async (req: Request, res: Response) => {
		const id = req.params.id;
		const { telegramId, note } = req.body;

		if (!id || !telegramId) return res.status(StatusCode.BAD_REQUEST).send({ message: "Please enter all fields!!" });

		try {
			const employee = await this.employeeRepository.getEmployeeByTelegramId(telegramId);

			if (!employee) return res.status(StatusCode.BAD_REQUEST).send({ message: "Unauthorized!!" });

			const application = await this.applicationRepository.updateApplication(id, note);

			return res.status(StatusCode.OK).send(application);
		} catch (error) {
			console.log(error);
			return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
				message: getErrorMessage(error),
				error
			});
		}
	}

	public deleteApplication = async (req: Request, res: Response) => {
		const id = req.params.id;
		const { telegramId } = req.body;

		if (!id || !telegramId) return res.status(StatusCode.BAD_REQUEST).send({ message: "Please enter all fields!!" });

		try {
			const employee = await this.employeeRepository.getEmployeeByTelegramId(telegramId);
			const org = await this.orgRepository.getOrganizationByTelegramId(telegramId);

			if (!employee && !org) return res.status(StatusCode.BAD_REQUEST).send({ message: "Unauthorized!!" });

			await this.applicationRepository.deleteApplication(id);

			return res.status(StatusCode.OK).send({
				message: "Application deleted!!"
			});
		} catch (error) {
			console.log(error);
			return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
				message: getErrorMessage(error),
				error
			});
		}
	}

}

export { ApplicationController }
