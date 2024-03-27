import { Twilio } from "twilio";
import { RoomInstance } from "twilio/lib/rest/video/v1/room";
import { Container } from "typedi";
import multer from "multer";

const makeid = (length: number): string => {
  let result: string[] = [];
  const characters: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
};

const createRoom = async (name: string): Promise<RoomInstance> => {
  let twilio: Twilio = Container.get("twilio");
  let room = twilio.video.rooms.create({
    uniqueName: name,
    type: "peer-to-peer",
  });

  return room;
};

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "uploads/");
  },
  filename: function (_req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});

export default {
  makeid,
  createRoom,
  storage,
};
