import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Agendamentos } from './Agendamentos';
import { Especialidades } from './Especialidades';

@Entity('medicos')
export class Medicos {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    nome_completo: string;

    @Column({ type: 'text' })
    uf: string;

    @Column({ type: 'int', unique: true })
    numero_crm: number;

    @OneToMany(() => Agendamentos, (agendamentos) => agendamentos.id_medico)
    agendamentos: Agendamentos[];

    @ManyToMany(() => Especialidades, (especialidade) => especialidade.medicos)
    @JoinTable({
        name: 'medico_especialidades',
        joinColumn: {
            name: 'especialidade_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'medico_id',
            referencedColumnName: 'id',
        },
    })
    especialidades: Especialidades[];
}
