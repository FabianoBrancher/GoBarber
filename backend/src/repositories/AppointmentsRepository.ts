// import { isEqual } from 'date-fns';
import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

// DTO = Data Transfer Object
// interface CreateAppointmentDTO {
//   provider: string;
//   date: Date;
// }

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  // SUBSTITUIDOS PELO TYPEORM
  // private appointments: Appointment[];

  // constructor() {
  //   this.appointments = [];
  // }

  // public create({ provider, date }: CreateAppointmentDTO): Appointment {
  //   const appointment = new Appointment({ provider, date });
  //   this.appointments.push(appointment);

  //   return appointment;
  // }

  // public all(): Appointment[] {
  //   return this.appointments;
  // }

  public async findByDate(date: Date): Promise<Appointment | null> {
    // const findAppointment = this.appointments.find((appointment) =>
    //   isEqual(date, appointment.date)
    // );

    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
