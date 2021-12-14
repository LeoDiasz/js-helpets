import {Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import {User} from "./user"
import {v4 as uuid} from "uuid"

@Entity("animals")
export class Animal {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  species: string;

  @Column()
  description: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({name: "user_id"})
  user: User;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid()
    }
  }
}
