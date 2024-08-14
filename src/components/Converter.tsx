"use client";
import { useEffect } from "react";

import { useForm, useWatch } from "react-hook-form"
import { useState } from "react";

import { RiInformation2Fill } from "react-icons/ri";
import useSWR from 'swr';
import { getSendCountries, getIncomingCountries, getConvertedMoney } from '@/actions';

import { CurrencyBox } from "./CurrencyBox";


type Inputs = {
  exitMoney: number;
  exitCountry: string;
  exitCurrency: string;
  enterMoney: number;
  enterCountry: string;
  enterCurrency: string;
}

export const Converter = () => {
  const { register, control, formState: { errors }, setValue, setError, clearErrors } = useForm<Inputs>(
    { defaultValues: { exitMoney: 500000, exitCountry: 'CL', enterCountry: 'US', exitCurrency: 'CLP', enterCurrency: 'USD' } }
  );
  const exitMoney = useWatch({ control, name: 'exitMoney' });
  const enterMoney = useWatch({ control, name: 'enterMoney' });
  const exitCurrency = useWatch({ control, name: 'exitCurrency' });
  const enterCurrency = useWatch({ control, name: 'enterCurrency' });
  const exitCountry = useWatch({ control, name: 'exitCountry' });
  const enterCountry = useWatch({ control, name: 'enterCountry' });
  const [switchExchange, setSwitchExchange] = useState(false);
  const [openSend, setOpenSend] = useState(false);
  const [openReceive, setOpenReceive] = useState(false);
  const [focusExitMoney, setFocusExitMoney] = useState(false);
  const [focusEnterMoney, setFocusEnterMoney] = useState(false);
  const [exchangeRate, setExchangeRate] = useState<number>();
  const { data: sendCountries } = useSWR('/api/sendCountries', getSendCountries);
  const { data: incomingCountries } = useSWR('/api/incomingCountries', getIncomingCountries);
  const { data: convertion } = useSWR(exitMoney ? `/api/convertMoney/${exitMoney}-${enterCurrency}-${exitCurrency}` : null, () => getConvertedMoney(exitMoney, exitCurrency, enterCurrency));

  const clCountry = [{ id: 'CL', isoCode: 'CL', currency: 'CLP' }];

  useEffect(() => {
    if (convertion) {
      setValue('enterMoney', convertion.convertedMoney);
      setExchangeRate(convertion.exchangeRate);
    }
  }, [convertion, setValue]);

  const handleSwitchExchange = () => {
    setSwitchExchange(!switchExchange);
    setValue('exitCountry', enterCountry);
    setValue('enterCountry', exitCountry);
    setValue('exitCurrency', enterCurrency);
    setValue('enterCurrency', exitCurrency);
  }

  return (
    <div>
      <button className="mb-8" onClick={handleSwitchExchange}>
        <div className='flex justify-center items-center w-16 h-16 bg-[#074F71] rounded-full hover:bg-[#FAB234]'>
          <div className='text-[#FFFFFF] text-3xl font-bold'>
            {'⇌'}
          </div>
        </div>
      </button>
      <form className='flex'>
        <div className="flex w-4/5 flex-wrap">
          <div className={`flex w-full flex-row`}>
            <CurrencyBox
              register={register}
              control={control}
              typeBox={'exit'}
              textBox={'Tú envías:'}
              money={exitMoney}
              country={exitCountry}
              dropDownCountries={switchExchange ? incomingCountries : clCountry}
              focus={focusExitMoney}
              open={openReceive}
              setFocus={setFocusExitMoney}
              setOpen={setOpenReceive}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
            <CurrencyBox
              register={register}
              control={control}
              typeBox={'enter'}
              textBox={'El destinatario recibe:'}
              money={enterMoney}
              country={enterCountry}
              dropDownCountries={switchExchange ? clCountry : sendCountries}
              convertion={convertion}
              focus={focusEnterMoney}
              open={openSend}
              setFocus={setFocusEnterMoney}
              setOpen={setOpenSend}
              setValue={setValue}
            />
          </div>
          {errors.exitMoney ? (
            <div className='flex gap-2  items-center w-full text-[#ff647c] text-sm mt-6'>
              <RiInformation2Fill className='text-[#ff647c] text-2xl' />
              {errors.exitMoney.message}
            </div>
          ) : (
            <>
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
                      <span className='text-[#296b88] pt-2 mb-[0.35em] font-bold'>{new Date().toISOString().split('T')[0]}</span>
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
                      <span className='text-[#296b88] pt-2 mb-[0.35em] font-bold'>*{exchangeRate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className='w-1/5 pt-[1%] pl-[2%]'>
          <div className='flex justify-center'>
            <button className='bg-[#FAB234] text-[#074F71] w-52 h-14 text-xl font-bold rounded-3xl hover:text-[#FAB234] hover:bg-[#074F71] hover:shadow-[0_2px_10px_rgb(136,136,136)]'>
              ¡Transfiere!
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
