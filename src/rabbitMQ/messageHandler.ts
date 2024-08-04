import { AuthorityController } from '../controller/authorityController';
import { AuthorityRepository } from '../repository/authorityRepository';
import { AuthorityService } from '../services/authority.service';
import rabbitClient from './client';

const authorityRepository = new AuthorityRepository();
const service = new AuthorityService(authorityRepository);
const controller = new AuthorityController(service);

export default class MessageHandler {
  static async handle(
    operation: string,
    data: any,
    correlationId: string,
    replyTo: string
  ) {
    let response = data;
    console.log('The operation in authoruty service is', operation, data);

    switch (operation) {
      case 'login':
        response = await controller.login.bind(controller)(data);
        break;
      case 'add-airport':
        response = await controller.addAirport.bind(controller)(data);
        break;
      case 'save-airport':
        response = await controller.saveAirport.bind(controller)(data);
        break;
      case 'delete-airport':
        response = await controller.deleteAirport.bind(controller)(data);
        break;
      case 'get-airports':
        response = await controller.getAirports.bind(controller)();
        break;
      case 'add-schedule':
        response = await controller.addSchedule.bind(controller)(data);
        break;
      case 'get-schedules':
        response = await controller.getSchedules.bind(controller)(data);
        break;
      case 'get-available':
        response = await controller.getAvailableSchedules.bind(controller)();
        break;
      default:
        response = 'Request-key notfound';
        break;
    }
    //Produce the response back to the client
    await rabbitClient.produce(response, correlationId, replyTo);
  }
}
