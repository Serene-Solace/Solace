import React from 'react'
import './ButtonBlue.css'

type buttonProps = {
  contentVal:any;
  onClick?: any;
}

const ButtonBlue : React.FC<buttonProps> = ({ contentVal, onClick }) => {
  return (
    <div>
        <button  color="baseBlue" className="button-material-ui-explore-now" onClick={onClick}>
            {contentVal}
        </button>
    </div>
  )
}

export default ButtonBlue;
