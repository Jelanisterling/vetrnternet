import {Flex, NativeSelect} from "@chakra-ui/react"


function SelectAppoType({updateAppoType, appoType}) {


    const options = [
        {label: "Emergency Visit", value: "Emergency Visit"},
        {label: "CheckUp", value: "CheckUp"},
        {label: "Video Consultation", value: "Video Consultation"},
        {label: "Report", value: "Report"},
        {label: "on-Side Consultation", value: "on-Side Consultation"},
    ];

    return (
        <Flex w="full">

            <NativeSelect.Root size="sm" width="100%">
                <NativeSelect.Field
                    placeholder="select"
                    value={appoType}
                    onChange={(e) => updateAppoType(e.currentTarget.value)}
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


export default SelectAppoType;