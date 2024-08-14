import React from 'react'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { NumericFormat } from 'react-number-format';
import { Controller, UseFormSetError, type Control, type UseFormRegister, type UseFormSetValue, type UseFormClearErrors } from 'react-hook-form';
import { Inputs, Convertion, Country as DropDownCountry } from '@/interfaces';
import { Country }  from 'country-state-city';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Props = {
  register: UseFormRegister<Inputs>,
  control: Control<Inputs, any>,
  textBox: string,
  typeBox: "exit" | "enter",
  money: number,
  country: string,
  dropDownCountries?: DropDownCountry[],
  convertion?: Convertion,
  focus: boolean,
  open: boolean,
  setFocus: (value: boolean) => void,
  setOpen: (value: boolean) => void,
  setValue: UseFormSetValue<Inputs>,
  setError?: UseFormSetError<Inputs>,
  clearErrors?: UseFormClearErrors<Inputs>,
}

export const CurrencyBox = ({ register, control, textBox, typeBox, money, country, dropDownCountries, convertion, focus, open, setFocus, setOpen, setValue, setError, clearErrors } : Props) => {
  return (
    <div className="flex w-1/2">
      <div className="w-4/6 bg-[#E5EDF1] relative pb-[10px] pt-[27px] px-3 hover:border-b-[1px] hover:border-b-[#074F71] hover:border-solid">
        <label htmlFor={typeBox} className={`text-[#296B88] pb-[5px] absolute top-0 left-0 transition z-10 ${textBox === "El destinatario recibe:" && "-translate-x-[10px]"} ${(money || focus) ? "translate-y-1 scale-75" : "scale-100 translate-y-5 translate-x-[12px]"}`}>
          {textBox}
        </label>
        <Controller
          name={`${typeBox}Money`}
          control={control}
          render={({ field: { onChange } }) => (
            <NumericFormat
              id={`${typeBox}Money`}
              className="w-full text-[#296B88] h-[43px] text-4xl font-bold bg-[#E5EDF1] focus:outline-none"
              thousandSeparator="."
              decimalSeparator=","
              allowNegative={false}
              decimalScale={country === "CL" ? 0 : 2}
              value={convertion ? convertion.convertedMoney : money}
              onValueChange={(values) => {
                const value = values.floatValue || 0;
                onChange(value);
                if (value < 5000 && country === "CL") {
                  setError && setError(`${typeBox}Money`, {
                    type: "manual",
                    message: "El monto de origen es menor al permitido",
                  });
                } else {
                  clearErrors && clearErrors(`${typeBox}Money`);
                }
              }}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
            />
          )}
        />
      </div>
      <div className="flex w-2/6 bg-[#296b88]">
        <div className='w-5/12 h-20 flex items-center justify-center'>
          <p className='text-3xl'>
            {Country.getCountryByCode(country)?.flag}
          </p>
        </div>
        <div className='w-7/12 h-20 flex items-center justify-center pr-[30px] relative'>
          <input  
            type="text" 
            className='text-[#FFFFFF] bg-[#296b88] text-lg font-bold w-full focus:outline-none' 
            {...register(`${typeBox}Currency`)} 
          />
          <div className='absolute right-1 cursor-pointer flex justify-center'>
            <DropdownMenu onOpenChange={() => setOpen(!open)}>
              <DropdownMenuTrigger>
                {open ? (
                  <TiArrowSortedUp className='text-[#FFFFFF] text-lg' />
                ) : (
                  <TiArrowSortedDown className='text-[#FFFFFF] text-lg' />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 max-h-64 overflow-auto" sideOffset={35} >
                <DropdownMenuLabel></DropdownMenuLabel>
                {dropDownCountries?.map((country) => (
                  <div key={`${country.id}`} >
                    {Country.getCountryByCode(country.isoCode) && (
                      <DropdownMenuItem className='cursor-pointer' onClick={() => {
                        setValue(`${typeBox}Country`, country.isoCode)
                        setValue(`${typeBox}Currency`, country.currency)
                      }}>
                        <div className='flex items-center gap-2 text-xl'>
                          <span className='text-3xl'>
                          {Country.getCountryByCode(country.isoCode)?.flag}
                          </span>
                          <span className='text-xl font-bold'>{country.currency}</span>
                          <p>-</p>
                          {Country.getCountryByCode(country.isoCode)?.name}
                        </div>
                      </DropdownMenuItem>
                    )}
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}
