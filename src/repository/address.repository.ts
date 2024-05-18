import { PrismaClient } from "@prisma/client";
import { Address } from "../types/address";
import { v4 as uuidv4 } from "uuid";

class AddressRepository {
	prisma: PrismaClient
	constructor() {
		this.prisma = new PrismaClient();
	}

	public addAddress = (address: Address) => {
		return this.prisma.address.create({
			data: {
				id: uuidv4(),
				organization_id: address.organizationId,
				city: address.city,
				subcity: address.subCity,
				kebele: address.kebele,
				house_number: address.houseNumber
			}
		});
	}
}

export { AddressRepository }
