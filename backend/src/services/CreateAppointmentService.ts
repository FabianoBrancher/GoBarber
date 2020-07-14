import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { startOfHour } from 'date-fns';

import AppError from '../errors/AppError';

/**
 * [X]Recebimento das informações
 * [X]Tratativa de errors/excessões
 * [X]Acesso ao repositório
 */

interface Request {
  provider_id: string;
  date: Date;
}

/**
 * Dependency Inversion
 *
 * SOLID
 * S - Single Responsability Principle
 * O -
 * L -
 * I -
 * D - Dependency Inversion Principle
 */

class CreateAppointmentService {
  // private appointmentsRepository: AppointmentsRepository;
  // constructor(appointmentsRepository: AppointmentsRepository) {
  //   this.appointmentsRepository = appointmentsRepository;
  // }

  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This schedule is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
