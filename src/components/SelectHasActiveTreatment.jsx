import {Flex, NativeSelect} from "@chakra-ui/react"


function SelectHasActiveTreatment({updateTreatmentStatus, hasActiveTreatment, itemId}) {


    const options = [
        {label: "Active", value: "Active"},
        {label: "Paused", value: "Paused"},
        {label: "Completed", value: "Completed"},
        {label: "Cancelled", value: "Cancelled"},
        {label: "Scheduled", value: "Scheduled"},
        {label: "not_required", value: "not_required"},
    ];

    return (
        <Flex justify="flex-end">

            <NativeSelect.Root size="sm" width="auto">
                <NativeSelect.Field
                    placeholder="select"
                    value={hasActiveTreatment}
                    onChange={(e) => updateTreatmentStatus(itemId, e.currentTarget.value)}
                >
                    {options.map((opt) => {
                            return <option key={opt.value} value={opt.value}>{opt.label}</option>
                        }
                    )}
                </NativeSelect.Field>
                <NativeSelect.Indicator/>
            </NativeSelect.Root>
        </Flex>
    )
}


export default SelectHasActiveTreatment;