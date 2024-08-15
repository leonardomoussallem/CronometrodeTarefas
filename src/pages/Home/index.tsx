import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/CountDown/Index";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";






const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser mais que 5 minutos')
    .max(60, 'O ciclo precisa ser menos que 60 minutos'),
})

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
    const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext);

    const newCycleForm = useForm<newCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    function handleCreateNewCycle(data: newCycleFormData) {
        createNewCycle(data)
        reset()
    }
    
    const {handleSubmit, watch, reset } = newCycleForm

    const task = watch('task')
    const isSubmitDisabled = !task


    return (
    <HomeContainer>
        <form onSubmit={handleSubmit(handleCreateNewCycle)}>
            
           <FormProvider {...newCycleForm}>
            <NewCycleForm />
           </FormProvider>
            <Countdown  />
            

            {activeCycle ? (
                <StopCountdownButton onClick={interruptCurrentCycle}type="button">
                <HandPalm size={24}/>
                Interromper
            </StopCountdownButton>
            ) : (
                <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                <Play size={24}/>
                Começar
            </StartCountdownButton>
            ) }
        </form>
    </HomeContainer>
    )
}