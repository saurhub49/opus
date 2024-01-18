import { RoleTypeAuthorizationConfigurationDTOPermissionEnum } from "../../../../openapi"

export const convertStringToRoleTypeAuthorizationConfigurationDTOPermissionEnum = (inputString: string) => {
    const enumValues = Object.values(RoleTypeAuthorizationConfigurationDTOPermissionEnum);

    if (enumValues.includes(inputString as typeof enumValues[number])) {
        return inputString as typeof enumValues[number];
    }

    return null;
}