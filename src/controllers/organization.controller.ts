import { Request, Response } from "express";
import { OrganizationRepository } from "../repository/organization.repository";
import { StatusCode } from "../utils/constants/statusCode";
import { getErrorMessage } from "../utils/helpers/error";
import { AddressRepository } from "../repository/address.repository";

class OrganizationController {
	addressRepository: AddressRepository
	organizationRepository: OrganizationRepository
	constructor() {
		this.addressRepository = new AddressRepository();
		this.organizationRepository = new OrganizationRepository();
	}

	public register = async (req: Request, res: Response) => {
		const { name, type, description, email, phoneNumber, linkedin, website, telegramUsername, telegramId,
			city, subCity, kebele, houseNumber } = req.body;

		if (!name || !type || !description || !email || !phoneNumber || !linkedin || !website || !telegramUsername || !telegramId || !city) {
			return res.status(StatusCode.BAD_REQUEST).send({
				message: "Please enter all fields!!"
			});
		}

		try {
			const org = await this.organizationRepository.getOrganizationByTelegramId(telegramId);

			if (org) return res.status(StatusCode.BAD_REQUEST).send({ message: "Organization already found!!" });
			const newOrg = await this.organizationRepository.addOrganization({
				name,
				type,
				description,
				email,
				phoneNumber,
				linkedin,
				website,
				telegramUsername,
				telegramId
			});

			await this.addressRepository.addAddress({
				organizationId: newOrg.id,
				city,
				subCity,
				kebele,
				houseNumber
			});

			return res.status(StatusCode.OK).send(newOrg);
		} catch (error) {
			console.log(error);
			return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
				message: getErrorMessage(error),
				error
			});
		}
	}
}

export { OrganizationController }
