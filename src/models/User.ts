import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import Job from './Jobs'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  full_name: string;

  @Column()
  email: string;

  @Column()
  hash: string;

  @Column()
  phone: string;

  @Column()
  birthdate: string;

  @Column()
  description: string;

  @Column({ type: "text", array: true})
  interest_location: string[];

  @Column({ type: "text", array: true})
  skills: string[];

  @Column()
  profile_picture: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  cep: string;

  @Column()
  is_company: boolean;

  @Column()
  is_premium: boolean;

  @Column()
  is_verified: boolean;

  @ManyToMany(() => Job)
  @JoinTable({ name: "job_candidate" })
  job: Job

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

export default User;
