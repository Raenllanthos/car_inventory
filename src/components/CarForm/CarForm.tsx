import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { chooseMake } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { Button } from '@material-ui/core';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';

interface CarFormProps {
    id?:string;
    data?:{}
}

interface DroneState {
    make: string;
    model: string;
}

export const CarForm = (props:CarFormProps) => {

    const dispatch = useDispatch();
    let { carData, getData } = useGetData();
    const store = useStore()
    const make = useSelector<DroneState>(state => state.make)
    const { register, handleSubmit } = useForm({ })

    const onSubmit = (data:any, event:any) => {
        console.log(data)
        console.log(props)

        if( props.id!){
            serverCalls.update(props.id!, data)
            console.log(`Updated:${data} ${props.id}`)
            //window.location.reload()
            event.target.reset();
        } else {
            dispatch(chooseMake(data.make))
            console.log(store.getState())
            serverCalls.create(store.getState())
            //window.location.reload()
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="flight_time">Color</label>
                    <Input {...register('flight_time')} name="flight_time" placeholder="Flight Time"/>
                </div>
                <div>
                    <label htmlFor="name">Car Make</label>
                    <Input {...register('name')} name="name" placeholder='Name' />
                </div>
                <div>
                    <label htmlFor="price">Model</label>
                    <Input {...register('price')} name="price" placeholder="Price"/>
                </div>
                <div>
                    <label htmlFor="cam_quality">Year</label>
                    <Input {...register('cam_quality')} name="cam_quality" placeholder="Camera Quality"/>
                </div>
                <div>
                    <label htmlFor="description">Doors</label>
                    <Input {...register('description')} name="description" placeholder="Description"/>
                </div>
                <div>
                    <label htmlFor="dimensions">Wheels</label>
                    <Input {...register('dimensions')} name="dimensions" placeholder="Dimensions"/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}