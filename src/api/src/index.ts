import * as grpc from 'grpc';
// import { Feature } from '../gen/route_guide_pb';

const path = 'route_guide.proto';
const proto = grpc.load({ root: __dirname + '/protobuf', file: path });
const routeguide = proto.routeguide;

const client = new routeguide.RouteGuide('localhost:8980', grpc.credentials.createInsecure());
var COORD_FACTOR = 1e7;

type Feature = {name: String, location: {latitude: number, longitude: number}}
/**
 * Run the listFeatures demo. Calls listFeatures with a rectangle containing all
 * of the features in the pre-generated database. Prints each response as it
 * comes in.
 * @param {function} callback Called when this demo is complete
 */
function runListFeatures(callback: Function) {
    var rectangle = {
        lo: {
            latitude: 400000000,
            longitude: -750000000
        },
        hi: {
            latitude: 420000000,
            longitude: -730000000
        }
    };
    console.log('Looking for features between 40, -75 and 42, -73');
    var call = client.listFeatures(rectangle);
    call.on('data', function(feature: Feature) {
        console.log('Found feature called "' + feature.name + '" at ' +
            feature.location.latitude/COORD_FACTOR + ', ' +
            feature.location.longitude/COORD_FACTOR);
    });
    call.on('end', callback);
}

runListFeatures(console.log);
