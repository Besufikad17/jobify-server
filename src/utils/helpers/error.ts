import { Prisma } from "@prisma/client";

export const getErrorMessage = (error: any) => {
	if (error instanceof Prisma.PrismaClientKnownRequestError) {
		if (error.code === 'P2002') {
			return 'Email or Phone number already used!!';
		} else if (error.code === 'P2025') {
			return 'Record to update not found!!';
		}
	} else {
		return 'Internal server error!!';
	}
}
