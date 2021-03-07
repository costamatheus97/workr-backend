import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column()
  interest_location: [string];

  @Column()
  skills: [string];

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

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

export default User;
