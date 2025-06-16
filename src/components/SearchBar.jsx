import {Field, Input} from "@chakra-ui/react";


function SearchBar({patients, searchSetting}) {


    return (
        <Field.Root maxWidth="sm">
            <Input type="text" placeholder="Search Name" onChange={(e) => {

                if (e.target.value.length !== " ") {
                    searchSetting(patients.filter((patient) => patient.ownerName.toLowerCase().startsWith(e.target.value.toLowerCase())));
                } else searchSetting(patients);
            }
            }/>
        </Field.Root>


    )

}

export default SearchBar;