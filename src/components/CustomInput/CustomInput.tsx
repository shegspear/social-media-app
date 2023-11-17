import React from 'react'

type PropT = {
    label?:string
    disableInput?:boolean
    icon?:any
    iconClick?:any
    inputHt?:number
    type?:string
    placeholder?:string
    value?: string | number
    onChange?:any
    maxLength?:number
    maxDate?:any
    error?:string
	iconDirection?:any
	wrapperBgColor?:string
	labelFontSize?:number
	fontSize?:number
    textArea:boolean
    marginTop:number
    marginBottom:number
    inputBg:string
}

const CustomInput = ({
    label,
    disableInput,
    icon,
    iconClick,
    inputHt,
    type,
    placeholder,
    value,
    onChange,
    maxLength,
    maxDate,
    error,
	iconDirection,
	wrapperBgColor,
	labelFontSize,
	fontSize,
    textArea,
    marginTop,
    marginBottom,
    inputBg
}:PropT) => {
  return (
    <div 
        style={{marginTop: marginTop, marginBottom: marginBottom}} 
        className='w-full flex flex-col justify-start'
    >
			{label && (
				<label style={{fontSize: labelFontSize ? labelFontSize : 16}} htmlFor='label' className='font-normal text-black1 mb-2'>
					{label}
				</label>
			)}

			<div
				style={{ 
					backgroundColor: wrapperBgColor ? wrapperBgColor : disableInput ? '#E8E5E5' : '#F1F4F9', 
					borderRadius: 6,
					display: 'flex',
					flexDirection: !iconDirection ? 'row-reverse' : iconDirection,
					alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#D4D4D4',
                    paddingRight: 10
				}}
			>
				{
                    !textArea ? (
                        <div className='w-full'>
                            <input
                                style={{
                                    height: !inputHt ? 48 : inputHt,
                                    fontSize: !fontSize ? 20 : fontSize,
                                    backgroundColor: !inputBg ? '#fff' : inputBg,
                                    color: inputBg === 'transparent' ? '#fff' : '#000',
                                }}
                                className='pl-2 w-full rounded-lg border-none outline-none'
                                type={type}
                                placeholder={placeholder ? placeholder : ''}
                                id={label}
                                value={value}
                                onChange={onChange}
                                readOnly={disableInput && disableInput}
                                maxLength={maxLength && maxLength}
                                max={maxDate && maxDate}
                            />
                        </div>
                    ) : (
                        <textarea 
                            style={{
                                backgroundColor: !inputBg ? '#fff' : inputBg,
                                color: inputBg === 'transparent' ? '#fff' : '#000',
                            }}
                            name="textField" 
                            rows={5} 
                            cols={50} 
                            className='pl-2 w-full rounded-lg border-none outline-none'
                            placeholder={placeholder ? placeholder : ''}
                            id={label}
                            value={value}
                            onChange={onChange}
                            readOnly={disableInput && disableInput}
                            maxLength={maxLength && maxLength}
                        />
                    )
                }

                    {icon && (
                        <div
                            style={{
                                cursor: 'pointer',
                                backgroundColor: disableInput ? '#E8E5E5' : 'transparent',
                            }}
                            onClick={iconClick}>
                            {icon}
                        </div>
                    )}
			</div>

			{error && <h5 className='text-lg pt-2 ease-in-out duration-1000 text-red-500'>{error}</h5>}
		</div>
  )
}

export default CustomInput