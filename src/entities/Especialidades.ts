import {
    Column,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Agendamentos } from './Agendamentos';
import { Medicos } from './Medicos';

@Entity('especialidades')
export class Especialidades {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    nome: string;

    @Column({ type: 'int', unique: true })
    codigo: number;

    @Column({ type: 'text' })
    status: 'A' | 'I';

    @OneToMany(
        () => Agendamentos,
        (agendamentos) => agendamentos.id_especialidade,
    )
    agendamentos: Agendamentos[];

    @ManyToMany(() => Medicos, (medico) => medico.especialidades)
    medicos: Medicos[];
}
