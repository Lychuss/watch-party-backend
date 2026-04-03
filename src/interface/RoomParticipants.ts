import { UUID } from "crypto";

export default interface RoomParticipants {
    rooms_id: UUID,
    users_id: UUID,
    left_at: null
}