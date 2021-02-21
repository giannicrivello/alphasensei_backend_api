import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Technique } from "./Technique";




@ObjectType()
@Entity()
export class Drills extends BaseEntity {
    @PrimaryGeneratedColumn()
    drill_id: number;


    @Field()
    @Column("text")
    title: string;

    @Field()
    @Column()
    num_reps: number;

    @Field()
    @Column()
    num_sets: number;

    @Field()
    @Column({ nullable: true})
    @ManyToOne(() => Technique, technique => technique.drills)
    technique: number;


}