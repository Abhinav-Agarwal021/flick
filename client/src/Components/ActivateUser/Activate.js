import React, { useState } from 'react'
import { Name } from "../Steps/NameStep/Name"
import { Avatar } from "../Steps/AvatarStep/Avatar"
import { Phone } from "../Steps/PhoneStep/Phone"

const steps = {
    1: Name,
    2: Phone,
    3: Avatar,
};

export const Activate = () => {

    const [step, setStep] = useState(1);
    const Step = steps[step];

    const onClick = () => {
        setStep(step + 1);
    }

    return (
        <Step onClick={onClick} />
    )
}
