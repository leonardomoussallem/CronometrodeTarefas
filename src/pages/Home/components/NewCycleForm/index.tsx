import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../contexts/CyclesContext";




export function NewCycleForm() {
    const { activeCycle } = useContext(CyclesContext);
    const { register } = useFormContext();

    

    return (
        <FormContainer>
        <label htmlFor="">Vou trabalhar em</label>
        <TaskInput 
            list="task-suggestions"
            id="task" 
            placeholder="De um nome para o seu projeto" 
            disabled={!!activeCycle}
            {...register('task')}
        />

        <datalist id="task-suggestions">
            <option value="PROJETO 3"/>
            <option value="PROJETO 2"/>
            <option value="PROJETO 1"/>
            <option value="Banana"/>
        </datalist>

        <label htmlFor="minutesAmount">durante</label>
        <MinutesAmountInput 
        type="number" 
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle} 
        {...register('minutesAmount', { valueAsNumber: true})}
        />

        <span>minutos.</span>
    </FormContainer>
    )
}