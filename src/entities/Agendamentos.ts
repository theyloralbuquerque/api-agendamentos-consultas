import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Medicos } from './Medicos';
import { Especialidades } from './Especialidades';
import { Pacientes } from './Pacientes';

@Entity('agendamentos')
export class Agendamentos {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Medicos, (medico) => medico.agendamentos)
    @JoinColumn({ name: 'id_medico' })
    id_medico: Medicos;

    @ManyToOne(
        () => Especialidades,
        (especialidade) => especialidade.agendamentos,
    )
    @JoinColumn({ name: 'id_especialidade' })
    id_especialidade: Especialidades;

    @ManyToOne(() => Pacientes, (paciente) => paciente.agendamentos)
    @JoinColumn({ name: 'id_paciente' })
    id_paciente: Pacientes;

    @Column({ type: 'date' })
    data_agenda: Date;

    @Column({ type: 'text' })
    hora: string;
}
