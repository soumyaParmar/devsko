// eslint-disable-next-line react/no-unescaped-entities
'use client'
import React from 'react'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import Button from '../ui/Button';

const CreditDetails = () => {
  return (
    <div className=' flex flex-col gap-3 border-2 rounded-2xl items-center p-2 py-4'>
      <AccountBalance />
      <ReferFriend />
    </div>
  )
}

const AccountBalance = () => {
  return (
    <div className='flex flex-col items-center gap-2'>
      <div className='text-gray-700 text-sm'>Your account balance</div>
      <div className='font-bold text-xl'>400 credits</div>
      <div className='text-xs text-gray-700 text-center max-w-64'>Credits let you create decks using AI, and use AI editing features, Theyre tied to your account email</div>
    </div>
  )
}

const handleCopyReferral = () => { 
  
 }

const ReferFriend = () => {
  return (
    <div className='flex flex-col gap-3 items-center'>
      <div className='text-center font-bold text-gray-700'>Earn more credits</div>
      <div className='flex gap-4 items-center p-1 bg-pink-50 rounded-[8px] text-xs  text-gray-600 '>
        <div className='flex items-center px-3 py-1 bg-white rounded-[8px] shadow'>
          <ChatBubbleOutlineOutlinedIcon />
          <span className='pl-2'>Refer a friend</span>
        </div>
        <div className='flex gap-1 items-center pr-3'>
          <PersonAddAlt1OutlinedIcon />
          <span>Invite a teammate</span>
        </div>
      </div>
      <div className='text-xs flex flex-col 2xl:flex-row gap-2 justify-between items-center'>
        <div className='w-[240px] text-center'>
          Give 200 credits abd earn 200 credits for each new referral who sign up for application
        </div>
        <div className='bg-[#DCF2EA] text-[#14AA57] h-min text-nowrap p-1 px-2 rounded-[8px]'>
          +200 CREDITS
        </div>
      </div>
      <div className='flex  flex-col 2xl:flex-row gap-2 items-center p-2 rounded-xl justify-between w-full bg-pink-50 text-xs'>
        <span className=' text-gray-500 text-nowrap'>https://Applicationname.app/signup?r=tsnds5ofsbj</span>
        <Button value='Copy referral link' onClick={handleCopyReferral} tailCSS='!w-min !rounded-[4px] !bg-[#047DE5]'/>
      </div>
    </div>
  )
}

export default CreditDetails;