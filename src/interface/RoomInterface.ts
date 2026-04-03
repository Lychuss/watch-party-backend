import { UUID } from "crypto";

export default interface Room {
    rooms_code: string,
    created_by: UUID,
}