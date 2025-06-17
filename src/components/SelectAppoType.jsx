import { Flex, Select } from "@chakra-ui/react";

function SelectAppoType({ updateAppoType, appoType }) {
  const options = [
    { label: "Emergency Visit", value: "Emergency Visit" },
    { label: "CheckUp", value: "CheckUp" },
    { label: "Video Consultation", value: "Video Consultation" },
    { label: "Report", value: "Report" },
    { label: "on-Side Consultation", value: "on-Side Consultation" },
  ];

  return (
    <Flex w="full">
      <Select
        size="sm"
        placeholder="Select"
        value={appoType}
        onChange={(e) => updateAppoType(e.target.value)}
        width="100%"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Select>
    </Flex>
  );
}

export default SelectAppoType;
