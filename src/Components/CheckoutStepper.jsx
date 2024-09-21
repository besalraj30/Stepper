import { useEffect, useRef, useState } from "react"

const CheckoutStepper = ({checkoutConfig}) => {
    const stateRefs = useRef([]);
    const [currentState, setCurrentState] = useState(1);
    const [isComplete, setIsComplete] = useState(false);

    const [margins, setMargins] = useState({
        marginLeft: 0,
        marginRight: 0
    });
    
    const ActiveState = checkoutConfig[currentState-1].Component; 

    const handleNext=  () => {
        setCurrentState((prevState) => {
            if(currentState===checkoutConfig.length)
            {
                setIsComplete(true);
                return prevState;
            } else {
                return prevState+1;
            }
        })
    }

    const calculateProgressBarWidth = () => {
        return ((currentState-1)/(checkoutConfig.length-1))*100;
    }

    useEffect(() => {
        setMargins({
            marginLeft: stateRefs.current[0].offsetWidth/2,
            marginRight: stateRefs.current[checkoutConfig.length-1].offsetWidth/2
        })
        console.log(stateRefs.current[checkoutConfig.length-1].offsetWidth)
    }, [stateRefs, checkoutConfig.length]);

    if(!checkoutConfig.length) {
        return <></>
    }

    return (
        <>
        <div className="stepper">
            {
                checkoutConfig.map((step, index) => {
                    return (
                        <div ref={(el) => (stateRefs.current[index] = el)} key={step.name} className={`step ${currentState > index+1 || isComplete ? "complete" : ""} ${currentState===index+1? "active" : ""}`}>
                            <div className="step-number">{currentState > index+1 || isComplete ? <span>✅</span> : index+1}</div>
                            <div className="step-name">{step.name}</div>
                        </div>
                    )
                })
            }
        </div>

        <div className="progress-bar" style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight
        }}>
            <div className="progress" style={{width: `${calculateProgressBarWidth()}%`}}></div>
        </div>

        <ActiveState />

        {!isComplete && (
            <button className="btn" onClick={handleNext}>
            {currentState === checkoutConfig.length ? "Finish" : "Next"}
            </button>
        )}
        </>
    )
}

export default CheckoutStepper;