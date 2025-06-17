import { Flex, Select } from "@chakra-ui/react";

function SelectHasActiveTreatment({ updateTreatmentStatus, hasActiveTreatment, itemId }) {
  const options = [
    { label: "Active", value: "Active" },
    { label: "Paused", value: "Paused" },
    { label: "Completed", value: "Completed" },
    { label: "Cancelled", value: "Cancelled" },
    { label: "Scheduled", value: "Scheduled" },
    { label: "not_required", value: "not_required" },
  ];

  return (
    <Flex justify="flex-end" width="auto">
      <Select
        size="sm"
        placeholder="Select"
        value={hasActiveTreatment}
        onChange={(e) => updateTreatmentStatus(itemId, e.target.value)}
        width="auto"
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

export default SelectHasActiveTreatment;
