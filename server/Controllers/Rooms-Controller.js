const roomDto = require("../dtos/roomDto");
const RoomService = require("../Services/RoomService");
const sendEmail = require("../Utils/SendEmail");

class RoomsController {

    async create(req, res) {
        const { server, dm, members, roles } = req.body;

        if (!server || !members) {
            return res.status(400).json({ message: "server details are required" });
        }

        const room = await RoomService.create({
            server,
            dm,
            members,
            roles
        })

        res.json(new roomDto(room))
    }

    async updateRoom(req, res) {
        const { dm, members } = req.body;

        const room = await RoomService.getRoom(dm);

        if (!room) {
            await RoomService.create({
                server: "Direct Messages",
                dm: "true",
            })
        }

        const update = await RoomService.update({
            dm,
            members
        })

        return res.json(update)
    }

    async getRooms(req, res) {

        try {

            const rooms = await RoomService.getAllRooms(req.params.userId)
            const allRooms = rooms.map((room) => new roomDto(room))
            return res.json(allRooms)

        } catch (error) {
            res.status(400).json(error)
        }

    }

    async getRoomId(req, res) {
        try {
            const room = await RoomService.getRoomUId(req.params.roomId)
            return res.json(room)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    async updateName(req, res) {
        const { id, serverName } = req.body;
        try {
            const room = await RoomService.updateName({ id, serverName });
            return res.json(room)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    async deleteRoom(req, res) {
        const { roomId } = req.body;
        const room = await RoomService.deleteRoom({ roomId })

        return res.json(room);
    }

    async sendCodeEmail(req, res) {
        const { email, code } = req.body;
        const subject = "Invite to a Server";
        const send_to = email;
        const sent_from = process.env.EMAIL_USER;
        const reply_to = "agarwalabhinav309@gmail.com";
        const template = "SendInvite";
        const name = "moto";
        const inviteCode = code;

        try {
            await sendEmail(
                subject,
                send_to,
                sent_from,
                reply_to,
                template,
                name,
                inviteCode
            );
        } catch (error) {
            res.status(500);
            throw new Error("Email not sent, please try again");
        }
    }

}

module.exports = new RoomsController();