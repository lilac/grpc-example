import { RouteGuideClient } from "./gen/route_guide_pb_service";
import { Point, Rectangle, Feature } from "./gen/route_guide_pb";
import { ProtobufMessage } from "grpc-web-client/dist/message";

const USE_TLS: boolean = false
const host = USE_TLS ? "https://localhost:8080" : "http://localhost:8080";

const client = new RouteGuideClient(host)

function logObject(obj: ProtobufMessage) {
    console.log(obj.toObject())
}

function listFeatures() {
    const lo = new Point()
    lo.setLatitude(400000000)
    lo.setLongitude(-750000000)

    const hi = new Point()
    hi.setLatitude(420000000)
    hi.setLongitude(-730000000)

    const rect = new Rectangle()
    rect.setLo(lo)
    rect.setHi(hi)
/*
    const rectangle = <Rectangle> {
        lo: {
            latitude: 400000000,
            longitude: -750000000
        },
        hi: {
            latitude: 420000000,
            longitude: -730000000
        }
    }
*/
    const stream = client.listFeatures(rect)
    stream.on('data', logObject)
}

listFeatures()