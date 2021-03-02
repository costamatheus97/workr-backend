import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('companies')
class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  company_name: string;

  @Column()
  email: string;

  @Column()
  hash: string;

  @Column()
  cnpj: string;

  @Column()
  phone: string;

  @Column()
  profile_picture: string;

  @Column()
  banner: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  cep: string;

  @Column()
  description: string;

  @Column()
  company_size: string;

  @Column()
  field: string;

  @Column()
  is_company: string;

  @Column()
  is_premium: string;

  @Column()
  is_verified: string;

  @Column()
  followers: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

export default Company;
