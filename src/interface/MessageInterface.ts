import { UUID } from "crypto";

export default interface MessageInterface {
    rooms_id: UUID,
    senders_id: UUID,
    context: string,
}