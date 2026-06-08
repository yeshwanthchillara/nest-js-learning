import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../../types/tasks/tasks.enum';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column({
    nullable: true,
  })
  description?: string;

  @Column()
  status!: TaskStatus;
}
