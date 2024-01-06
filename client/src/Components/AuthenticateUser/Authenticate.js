import React, { useState } from 'react'

import { Otp } from '../Steps/OtpStep/Otp';
import { Email } from '../Steps/EmailStep/Email';

const steps = {
    1: Email,
    2: Otp,
};

export const Authenticate = () => {

    const [step, setStep] = useState(1);
    const Step = steps[step];

    const onClick = () => {
        setStep(step + 1);
    }

    return (
        <Step onClick={onClick} />
    )
}
