import { PrismaClient } from "@prisma/client";
import { Post } from "../types/post";
import { v4 as uuidv4 } from "uuid";

class PostRepository {
	prisma: PrismaClient
	constructor() {
		this.prisma = new PrismaClient();
	}

	public addPost = async (post: Post) => {
		return await this.prisma.posts.create({
			data: {
				id: uuidv4(),
				organization_id: post.organizationId,
				title: post.title,
				salary: post.salary,
				quantity: post.quantity,
				description: post.description,
				deadline: post.deadline,
				location: post.location,
				requirements: post.requirements
			}
		});
	}

	public getAllPosts = async (skip?: number, take?: number, text?: string, orderBy: any = 'asc') => {
		return await this.prisma.posts.findMany({
			where: {
				OR: [
					{
						title: {
							search: text || undefined
						},
						description: {
							search: text || undefined
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

	public getPostById = async (postId: string) => {
		return await this.prisma.posts.findFirst({
			where: {
				id: postId
			},
		});
	}

	public getPostByOrganizationId = async (organizationId: string) => {
		return await this.prisma.posts.findMany({
			where: {
				organization_id: organizationId
			}
		});
	}

	public updatePost = async (postId: string, post: Post) => {
		return await this.prisma.posts.update({
			where: {
				id: postId
			},
			data: {
				title: post.title,
				salary: post.salary,
				quantity: post.quantity,
				description: post.description,
				deadline: post.deadline,
				location: post.location,
				requirements: post.requirements
			}
		});
	}

	public deletePost = async (postId: string) => {
		return await this.prisma.posts.delete({
			where: {
				id: postId
			}
		});
	}
}

export { PostRepository }
