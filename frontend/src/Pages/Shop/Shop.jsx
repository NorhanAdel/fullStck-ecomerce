import React from 'react'
import { Hero, Popular,Offer } from '../../Component'
import { NewCollection } from '../../Component/NewCollection/NewCollection'
import { NewLetter } from '../../Component/NewLetter/NewLetter'

export  const  Shop = ()=> {
  return (
      <div>
      <Hero />
      <Popular />
      <Offer />
      <NewCollection />
      <NewLetter/>
    </div>
  )
}
