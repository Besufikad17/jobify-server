import { Request, Response } from "express";
import { PostRepository } from "../repository/post.repository";
import { StatusCode } from "../utils/constants/statusCode";
import { getErrorMessage } from "../utils/helpers/error";
import { OrganizationRepository } from "../repository/organization.repository";

class PostController {
	orgRepository: OrganizationRepository
	postRepository: PostRepository

	constructor() {
		this.orgRepository = new OrganizationRepository()
		this.postRepository = new PostRepository()
	}

	public createPost = async (req: Request, res: Response) => {
		const { telegramId, title, salary, quantity, description, deadline, location, requirements } = req.body;

		if (!telegramId || !title || !salary || !quantity || !description || !deadline || !location || !requirements) {
			return res.status(StatusCode.BAD_REQUEST).send({ message: "Please enter all fields!!" });
		}

		try {
			const org = await this.orgRepository.getOrganizationByTelegramId(telegramId);

			if (!org) return res.status(StatusCode.BAD_REQUEST).send({ message: "Organization not found, please register as an organization first!!" });

			await this.postRepository.addPost({
				organizationId: org.id,
				title,
				salary,
				quantity,
				description,
				deadline: new Date(deadline),
				location,
				requirements
			});

			// TODO handle payment with chapa

			return res.status(StatusCode.OK).send({
				checkoutUrl: ""
			});
		} catch (error) {
			console.log(error);
			return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
				message: getErrorMessage(error),
				error
			});
		}
	}

	public getAllPosts = async (req: Request, res: Response) => {
		const skip = parseInt(req.query.skip as string);
		const take = parseInt(req.query.take as string);
		const text = req.query.text as string;
		const orderBy = req.query.orderBy;

		try {
			const posts = await this.postRepository.getAllPosts(skip, take, text, orderBy);
			return res.status(StatusCode.OK).send(posts);
		} catch (error) {
			console.log(error);
			return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
				message: getErrorMessage(error),
				error
			});
		}
	}

	public getPostById = async (req: Request, res: Response) => {
		const id = req.params.id as string;

		if (!id) {
			return res.status(StatusCode.BAD_REQUEST).send({ message: "Please enter all fields!!" });
		}

		try {
			const post = await this.postRepository.getPostById(id);
			return res.status(StatusCode.OK).send(post);
		} catch (error) {
			console.log(error);
			return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
				message: getErrorMessage(error),
				error
			});
		}
	}

	public updatePost = async (req: Request, res: Response) => {
		const id = req.params.id as string;
		const { telegramId, title, salary, quantity, description, deadline, location, requirements } = req.body;

		if (!id || !telegramId) {
			return res.status(StatusCode.BAD_REQUEST).send({ message: "Please enter all fields!!" });
		}

		try {
			const org = await this.orgRepository.getOrganizationByTelegramId(telegramId);

			if (!org) return res.status(StatusCode.BAD_REQUEST).send({ message: "Please register as an organization first!!" });

			const post = await this.postRepository.getPostById(id);
			if (post?.organization_id !== org.id) return res.status(StatusCode.BAD_REQUEST).send({ message: "Unauthorized!!" });

			const updatedPost = await this.postRepository.updatePost(id, {
				organizationId: org.id,
				title,
				salary,
				quantity,
				description,
				deadline: new Date(deadline),
				location,
				requirements
			});
			return res.status(StatusCode.OK).send(updatedPost);
		} catch (error) {
			console.log(error);
			return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
				message: getErrorMessage(error),
				error
			});
		}
	}

	public deletePost = async (req: Request, res: Response) => {
		const id = req.params.id as string;
		const { telegramId } = req.body;

		if (!id || !telegramId) {
			return res.status(StatusCode.BAD_REQUEST).send({ message: "Please enter all fields!!" });
		}

		try {
			const org = await this.orgRepository.getOrganizationByTelegramId(telegramId);

			if (!org) return res.status(StatusCode.BAD_REQUEST).send({ message: "Please register as an organization first!!" });

			const post = await this.postRepository.getPostById(id);
			if (post?.organization_id !== org.id) return res.status(StatusCode.BAD_REQUEST).send({ message: "Unauthorized!!" });

			this.postRepository.deletePost(id);

			return res.status(StatusCode.OK).send({
				message: "Post deleted!!"
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

export { PostController }
