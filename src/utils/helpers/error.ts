import { Prisma } from "@prisma/client";

export const getErrorMessage = (error: any) => {
	if (error instanceof Prisma.PrismaClientKnownRequestError) {
		if (error.code === 'P2002') {
			return 'Email or Phone number already used!!';
		}
	} else {
		return 'Internal server error!!';
	}
}
