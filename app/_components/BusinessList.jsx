"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi';
import BusinessItem from './BusinessItem';
import BusinessItemSkelton from './BusinessItemSkelton';

function BusinessList() {
    const params=useSearchParams();
    const [category,setCategory]=useState('all');
    const [foodList,setFoodList]=useState([]);
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
        params&&setCategory(params.get('category')?params.get('category'):'all')
        params&&getfoodList(params.get('category')?params.get('category'):'all')
    },[params]);

    const getfoodList = async (category_)=>{;
        setLoading(true);
        
        try {
            if(category_==='all'){
                const response = await GlobalApi.GetAllFoods();
                setFoodList(response.foods);
            // console.log("ARNOB SEE THIS: ",response);

            } else {
                const response = await GlobalApi.GetFoodsByCategory(category_);
                setFoodList(response.foods);
            // console.log("ARNOB SEE THIS: ",response);

            }

            // console.log('foodList',foodList);
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
        // GlobalApi.GetBusiness(category_).then(resp=>{
        //     setFoodList(resp?.restaurants)
        //     setLoading(false);
        // })
    }

  return (
    <div className='mt-5'>
        <h2 className='text-2xl font-bold capitalize'>{category} Items</h2>
        <h2 className='font-bold text-primary'>{foodList?.length} Results</h2>

        <div className='grid grid-cols-1 mt-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 '>
            {!loading? foodList.map((foods,index)=>(
                <BusinessItem key={index}
                business={foods}
                />
            )):
            [1,2,3,4,5,6,7,8].map((item,index)=>(
                <BusinessItemSkelton/>
            ))
            }
        </div>
    </div>
  )
}

export default BusinessList