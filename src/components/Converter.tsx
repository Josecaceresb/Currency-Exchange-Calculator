"use client";
import { NumericFormat } from 'react-number-format';
import { useForm, SubmitHandler, useWatch, Controller } from "react-hook-form"
import { useState } from "react";
import { Country }  from 'country-state-city';
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { RiInformation2Fill } from "react-icons/ri";

type Inputs = {
  exitMoney: number;
  enterMoney: number;
}

export const Converter = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm<Inputs>();
  const exitMoney = useWatch({ control, name: 'exitMoney' });
  const enterMoney = useWatch({ control, name: 'enterMoney' });
  const [focusExitMoney, setFocusExitMoney] = useState(false);
  const [focusEnterMoney, setFocusEnterMoney] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex'>
      <div className="flex w-4/5 flex-wrap">
        <div className="w-4/12 bg-[#E5EDF1] relative pb-[10px] pt-[27px] px-3 hover:border-b-[1px] hover:border-b-[#074F71] hover:border-solid">
          <label htmlFor="exitMoney" className={`text-[#296B88] pb-[5px] absolute top-0 left-0 transition z-10 ${(exitMoney || focusExitMoney) ? "translate-y-1 scale-75" : "scale-100 translate-y-5 translate-x-[12px]"}`}>Tú envías:</label>
          <Controller
            name="exitMoney"
            control={control}
            render={({ field: { onChange } }) => (
              <NumericFormat
                id="exitMoney"
                className="w-full text-[#296B88] h-[43px] text-4xl font-bold bg-[#E5EDF1] focus:outline-none"
                thousandSeparator="."
                decimalSeparator=","
                allowNegative={false}
                decimalScale={0}
                fixedDecimalScale={true}
                prefix={'$'}
                onValueChange={(values) => {
                  onChange(values.floatValue);
                }}
                onFocus={() => setFocusExitMoney(true)}
                onBlur={() => setFocusExitMoney(false)}
              />
            )}
          />
        </div>
        <div className="flex w-2/12 bg-[#296b88]">
          <div className='w-5/12 h-20 flex items-center justify-center'>
            <p className='text-3xl'>
              {Country.getCountryByCode("CL")?.flag}
            </p>
          </div>
          <div className='w-7/12 h-20 flex items-center justify-center pr-[30px] relative'>
            <input type="text" className='text-[#FFFFFF] bg-[#296b88] text-lg font-bold w-full focus:outline-none' defaultValue="CLP" />
            <div className='absolute right-1 cursor-pointer'>
              <TiArrowSortedDown className='text-[#FFFFFF] text-lg' />
            </div>
          </div>
        </div>
        <div className="w-4/12 bg-[#E5EDF1] relative pb-[10px] pt-[27px] px-3 hover:border-b-[1px] hover:border-b-[#074F71] hover:border-solid">
          <label htmlFor="enterMoney" className={`text-[#296B88] pb-[5px] absolute top-0 left-0 transition z-10 ${(enterMoney || focusEnterMoney) ? "translate-y-1 scale-75 -translate-x-[10px]" : "scale-100 translate-y-5 translate-x-[12px]"}`}>El destinatario recibe:</label>
          <Controller
            name="enterMoney"
            control={control}
            render={({ field: { onChange } }) => (
              <NumericFormat
                id="enterMoney"
                className="w-full text-[#296B88] h-[43px] text-4xl font-bold bg-[#E5EDF1] focus:outline-none"
                thousandSeparator="."
                decimalSeparator=","
                allowNegative={false}
                fixedDecimalScale={true}
                prefix={'$'}
                onValueChange={(values) => {
                  onChange(values.floatValue);
                }}
                onFocus={() => setFocusEnterMoney(true)}
                onBlur={() => setFocusEnterMoney(false)}
              />
            )}
          />
        </div>
        <div className="flex w-2/12 bg-[#296b88]">
          <div className='w-5/12 h-20 flex items-center justify-center'>
            <p className='text-3xl'>
              {Country.getCountryByCode("US")?.flag}
            </p>
          </div>
          <div className='w-7/12 h-20 flex items-center justify-center pr-[30px] relative'>
            <input type="text" className='text-[#FFFFFF] bg-[#296b88] text-lg font-bold w-full focus:outline-none' defaultValue="USD" />
            <div className='absolute right-1 cursor-pointer'>
              <TiArrowSortedDown className='text-[#FFFFFF] text-lg' />
            </div>
          </div>
        </div>
        <div className='xl:flex-grow-0 xl:max-w-[50%] xl:basis-1/2 mt-2'>
          <div className='flex w-[calc(100%+8px)] m-[-4px]'>
            <div className='p-1'>
              <RiInformation2Fill className='text-[#B2CAD4] text-2xl' />
            </div>
            <div className='p-1 w-full flex'>
              <div className='xl:flex-grow-0 xl:max-w-[33%] xl:basis-1/3'>
                <span className='text-[#296b88] pt-2 mb-[0.35em] text-xs'>Fecha de llegada:</span>
              </div>
              <div className='xl:flex-grow-0 xl:max-w-[50%] xl:basis-1/2'>
                <span className='text-[#296b88] pt-2 mb-[0.35em] font-bold'>2024-08-12</span>
              </div>
            </div>
          </div>
        </div>
        <div className='xl:flex-grow-0 xl:max-w-[42%] xl:basis-5/12 mt-3 pl-3'>
          <div className='flex w-[calc(100%+8px)] m-[-4px]'>
            <div className='p-1 w-full flex'>
              <div className='xl:flex-grow-0 xl:max-w-[33%] xl:basis-1/3'>
                <span className='text-[#296b88] pt-2 mb-[0.35em] text-xs'>Tipo de cambio:</span>
              </div>
              <div className='xl:flex-grow-0 xl:max-w-[50%] xl:basis-1/2'>
                <span className='text-[#296b88] pt-2 mb-[0.35em] font-bold'>*946</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-1/5 pt-[1%] pl-[2%]'>
        <div className='flex justify-center'>
          <button className='bg-[#FAB234] text-[#074F71] w-52 h-14 text-xl font-bold rounded-3xl'>
            ¡Transfiere!
          </button>
        </div>
      </div>
    </form>
  )
}
