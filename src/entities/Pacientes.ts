import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Agendamentos } from './Agendamentos';

@Entity('pacientes')
export class Pacientes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    nome_completo: string;

    @Column({ type: 'text', unique: true })
    cpf: string;

    @Column({ type: 'text', unique: true })
    numero_carteirinha: string;

    @OneToMany(() => Agendamentos, (agendamentos) => agendamentos.id_medico)
    agendamentos: Agendamentos[];
}
