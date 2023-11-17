import React from 'react'

type PropT = {
    disabled?:boolean
    onClick?:any
    bgColor?:string
    disabledColor?:string
    btnHeight?:number
    textColor?:string
    btnFontSize?:number
    title?:string
    icon?:any
    iconDirection?:any
    loader?:any
    isLoading?:boolean
    btnWidth?:number
    borderColor?:string
}

const CustomButton = ({
    disabled,
    onClick,
    bgColor,
    disabledColor,
    btnHeight,
    textColor,
    btnFontSize,
    title,
    icon,
    iconDirection,
    loader,
    isLoading,
    btnWidth,
    borderColor
}:PropT) => {
    const runAction = (e:any) => {
        e.preventDefault()
        if(!disabled) {
            onClick()
        } 
    }
  return (
    <button
        disabled={disabled} 
        className='rounded-lg flex flex-row justify-center items-center'
        onClick={runAction}
        style={{
            background: !disabled ? bgColor : disabledColor,
            height: !btnHeight ? 66 : btnHeight,
            width: !btnWidth ? '100%' : btnWidth,
            display: 'flex',
            flexDirection: !iconDirection ? 'row' : iconDirection,
            alignItems: 'center',
            alignContent: 'center',
            borderWidth: 1,
            borderColor: borderColor ? borderColor : 'transparent'
        }}
    >
        <p
            className='font-semibold text-center'
            style={{color: textColor, fontSize: !btnFontSize ? 20 : btnFontSize}}
        >
            {isLoading ? (loader) : (title)}
        </p>
        {icon && (<h5>{icon}</h5>)}
    </button>
  )
}

export default CustomButton