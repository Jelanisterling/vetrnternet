import { FormControl, Input } from "@chakra-ui/react";

function SearchBar({ patients, searchSetting }) {
  return (
    <FormControl maxWidth="sm">
      <Input
        type="text"
        placeholder="Search Name"
        onChange={(e) => {
          if (e.target.value.trim() !== "") {
            searchSetting(
              patients.filter((patient) =>
                patient.ownerName
                  .toLowerCase()
                  .startsWith(e.target.value.toLowerCase())
              )
            );
          } else {
            searchSetting(patients);
          }
        }}
      />
    </FormControl>
  );
}

export default SearchBar;
